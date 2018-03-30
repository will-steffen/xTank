import { Bullet } from './bullet';

export class WsSend {
    bullet: Bullet;

    json() {
        return JSON.stringify(this);
    }
}