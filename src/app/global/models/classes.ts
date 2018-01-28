import { Link } from './interfaces';

export class LearningGroup {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public lastModified: string,
        public creator: string,
        public locked: boolean,
        public learningYear: string,
        public learningArea: string,
        public learningLevel: string
    ) {}

    static fromJson(key, {title,
        description, modified, creator, locked, learningYear, learningArea, learningLevel}): LearningGroup {
        return new LearningGroup(key, title, description, modified, creator, locked, learningYear, learningArea, learningLevel);
    }
    static fromJsonList(array): LearningGroup[] {
        return array.map(LearningGroup.fromJson);
    }
}

export class LearningBlock {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public created: object,
        public lastModified: object,
        public creator: string,
        public isLocked: boolean,
        public isMulti: boolean,
        public parent: string
    ) {}

    static fromJson(key, {title,
        description, created, modified, creator, isLocked, isMulti, parent }): LearningBlock {
        return new LearningBlock(key, title, description, created, modified, creator, isLocked, isMulti, parent);
    }
    static fromJsonList(array): LearningBlock[] {
        return array.map(LearningBlock.fromJson);
    }
}

export class Header {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public lastModified: string,
        public purpose: string,
    ) {}
    static fromJson(key, {title, description, lastModified, purpose}): Header {
        return new Header(key, title, description, lastModified, purpose)
    }
}

export class Cell {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public lastModified: string,
        public purpose: string,
        public xheaders: string,
        public yheaders: string,
        public qualifier: string,
        public parent: string
    ) {}
    static fromJson(key, {title, description, lastModified, purpose, xheaders, yheaders, qualifier, parent}): Cell {
        return new Cell(key, title, description, lastModified, purpose, xheaders, yheaders, qualifier, parent);
    }
}

export class LearningArea {
    constructor(
        public key: string,
        public created: object,
        public lastModified: object,
        public creator: object,
        public title: string,
        public description: string,
    ) {}
    static fromJson(key, {created,
        lastModified, creator, title, description}): LearningArea {
        return new LearningArea(key, created, lastModified, creator, title, description);
        }

    static fromJsonToObject(array): object {
            const final = {};
            array.map(each => {
                const key = each.key;
                const value = new LearningArea(
                    each.key,
                    each.created,
                    each.lastModified,
                    each.creator,
                    each.title,
                    each.description
                    );
                final[key] = value;
                });
            return final;
            }
        }

export class LearningMatrix {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public lastModified: string,
    ) {}
    static fromJson(key, { title, description, lastModified}): LearningMatrix {
        return new LearningMatrix(key, title, description, lastModified);
        }
}

export class LearningMatrixVersion {
    constructor(
        public key: string,
        public title: string,
        public lastModified: string,
    ) {}
    static fromJson(key, { title, lastModified}): LearningMatrixVersion {
        return new LearningMatrixVersion(key, title, lastModified);
        }
}

export class Student {
    constructor(
        public key: string,
        public firstName: string,
        public lastName: string,
        public gender: string,
        public id: string,
        public yrLvl: string,
        public ethnic1: string,
        public ethnic2: string,
        public ethnic3: string,
    ) {}
    static fromJson(key, { firstName, lastName, gender, id, yrLvl, ethnic1, ethnic2, ethnic3 }): Student {
        return new Student(key, firstName, lastName, gender, id, yrLvl, ethnic1, ethnic2, ethnic3)
    }
}

export class SchoolCourse {
    constructor(
        public key: string,
        public id: string,
        public title: string,
        public description: string,
        public learningYear: string,
        public learningArea: string,
    ) {}
    static fromJson(key, { id, title, description, learningYear, learningArea }): SchoolCourse {
        return new SchoolCourse(key, id, title, description, learningYear, learningArea);
    }
}

export class TertiaryCourse {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public link: Link
    ) {}
    static fromJson(key, { title, description, link }): TertiaryCourse {
        return new TertiaryCourse(key, title, description, link );
    }
}

export class Job {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public link: Link[]
    ) {}
    static fromJson(key, { title, description, link }): Job {
        return new Job(key, title, description, link );
    }
}






