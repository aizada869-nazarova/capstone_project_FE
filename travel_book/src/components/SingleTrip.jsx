import React, { useState } from 'react'
import {Card, Button} from "react-bootstrap"
import {format, parseISO} from "date-fns"
import "../styles/Card.css"

const SingleTrip= ({ id,
  from,
  travelWith,
  departureDate,
  to,
  arrivalDate,
  tripChanged,
  setTripChanged, index})=>{
const [selected, setSelected]=useState(false)

  return (
//  <>
//   </>
  <>
  <Card 
  onClick={()=>setSelected(!selected)}
    style={{width: '18rem', margin: "30px",  }}
    // border: selected ? "3px solid red": "none"
    className="cb1 "
  >
 
  <Card.Body >
  <span className='card_number fw-bold'>{index+1}</span>
    <Card.Title>Coming trip</Card.Title>
    <Card.Text>
    {from}
    </Card.Text>
    <Card.Text>
    {format(parseISO(departureDate), "EEEE, MMM, do")} 
    </Card.Text>
    <Button variant="outline-light"className='rounded-pill button'> Details </Button>
  </Card.Body>
</Card>
</>
  )
}

export default SingleTrip