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

export class User {
    constructor(
        public id = crypto.randomUUID(),
        public name_user: string,
        public score: number,
        public email: string,
        public phone: string[],
        public level: number
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

export class Review {
    constructor(
        public id = crypto.randomUUID(),
        public rating: number,
        public body: string,
        public spoiler_check: boolean,
        public redaction_date: Date,
        public edition_date: Date,
        public state: string

    ){}
}

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
