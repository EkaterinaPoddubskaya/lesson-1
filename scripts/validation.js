validateFormElements = (value, type, minValue, maxValue, view) => {
    let invalidMessage = "";
    const invalidRangeMsg = `Enter ${view} between ${minValue} and ${maxValue}`;
    const viewNFirstLetterUppercase = view.charAt(0).toUpperCase() + view.slice(1);
    const invalidValueTypeMsg = `${viewNFirstLetterUppercase} must be a number`;

    if (webix.rules.isNumber(value)) {
        if (type == "float" && value == minValue) {
            invalidMessage = `${viewNFirstLetterUppercase} can not be equal to ${minValue}`;
        } else if (!(value >= minValue) || !(value <= maxValue)) {
            invalidMessage = invalidRangeMsg;
        } 
    } else invalidMessage = invalidValueTypeMsg;

    $$(view).define("invalidMessage", invalidMessage);
    return !invalidMessage;
}