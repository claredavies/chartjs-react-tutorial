import React from "react";

function CommonChartWrapper({ children, onDelete, showDelete }) {
  return (
    <div style={{ position: 'relative' }}>
      {showDelete && (
        <button
          onClick={onDelete}
          className="delete-button"
          onMouseOver={e => e.target.style.backgroundColor = '#1f5bb6'} // Darker blue on hover
          onMouseOut={e => e.target.style.backgroundColor = '#2a71d0'}  // Blue on mouse out
        >
          X
        </button>
      )}
      {children}
    </div>
  );
}

export default CommonChartWrapper;