"use client"

import esewaFormSubmit from '@/lib/actions/esewa/esewaFormSubmit'
import Image from 'next/image'
import Logo from "@/../public/logoCircle.png"
import {useEffect, useState} from 'react'

const EsewaForm = ({data}) => {


  console.log(data,"props.data")

  // esewaFormSubmit(data);


  useEffect(() => {
      // esewaFormSubmit(data);
      document.querySelector("form").submit();


}, [])


    
  return (
    <div className='w-full h-dvh grid place-items-center'>
      <Image src={Logo} alt="Rupee API logo" className='w-24 h-24 lg:w-36 lg:h-36' />
    </div>
  )
}

export default EsewaForm