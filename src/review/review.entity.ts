import crypto from 'node:crypto'

export class Review {
    constructor(
        
        public rating: number,
        public body: string,
        public spoiler_check: boolean,
        public redaction_date: Date,
        public edition_date: Date | null,
        public state: string,
        public id :string
    ){}
}