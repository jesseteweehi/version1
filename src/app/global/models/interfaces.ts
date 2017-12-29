export interface Link {
    url: string;
    view: string;
}

export interface SelectData {
    value: string;
    viewValue: string;
}

export function createSelectData(newValue, newViewValue): SelectData {
    return {value: newValue, viewValue: newViewValue};
}
