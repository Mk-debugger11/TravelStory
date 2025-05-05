import { useState, useEffect, useRef } from 'react'
import './App.css'
import Navbar from './components/navbar'
import Canvas from './components/canvas'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { animate, utils, } from 'animejs';
import VideoPreview from './components/videoPreview';
function App() {
  const percentRef = useRef(null)
  const counter = useRef({ x: 0 })
  const progressRef = useRef(null)
  const saving = useRef(null)
  const [animat, setAnimate] = useState(false)
  const [elements, setElement] = useState([])
  const canvasRef = useRef();
  const [videoPlay, setVideoPlay] = useState(false)
  useEffect(() => {
    if (percentRef.current) percentRef.current.textContent = `0%`,
      progressRef.current.style.width = `0%`
  }, [])
  function startAnimate() {
    setAnimate(true)
    setTimeout(() => {
      counter.x = 0
      animate(counter, {
        x: 100,
        duration: 1000,
        modifier: utils.round(0),
        onUpdate: () => {
          percentRef.current.textContent = `${counter.x}%`
          progressRef.current.style.width = `${counter.x}%`
        },
        onComplete: () => {
          saving.current.textContent = `✅ Journal Saved Successfully`
          saving.current.style.color = "Green"
        }
      })
    }, 50)
    setTimeout(() => {
      setAnimate(false)
    }, 4000)

  }
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
  function handleTextUpload(value, color, size) {
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
  function startVideoPlay() {
    setVideoPlay(true)
  }
  //testing purpose
  useEffect(() => {
    console.log(elements)
  }, [elements])
  return (
    <>
      <div className="main">
        <Navbar onAdd={handleImageUpload} onTextAdd={handleTextUpload} startVideo={startVideoPlay} saveBtn={exportToPDF} startAnime={startAnimate} />
        <div ref={canvasRef}>
          <Canvas elements={elements} onPositionChange={updateElementPosition} />
        </div>
        {animat &&
          <div className="animation" >
            <div className="upper" ref={saving}>🧑‍💻 Saving Your Task...</div>
            <div className="lower">
              <div className="percent" ref={percentRef}></div>
              <div className="progress-container">
                <div className="progress" ref={progressRef}></div>
              </div>
            </div>
          </div>
        }
        {videoPlay &&
          <div className="videoPreview">
            <VideoPreview elements={elements} />
            To close the video preview click outside the video player
          </div>
        }

      </div>
    </>
  )
}

export default App
