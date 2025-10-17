export const getCurrentMonth = () => {
    return new Date().toLocaleString('default', { month: 'long' });
}

export const getCurrentMonthNumber = () => {
    return new Date().getMonth() + 1;
}

export const getCurrentMonthShortName = () => {
    return new Date().toLocaleString('default', { month: 'short' });
}

export const getNextMonth = () => {
    return new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('default', { month: 'long' });
}

export const getNextMonthNumber = () => {
    return new Date(new Date().setMonth(new Date().getMonth() + 1)).getMonth() + 1;
}

export const getNextMonthShortName = () => {
    return new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleString('default', { month: 'short' });
}

export const getCurrentYear = () => {
    return new Date().getFullYear();
}