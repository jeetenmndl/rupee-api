import connect from "@/lib/dbConn";
import History from "@/models/historyModel";
import {NextResponse} from "next/server";


// get history 
export async function GET(req, {params}) {
    try {

        await connect();
        

        const result = await History.findOne({ projectID: params.id }).sort({ date: -1 });;
          

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
