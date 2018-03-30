import { BroadcastType } from './enums';
import { Bullet } from './bullet';

export class WsReceive {
    broadcastType: BroadcastType;
    id: number;
    message: string;
    bullet: Bullet;

    fromServer(data) {
        let s = JSON.parse(data);
        this.broadcastType = s.type;
        this.id = s.id;
        this.message = s.message;
        this.bullet = s.bullet;
        return this;
    }
}