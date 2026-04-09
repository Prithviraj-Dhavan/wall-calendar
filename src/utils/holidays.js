// US Public Holidays (month is 0-indexed)
const HOLIDAYS = {
    "1-1": { name: "New Year's Day", emoji: "🎆" },
    "1-15": { name: "MLK Jr. Day", emoji: "✊" },
    "2-14": { name: "Valentine's Day", emoji: "❤️" },
    "2-20": { name: "Presidents' Day", emoji: "🇺🇸" },
    "3-17": { name: "St. Patrick's Day", emoji: "☘️" },
    "4-1": { name: "April Fools'", emoji: "🤡" },
    "5-12": { name: "Mother's Day", emoji: "💐" },
    "5-27": { name: "Memorial Day", emoji: "🕯️" },
    "6-19": { name: "Juneteenth", emoji: "✊" },
    "7-4": { name: "Independence Day", emoji: "🎇" },
    "9-2": { name: "Labor Day", emoji: "⚒️" },
    "10-14": { name: "Columbus Day", emoji: "⛵" },
    "10-31": { name: "Halloween", emoji: "🎃" },
    "11-11": { name: "Veterans Day", emoji: "🎖️" },
    "11-28": { name: "Thanksgiving", emoji: "🦃" },
    "12-24": { name: "Christmas Eve", emoji: "🎄" },
    "12-25": { name: "Christmas Day", emoji: "🎅" },
    "12-31": { name: "New Year's Eve", emoji: "🥂" },
};

export function getHoliday(month1indexed, day) {
    const key = `${month1indexed}-${day}`;
    return HOLIDAYS[key] || null;
}
