import { Link } from './interfaces';


export class LearningGroup {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public created: object,
        public lastModified: object,
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

export class LearningTimeframe {
    constructor(
        public key: string,
        public created: object,
        public lastModified: object,
        public creator: object,
        public year: string
    ){}
    static fromJson(key, {created,
        lastModified, creator, year,}): LearningTimeframe {
        return new LearningTimeframe(key, created, lastModified, creator, year);
        }
}

export class LearningArea {
    constructor(
        public key: string,
        public created: object,
        public lastModified: object,
        public creator: object,
        public title: string,
        public description: string
    ){}
    static fromJson(key, {created,
        lastModified, creator, title, description}): LearningArea {
        return new LearningArea(key, created, lastModified, creator, title, description)
        }
}

export class LearningLevel {
    constructor(
        public key: string,
        public created: object,
        public lastModified: object,
        public creator: object,
        public title: string,
        public description: string
    ){}
    static fromJson(key, {created,
        lastModified, creator, title, description}): LearningLevel {
        return new LearningLevel(key, created, lastModified, creator, title, description)
        }
}

