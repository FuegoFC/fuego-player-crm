// src/SoccerField.js

import React, { useRef, useEffect, useState } from 'react';

function SoccerField() {
  const canvasRef = useRef(null);
  const [passData, setPassData] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseDown = (e) => {
      setIsMouseDown(true);
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPassData([...passData, { type: 'dot', x, y }]);
    };

    const handleMouseUp = (e) => {
      setIsMouseDown(false);
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setPassData([...passData, { type: 'dot', x, y }]);
      setPassData([...passData, { type: 'line', x, y }]);
    };

    canvas.addEventListener('mousedown', handleMouseDown);
    canvas.addEventListener('mouseup', handleMouseUp);

    return () => {
      canvas.removeEventListener('mousedown', handleMouseDown);
      canvas.removeEventListener('mouseup', handleMouseUp);
    };
  }, [passData]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    passData.forEach((data) => {
      if (data.type === 'dot') {
        ctx.beginPath();
        ctx.arc(data.x, data.y, 4, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
      } else if (data.type === 'line') {
        ctx.beginPath();
        ctx.moveTo(passData[0].x, passData[0].y);
        ctx.lineTo(data.x, data.y);
        ctx.strokeStyle = 'blue';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    });
  }, [passData]);

  return <canvas ref={canvasRef} className="canvas" />;
}

export default SoccerField;
