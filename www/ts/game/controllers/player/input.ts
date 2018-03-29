import { PlayerController } from './controller';

export class InputController {  
    constructor(private player: PlayerController) {} 

    keysCode = { up: 87, down: 83, left: 65, right: 68 };
    keysArrowCode = { up: 38, down: 40, left: 37, right: 39 };
    keys = { up: false, down: false, left: false, right: false, mousedown: false };
    rotation = {
        vertical: 0,
        horizontal: Math.PI / 2,
        diagonal1: Math.PI / 4,
        diagonal2: - Math.PI / 4,
    };
    pointer: PIXI.Sprite; 
    shotCooldown = 10;   
    shotCooldownCrtl = 0;

    create() {
        window.addEventListener('keydown', evt => {
            switch(evt.keyCode){
                case this.keysCode.up:    this.keys.up    = true;break;
                case this.keysCode.down:  this.keys.down  = true; break;
                case this.keysCode.left:  this.keys.left  = true; break;
                case this.keysCode.right: this.keys.right = true; break;
            }
        });
        window.addEventListener('keyup', evt => {
            switch(evt.keyCode){
                case this.keysCode.up:    this.keys.up    = false; break;
                case this.keysCode.down:  this.keys.down  = false; break;
                case this.keysCode.left:  this.keys.left  = false; break;
                case this.keysCode.right: this.keys.right = false; break;
            }
        });
        window.addEventListener('mousedown', evt => { this.keys.mousedown = true });
        window.addEventListener('mouseup', evt => { this.keys.mousedown = false });
        this.pointer = new PIXI.Sprite(PIXI.loader.resources[this.player.game.assets.pointer.path].texture);
        this.pointer.x = -10;
        this.pointer.y = -10;

        this.pointer.width = 10;
        this.pointer.height = 10;

        this.pointer.anchor.x = 0.5;
        this.pointer.anchor.y = 0.5;


        this.player.game.app.stage.addChild(this.pointer);
    }

    update(delta: number) {
        if(this.keys.up && this.player.container.y > this.player.container.height/2){
            this.player.container.y -= this.player.speed * delta;
        }else{
            this.keys.up = false;
        }
        if(this.keys.down && this.player.container.y < this.player.game.height - this.player.container.height/2){
            this.player.container.y += this.player.speed * delta;
        }else{
            this.keys.down = false;
        }
        if(this.keys.left && this.player.container.x > this.player.container.width/2){
            this.player.container.x -= this.player.speed * delta;
        }else{
            this.keys.left = false;
        }
        if(this.keys.right && this.player.container.x < this.player.game.width - this.player.container.width/2){
            this.player.container.x += this.player.speed * delta;
        }else{
            this.keys.right = false;
        }

        if(this.keys.up && this.keys.left || this.keys.down && this.keys.right){
            this.player.tank.rotation = this.rotation.diagonal2;
        }else if(this.keys.up && this.keys.right || this.keys.down && this.keys.left){
            this.player.tank.rotation = this.rotation.diagonal1;
        }else if(this.keys.up || this.keys.down){
            this.player.tank.rotation = this.rotation.vertical;
        }else if(this.keys.left || this.keys.right){
            this.player.tank.rotation = this.rotation.horizontal;
        }

        var mouseposition = this.player.game.app.renderer.plugins.interaction.mouse.global;
        this.pointer.x = mouseposition.x;
        this.pointer.y = mouseposition.y;
        this.gunTrack(mouseposition);
        if(this.keys.mousedown && this.shotCooldownCrtl <= 0){
            this.shotCooldownCrtl = this.shotCooldown;
            this.player.game.level.shot(this.player.container.x, this.player.container.y, this.player.gun.rotation)
        }
        this.shotCooldownCrtl -= delta;
    }

    gunTrack(pos) {
        let dx = pos.x - this.player.container.x;
        let dy = pos.y - this.player.container.y; 
        let d =  dx >= 0 ? 1 : -1;  
        this.player.gun.rotation = Math.atan(dy/dx) + (Math.PI * d / 2);      
    }
}