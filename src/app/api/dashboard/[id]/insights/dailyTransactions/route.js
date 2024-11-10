import connect from "@/lib/dbConn";
import Transaction from "@/models/transactionModel";
import mongoose from "mongoose";
import {NextResponse} from "next/server";


// get one daily insights 
export async function GET(req, {params}) {
    try {

        await connect();
        

        const result = await Transaction.aggregate([
            {
              $match: { projectID: params.id }
            },
        
            {
              $group: {
                _id: { 
                  day: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }  
                },
                revenue: { $sum: { $toDouble: "$totalAmount" } }, 
                transactions: { $sum: 1 }  
              }
            },

            {
                $project: {
                  _id: 0,  
                  date: "$_id.day", 
                  revenue: 1, 
                  transactions: 1 
                }
              },
        
            {
              $sort: { "date": 1 }
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