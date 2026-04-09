import { useState, useEffect, useCallback } from "react";
import { formatDateKey } from "../utils/dates";

function buildKey(year, month, start, end) {
    const m = String(month + 1).padStart(2, "0");
    const s = start ? formatDateKey(start) : "none";
    const e = end ? formatDateKey(end) : "none";
    return `cal-note:${year}-${m}:${s}:${e}`;
}

function buildMonthPrefix(year, month) {
    const m = String(month + 1).padStart(2, "0");
    return `cal-note:${year}-${m}:`;
}

export function useNotes(year, month, rangeStart, rangeEnd) {
    const [notes, setNotes] = useState({}); // key -> text
    const [draft, setDraft] = useState("");

    // Load all notes for the visible month
    useEffect(() => {
        const prefix = buildMonthPrefix(year, month);
        const loaded = {};
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith(prefix)) {
                loaded[k] = localStorage.getItem(k) || "";
            }
        }
        setNotes(loaded);
    }, [year, month]);

    // Sync draft when range changes
    useEffect(() => {
        const key = buildKey(year, month, rangeStart, rangeEnd);
        setDraft(notes[key] || "");
    }, [rangeStart, rangeEnd, notes, year, month]);

    const saveNote = useCallback((text) => {
        const key = buildKey(year, month, rangeStart, rangeEnd);
        if (text.trim()) {
            localStorage.setItem(key, text);
            setNotes(prev => ({ ...prev, [key]: text }));
        } else {
            localStorage.removeItem(key);
            setNotes(prev => {
                const n = { ...prev };
                delete n[key];
                return n;
            });
        }
    }, [year, month, rangeStart, rangeEnd]);

    const deleteNote = useCallback((key) => {
        localStorage.removeItem(key);
        setNotes(prev => {
            const n = { ...prev };
            delete n[key];
            return n;
        });
    }, []);

    const allMonthNotes = Object.entries(notes).map(([key, text]) => {
        const parts = key.split(":");
        // key format: cal-note:YYYY-MM:start:end
        const dateRange = parts.slice(2).join(":");
        return { key, text, dateRange };
    }).filter(n => n.text.trim());

    return { draft, setDraft, saveNote, deleteNote, allMonthNotes };
}
