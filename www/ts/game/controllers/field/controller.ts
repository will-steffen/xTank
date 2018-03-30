import { Game } from '../../game';
import { ConnectionController } from './connection';

export class FieldController {
    bullets: PIXI.Sprite[] = [];
    bulletsPool: PIXI.Sprite[] = [];
    connection: ConnectionController;

    constructor(private game: Game) {
        this.connection = new ConnectionController(this);
    }

    create() {
        this.connection.create();
    }

    update(delta: number) {

    }

    shot(x, y, angleTarget){
        this.renderShot(x, y);
        this.connection.sendBullet(x, y);
    }

    renderShot(x, y) {
        let b = new PIXI.Sprite(PIXI.loader.resources[this.game.assets.bullet.path].texture);
        b.x = x;
        b.y = y;
        // b['target'] = angleTarget;
        this.game.app.stage.addChild(b);
    }

    getBullet() {
        let bullet: PIXI.Sprite;
        if(this.bulletsPool.length > 0){
            bullet = this.bulletsPool[0];
            this.bulletsPool.splice(0, 1);
        }else{
            bullet = new PIXI.Sprite(PIXI.loader.resources[this.game.assets.bullet.path].texture);
        }
        return bullet;
    }

}
