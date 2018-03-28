import { LevelController } from './controllers/level/controller';
import { PlayerController } from './controllers/player/controller';
import { WorldElement } from './model/base';

export class Game {    
    app: PIXI.Application;
    level: LevelController;
    player: PlayerController;
    height: number;
    width: number;
  

    constructor() { 
        this.app = new PIXI.Application({ width: window.innerWidth, height: window.innerHeight });
        this.level = new LevelController(this);
        this.player = new PlayerController(this);
        this.height = this.app.view.height;
        this.width = this.app.view.width;
        document.body.appendChild(this.app.view);     
        this.load();
    }

    load() {
        let toLoad: WorldElement[] = [];  
     
        let paths: string[] = toLoad.map(i => { return i.path });
   
        PIXI.loader
            .add(paths)
            .load(() => this.create());
            // .on('progress', p => { console.log(Math.round(p.progress) + '%')});
    }
  
    create() {
        this.level.create();
        this.player.create();
        this.app.ticker.add(delta => this.update(delta));
        this.addFPS();
    }

    update(delta) {
        this.level.update(delta);
        this.player.update(delta);
    }

    private addFPS() {
        let fps: any;
        let mFps = 60;
        fps = document.createElement('div');
        fps.style.position = 'absolute';
        fps.innerHTML = '';
        fps.style.color = 'white';
        fps.style.top = '0';
        fps.style.fontSize = '30px';
        document.body.appendChild(fps);         
        this.app.ticker.add(delta => {            
            let fp = Math.round(60 / delta);
            if(fp < mFps) {
                mFps = fp;
                setTimeout(() => { mFps = 60 }, 3000);
            }
            fps.innerHTML = fp + ' - ' + mFps
        }); 
    }
    
}

