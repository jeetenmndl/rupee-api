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
        

        const result = await Transaction.aggregate([
            // 1. Match transactions with projectID and case-insensitive status "complete" or "completed"
            {
              $match: {
                projectID: params.id,
                status: { $regex: /^complete(d)?$/i } // Case-insensitive match for complete/completed
              }
            },
      
            // 2. Group to calculate total revenue and number of transactions
            {
              $group: {
                _id: null, // Group all matching transactions together
                totalRevenue: { $sum: { $toDouble: '$totalAmount' } }, // Sum of totalAmount
                transactionCount: { $sum: 1 } // Count of successful transactions
              }
            },
      
            // 3. Lookup settlements from the Settlement collection for the same projectID
            {
              $lookup: {
                from: 'settlement', // Assuming the name of the settlement collection is "settlement"
                localField: 'projectID', // Use projectID from the current document
                foreignField: 'projectID', // Match projectID in Settlement collection
                as: 'settlement' // Store matching settlement in "settlement"
              }
            },
      
            // 4. Project the results
            {
              $project: {
                _id: 0,
                totalRevenue: 1,
                transactionCount: 1,
                settlement: 1 // Include all the matching settlements
              }
            }
          ]);
          

            return NextResponse.json({
                success: true,
                data: result[0],
            }, {
                status: 200
            })
        


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
    }).session(session);

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
