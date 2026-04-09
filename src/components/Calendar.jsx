import React, { useState } from "react";
import Spiral from "./Spiral";
import HeroImage from "./HeroImage";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import NotesPanel from "./NotesPanel";
import { useCalendar } from "../hooks/useCalendar";
import { useNotes } from "../hooks/useNotes";
import { useTheme } from "../hooks/useTheme";
import { formatRangeLabel } from "../utils/dates";

export default function Calendar() {
  const {
    year,
    month,
    rangeStart,
    rangeEnd,
    selecting,
    flipDir,
    isFlipping,
    goNext,
    goPrev,
    handleDateClick,
    clearRange,
  } = useCalendar();

  const { theme, darkMode, setDarkMode } = useTheme(month);

  const { draft, setDraft, saveNote, deleteNote, allMonthNotes } = useNotes(
    year,
    month,
    rangeStart,
    rangeEnd,
  );

  const [notesOpen, setNotesOpen] = useState(false);

  const rangeLabel = formatRangeLabel(rangeStart, rangeEnd);

  return (
    <div className={`app-wrapper ${darkMode ? "dark" : ""}`}>
      {/* Background atmosphere */}
      <div className="app-bg" style={{ "--theme-gradient": theme.gradient }} />

      <main className="calendar-card" role="main">
        {/* Spiral binding */}
        <Spiral />

        {/* Flip animation container */}
        <div
          className={`page-container ${isFlipping ? `page-flip--${flipDir}` : ""}`}
        >
          {/* Top section: hero + header stacked */}
          <div className="top-section">
            <HeroImage
              theme={theme}
              month={month}
              year={year}
              darkMode={darkMode}
            />
          </div>

          {/* Calendar body */}
          <div className="calendar-body">
            <CalendarHeader
              month={month}
              year={year}
              onPrev={goPrev}
              onNext={goNext}
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              isFlipping={isFlipping}
            />

            {/* Selection status bar */}
            <div
              className={`selection-bar ${rangeStart ? "selection-bar--active" : ""}`}
            >
              {selecting && !rangeEnd ? (
                <span className="selection-hint">
                  <span
                    className="pulse-dot"
                    style={{ background: theme.accent }}
                  />
                  Now click an end date…
                </span>
              ) : rangeLabel ? (
                <span className="selection-label">
                  <span
                    className="range-dot"
                    style={{ background: theme.accent }}
                  />
                  {rangeLabel}
                  <button
                    className="clear-btn"
                    onClick={clearRange}
                    aria-label="Clear selection"
                  >
                    ✕
                  </button>
                </span>
              ) : (
                <span className="selection-placeholder">
                  Click a date to start selecting
                </span>
              )}
            </div>

            <CalendarGrid
              year={year}
              month={month}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              onDateClick={handleDateClick}
            />

            {/* Bottom toolbar */}
            <div className="calendar-toolbar">
              <button
                className="notes-trigger-btn"
                style={{ background: theme.gradient }}
                onClick={() => setNotesOpen(true)}
                aria-expanded={notesOpen}
              >
                <span>📝</span>
                <span>Notes</span>
                {allMonthNotes.length > 0 && (
                  <span className="notes-badge">{allMonthNotes.length}</span>
                )}
              </button>

              {rangeStart && rangeEnd && (
                <button className="clear-range-btn" onClick={clearRange}>
                  Clear Range
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Notes slide-in panel */}
      <NotesPanel
        open={notesOpen}
        onClose={() => setNotesOpen(false)}
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        draft={draft}
        setDraft={setDraft}
        saveNote={saveNote}
        deleteNote={deleteNote}
        allMonthNotes={allMonthNotes}
        theme={theme}
      />
    </div>
  );
}
