import React from 'react'
import { useState } from 'react'
import upload from '../assets/upload.png'
function Navbar({onAdd,onTextAdd,saveBtn}) {
    const [text,setText] = useState('')
    const [fontSize,setFontSize] = useState('20')
    const [color,setColor] = useState('#000000')
    const [disabled,setDisabled] = useState(false)
    //function for handling image input and sending it to app.jsx by lifting stateup
    function handleImageInput(e){
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (e)=>{
         onAdd(e.target.result)
        }
    }
    function handleTextInput(e){
        setText(e.target.value)
    }
    function handleSizeInput(e){
        setFontSize(e.target.value)
    }
    function handleColorInput(e){
        setColor(e.target.value)
    }
    //function for sending text,color,size input and sending it to app.jsx by lifting stateup
    function handleClick(){
        if(text === ""){
            alert('Input Box is empty')
            return
        }
        onTextAdd(text,color,fontSize)
        setText("")
        setColor('#000000')
        setFontSize('20')
    }
    function saveAnimate(){
        setDisabled(true)
    }
  return (
    <div className='navbar'>
        <div className="logo">TravelStory</div>
        <div className="toolbox">
            <div className="image">
                <input type="file" accept='image/*' className='imageInput' id='upload' onChange={handleImageInput}/>
                <label htmlFor="upload" className='uploadButton'>Upload Image <img src={upload} alt=""/></label>
            </div>
            <div className="text">
                <input type="text" className='textUpload' placeholder='EnterText' onChange={handleTextInput} value={text}/>
                <input type="text" className='fontSize' placeholder='Size' onChange={handleSizeInput} value={fontSize}/>
                <input type="color" className='fontColor' placeholder='Color'onChange={handleColorInput} value={color}/>
                <button className='textBtn'onClick={handleClick}>Add Text</button>
            </div>
            <div className="extraBtn">
                <button className='extraBtns' onClick={saveAnimate}>Save</button>
                {disabled && 
                <div>
                <button className='extraBtns' style={{marginRight:'10px'}}onClick={()=>{saveBtn()}}>Export PDF</button>
                <button className='extraBtns' >Generate Video</button>
                </div>
                }
                
            </div>
        </div>
    </div>
  )
}

export default Navbar;