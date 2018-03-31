import { Game } from '../../game';
import { InputController } from './input';
import { Tank } from '../../model/tank';

export class PlayerController { 
    tank: Tank;  
    dead: boolean = false;
    private input: InputController;

    constructor(public game: Game) {
        this.input = new InputController(this);
    }

    create() {
        this.tank = new Tank(this.game);
        this.input.create();
    }
    

    update(delta: number) {
        this.input.update(delta);
    }
    
}