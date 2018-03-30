import { Game } from '../../game';
import { RendererController } from './renderer';
import { ConnectionController } from './connection';

export class FieldController {    
    renderer: RendererController;
    connection: ConnectionController;

    constructor(public game: Game) {
        this.renderer = new RendererController(this);
        this.connection = new ConnectionController(this);
    }

    create() {
        this.connection.create();
    }

    update(delta: number) {

    }

    shot(x, y, angleTarget){
        this.connection.sendBullet(x, y);
    }
    

}
