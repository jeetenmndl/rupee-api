import connect from "@/lib/dbConn";
import Project from "@/models/projectModel";
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
