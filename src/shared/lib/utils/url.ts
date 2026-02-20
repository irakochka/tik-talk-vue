const BASE_URL = '/yt-course';

function isExternalOrSpecial(url: string) {
    return (
        url.startsWith('data:') ||
        url.startsWith('blob:') ||
        url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('//')
    );
}

export function toAssetUrl(path: string | null | undefined): string | null {
    if (!path) return null;

    const p = path.trim();
    if (!p) return null;

    // Превью после загрузки (data/blob) и внешние ссылки — возвращаем как есть
    if (isExternalOrSpecial(p)) return p;

    // Если base уже добавлен — не добавляем второй раз
    if (p === BASE_URL || p.startsWith(BASE_URL + '/')) return p;

    // Склеиваем base + путь без лишних слэшей
    const base = BASE_URL.replace(/\/+$/, '');   // "/yt-course"
    const clean = p.replace(/^\/+/, '');         // "assets/a.png" или "images/a.png"

    return `${base}/${clean}`;
}