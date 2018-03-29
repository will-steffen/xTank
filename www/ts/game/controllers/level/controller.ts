import { Game } from '../../game';

export class LevelController {
    bullets: PIXI.Sprite[] = [];

    constructor(private game: Game) {
    }

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

}
