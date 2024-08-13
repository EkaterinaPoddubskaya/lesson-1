parseEditTitle = input => input.replace(/[<>]/g, '').replace(/\s+/g, ' ').trim()

parseEditYear = input => { 
    if(!input) return null;
    return parseInt(input.toString().match(/[0-9]+/));
}

parseEditRating = input => { 
    if (!input) return null;
    const value = parseFloat(input.toString().match(/[0-9]+.?[0-9]*/));
    return parseFloat(value.toFixed(2)); 
}

parseEditVotes = input => { 
    if (!input) return null;
    return parseInt(input.toString().match(/[0-9]+/));
}