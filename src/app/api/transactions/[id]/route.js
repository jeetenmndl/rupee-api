import connect from "@/lib/dbConn";
import Transaction from "@/models/transactionModel";
import {NextResponse} from "next/server";


// get users projects 
export async function GET(req, {params}) {
    try {

        await connect();
        
            const transaction = await Transaction.findById(params.id);

            return NextResponse.json({
                success: true,
                data: transaction
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
