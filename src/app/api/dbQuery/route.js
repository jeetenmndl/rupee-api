import connect from "@/lib/dbConn";
import Transaction from "@/models/transactionModel";
import {NextResponse} from "next/server";


// get users projects 
export async function DELETE(req, {params}) {
    try {

        await connect();
        
        const result = await Transaction.deleteMany({ status: 'processing' });

            return NextResponse.json({
                success: true,
                data: result
            }, {
                status: 200
            })
        


    }catch (e) {
        return NextResponse.json({ 
                success:false,
                message: "Server error, please try again!"
            },
            { status: 500 }
        )
    }
}
