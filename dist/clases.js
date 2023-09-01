import crypto from 'node:crypto';
export class Game {
    constructor(id = crypto.randomUUID(), name_game, description, cover, release_date, website, socials, rating) {
        this.id = id;
        this.name_game = name_game;
        this.description = description;
        this.cover = cover;
        this.release_date = release_date;
        this.website = website;
        this.socials = socials;
        this.rating = rating;
    }
}
;
export class Company {
    constructor(id = crypto.randomUUID(), name, website, email, socials) {
        this.id = id;
        this.name = name;
        this.website = website;
        this.email = email;
        this.socials = socials;
    }
}
;
export class User {
    constructor(id = crypto.randomUUID(), name_user, score, email, phone, level) {
        this.id = id;
        this.name_user = name_user;
        this.score = score;
        this.email = email;
        this.phone = phone;
        this.level = level;
    }
}
;
export class Admin {
    constructor(id = crypto.randomUUID(), name, mail) {
        this.id = id;
        this.name = name;
        this.mail = mail;
    }
}
;
export class Leveling {
    constructor(previous_level, actual_level, date, observation) {
        this.previous_level = previous_level;
        this.actual_level = actual_level;
        this.date = date;
        this.observation = observation;
    }
}
;
export class Interaction {
    constructor(state) {
        this.state = state;
    }
}
;
export class Review {
    constructor(id = crypto.randomUUID(), rating, body, spoiler_check, redaction_date, edition_date, state) {
        this.id = id;
        this.rating = rating;
        this.body = body;
        this.spoiler_check = spoiler_check;
        this.redaction_date = redaction_date;
        this.edition_date = edition_date;
        this.state = state;
    }
}
export class Category {
    constructor(genre, pegi, number_players, online, languages, platforms) {
        this.genre = genre;
        this.pegi = pegi;
        this.number_players = number_players;
        this.online = online;
        this.languages = languages;
        this.platforms = platforms;
    }
}
//# sourceMappingURL=clases.js.map