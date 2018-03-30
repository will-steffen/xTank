import { BroadcastType } from './enums';
import { GameState } from './game-state';

export class WsReceive {
    type: BroadcastType;
    id: number;
    gameState: GameState;

    fromServer(data): WsReceive {
        let s = JSON.parse(data);
        this.type = s.type;
        this.id = s.id;
        this.gameState = s.gameState;   
        return this;
    }
}