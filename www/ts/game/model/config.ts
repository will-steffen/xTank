export class Config {
    width: number;
    height: number;
    tankSpeed: number;
    tankSize: number;
    bulletSize: number;
    wsPort: number;

    fromServer(data) {
        let c = JSON.parse(data);
        this.wsPort = c.wsPort;
        this.width = c.width;
        this.height = c.height;
        this.tankSize = c.tankSize;
        this.tankSpeed = c.tankSpeed;
        this.bulletSize = c.bulletSize;
        return this;
    }

    local() {
        this.wsPort = 8081;
        this.width = 900;
        this.height = 600;
        this.tankSize = 70;
        this.tankSpeed = 3;
        this.bulletSize = 4;
        return this;
    }
}