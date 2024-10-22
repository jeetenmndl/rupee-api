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
                from: 'transactions',
                let: { projectObjectId: '$_id' },  // Reference to the Project's ObjectId
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: [{ $toObjectId: '$projectID' }, '$$projectObjectId'] }
                    }
                  },
                  { $sort: { date: -1 } },  // Sort by date (most recent first)
                  { $limit: 20 }  // Limit to the most recent 20 transactions
                ],
                as: 'recentTransactions'
              }
            },
      
            // 3. Lookup for transactions with status COMPLETE or COMPLETED, group by vendor
            {
              $lookup: {
                from: 'transactions',
                let: { projectObjectId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: [{ $toObjectId: '$projectID' }, '$$projectObjectId'] },
                      status: { $regex: /^complete(d)?$/i }  // Case-insensitive match for COMPLETE or COMPLETED
                    }
                  },
                  // Group by vendor and calculate total amount per vendor
                  {
                    $group: {
                      _id: '$vendor',
                      totalVendorAmount: { $sum: { $toDouble: '$totalAmount' } }
                    }
                  }
                ],
                as: 'vendorTotals'
              }
            },
      
            // 4. Project the result to include relevant project details, recent transactions, and vendor totals
            {
              $project: {
                _id: 1,  // Include project _id
                name: 1,  // Include project name
                description: 1,  // Include project description
                websiteUrl: 1,  // Include project websiteUrl
                recentTransactions: 1,  // Include recent 20 transactions
                vendorTotals: 1  // Include total amount per vendor with COMPLETE/COMPLETED status
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
