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
        public locked: boolean,
    ) {}

    static fromJson(key, {title,
        description, created, modified, creator, locked }): LearningBlock {
        return new LearningBlock(key, title, description, created, modified, creator, locked);
    }
    static fromJsonList(array): LearningBlock[] {
        return array.map(LearningBlock.fromJson);
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
    ){}
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
}

