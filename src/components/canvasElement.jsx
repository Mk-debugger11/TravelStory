import React from 'react'
import '../App.css'
import { useState, useEffect, useRef } from 'react'
function CanvasElement({ element,onPositionChange }) {
    const elementRef = useRef(null)
    const [isDragging, SetIsDragging] = useState(false)
    const [position, setPosition] = useState(element.position)
    const startDragPosition = useRef({ x: 0, y: 0 })
    const [border, setBorder] = useState(false)
    function handleMouseDown(e) {
        e.preventDefault()
        SetIsDragging(true)
        startDragPosition.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        }
        setBorder(true)
    }
    function handleMouseMove(e) {
        if (isDragging) {
            const newX = e.clientX - startDragPosition.current.x;
            const newY = e.clientY - startDragPosition.current.y;
            setPosition({ x: newX, y: newY })
            onPositionChange(element.id, { x: newX, y: newY });
        }
    }
    function handleMouseUp() {
        SetIsDragging(false)
        setBorder(false)
    }
    useEffect(() => {
        if (isDragging) {
            document.addEventListener("mousemove", handleMouseMove)
            document.addEventListener("mouseup", handleMouseUp)
        }
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

    }, [isDragging])
    return (
        <div className="image"
            onMouseDown={handleMouseDown}
            style={{
                maxWidth:element.type === 'image' ? '300px' : 'auto',
                height:'auto',
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                border: border ? "1px solid black" : undefined
            }}
            ref={elementRef}
        >
            {element.type === "image" ? 
            <img src={element.content} style={{
                height: '100%',
                width: '100%',
            }} />
            : <p style={{
                color:element.color,
                fontSize:element.size
            }}>{element.content}</p>
        }
            
        </div>
    )
}

export default CanvasElement;