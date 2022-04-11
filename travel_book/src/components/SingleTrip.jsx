import React, { useState } from 'react'
import {Card, Button} from "react-bootstrap"
import {format, parseISO} from "date-fns"

const SingleTrip= ({data})=>{
const [selected, setSelected]=useState(false)

  return (
    <> <Card className="text-center"
    onClick={()=>setSelected(!selected)}
    style={{border: selected ? "3px solid red": "none"}}>
    <Card.Header>Coming trip</Card.Header>
    <Card.Body>
      <Card.Title>{data.from}</Card.Title>
      <Card.Text>
     {/* {format(parseISO(data.departureDate), "EEEE, MMM, do")} */}
      </Card.Text>
      <Button variant="primary">details</Button>
    </Card.Body>
    <Card.Footer className="text-muted">2days</Card.Footer>
  </Card></>
  )
}

export default SingleTrip