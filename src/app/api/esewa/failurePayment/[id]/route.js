import connect from "@/lib/dbConn";
import generateHash from "@/lib/hashing";
import Transaction from "@/models/transactionModel";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {

    const { id } = params;

    console.log(id)


    try {

        await connect();
      
        const updatedTransaction = await Transaction.findOneAndUpdate(
            { _id: id },
            {
            $set: {
                status: "CANCELLED",
                date: new Date()
            }
            },
            { new: true }  // Return the updated document
        );

      console.log("updatedTransaction", updatedTransaction);

      // If transaction is not found, SMS to admin for check
      if (!updatedTransaction) {
       console.log("SMS to admin, transaction not found");
      }


 

        return NextResponse.redirect(updatedTransaction.info.failureUrl, { status: 307 });


    } catch (error) {

        console.log("Send SMS to admin"+error)

        const transaction = await Transaction.findOne({_id:id});

    
            return NextResponse.redirect(transaction.info.failureUrl, { status: 307 });
    }
  
}
