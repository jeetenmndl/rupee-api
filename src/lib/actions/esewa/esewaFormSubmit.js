

import getDomain from "@/lib/getEnv/getDomain";
import getEsewaPath from "@/lib/getEnv/getEsewaPath";
import generateHash from "@/lib/hashing";



const esewaFormSubmit = async ()=>{

    const path = await getEsewaPath();
    const domain = await getDomain();


    // var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    let uuid = Date.now().toString();

    let signatureHash = await generateHash(`total_amount=100,transaction_uuid=${uuid},product_code=EPAYTEST`)

    console.log(signatureHash)


        var params = {
            amount: "100",
            failure_url: "https://google.com",
            product_delivery_charge: "0",
            product_service_charge: "0",
            product_code: "EPAYTEST",
            signature: signatureHash,
            signed_field_names: "total_amount,transaction_uuid,product_code",
            success_url: `${domain}/api/esewa/handleEsewaSuccess`,
            tax_amount: "0",
            total_amount: "100",
            transaction_uuid: uuid
        }

        console.log(params);

        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

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