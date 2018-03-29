import { Game } from '../../game';

export class FieldController {
    bullets: PIXI.Sprite[] = [];
    bulletsPool: PIXI.Sprite[] = [];

    constructor(private game: Game) {}

    create() {

    }

    update(delta: number) {

    }

    shot(xInit, yInit, angleTarget){
        let b = new PIXI.Sprite(PIXI.loader.resources[this.game.assets.bullet.path].texture);
        b.x = xInit;
        b.y = yInit;
        b['target'] = angleTarget;
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
