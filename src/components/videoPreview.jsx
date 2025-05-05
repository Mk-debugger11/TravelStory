import { VideoAnimation } from "../video/videoAnimation";
import React from 'react';
import { Player } from '@remotion/player';
const VideoPreview = ({elements}) => {
    return (
      <div style={{ textAlign: 'center', width:'90%',height:'90%',backgroundColor:'white' }}>
        <h2>Canvas Recap</h2>
        <Player
          component={VideoAnimation}
          inputProps={{ elements:elements }}
          durationInFrames={elements.length*30}  
          compositionWidth={1400}  
          compositionHeight={747}  
          fps={30}  
          controls={true} 
        />
      </div>
    );
  };
export default VideoPreview;
  