export function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

export function getFirstDayOfMonth(year, month) {
    return new Date(year, month, 1).getDay(); // 0=Sun
}

export function isSameDay(a, b) {
    if (!a || !b) return false;
    return a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();
}

export function isInRange(date, start, end) {
    if (!start || !end || !date) return false;
    const d = date.getTime();
    const s = start.getTime();
    const e = end.getTime();
    return d > Math.min(s, e) && d < Math.max(s, e);
}

export function isRangeStart(date, start, end) {
    if (!start || !end) return false;
    if (start.getTime() <= end.getTime()) return isSameDay(date, start);
    return isSameDay(date, end);
}

export function isRangeEnd(date, start, end) {
    if (!start || !end) return false;
    if (start.getTime() <= end.getTime()) return isSameDay(date, end);
    return isSameDay(date, start);
}

export function formatDateKey(date) {
    if (!date) return "";
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function formatRangeLabel(start, end) {
    if (!start) return "";
    const opts = { month: "short", day: "numeric" };
    if (!end || isSameDay(start, end)) return start.toLocaleDateString("en-US", opts);
    const s = start.getTime() <= end.getTime() ? start : end;
    const e = start.getTime() <= end.getTime() ? end : start;
    return `${s.toLocaleDateString("en-US", opts)} – ${e.toLocaleDateString("en-US", opts)}`;
}

export function isToday(date) {
    return isSameDay(date, new Date());
}

export function isWeekend(date) {
    const d = date.getDay();
    return d === 0 || d === 6;
}
