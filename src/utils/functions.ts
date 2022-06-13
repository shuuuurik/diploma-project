/**
 * Метод, обрезающий входную строку, если ее длина превышает заданное значение
 * @param {string} text - Входная строка
 * @param {number} size - Максимальная длина
 * @returns {string} Отформатированная строка
 */
export function resize (text: string, size: number): string {
    return text.length <= size 
        ? text 
        : text.substr(0, size) + "...";
}