import connect from "@/lib/dbConn"
import Kyc from "@/models/kycModel";
import {NextResponse} from "next/server";


export async function POST(req) {
    try {
        
        await connect();

        const projectData = await req.json();
        const result = await Kyc.create(projectData);

        return NextResponse.json({
            success: true,
            data: result._id
        }, {
            status: 201
        })

    }catch (e) {
        return NextResponse.json(
            { success:false, message: "Server error, please try again!"+e },
            { status: 500 }
        )
    }
}