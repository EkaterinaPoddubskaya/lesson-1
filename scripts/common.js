/**
 * Gets rid of <> and extra spaces in the string
 * @param {string} input - initial string
 * @returns {string} initial string clear of <> and extra spaces
 */
const formatText = input => input.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim()

/**
 * Finds first float value in the initial string(number),
 * rounds it to two decimal places
 * @param {string | number} input initial string(number)
 * @returns {number | null} first float value rounded to two decimal places, null if nothing was found
 */
const parseFloatValue = input => { 
    if (!input) return null;
    const value = parseFloat(input.toString().match(/[0-9]+.?[0-9]*/));
    return parseFloat(value.toFixed(2)); 
}

/**
 * Finds first integer value in the initial string(number)
 * @param {string | number} input initial string(number)
 * @returns {number | null} first integer value in the initial string(number), null if nothing was found
 */
const parseIntegerValue = input => { 
    if (!input) return null;
    return parseInt(input.toString().match(/[0-9]+/));
}

/**
 * Highlights every entrance of the substring in the initial string
 * @param {string} text - Initial string 
 * @param {string} inputValue - The substring
 * @returns {string} Initial string with every entrance of the substring highlighted
 */
const highlightText = (text, inputValue) => {
    if (typeof text !== 'string' || typeof inputValue !== 'string') {
        throw new Error("Parameter is not a string");
    } 
    if (!inputValue) return text;
    const regEx = new RegExp(`(${inputValue})`, 'gi');
    return text.replace(regEx, '<mark class="search_substring">$1</mark>');
}

/**
 * Returns random number
 * @param {number} startNum - start position (min value)
 * @param {number} quantity - quantity of sequential numbers from the start position
 * @returns {number} random number from [startNum, startNum + quantity - 1]
 */
const getRandomNumber = (startNum, quantity) => {
    let errorMessage = "";
    if (typeof startNum !== 'number' || typeof quantity !== 'number') {
        errorMessage = "Parameter is not a number type";
    } else if (quantity <= 0) {
        errorMessage = "Quantity cannot equal to or be less than zero";
    }
    if (errorMessage) throw new Error(errorMessage);
    return Math.floor(Math.random() * quantity) + startNum;
} 