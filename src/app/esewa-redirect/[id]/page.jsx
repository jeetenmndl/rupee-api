import EsewaForm from '@/components/sections/EsewaForm';
import esewaFormAlternate from '@/lib/actions/esewa/esewaFormAlternate';
import esewaFormSubmit from '@/lib/actions/esewa/esewaFormSubmit';
// import esewaFormSubmit from '@/lib/actions/esewa/esewaFormSubmit'
import getOneTransaction from '@/lib/actions/getOneTransaction'
import generateHash from '@/lib/hashing';
import React from 'react'

const page = async ({params, searchParams}) => {

  const data={
    transactionID: params.id,
    amount: searchParams.amount,
    uuid: searchParams.uuid
  }

  let signatureHash = await generateHash(`total_amount=${data.amount},transaction_uuid=${data.uuid},product_code=${process.env.ESEWA_TEST_PRODUCT_CODE}`)

    console.log(signatureHash)


        const esewaParams = {
            amount: data.amount,
            failure_url: `${process.env.DOMAIN}/api/esewa/failurePayment/${data.transactionID}`,
            product_delivery_charge: "0",
            product_service_charge: "0",
            product_code: process.env.ESEWA_TEST_PRODUCT_CODE,
            signature: signatureHash,
            signed_field_names: "total_amount,transaction_uuid,product_code",
            success_url: `${process.env.DOMAIN}/api/esewa/checkPayment/${data.transactionID}`,
            tax_amount: "0",
            total_amount: data.amount,
            transaction_uuid: data.uuid
        }

        console.log(esewaParams)


  

  return (
    <main>

      <EsewaForm data={data} />

      <form action="https://rc-epay.esewa.com.np/api/epay/main/v2/form" method="POST">
 <input type="text" id="amount" name="amount" value={esewaParams.amount} required hidden />
 <input type="text" id="tax_amount" name="tax_amount" value ={esewaParams.tax_amount}  required hidden />
 <input type="text" id="total_amount" name="total_amount" value={esewaParams.total_amount} required hidden />
 <input type="text" id="transaction_uuid" name="transaction_uuid" value={esewaParams.transaction_uuid} required hidden />
 <input type="text" id="product_code" name="product_code" value ={esewaParams.product_code} required hidden />
 <input type="text" id="product_service_charge" name="product_service_charge" value={esewaParams.product_service_charge} required hidden />
 <input type="text" id="product_delivery_charge" name="product_delivery_charge" value={esewaParams.product_delivery_charge} required hidden />
 <input type="text" id="success_url" name="success_url" value={esewaParams.success_url} required hidden />
 <input type="text" id="failure_url" name="failure_url" value={esewaParams.failure_url} required hidden />
 <input type="text" id="signed_field_names" name="signed_field_names" value={esewaParams.signed_field_names} required hidden />
 <input type="text" id="signature" name="signature" value={esewaParams.signature} required hidden />
 <input value="Submit" type="submit" hidden />
 </form>
    
    </main>
  )
}

export default page