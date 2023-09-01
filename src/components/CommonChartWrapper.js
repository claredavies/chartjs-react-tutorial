// CommonChartWrapper.js

import React from "react";

function CommonChartWrapper({ children, onDelete }) {
  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={onDelete}
        style={{
          position: 'absolute',
          top: '5px',
          right: '-10px',
          zIndex: 1
        }}>
        X
      </button>
      {children}
    </div>
  );
}

export default CommonChartWrapper;