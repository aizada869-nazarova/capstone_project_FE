import React from 'react'
import "../styles/Checklist.css"

function Checklist() {
  return (
    <div className='list_checklist text size '> <h4>What to arrange before trip</h4>
    <label>
        <input type="checkbox"/>
      <i></i>
      <span >Transport</span>
    </label>
    <label>
        <input type="checkbox"/>
      <i></i>
      <span className='text'>Accommodation</span>
    </label>
    <label>
        <input type="checkbox"/>
      <i></i>
      <span>Insurance</span>
    </label>
    <label>
        <input type="checkbox"/>
      <i></i>
      <span>Car rental</span>
    </label>
    <label>
        <input type="checkbox"/>
      <i></i>
      <span>Driving license</span>
    </label>
    <label>
        <input type="checkbox"/>
      <i></i>
      <span>Visa</span>
    </label>
    <label>
        <input type="checkbox"/>
      <i></i>
      <span>Vaccination</span>
    </label>
    <label>
        <input type="checkbox"/>
      <i></i>
      <span>Currency exchange</span>
    </label>
    <label>
        <input type="checkbox"/>
      <i></i>
      <span>Buy a SIM card</span>
    </label>
    </div>
  )
}

export default Checklist