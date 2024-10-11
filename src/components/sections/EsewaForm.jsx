"use client"

import esewaFormSubmit from '@/lib/actions/esewa/esewaFormSubmit'
import {useEffect} from 'react'

const EsewaForm = (props) => {
    useEffect(() => {
      esewaFormSubmit(props.data)
      console.log(props.data)

      // eslint-disable-next-line
    },[])
    
  return (
    <div>EsewaForm</div>
  )
}

export default EsewaForm