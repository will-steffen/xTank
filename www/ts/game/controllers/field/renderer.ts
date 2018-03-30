import { FieldController } from './controller';
import { GameState } from '../../model/game-state';
import { Tank } from '../../model/tank';

export class RendererController {
    bulletsPool: PIXI.Sprite[] = [];
    tanksPool: Tank[] = [];
    tanksScreen: Tank[] = [];
    state: GameState;

    constructor(private field: FieldController) {} 

    setState(state: GameState) {
        this.state = state;
    }

    update(delta: number) {
        if(!this.state) return;
        this.updateTanks();
        
    }

    updateTanks() {
        this.resetTanks();
        this.state.players.forEach(player => {
            if(player.id != this.field.connection.serverId){
                let tank = this.getTank();
                tank.container.x = player.x;
                tank.container.y = player.y;
                tank.base.rotation = player.rotation;
                tank.gun.rotation = player.gunRotation;
            }
        });
        this.cleanTanks();
    }

    getBullet(): PIXI.Sprite {
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

    resetTanks() {
        this.tanksPool = this.tanksScreen;
        this.tanksScreen = [];
    }

    cleanTanks() {
        this.tanksPool.forEach(t => {
            t.container.x = -100;
            t.container.y = -100;
        });
    }

    getTank(): Tank {
        let tank: Tank;
        if(this.tanksPool.length > 0){
            tank = this.tanksPool[0];
            this.tanksPool.splice(0, 1);
        }else{
            tank = new Tank(this.field.game);
        }
        this.tanksScreen.push(tank);
        return tank;
    }

}