import connect from "@/lib/dbConn";
import generateHash from "@/lib/hashing";
import Transaction from "@/models/transactionModel";
import { NextResponse } from "next/server";
// import getDomain from "../getEnv/getDomain";
// import getEsewaPath from "../getEnv/getEsewaPath";
import { v4 as uuidv4 } from 'uuid';



export async function GET(req) {

    // const path = await getEsewaPath();
    // const domain = await getDomain();


    // var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    const uuid = await uuidv4();

    let signatureHash = await generateHash(`total_amount=100,transaction_uuid=${uuid},product_code=EPAYTEST`)

    // console.log(signatureHash)


        var params = {
            amount: "100",
            failure_url: "https://google.com",
            product_delivery_charge: "0",
            product_service_charge: "0",
            product_code: "EPAYTEST",
            signature: signatureHash,
            signed_field_names: "total_amount,transaction_uuid,product_code",
            success_url: `${process.env.DOMAIN}/api/esewa/checkPayment/id`,
            tax_amount: "0",
            total_amount: "100",
            transaction_uuid: uuid
        }

        // console.log(params);


        // var form = document.createElement("form");
        // form.setAttribute("method", "POST");
        // form.setAttribute("action", process.env.ESEWA_TEST_API);

        // for (var key in params) {
        //     var hiddenField = document.createElement("input");
        //     hiddenField.setAttribute("type", "hidden");
        //     hiddenField.setAttribute("name", key);
        //     hiddenField.setAttribute("value", params[key]);
        //     form.appendChild(hiddenField);
        // }

        // document.body.appendChild(form);
        
        //     form.submit();


        try {
            const response = await fetch(`${process.env.ESEWA_TEST_API}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(params)
            },  
                { cache: 'no-store',})

            console.log(response)
                
        } catch (error) {
            console.log(error)
        }

        return NextResponse.json({
            success: true,
            message: "hello"
        }, {
            status: 200
        })

  }
