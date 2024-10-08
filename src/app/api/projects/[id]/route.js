import connect from "@/lib/dbConn";
import Project from "@/models/projectModel";
import {NextResponse} from "next/server";


// get users projects 
export async function GET(req, {params}) {
    try {

        await connect();
        
            const projects = await Project.find({"userID": params.id});

            return NextResponse.json({
                data: projects
            }, {
                status: 200
            })
        


    }catch (e) {
        return NextResponse.json(
            { message: "Server error, please try again!"+e },
            { status: 500 }
        )
    }
}
