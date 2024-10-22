import connect from "@/lib/dbConn";
import generateHash from "@/lib/hashing";
import Transaction from "@/models/transactionModel";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {

    const { id } = params;  

    let data = req.nextUrl.searchParams.get("data");
        const decodedData = JSON.parse(
            Buffer.from(data, "base64").toString("utf-8")
        );
        // console.log(decodedData)


        const message = decodedData.signed_field_names.split(",").map((field)=> `${field}=${decodedData[field] || ""}`).join(",");

        const signature = generateHash(message);

        if(signature !== decodedData.signature){
            return NextResponse.json({
                success: false,
                message: "integrity error"
            }, {
                status: 200
            })
        }


    try {

        await connect();
      
        const updatedTransaction = await Transaction.findOneAndUpdate(
            { _id: id },
            {
            $set: {
                totalAmount: decodedData.total_amount,
                transactionCode: decodedData.transaction_code,
                status: decodedData.status,
                mobile: "9XXXXXXXXX",
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

      // Check status and redirect
      if (decodedData.status === 'COMPLETE') {

        return NextResponse.redirect(updatedTransaction.info.successUrl, { status: 307 });

      } else {

        return NextResponse.redirect(updatedTransaction.info.failureUrl, { status: 307 });

      }


    } catch (error) {

        console.log("Send SMS to admin"+error)

        if (decodedData.status === 'COMPLETE') {

            return NextResponse.redirect(updatedTransaction.info.successUrl, { status: 307 });
    
          } else {
    
            return NextResponse.redirect(updatedTransaction.info.failureUrl, { status: 307 });
    
          }
    }
  
}
