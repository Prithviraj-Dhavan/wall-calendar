import { useState, useCallback } from "react";

export function useCalendar() {
    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState(today.getMonth());
    const [rangeStart, setRangeStart] = useState(null);
    const [rangeEnd, setRangeEnd] = useState(null);
    const [selecting, setSelecting] = useState(false); // true = waiting for end date
    const [flipDir, setFlipDir] = useState(null); // "next" | "prev"
    const [isFlipping, setIsFlipping] = useState(false);

    const goNext = useCallback(() => {
        if (isFlipping) return;
        setFlipDir("next");
        setIsFlipping(true);
        setTimeout(() => {
            setMonth(m => {
                if (m === 11) { setYear(y => y + 1); return 0; }
                return m + 1;
            });
            setIsFlipping(false);
            setFlipDir(null);
        }, 420);
    }, [isFlipping]);

    const goPrev = useCallback(() => {
        if (isFlipping) return;
        setFlipDir("prev");
        setIsFlipping(true);
        setTimeout(() => {
            setMonth(m => {
                if (m === 0) { setYear(y => y - 1); return 11; }
                return m - 1;
            });
            setIsFlipping(false);
            setFlipDir(null);
        }, 420);
    }, [isFlipping]);

    const handleDateClick = useCallback((date) => {
        if (!selecting || !rangeStart) {
            setRangeStart(date);
            setRangeEnd(null);
            setSelecting(true);
        } else {
            setRangeEnd(date);
            setSelecting(false);
        }
    }, [selecting, rangeStart]);

    const clearRange = useCallback(() => {
        setRangeStart(null);
        setRangeEnd(null);
        setSelecting(false);
    }, []);

    return {
        year, month, rangeStart, rangeEnd, selecting,
        flipDir, isFlipping,
        goNext, goPrev, handleDateClick, clearRange,
    };
}
