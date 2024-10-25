import connect from "@/lib/dbConn";
import Transaction from "@/models/transactionModel";
import {NextResponse} from "next/server";


// lookup from khalti and update
export async function POST(req, {params}) {

    const data = await req.json();

    try {


        const check = await fetch(`${process.env.KHALTI_TEST_API}/epayment/lookup/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': process.env.KHALTI_TEST_KEY,
            },
           body: JSON.stringify({pidx:params.uuid}) 
        })
            
        const khaltiData = await check.json();


        await connect();
        
        const updatedTransaction = await Transaction.findOneAndUpdate(
            { uuid: khaltiData.pidx },
            {
            $set: {
                totalAmount: khaltiData.total_amount/100,
                transactionCode: khaltiData.transaction_id,
                status: khaltiData.status
            }
            },
        );

        return NextResponse.json({
            success: true,
            data: updatedTransaction
        }, {
            status: 200
        })



    }catch (e) {
        return NextResponse.json({ 
                success:false,
                message: "INTERNAL SERVER ERROR"
            },
            { status: 500 }
        )
    }
}
