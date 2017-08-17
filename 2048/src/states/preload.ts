/**
 * 预加载场景
 * 
 * @export
 * @class Preload
 * @extends {Phaser.State}
 */
export default class Preload extends Phaser.State {
    constructor() {
        super();
    }

    preload() {
        let game = this.game;
        //添加进度条,并将其设为进度条精灵
        let preloadSprite = game.add.sprite(10, game.height / 2, 'loading');
        game.load.setPreloadSprite(preloadSprite);

        //加载游戏资源
        game.load.image('background', 'assets/bg.png');
        game.load.image('btnStart', 'assets/btn-start.png');
        game.load.image('btnRestart', 'assets/btn-restart.png');
        game.load.image('logo', 'assets/logo.png');
        game.load.image('btnTryagain', 'assets/btn-tryagain.png');

    }

    create() {
        //跳转至主菜单
        this.game.state.start('main');
    }
}
