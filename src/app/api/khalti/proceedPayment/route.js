import connect from "@/lib/dbConn"
import Project from "@/models/projectModel";
import Transaction from "@/models/transactionModel";
import { headers } from "next/headers";
// import Project from "@/modals/projectModel";
import {NextResponse} from "next/server";


export async function POST(req) {
    
    const details = await req.json();
    const headerList = headers();

    const apiKey = headerList.get('api-key');
    
    try {
        
        await connect();

           // Validate the Project and API Key
           const project = await Project.findOne({ _id: details.projectID, apiKey: apiKey });

           if (!project) {
               return NextResponse.json(
                   { success:false,
                       message: "KEY MISMATCH" },
                   { status: 401 }
               )
           }


        const khaltiResponse = await fetch(`${process.env.KHALTI_TEST_API}/epayment/initiate/`, {
            method: 'POST',
            headers: {
                'Authorization': 'key f1cc1f60cc5245e7a024727b67981ce2',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "return_url": `${process.env.DOMAIN}/api/khalti/checkPayment`,
                "website_url": `${process.env.DOMAIN}`,
                "amount": details.amount*100,
                "purchase_order_id": "test123",
                "purchase_order_name": "test1",
                "customer_info": {
                    "name": "Khalti Bahadur 2",
                    "email": "example@gmail.com",
                    "phone": "9800000123"
                },
            })
        })
            
        const khaltiResult = await khaltiResponse.json();
        
        console.log(khaltiResult);

        const transaction = await Transaction.create({
            totalAmount: details.amount,
              status: "processing",
              transactionCode: "N/A",
              mobile: "9XXXXXXXXX",
              vendor: "khalti",
              fee:0,
              info:{
                successUrl: details.successUrl,
                failureUrl: details.failureUrl,
                orderID: details.orderID,
              },
              uuid: khaltiResult.pidx,
              projectID: details.projectID
        });

        return NextResponse.json({
            success: true,
            redirectUrl: khaltiResult.payment_url
        }, {
            status: 200
        })


    }catch (e) {
        return NextResponse.json(
            { success: false, message: "INTERNAL SERVER ERROR"},
            { status: 500 }
        )
    }
}