import connect from "@/lib/dbConn";
import Project from "@/models/projectModel";
import User from "@/models/userModel";
import {NextResponse} from "next/server";


// get users projects 
export async function GET(req, {params}) {
    try {

        await connect();
        
            // const projects = await Project.find({"userID": params.id});

            const projects = await User.aggregate([
                // Match the specific user by ID
                {
                  $match: { userID: params.id }
                },
                // Lookup projects associated with the user
                {
                  $lookup: {
                    from: 'projects',           // Projects collection
                    localField: 'userID',          // userID field from Users 
                    foreignField: 'userID',     // userId field from Projects 
                    as: 'userProjects'          // Store  result in "userProjects"
                  }
                },
                // Include fields from both collections
                {
                  $project: {
                    userID: 1,
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    photo: 1,
                    userProjects: 1
                  }
                }
              ]);
          

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
