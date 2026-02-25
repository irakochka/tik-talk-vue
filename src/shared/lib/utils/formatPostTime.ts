export function formatPostTime(iso: string, options?: { now?: Date; relativeDaysLimit?: number }): string {
    const now = options?.now ?? new Date();
    const relativeDaysLimit = options?.relativeDaysLimit ?? 7;

    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;

    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return formatDate(date);

    const sec = Math.floor(diffMs / 1000);
    const min = Math.floor(sec / 60);
    const hour = Math.floor(min / 60);
    const day = Math.floor(hour / 24);

    if (day >= relativeDaysLimit) return formatDate(date);

    if (sec < 60) return "только что";
    if (min < 60) return withDeclension(min, ["минуту", "минуты", "минут"]) + " назад";
    if (hour < 24) return withDeclension(hour, ["час", "часа", "часов"]) + " назад";
    return withDeclension(day, ["день", "дня", "дней"]) + " назад";
}

function formatDate(d: Date): string {
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

function withDeclension(n: number, forms: [string, string, string]): string {
    const mod10 = n % 10;
    const mod100 = n % 100;

    if (mod10 === 1 && mod100 !== 11) return `${n} ${forms[0]}`;
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} ${forms[1]}`;
    return `${n} ${forms[2]}`;
}
