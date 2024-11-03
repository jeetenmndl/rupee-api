import connect from "@/lib/dbConn";
import Transaction from "@/models/transactionModel";
import mongoose from "mongoose";
import {NextResponse} from "next/server";


// get one project data 
export async function GET(req, {params}) {
    try {

        await connect();
        

        const result = await Transaction.aggregate([
            {
              $match: {
                projectID: params.id,  // Match project ID
                status: { $regex: /^complete(d)?$/i }  
              }
            },
      
            {
              $group: {
                _id: null,  // Group at the root level
                totalRevenue: { $sum: { $toDouble: '$totalAmount' } },  // Sum totalAmount for the project
                transactionCount: { $sum: 1 }  // Count the number of successful transactions
              }
            },
      
            // 3. Store the project-level stats in a separate field
            {
              $addFields: {
                projectRevenue: {
                  totalRevenue: '$totalRevenue',
                  transactionCount: '$transactionCount'
                }
              }
            },
      
            // 4. Lookup and group by vendor to calculate vendor-specific total revenue and transaction count
            {
              $lookup: {
                from: 'transactions',  // Perform another lookup on the same collection
                let: { projectId: params.id },
                pipeline: [
                  {
                    $match: {
                      projectID: params.id,  // Ensure the project ID matches
                      status: { $regex: /^complete(d)?$/i }  // Status filter for "complete"/"completed"
                    }
                  },
                  // Group by vendor and calculate vendor-specific stats
                  {
                    $group: {
                      _id: '$vendor',
                      totalRevenue: { $sum: { $toDouble: '$totalAmount' } },
                      transactionCount: { $sum: 1 }
                    }
                  },
                  {
                    $addFields: {
                      avgTransactionValue: {
                        $cond: { 
                          if: { $eq: ["$transactionCount", 0] }, 
                          then: 0, 
                          else: { $divide: ["$totalRevenue", "$transactionCount"] } 
                        }
                      }
                    }
                  },
                  {
                    $project: {
                      vendor: '$_id',
                      totalRevenue: 1,
                      transactionCount: 1,
                      avgTransactionValue: 1,
                    }
                  }
                ],
                as: 'vendorStats'  // Store vendor-specific stats in "vendorStats"
              }
            },
      
            // 5. Project the final result
            {
              $project: {
                _id: 0,
                totalProjectRevenue: '$projectRevenue.totalRevenue',  // Total revenue for the project
                totalTransactionCount: '$projectRevenue.transactionCount',  // Successful transactions count
                vendorStats: 1  // Include the vendor stats
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
