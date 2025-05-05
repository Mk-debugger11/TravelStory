import { useCurrentFrame, interpolate, Img } from 'remotion';
import React from 'react';
import { AbsoluteFill } from 'remotion';
export const VideoAnimation = ({ elements }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: '#e3e3e3' }}>
      <div style={{
        flex: 1,
        fontFamily: 'sans-serif',
        position: 'relative'
      }}>
        {elements.map((item, index) => {
          const delay = index * 30;
          const enterStart = delay;
          const enterEnd = delay + 20;

          const opacity = interpolate(frame, [enterStart, enterEnd], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const scale = interpolate(frame, [enterStart, enterEnd], [0.5, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          const translateY = interpolate(frame, [enterStart, enterEnd], [0, item.position.y], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const translateX = interpolate(frame, [enterStart, enterEnd], [0, item.position.x], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp'
          })
          return (
            <div
              key={index}
              style={{
                opacity,
                transform: `scale(${scale}) translateY(${translateY}px) translateX(${translateX}px)`,
                position: 'absolute',
                color: 'white',
                fontSize: item.type === 'text' ? 16 : 'auto',
              }}
            >
              {item.type === 'text' ? (
                <div style={{ color: item.color, fontSize: item.size }}>{item.content}</div>
              ) : (
                <Img src={item.content} style={{ width: 320, borderRadius: 16 }} />
              )}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
