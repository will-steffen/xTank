import { Game } from '../../game';
import { InputController } from './input';

export class PlayerController {
    container = new PIXI.Container();
    gun: PIXI.Sprite;
    tank: PIXI.Sprite;
    speed = 3;

    private input: InputController;

    constructor(public game: Game) {
        this.input = new InputController(this);
    }

    create() {
        this.gun = new PIXI.Sprite(PIXI.loader.resources[this.game.assets.gun.path].texture);
        this.tank = new PIXI.Sprite(PIXI.loader.resources[this.game.assets.tank.path].texture);

        this.container.addChild(this.tank);
        this.container.addChild(this.gun);
        this.container.width = this.game.assets.tankSize * this.game.width;
        this.container.height = this.container.width;
        this.container.pivot.y = 0.5;
        this.container.pivot.x = 0.5;
        this.tank.anchor.y = 0.5;
        this.tank.anchor.x = 0.5;

        this.gun.anchor.x = 0.5;
        this.gun.anchor.y = 0.5;

        this.container.x = 400;
        this.container.y = 400;

        this.game.app.stage.addChild(this.container);
        this.input.create();
    }
    

    update(delta: number) {
        this.input.update(delta);
    }

    
}