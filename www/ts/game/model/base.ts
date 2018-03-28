export class WorldElement {
    constructor(
        public path: string,
        public width: number,
        public height: number,
        public relativeSpeed?: number
    ) {}
}