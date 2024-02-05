import React from 'react'
import "../App.css"
export default function Square({value, chooseSquare}) {
  return (
    <div onClick={chooseSquare} className='square'>
      {value}
    </div>
  )
}
