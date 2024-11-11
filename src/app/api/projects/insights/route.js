import connect from "@/lib/dbConn";
import Project from "@/models/projectModel";
import Transaction from "@/models/transactionModel";
import mongoose from "mongoose";
import {NextResponse} from "next/server";


// get one project data 
export async function POST(req) {

    const request = await req.json();
    const {userID} = request;
    try {

        await connect();
        

        const userProjects = await Project.find({ userID: userID }).select('_id');
        const projectIDs = userProjects.map(project => new mongoose.Types.ObjectId(project._id));
    
        // 2. Aggregate transaction data for these projectIDs
        const result = await Transaction.aggregate([
          // Match transactions for the user's projects with status "complete" or "completed" (case insensitive)
          {
            $match: {
              projectID: { $regex: new RegExp(projectIDs.join('|')), $options: 'i' },
              status: { $regex: /^complete(d)?$/i }  // Matches "complete" or "completed" case-insensitively
            }
          },
    
          // Group by date to calculate daily revenue and transaction count
          {
            $group: {
              _id: {
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }  // Group by date in YYYY-MM-DD format
              },
              dailyRevenue: { $sum: { $toDouble: "$totalAmount" } }, // Sum of totalAmount per day
              dailyTransactionCount: { $sum: 1 }  // Count of transactions per day
            }
          },
    
          // Calculate total revenue and total transaction count across all dates
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$dailyRevenue" }, // Sum dailyRevenue for total revenue
              totalTransactionCount: { $sum: "$dailyTransactionCount" }, // Sum dailyTransactionCount for total transactions
              transactionsByDate: { $push: { date: "$_id.date", revenue: "$dailyRevenue", transactions: "$dailyTransactionCount" } }
            }
          },
    
          // Final projection to structure the output
          {
            $project: {
              _id: 0,
              totalRevenue: 1,
              totalTransactionCount: 1,
              transactionsByDate: 1
            }
          }
        ]);
    

    
            return NextResponse.json({
                success: true,
                data: result,
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
