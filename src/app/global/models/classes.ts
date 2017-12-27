import { Link } from './interfaces';


export class LearningGroup {
    constructor(
        public key: string;
        public title: string,
        public description: string,
        public created: string,
        public modified: string,
        public creator: string,
        public locked: boolean,
        public learningYear: string,
        public learningArea: string,
        public learningLevel: string
    ) {}

    static fromJson(key, {title,
        description, created, modified, creator, locked, learningYear, learningArea, learningLevel}): LearningGroup {
        return new LearningGroup(key, title, description, created, modified, creator, locked, learningYear, learningArea, learningLevel);
    }
    static fromJsonList(array): LearningGroup[] {
        return array.map(LearningGroup.fromJson)
    }
}

export class LearningGroupView {
    constructor(
        public key: string,
        public viewInformation: LearningGroup,
        public haveLinks: boolean,
        public haveMenu: boolean,
        public links?: Array<Link>,
        public menuDetails?: object,
    )  {}
}
