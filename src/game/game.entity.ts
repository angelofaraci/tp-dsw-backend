export class Game {
    constructor(
        public id : string,
        public name: string,
        public description: string,
        public cover: string,
        public release_date: Date,
        public website: string,
        public socials : string[],
        public rating : number,
    ){}
}