/// <reference path="./node_modules/phaser-ce/typescript/phaser.d.ts" />
declare function require(module: string): any;
declare interface Window {
    PIXI: typeof PIXI;
    p2: typeof p2;
    Phaser: typeof Phaser;
}