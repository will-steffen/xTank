import { FieldController } from './controller';
import { WsReceive } from '../../model/ws-receive';
import { WsSend } from '../../model/ws-send';
import { Bullet } from '../../model/bullet';
import { BroadcastType } from '../../model/enums';

export class ConnectionController {
    ws: WebSocket;
    serverId: number;

    constructor(private field: FieldController) {} 

    create() {
        this.ws = new WebSocket('ws://localhost:8081/socket');
        this.ws.onopen = ev => { this.onOpen(ev) };
        this.ws.onclose= ev => { this.onClose(ev) };
        this.ws.onmessage = ev => { this.onMessage(ev) };
        this.ws.onerror = ev => { this.onError(ev) };
    }

    onOpen(evt) {}

    onClose(evt) {
        console.log('OffLine =[');
    }

    onMessage(evt) {
        let received = new WsReceive().fromServer(evt.data);
        if(received.broadcastType == BroadcastType.Open){
            this.serverId = received.id;
        }else{
            console.log(received.bullet);
            this.field.renderShot(received.bullet.x, received.bullet.y);
        }
    }

    onError(evt) {

    }

    send(txt: string) {
        this.ws.send(JSON.stringify({message: txt}));
    }

    sendBullet(x: number, y: number) {
        let send = new WsSend();
        send.bullet = new Bullet(x, y);
        this.ws.send(send.json());
    }
}