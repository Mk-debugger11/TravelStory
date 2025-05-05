import { useState, useEffect, useRef } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Canvas from './components/canvas'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
function App() {
  const [elements, setElement] = useState([])
  const canvasRef = useRef();
  function handleImageUpload(value) {
    const newElement = {
      'id': `image-${Date.now()}`,
      'type': 'image',
      'content': value,
      'position': { x: 20, y: 20 },
      'isDragging': false
    }
    setElement([...elements, newElement])
  }
  function handleTextUpload(value,color, size) {
    const newElement = {
      'id': `text-${Date.now()}`,
      'type': 'text',
      'content': value,
      'color': color,
      'size': `${size}px`,
      'position': { x: 20, y: 20 },
      'isDragging': false
    }
    setElement([...elements, newElement])
  }
  function updateElementPosition(id, newPosition) {
    setElement(prevElements =>
      prevElements.map(el =>
        el.id === id ? { ...el, position: newPosition } : el
      )
    );
  }
  const exportToPDF = async () => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const canvasImage = await html2canvas(canvasElement);
    const imageData = canvasImage.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [canvasElement.offsetWidth, canvasElement.offsetHeight],
    });

    pdf.addImage(imageData, 'PNG', 0, 0);
    pdf.save('canvas.pdf');
  };
  //testing purpose
  useEffect(() => {
    console.log(elements)
  }, [elements])
  return (
    <>
      <div className="main">
        <Navbar onAdd={handleImageUpload} onTextAdd={handleTextUpload} saveBtn={exportToPDF}/>
        <div ref={canvasRef}>
          <Canvas elements={elements} onPositionChange={updateElementPosition}/>
        </div>
      </div>
    </>
  )
}

export default App
