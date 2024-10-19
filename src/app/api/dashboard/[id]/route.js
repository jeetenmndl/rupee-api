import connect from "@/lib/dbConn";
import Project from "@/models/projectModel";
import mongoose from "mongoose";
import {NextResponse} from "next/server";


// get one project data 
export async function GET(req, {params}) {
    try {

        await connect();
        

        const result = await Project.aggregate([
            // 1. Match the project by the given projectID
            {
              $match: { _id: new mongoose.Types.ObjectId(params.id) }
            },
      
            // 2. Lookup for recent 20 transactions related to the project
            {
              $lookup: {
                from: 'transactions', // The name of the transactions collection
                let: { projectObjectId: '$_id' }, // Reference to the Project's ObjectId
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: [{ $toObjectId: '$projectID' }, '$$projectObjectId'] } // Match transactions by projectID
                    }
                  },
                  { $sort: { date: -1 } },  // Sort transactions by date in descending order (most recent first)
                  { $limit: 20 }  // Limit to the most recent 20 transactions
                ],
                as: 'recentTransactions'  // Store the results as 'recentTransactions'
              }
            },
      
            // 3. Lookup transactions for vendors where the status is COMPLETE or COMPLETED
            {
              $lookup: {
                from: 'transactions',
                let: { projectObjectId: '$_id' }, // Project's ObjectId
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: [{ $toObjectId: '$projectID' }, '$$projectObjectId'] }, // Match projectID
                      status: { $in: ['COMPLETE', 'COMPLETED'] } // Only completed transactions
                    }
                  },
                  {
                    $group: {
                      _id: '$vendor', // Group by vendor
                      totalVendorCompletedAmount: { $sum: { $toDouble: '$totalAmount' } } // Sum transaction amounts per vendor
                    }
                  }
                ],
                as: 'vendorTotals'  // Store the results as 'vendorTotals'
              }
            },
      
            // 4. Project the final result to include project details, recent transactions, and vendor totals
            {
              $project: {
                _id: 1,  // Include project _id
                name: 1,  // Include project name
                description: 1,  // Include project description
                websiteUrl: 1,  // Include project websiteUrl
                recentTransactions: 1,  // Include recent 20 transactions
                vendorTotals: 1  // Include total completed transaction amount for each vendor
              }
            }
          ]);
          

            return NextResponse.json({
                success: true,
                data: result,
                id: params.id
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
