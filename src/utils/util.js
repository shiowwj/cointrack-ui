

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function FormatSymbolName(inputName) {
    let name, symbol;
    let inputArr = inputName.split(":");
    if (inputArr.length > 0) {
        name = capitalizeFirstLetter(inputArr[0]);
        symbol = inputArr[1];
        return {
            n: name,
            s: symbol,
        };
    }

    return {
        n: "",
        s: "",
    };
}

export function ValidateSymbolName(inputName) {
    let inputArr = inputName.split(":");
    if (inputArr[0] == "" && inputArr[1] == "") {
        return false
    }

    return true
}

export function FormatDateToISO(dateTime) {
    return new Date(dateTime).toISOString();
}