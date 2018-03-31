import { Game } from '../../game';
import { RendererController } from './renderer';
import { ConnectionController } from './connection';
import { Hit } from '../../model/hit';

export class FieldController {    
    renderer: RendererController;
    connection: ConnectionController;
    killCount = 0;

    constructor(public game: Game) {
        this.renderer = new RendererController(this);
        this.connection = new ConnectionController(this);
    }

    create() {
        this.connection.create();
    }

    update(delta: number) {
        this.connection.sendPlayerState(
            this.game.player.tank.container.x,
            this.game.player.tank.container.y,
            this.game.player.tank.base.rotation,
            this.game.player.tank.gun.rotation,
            this.game.player.dead
        );
        this.renderer.update(delta);
    }

    hit(hit: Hit) {
        if(hit.targetId == this.connection.serverId){            
            this.game.message('YOU DIED');
            this.game.player.dead = true;  
            this.renderer.render = false;
            this.killCount = 0;
            setTimeout(() => {
                this.game.message('');
                this.game.player.dead = false;
                this.renderer.render = true;
            },3000);            
        }else if(hit.killerId == this.connection.serverId){
            this.killCount++;
            this.game.message('['+this.killCount+']');     
        }
    }
}
