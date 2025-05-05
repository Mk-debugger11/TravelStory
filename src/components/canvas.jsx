import React from 'react'
import '../App.css'
import CanvasElement from './canvasElement'
function Canvas({elements,onPositionChange}) {
  return (
    <div className='canvas'>
        {elements.map((element)=>{
            return <CanvasElement element={element} onPositionChange={onPositionChange}/>
        })}
    </div>
  )
}

export default Canvas