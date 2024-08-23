/**
 * Validates form field
 * @param {number} value - field value
 * @param {string} type - type of field value, e.g. "float", "int"
 * @param {number} minValue - min value for field value
 * @param {number} maxValue - max value for field value
 * @param {string} viewId - id of the form field to be validated
 * @returns {string} invalid message if validation failed, empty string if validation is successful
 */
const validateFormElements = (value, type, minValue, maxValue, viewId) => {
    if (typeof type !== 'string' || typeof minValue !== 'number' || typeof maxValue !== 'number' || typeof viewId !== 'string') {
        throw new Error("Parameter is not the right type");
    }
    let invalidMessage = "";
    const invalidRangeMsg = `Enter ${viewId} between ${minValue} and ${maxValue}`;
    const viewNFirstLetterUppercase = viewId.charAt(0).toUpperCase() + viewId.slice(1);
    const invalidValueTypeMsg = `${viewNFirstLetterUppercase} must be a number`;

    if (webix.rules.isNumber(value)) {
        if (type === "float" && value === minValue) {
            invalidMessage = `${viewNFirstLetterUppercase} can not be equal to ${minValue}`;
        } else if (!(value >= minValue) || !(value <= maxValue)) {
            invalidMessage = invalidRangeMsg;
        } 
    } else invalidMessage = invalidValueTypeMsg;

    $$(viewId).define("invalidMessage", invalidMessage);
    return !invalidMessage;
}