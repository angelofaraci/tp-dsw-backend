import crypto from 'node:crypto';

export class Game {
    constructor(
        public id = crypto.randomUUID(),
        public name_game: string,
        public description: string,
        public cover: string,
        public release_date: Date,
        public website: string,
        public socials : string[],
        public rating : number,
    ){
    }

};

export class Company {
    constructor(
        public id = crypto.randomUUID(),
        public name: string,
        public website: string,
        public email: string,
        public socials: string[]
    ){}
};

export class Admin {
    constructor(
        public id = crypto.randomUUID(),
        public name: string,
        public mail: string
    ){}
};

export class Leveling {
    constructor(
        public previous_level:number,
        public actual_level:number,
        public date: Date,
        public observation:string
    ){}
};

export class Interaction {
    constructor(
        public state:number
    ){}
};

export class Category {
    constructor(
        public genre: string[],
        public pegi: string,
        public number_players: string,
        public online: boolean,
        public languages: string[],
        public platforms: string[]
    ){}
}