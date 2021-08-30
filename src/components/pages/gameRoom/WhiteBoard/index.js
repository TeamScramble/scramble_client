import React, { useRef, useEffect, useContext } from 'react';
import { SocketContext } from 'context';
import styled from 'styled-components';
import { COLOR_PALETTE_ARRAY } from 'components/helpers';
import trashLogo from 'public/images/trash.png';

const BoardWrapper = styled.div`
  border: 1px solid #ddd;
  background-color: #fff;
  margin: 0 10px 0 0;
  width: 690px;
  height: 600px;
  position: relative;
  .whiteboard {
    width: 100%;
    height: 100%;
    position: relative;
  }
`;

const PaintToolContainer = styled.div`
  position: absolute;
  bottom: -50px;

  display: flex;
  .colors {
    width: 315px;
  }

  .color {
    display: inline-block;
    height: 35px;
    width: 35px;
    box-shadow: 2px 2px 5px #00000030;

    border-radius: 50%;
    &:hover {
      cursor: pointer;
    }
  }
  #trashcan {
    height: 35px;
    &:hover {
      cursor: pointer;
    }
    &:active {
      transform: scale(0.96);
    }
  }
`;

const WhiteBoard = () => {
  const socket = useContext(SocketContext);

  const canvasRef = useRef(null);
  const colorsRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    let painting = false;

    canvas.width = 700;
    canvas.height = 600;

    const colors = document.getElementsByClassName('color');
    const lineWidthRange = document.getElementById('rangeDot');

    const handleLineWidthRange = e => {
      current.lineWidth = e.target.value;
    };

    const handleColor = e => {
      current.color = e.target.style.backgroundColor;
    };

    Array.from(colors).forEach(color => color.addEventListener('click', handleColor));
    // loop through the color elements and add the click event listeners

    lineWidthRange.addEventListener('input', handleLineWidthRange);

    const current = {
      color: '#2c2c2c',
      lineWidth: 8,
    };

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, width, emit) => {
      console.log('x0', x0, 'y0', y0);
      context.beginPath();
      context.moveTo(x0, y0);
      context.lineTo(x1, y1);
      context.strokeStyle = color;
      context.lineWidth = width;
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      } else {
        socket.emit('drawing', {
          x0: x0,
          y0: y0,
          x1: x1,
          y1: y1,
          color: color,
          lineWidth: width,
        });
      }
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = e => {
      painting = true;
      current.x = e.offsetX;
      current.y = e.offsetY;
    };

    const onMouseMove = e => {
      const x = e.offsetX;
      const y = e.offsetY;
      if (!painting) {
        return;
      } else {
        drawLine(current.x, current.y, x, y, current.color, current.lineWidth, true);
        current.x = e.offsetX;
        current.y = e.offsetY;
      }
    };

    const onMouseUp = e => {
      if (!painting) {
        return;
      }
      painting = false;
      drawLine(
        current.x,
        current.y,
        e.offsetX,
        e.offsetY,
        current.color,
        current.lineWidth,
        true,
      );
    };

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    canvasRef.current.addEventListener('mousemove', throttle(onMouseMove, 30));
    canvasRef.current.addEventListener('mousedown', onMouseDown);
    canvasRef.current.addEventListener('mouseup', onMouseUp);
    canvasRef.current.addEventListener('mouseleave', onMouseUp);

    const onDrawingEvent = data => {
      drawLine(data.x0, data.y0, data.x1, data.y1, data.color, data.lineWidth, false);
    };

    socket.on('drawing', onDrawingEvent);

    const clearBoard = document.getElementById('trashcan');
    const handleClearBoard = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      socket.emit('clear board');
    };

    clearBoard.addEventListener('click', handleClearBoard);

    socket.on('clear board', data => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    });
  }, []);

  return (
    <BoardWrapper>
      <canvas ref={canvasRef} className="whiteboard" />
      <PaintToolContainer>
        <div ref={colorsRef} className="colors">
          {COLOR_PALETTE_ARRAY.map((item, index) => {
            return <div key={item} className="color" style={{ backgroundColor: item }} />;
          })}
        </div>
        <div className="controls">
          <div className="controlsRange">
            <input
              type="range"
              id="rangeDot"
              min="1"
              max="15.0"
              defaultValue="8"
              step="0.5"
            />
          </div>
        </div>
        <div className="icons">
          <img id="trashcan" src={trashLogo} alt="전체 지우기" />
        </div>
      </PaintToolContainer>
    </BoardWrapper>
  );
};

export default WhiteBoard;
