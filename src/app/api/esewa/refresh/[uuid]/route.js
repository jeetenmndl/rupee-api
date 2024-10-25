import connect from "@/lib/dbConn";
import Transaction from "@/models/transactionModel";
import {NextResponse} from "next/server";


// lookup from khalti and update
export async function POST(req, {params}) {

    const data = await req.json();

    try {


        const check = await fetch(`${process.env.ESEWA_TEST_LOOKUP}/?product_code=${process.env.ESEWA_TEST_PRODUCT_CODE}&total_amount=${data.amount}&transaction_uuid=${params.uuid}`, 
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        },{cache: "no-store"})
            
        const esewaData = await check.json();

        console.log("esewadata : ",esewaData);


        await connect();
        
        const updatedTransaction = await Transaction.findOneAndUpdate(
            { uuid: esewaData.transaction_uuid },
            {
            $set: {
                totalAmount: esewaData.total_amount,
                transactionCode: esewaData.ref_id,
                status: esewaData.status
            }
            },
        );

        console.log("updatedTransaction : ",updatedTransaction);


        return NextResponse.json({
            success: true,
            data: esewaData
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
