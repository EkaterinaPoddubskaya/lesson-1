/**
 * Highlights every entrance of the substring in the initial string
 * @param {string} text - Initial string 
 * @param {string} inputValue - The substring
 * @returns {string} Initial string with every entrance of the substring highlighted
 */
const highlightText = (text, inputValue) => {
    if (!inputValue) return text;
    const regEx = new RegExp(`(${inputValue})`, 'gi');
    return text.replace(regEx, '<mark class="search_substring">$1</mark>');
}