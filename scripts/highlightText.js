const highlightText = (text, inputValue) => {
    const regEx = new RegExp(`(${inputValue})`, 'gi');
    return text.replace(regEx, '<mark class="blue">$1</mark>');
}