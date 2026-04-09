import React, { useEffect, useRef } from "react";
import { formatRangeLabel } from "../utils/dates";

export default function NotesPanel({
  open,
  onClose,
  rangeStart,
  rangeEnd,
  draft,
  setDraft,
  saveNote,
  deleteNote,
  allMonthNotes,
  theme,
}) {
  const textRef = useRef(null);

  useEffect(() => {
    if (open && textRef.current) textRef.current.focus();
  }, [open, rangeStart, rangeEnd]);

  const rangeLabel =
    formatRangeLabel(rangeStart, rangeEnd) || "No date selected";
  const hasRange = !!rangeStart;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`notes-backdrop ${open ? "notes-backdrop--visible" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`notes-panel ${open ? "notes-panel--open" : ""}`}
        role="complementary"
        aria-label="Notes panel"
      >
        {/* Panel header */}
        <div
          className="notes-panel-header"
          style={{ background: theme.gradient }}
        >
          <div className="notes-panel-title">
            <span className="notes-icon">📝</span>
            <span>Notes</span>
          </div>
          <button
            className="notes-close-btn"
            onClick={onClose}
            aria-label="Close notes"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Current range note */}
        <div className="notes-active-section">
          <div className="notes-range-label">
            <span
              className="notes-range-dot"
              style={{ background: theme.accent }}
            />
            {rangeLabel}
          </div>

          <textarea
            ref={textRef}
            className="notes-textarea"
            placeholder={
              hasRange
                ? "Write a note for this date range…"
                : "Select a date range to add a note"
            }
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={!hasRange}
            rows={5}
          />

          {hasRange && (
            <button
              className="notes-save-btn"
              style={{ background: theme.gradient }}
              onClick={() => saveNote(draft)}
            >
              Save Note
            </button>
          )}
        </div>

        {/* All month notes */}
        {allMonthNotes.length > 0 && (
          <div className="notes-list-section">
            <h3 className="notes-list-title">This Month's Notes</h3>
            <div className="notes-list">
              {allMonthNotes.map(({ key, text, dateRange }) => (
                <div key={key} className="note-card">
                  <div className="note-card-range">
                    <span
                      className="note-range-dot"
                      style={{ background: theme.accent }}
                    />
                    {dateRange
                      .replace(/none/g, "")
                      .replace(/^:+|:+$/g, "")
                      .replace(":", " – ") || "Single day"}
                  </div>
                  <p className="note-card-text">{text}</p>
                  <button
                    className="note-delete-btn"
                    onClick={() => deleteNote(key)}
                    aria-label="Delete note"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {allMonthNotes.length === 0 && !hasRange && (
          <div className="notes-empty-state">
            <span className="notes-empty-icon">🗒️</span>
            <p>
              Select a date range on the calendar,
              <br />
              then add a note here.
            </p>
          </div>
        )}
      </aside>
    </>
  );
}
