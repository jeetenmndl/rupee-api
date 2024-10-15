import connect from "@/lib/dbConn";
import Transaction from "@/models/transactionModel";
import { NextResponse } from "next/server";

export async function GET(req, res){
    const pidx = req.nextUrl.searchParams.get("pidx");
    const mobile = req.nextUrl.searchParams.get("mobile");


    console.log("pidx is", pidx);



    try {

        await connect();

        const check = await fetch(`${process.env.KHALTI_TEST_API}/epayment/lookup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key f1cc1f60cc5245e7a024727b67981ce2',
            },
           body: JSON.stringify({pidx:pidx}) 
          })
            
          const checkResponse = await check.json();

          const updatedTransaction = await Transaction.findOneAndUpdate(
            { uuid: pidx },
            {
            $set: {
                totalAmount: checkResponse.total_amount/100,
                transactionCode: checkResponse.transaction_id,
                status: checkResponse.status,
                mobile: mobile,
                date: new Date()
            }
            },
            { new: true }  // Return the updated document
        );

      console.log("updatedTransaction", updatedTransaction);


        return NextResponse.redirect(updatedTransaction.info.successUrl, { status: 307 });

    } catch (error) {
        // return NextResponse.json({
        //     success: false,
        //     message: "some error occured"
        // }, {
        //     status: 500
        // })  
        const transaction = await Transaction.findOne({uuid:pidx});
        return NextResponse.redirect(transaction.info.failureUrl, { status: 307 });
    }
}