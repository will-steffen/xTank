import { FieldController } from './controller';

export class RendererController {
    bullets: PIXI.Sprite[] = [];
    bulletsPool: PIXI.Sprite[] = [];

    constructor(private field: FieldController) {} 

    create() {
        
    }

    shot(x, y) {
        let b = this.getBullet();
        b.x = x;
        b.y = y;
        // b['target'] = angleTarget;
        this.field.game.app.stage.addChild(b);
    }

    getBullet() {
        let bullet: PIXI.Sprite;
        if(this.bulletsPool.length > 0){
            bullet = this.bulletsPool[0];
            this.bulletsPool.splice(0, 1);
        }else{
            bullet = new PIXI.Sprite(PIXI.loader.resources[this.field.game.assets.bullet.path].texture);
            bullet.width = this.field.game.config.bulletSize;
            bullet.height = this.field.game.config.bulletSize;
            bullet.anchor.x = 0.5;
            bullet.anchor.y = 0.5;
        }
        return bullet;
    }

}