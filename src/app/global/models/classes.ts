import { Purpose } from './data';
import { Link } from './interfaces';

interface Roles {
    admin?: boolean;
    teacher?: boolean;
    subscriber?: boolean;
}

interface Profile {
    email: string;
    photoUrl: string;
    displayName: string;
}

export class EmailList {
    constructor(
    public key: string,
    public email: string,
    public lastModified: string
    ) {}
    static fromJson(key, {email, lastModified}): EmailList {
        return new EmailList (key, email, lastModified);
    }
}

export class Cohort {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public lastModified: string,
    ) {}
    static fromJson(key, {title, description, lastModified }): Cohort {
        return new Cohort( key, title, description, lastModified);
    }
}

export class UserProfile {
    constructor(
        public key: string,
        public profile: Profile,
        public role: Roles
    ) {}
    static fromJson(key, {profile, role }): UserProfile {
        return new UserProfile(key, profile, role);
    }
}

export class StudentContext {
    constructor(
        public lastModified: string,
        public context: string,
        public furtherInformationUrl: string
    ) {}
    static fromJson({lastModified, context, furtherInformationUrl}): StudentContext {
        return new StudentContext(lastModified, context, furtherInformationUrl);
    }
}

export class LearningEvent {
    constructor(
        public key: string,
        public creator: string,
        public created: string,
        public cell: string,
        public block: string,
        public context: string
    ) {}
    static fromJson(key, {creator, created, cell, block, context}): LearningEvent {
        return new LearningEvent(key, creator, created, cell, block, context);
    }
}

export class LearningGroup {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public lastModified: string,
        public creator: string,
        public isLocked: boolean,
        public learningYear: string,
        public learningArea: string,
        public learningLevel: string
    ) {}

    static fromJson(key, {title,
        description, lastModified, creator, isLocked, learningYear, learningArea, learningLevel}): LearningGroup {
        return new LearningGroup(key, title, description, lastModified, creator, isLocked, learningYear, learningArea, learningLevel);
    }
    static fromJsonList(array): LearningGroup[] {
        return array.map(LearningGroup.fromJson);
    }

    static fromJsonToObject(array): object {
        const final = {};
        array.map(each => {
            const key = each.key;
            const value = new LearningGroup(each.key,
                each.title,
                each.description,
                each.lastModified,
                each.creator,
                each.isLocked,
                each.learningYear,
                each.learningArea,
                each.learningLevel);
            final[key] = value;
            });
        return final;
    }
}

export class LearningBlock {
    constructor(
        public key: string,
        public title: string,
        public description: string,
        public lastModified: object,
        public creator: string,
        public isLocked: boolean,
        public isMulti: boolean,
        public parent: string
    ) {}

    static fromJson(key, {title,
        description, lastModified, creator, isLocked, isMulti, parent }): LearningBlock {
        return new LearningBlock(key, title, description, lastModified, creator, isLocked, isMulti, parent);
    }
    static fromJsonList(array): LearningBlock[] {
        return array.map(LearningBlock.fromJson);
    }

    static fromJsonToObject(array): object {
        const final = {};
        array.map(each => {
            const key = each.key;
            const value = new LearningBlock(each.key,
                each.title,
                each.description,
                each.lastModified,
                each.creator,
                each.isLocked,
                each.isMulti,
                each.parent);
            final[key] = value;
            });
        return final;
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
        return new Header(key, title, description, lastModified, purpose);
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

    static fromJsonToObject(array): object {
        const final = {};
        array.map(each => {
            const key = each.key;
            const value = new Cell(
                each.key,
                each.title,
                each.description,
                each.lastModified,
                each.purpose,
                each.xheaders,
                each.yheaders,
                each.qualifier,
                each.parent);
            final[key] = value;
            });
        return final;
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
        return new Student(key, firstName, lastName, gender, id, yrLvl, ethnic1, ethnic2, ethnic3);
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






