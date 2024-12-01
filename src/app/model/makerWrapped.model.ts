import { Maker } from './maker.model';

export class MakerWrapped {
    _embedded!: { makers: Maker[] };
}
