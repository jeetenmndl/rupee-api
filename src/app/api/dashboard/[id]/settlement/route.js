import connect from "@/lib/dbConn";
import History from "@/models/historyModel";
import Project from "@/models/projectModel";
import Settlement from "@/models/settlementModel";
import Transaction from "@/models/transactionModel";
import mongoose from "mongoose";
import {NextResponse} from "next/server";



// get one project data 
export async function GET(req, {params}) {
    try {

        await connect();
        

        const { id } = params;
        
          const transactionStats = await Transaction.aggregate([
            {
              $match: {
                projectID: id,
                status: { $regex: /^complete(d)?$/i } 
              }
            },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: { $toDouble: '$totalAmount' } }, 
                transactionCount: { $sum: 1 } 
              }
            }
          ]);
      
          const settlement = await Settlement.find({ projectID: id });
      
          const responseData = {
            success: true,
            transactionStats: transactionStats[0] || { totalRevenue: 0, transactionCount: 0 },
            settlement: settlement || {}
          };
      
          return NextResponse.json(responseData);
        


    }catch (e) {
        return NextResponse.json(
            { success:false, message: "Server error, please try again!"+e },
            { status: 500 }
        )
    }
}





export async function POST(request, res) {


  const req = await request.json();
  console.log("req is: "+req)

  const session = await mongoose.startSession(); // Start a new session for the transaction
  session.startTransaction(); // Start the transaction

  try {
    const { amount, id } = req;

    // 1. Check if there are any "processing" transactions
    const processingTransactions = await Transaction.find({ 
      projectID: id, 
      status: 'processing' 
    }).session(session);

    if (processingTransactions.length > 0) {
      // Abort the transaction and return an error response
      await session.abortTransaction();
      session.endSession();
      return NextResponse.json({ success: false, message: "Refresh all processing transactions" });
    }

    // 2. Insert into Settlement collection
    const settlement = new Settlement({
      projectID: id,
      status: 'pending',
      totalAmount: amount
    });

    await settlement.save({ session });

    // 3. Append all completed transactions to the recentTransactions in the History collection
    const completedTransactions = await Transaction.find({
      projectID: id,
      status: { $in: ['complete', 'completed'] }  // Case insensitive matching for complete/completed
    }).lean().session(session);

    console.log("completed transactions", completedTransactions);

    await History.updateOne(
      { projectID: id }, 
      { $push: { transactions: { $each: completedTransactions } },
        $set: { projectID: id } }, 
      { session, upsert: true }
    );

    // 4. Delete all transactions for that projectID
    await Transaction.deleteMany({ projectID: id }).session(session);

    // 5. Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({ success: true, message: "Settlement initialized" });

  } catch (error) {
    // In case of an error, abort the transaction
    await session.abortTransaction();
    session.endSession();
    console.error('Transaction failed: ', error);
    return NextResponse.json({ success: false, message: "Transaction failed", error: error.message });
  }
}
