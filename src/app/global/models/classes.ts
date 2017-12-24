export class LearningGroup {
    constructor(
        public title: string,
        public description: string,
        public created: string,
        public modified: string,
        public creator: string,
        public timeFrameKey: string,
        public learningAreaKey: string,
        public learningLevelKey: string
    ) {}

    static fromJson({title, description, created, modified, creator, timeFrameKey, learningAreaKey, learningLevelKey}): LearningGroup {
        return new LearningGroup(title, description, created, modified, creator, timeFrameKey, learningAreaKey, learningLevelKey);
    }
    static fromJsonList(array): LearningGroup[] {
        return array.map(LearningGroup.fromJson)
    }
}
