export class PlayerState {
  id: number;
  x: number;
  y: number;
  rotation: number;
  gunRotation: number

  send(x, y, rotation, gunRotation, serverId): PlayerState {
    this.x = x;
    this.y = y;
    this.rotation = rotation;
    this.gunRotation = gunRotation;
    this.id = serverId;
    return this;
  }
}