export class Config {
    width: number;
    height: number;
    tankSpeed: number;
    tankSize: number;

    fromServer(data) {
        let c = JSON.parse(data);
        this.width = c.width;
        this.height = c.height;
        this.tankSize = c.tankSize;
        this.tankSpeed =c.tankSpeed;
        return this;
    }
}