import { Game } from '../../game';
import { InputController } from './input';

export class PlayerController {
    container = new PIXI.Container();
    gun: PIXI.Sprite;
    tank: PIXI.Sprite;  
    private input: InputController;

    constructor(public game: Game) {
        this.input = new InputController(this);
    }

    create() {
        this.gun = new PIXI.Sprite(PIXI.loader.resources[this.game.assets.gun.path].texture);
        this.tank = new PIXI.Sprite(PIXI.loader.resources[this.game.assets.tank.path].texture);

        this.container.addChild(this.tank);
        this.container.addChild(this.gun);
        this.container.width = this.game.config.tankSize;
        this.container.height = this.container.width;
        this.container.pivot.y = 0.5;
        this.container.pivot.x = 0.5;
        this.tank.anchor.y = 0.5;
        this.tank.anchor.x = 0.5;

        this.gun.anchor.x = 0.5;
        this.gun.anchor.y = 0.5;        

        this.container.x = this.game.width / 2;
        this.container.y = this.game.height / 2;      

        this.game.app.stage.addChild(this.container);
        this.input.create();
    }
    

    update(delta: number) {
        this.input.update(delta);
    }

    
}