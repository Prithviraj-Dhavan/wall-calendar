import React, { useState } from "react";
import { MONTH_NAMES } from "../utils/themes";

export default function HeroImage({ theme, month, year, darkMode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="hero-section">
      <div className="hero-image-wrapper">
        {!loaded && <div className="hero-skeleton" />}
        <img
          key={theme.image}
          src={theme.image}
          alt={theme.imageAlt}
          className={`hero-img ${loaded ? "hero-img--loaded" : ""}`}
          onLoad={() => setLoaded(true)}
        />
        <div
          className="hero-overlay"
          style={{
            background: theme.gradient.replace("135deg", "180deg") + "44",
          }}
        />

        {/* Diagonal color panel – like reference image */}
        <div
          className="hero-badge-panel"
          style={{ background: theme.gradient }}
        >
          <span className="hero-year">{year}</span>
          <span className="hero-month">{MONTH_NAMES[month].toUpperCase()}</span>
        </div>

        <div className="hero-mood-label">{theme.mood}</div>
      </div>
    </div>
  );
}
