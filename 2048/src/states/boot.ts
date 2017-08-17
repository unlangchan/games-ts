/**
 * 引导场景
 * 
 * @export
 * @class Boot
 * @extends {Phaser.State}
 */
export default class Boot extends Phaser.State {

    constructor() {
        super();
    }

    preload() {
        //判断运行环境
        if (!this.game.device.desktop) {
            this.game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
            this.scale.forcePortrait = true;
            this.scale.refresh();
        }

        this.game.load.image('loading', 'assets/preloader.gif');

    }

    create() {
        //跳转至预加载
        this.game.state.start('preload');
    }
}
