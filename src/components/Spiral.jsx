import React from "react";

export default function Spiral() {
  const loops = 28;
  return (
    <div className="spiral-bar" aria-hidden="true">
      {Array.from({ length: loops }).map((_, i) => (
        <div key={i} className="spiral-loop">
          <div className="spiral-coil" />
        </div>
      ))}
    </div>
  );
}
