import React from "react";
import { MONTH_NAMES } from "../utils/themes";

export default function CalendarHeader({
  month,
  year,
  onPrev,
  onNext,
  darkMode,
  setDarkMode,
  isFlipping,
}) {
  return (
    <div className="cal-header">
      <button
        className="nav-btn nav-btn--prev"
        onClick={onPrev}
        disabled={isFlipping}
        aria-label="Previous month"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="header-title-block">
        <h2 className="header-month">{MONTH_NAMES[month]}</h2>
        <span className="header-year">{year}</span>
      </div>

      <div className="header-right">
        <button
          className={`dark-toggle ${darkMode ? "dark-toggle--on" : ""}`}
          onClick={() => setDarkMode((d) => !d)}
          aria-label="Toggle dark mode"
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          <span className="toggle-icon">{darkMode ? "☀️" : "🌙"}</span>
        </button>

        <button
          className="nav-btn nav-btn--next"
          onClick={onNext}
          disabled={isFlipping}
          aria-label="Next month"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
