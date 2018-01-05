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

export interface LearningMatrixProfile {
    title: string;
    description: string;
}


export interface Header {
    title: string;
    description: string;
    purpose: string;
    orientation: string;
    locked?: boolean;
}

export interface Cell {
    title: string;
    description: string;
    parent: string;
    locked: boolean;
    xheadertitle: string;
    yheadertitle: string;
    qualifiertitle: string;
}

// public $key: string,
// 		public created: string,
// 		public title: string,
// 		public description: string,
// 		public parent: string,
// 		public locked: boolean,
// 		public xheader: string,
// 		public yheader: string,
// 		public qualifier: string
