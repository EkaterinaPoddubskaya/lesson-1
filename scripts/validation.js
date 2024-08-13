validateFormElements = (value, minValue, maxValue, invalidMes1, invalidMes2, view) => {
    let invalidMessage = "";
    if (view == "rating") {
        if (webix.rules.isNumber(value)) {
            if (!(value > minValue) || !(value <= maxValue)) invalidMessage = invalidMes1;
        } else invalidMessage = invalidMes2;
    } else {
        if (parseInt(value) == value) {
            if (!(value >= minValue) || !(value <= maxValue)) invalidMessage = invalidMes1;
        } else invalidMessage = invalidMes2;
    }
    $$(view).define("invalidMessage", invalidMessage);
    if (invalidMessage) return false;
    else return true;
}