import React, { useRef } from "react";
import {
  isSameDay,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isToday,
  isWeekend,
} from "../utils/dates";
import { getHoliday } from "../utils/holidays";

function createRipple(btn, x, y) {
  const circle = document.createElement("span");
  const diameter = Math.max(btn.clientWidth, btn.clientHeight);
  const rect = btn.getBoundingClientRect();
  circle.style.cssText = `
    width:${diameter}px;height:${diameter}px;
    left:${x - rect.left - diameter / 2}px;
    top:${y - rect.top - diameter / 2}px;
    position:absolute;border-radius:50%;
    background:rgba(255,255,255,0.35);
    transform:scale(0);animation:ripple 0.55s linear;
    pointer-events:none;
  `;
  const existing = btn.querySelector(".ripple");
  if (existing) existing.remove();
  circle.className = "ripple";
  btn.appendChild(circle);
  setTimeout(() => circle.remove(), 600);
}

export default function DateCell({
  date,
  rangeStart,
  rangeEnd,
  onDateClick,
  animIndex,
}) {
  const btnRef = useRef(null);
  if (!date) return <div className="date-cell date-cell--empty" />;

  const today = isToday(date);
  const weekend = isWeekend(date);
  const rangeS = isRangeStart(date, rangeStart, rangeEnd);
  const rangeE = isRangeEnd(date, rangeStart, rangeEnd);
  const inRange = isInRange(date, rangeStart, rangeEnd);
  const singleSelected = rangeStart && !rangeEnd && isSameDay(date, rangeStart);
  const holiday = getHoliday(date.getMonth() + 1, date.getDate());

  const classes = [
    "date-cell",
    today ? "date-cell--today" : "",
    weekend ? "date-cell--weekend" : "",
    rangeS ? "date-cell--range-start" : "",
    rangeE ? "date-cell--range-end" : "",
    inRange ? "date-cell--in-range" : "",
    singleSelected ? "date-cell--single-selected" : "",
    holiday ? "date-cell--holiday" : "",
  ]
    .filter(Boolean)
    .join(" ");

  function handleClick(e) {
    if (btnRef.current) createRipple(btnRef.current, e.clientX, e.clientY);
    onDateClick(date);
  }

  return (
    <button
      ref={btnRef}
      className={classes}
      onClick={handleClick}
      style={{ "--anim-i": animIndex }}
      title={holiday ? holiday.name : undefined}
      aria-label={`${date.getDate()}${today ? " (today)" : ""}${holiday ? `, ${holiday.name}` : ""}`}
    >
      <span className="date-number">{date.getDate()}</span>
      {today && <span className="today-dot" aria-hidden="true" />}
      {holiday && (
        <span className="holiday-emoji" aria-hidden="true">
          {holiday.emoji}
        </span>
      )}
    </button>
  );
}
