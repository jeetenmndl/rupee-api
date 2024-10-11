import Project from "@/models/projectModel";
import Transaction from "@/models/transactionModel";
import connect from "@/lib/dbConn";
import { NextResponse} from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { headers } from "next/headers";


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
                return NextResponse.redirect(failureUrl+"?success=false&message=API-KEY-MISMATCH", { status: 307 });
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

            // Redirect to the client page with the transaction _id
            const redirectUrl = `${process.env.DOMAIN}/esewa-form/${transaction._id}`;

            return NextResponse.redirect(redirectUrl);

        } catch (error) {
            return NextResponse.redirect(failureUrl+"?success=false&message=INTERNAL-SERVER-ERROR", { status: 307 });
        }
}
