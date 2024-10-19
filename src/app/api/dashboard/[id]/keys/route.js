import connect from "@/lib/dbConn";
import Project from "@/models/projectModel";
import mongoose from "mongoose";
import {NextResponse} from "next/server";


// get one project data 
export async function GET(req, {params}) {
    try {

        await connect();
        

        const result = await Project.findOne({ _id: params.id }, {
            _id: 1,
            apiKey: 1,
            createdAt: 1,
            updatedAt: 1
          });
          

            return NextResponse.json({
                success: true,
                data: result,
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
