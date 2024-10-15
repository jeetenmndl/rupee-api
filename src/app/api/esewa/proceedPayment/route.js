import Project from "@/models/projectModel";
import Transaction from "@/models/transactionModel";
import connect from "@/lib/dbConn";
import { NextResponse} from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { headers } from "next/headers";
import esewaFormSubmit from "@/lib/actions/esewa/esewaFormSubmit";


export async function POST(req, res) {

    const request = await req.json();
    const headerList = headers();
    
        const { amount, successUrl, failureUrl, projectID, orderID } = request;

        const apiKey = headerList.get('api-key');

        const uuid = await uuidv4();


        try {
            await connect();

            // Validate the Project and API Key
            const project = await Project.findOne({ _id: projectID, apiKey: apiKey });

            console.log("reached project");

            if (!project) {
                return NextResponse.json(
                    { success:false,
                        message: "KEY MISMATCH" },
                    { status: 401 }
                )
            }

            // Insert transaction data into the Transaction collection
            const transaction = await Transaction.create({
                totalAmount: amount,
                  status: "processing",
                  transactionCode: "N/A",
                  mobile: "9XXXXXXXXX",
                  vendor: "esewa",
                  fee:0,
                  info:{
                    successUrl: successUrl,
                    failureUrl: failureUrl,
                    orderID: orderID,
                  },
                  uuid: uuid,
                  projectID: projectID
            });

            console.log(transaction._id)
            esewaFormSubmit();

            return NextResponse.json(
                { success:true,
                    redirectUrl: `${process.env.domain}/esewa-redirect/${transaction._id}` },
                { status: 200 }
            )

        } catch (error) {
            return NextResponse.json(
                { success:false,
                    message:"INTERNAL SERVER ERROR" },
                { status: 500 }
            )
        }
}
