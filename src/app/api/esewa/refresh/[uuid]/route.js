import connect from "@/lib/dbConn";
import Transaction from "@/models/transactionModel";
import {NextResponse} from "next/server";


// get users projects 
export async function POST(req, {params}) {

    const data = await req.json();

    try {


        const check = await fetch(`${process.env.ESEWA_TEST_LOOKUP}/?product_code=${ESEWA_TEST_PRODUCT_CODE}&total_amount=${data.amount}&transaction_uuid=${params.uuid}`, 
            {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        },{cache: "no-store"})
            
        const esewaData = await check.json();


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
