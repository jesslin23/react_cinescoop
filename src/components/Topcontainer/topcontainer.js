import React from 'react'
import './topcontainer.css'
import { Element } from 'react-scroll'
import Topcontent from '../Topcontent/topcontent'

const topcontainer = () => {
  return (
   <Element name='home' className='topcontainer'>
    <Topcontent />
   </Element>
   
  )
}

export default topcontainer