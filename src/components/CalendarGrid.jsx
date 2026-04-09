import React from "react";
import DateCell from "./DateCell";
import { getDaysInMonth, getFirstDayOfMonth } from "../utils/dates";
import { DAY_NAMES } from "../utils/themes";

export default function CalendarGrid({
  year,
  month,
  rangeStart,
  rangeEnd,
  onDateClick,
}) {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month); // 0=Sun

  // Build grid cells: leading blanks + days + trailing blanks (to fill last row)
  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d));
  }
  // Pad to a multiple of 7
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="cal-grid-section">
      {/* Day name headers */}
      <div className="day-headers">
        {DAY_NAMES.map((d, i) => (
          <div
            key={d}
            className={`day-header ${i === 0 || i === 6 ? "day-header--weekend" : ""}`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="date-grid">
        {cells.map((date, i) => (
          <DateCell
            key={date ? date.getTime() : `blank-${i}`}
            date={date}
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onDateClick={onDateClick}
            animIndex={date ? date.getDate() : 0}
          />
        ))}
      </div>
    </div>
  );
}
