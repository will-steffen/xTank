import { FieldController } from './controller';
import { GameState } from '../../model/game-state';
import { Tank } from '../../model/tank';

export class RendererController {
    bulletsPool: PIXI.Sprite[] = [];
    bulletsScreen: PIXI.Sprite[] = [];
    tanksPool: Tank[] = [];
    tanksScreen: Tank[] = [];
    state: GameState;
    render: boolean = true;

    constructor(private field: FieldController) {} 

    setState(state: GameState) {
        this.state = state;
    }

    update(delta: number) {
        this.resetTanks();
        this.resetBullets();
        if(this.state && this.render){
            this.updateTanks();
            this.updateBullets();
        }
        this.cleanTanks();
        this.cleanBullets();
    }

    updateTanks() {
        this.state.players.forEach(player => {
            if(player.id != this.field.connection.serverId && !player.dead){
                let tank = this.getTank();
                tank.container.x = player.x;
                tank.container.y = player.y;
                tank.base.rotation = player.rotation;
                tank.gun.rotation = player.gunRotation;
            }
        });        
    }

    updateBullets() {        
        this.state.bullets.forEach(bullet => {
            let b = this.getBullet();
            b.x = bullet.x;
            b.y = bullet.y;         
        });        
    }

    resetBullets() {
        this.bulletsPool = this.bulletsScreen;
        this.bulletsScreen = [];
    }

    cleanBullets() {
        this.bulletsPool.forEach(b => {
            b.x = -100;
            b.y = -100;
        });
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
            bullet.x = -100;
            bullet.y = -100;
            this.field.game.app.stage.addChild(bullet);
        }
        this.bulletsScreen.push(bullet);
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