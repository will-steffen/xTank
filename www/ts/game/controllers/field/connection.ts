import { FieldController } from './controller';
import { WsReceive } from '../../model/ws-receive';
import { WsSend } from '../../model/ws-send';
import { Bullet } from '../../model/bullet';
import { BroadcastType } from '../../model/enums';
import { PlayerState } from '../../model/player-state';

export class ConnectionController {
    ws: WebSocket;
    serverId: number;

    constructor(private field: FieldController) {} 

    create() {
        this.ws = new WebSocket('ws://' + window.location.host + ':' + this.field.game.config.wsPort + '/socket');
        this.ws.onopen = ev => { this.onOpen(ev) };
        this.ws.onclose= ev => { this.onClose(ev) };
        this.ws.onmessage = ev => { this.onMessage(ev) };
        this.ws.onerror = ev => { this.onError(ev) };         
    }
    close() {
        this.ws.close();
    }

    onOpen(evt) {
        this.field.game.message('Server Online');
    }

    onClose(evt) {
        this.field.game.message('Server Offline -> Trying to Reconnect');
        this.field.renderer.setState(null);
         setTimeout(() => {
             this.create(); 
        }, 1000);
    }

    onMessage(evt) {
        let received = new WsReceive().fromServer(evt.data);
        if(received.type == BroadcastType.Open){
            this.serverId = received.id;
        }else if(received.type == BroadcastType.Update){
            this.field.renderer.setState(received.gameState);
        }else if(received.type == BroadcastType.Hit){
            this.field.hit(received.hit);
        }
    }

    onError(evt) {

    }

    sendBullet(x: number, y: number, angle: number) {
        if(this.isConnected()){
            let send = new WsSend(BroadcastType.Bullet, this.serverId);
            send.bullet = new Bullet().send(x, y, angle, this.serverId);    
            this.ws.send(send.json());
        }
    }

    sendPlayerState(x: number, y: number, rotation: number, gunRotation: number, dead: boolean) {
        if(this.isConnected()){
            let send = new WsSend(BroadcastType.Update, this.serverId);
            send.player = new PlayerState().send(this.serverId, x, y, rotation, gunRotation, dead);
            this.ws.send(send.json());
        }
    }

    isConnected() {
        return this.ws.readyState == WebSocket.OPEN;
    }
}