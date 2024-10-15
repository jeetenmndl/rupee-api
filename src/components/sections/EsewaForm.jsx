"use client"

import esewaFormSubmit from '@/lib/actions/esewa/esewaFormSubmit'
import {useEffect} from 'react'

const EsewaForm = (props) => {

  useEffect(() => {
  esewaFormSubmit(props.data)
  document.getElementById("red").style="background:red";
  
}, [])


    
  return (
    <div id='red'>EsewaForm</div>
  )
}

export default EsewaForm