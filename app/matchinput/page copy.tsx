'use client'

import React, { useState } from 'react';
import '../style/soccerfield.css';

function SoccerField() {
  const [passData, setPassData] = useState([]);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startPoint, setStartPoint] = useState(null);

  const handleMouseDown = (e) => {
    setIsMouseDown(true);
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setStartPoint({ x, y });
  };

  const handleMouseUp = (e) => {
    if (startPoint) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const pass = { start: startPoint, end: { x, y } };
      setPassData([...passData, pass]);
      setStartPoint(null);
    }
    setIsMouseDown(false);
  };

  return (
    <div className="soccer-field" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <svg className="canvas">
        {passData.map((pass, index) => (
          <path
            key={index}
            d={`M ${pass.start.x} ${pass.start.y} L ${pass.end.x} ${pass.end.y}`}
            stroke="blue"
            strokeWidth="2"
            fill="transparent"
          />
        ))}
      </svg>
    </div>
  );
}

export default SoccerField;