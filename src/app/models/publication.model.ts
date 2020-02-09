import { User } from './user.model';

export class Publication {
    constructor(
        public text: string,
        public file: string,
        public createdAt: string,
        public user: string // User
    ) { }
}

