import React, { useState } from 'react'

  
function ex() {
    const [activeIndex, setActiveIndex]=useState(null)
    handleClick = (index) => setActiveIndex({ activeIndex: index })
  
  return (
      <>
    <Sidebar name="a" index={0} isActive={ activeIndex===0 } onClick={ this.handleClick } />
        <Sidebar name="b" index={1} isActive={activeIndex===1 } onClick={ this.handleClick }/>
        <Sidebar name="c" index={2} isActive={activeIndex===2 } onClick={ this.handleClick }/>
    <Sidebar name="d" index={0} isActive={ activeIndex===3 } onClick={ this.handleClick } />
        </>
  )
}

export default ex