import connect from "@/lib/dbConn"
import Kyc from "@/models/kycModel";
import {NextResponse} from "next/server";

// getting the kyc with post 
export async function POST(req) {
    try {
        
        await connect();

        const request = await req.json();


        const result = await Kyc.findOne({userID: request.id});

        return NextResponse.json({
            success: true,
            data: result
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