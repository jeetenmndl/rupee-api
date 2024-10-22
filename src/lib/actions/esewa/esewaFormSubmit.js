"use client"

import getDomain from "@/lib/getEnv/getDomain";
import getEsewaPath from "@/lib/getEnv/getEsewaPath";
import generateHash from "@/lib/hashing";



const esewaFormSubmit = async (data,setSubmitted)=>{

    const esewaData = await getEsewaPath();
    const domain = await getDomain();



    let signatureHash = await generateHash(`total_amount=${data.amount},transaction_uuid=${data.uuid},product_code=${esewaData.productCode}`)

    console.log(signatureHash)


        var params = {
            amount: data.amount,
            failure_url: `${domain}/api/esewa/checkPayment/${data.transactionID}`,
            product_delivery_charge: "0",
            product_service_charge: "0",
            product_code: esewaData.productCode,
            signature: signatureHash,
            signed_field_names: "total_amount,transaction_uuid,product_code",
            success_url: `${domain}/api/esewa/checkPayment/${data.transactionID}`,
            tax_amount: "0",
            total_amount: data.amount,
            transaction_uuid: data.uuid
        }


        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", esewaData.path);

        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }


        document.body.appendChild(form);

        
            form.submit();


  }


  export default esewaFormSubmit;