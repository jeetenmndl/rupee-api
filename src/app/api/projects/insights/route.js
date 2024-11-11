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
          {
            $match: {
              projectID: { $regex: new RegExp(projectIDs.join('|')), $options: 'i' },
              status: { $regex: /^complete(d)?$/i }  
            }
          },
    
          // Group by date to calculate daily revenue and transaction count
          {
            $group: {
              _id: {
                date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } 
              },
              dailyRevenue: { $sum: { $toDouble: "$totalAmount" } }, 
              dailyTransactionCount: { $sum: 1 }  
            }
          },

          {
            $sort: { "_id.date": 1 }
          },
    
          // Calculate total revenue and total transaction count across all dates
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$dailyRevenue" }, 
              totalTransactionCount: { $sum: "$dailyTransactionCount" }, 
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
                projects: projectIDs
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
