import { AssetElement } from '../model/base'

let folder = 'assets/';

export class Assets {
    canhao = new AssetElement(folder + 'canhao.png', 177, 177);
    tank = new AssetElement(folder + 'base.png', 177, 177);
    pointer = new AssetElement(folder + 'pointer.png', 2, 2);

    tankSize = 0.05;
}