import connect from "@/lib/dbConn"
import Project from "@/models/projectModel";
import {NextResponse} from "next/server";


export async function POST(req) {
    try {
        
        await connect();

        const projectData = await req.json();
        const result = await Project.create(projectData);

        return NextResponse.json({
            data: result._id
        }, {
            status: 201
        })

    }catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!"+e },
            { status: 500 }
        )
    }
}