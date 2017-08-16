/**
 * 主菜单场景
 * 
 * @export
 * @class Main
 * @extends {Phaser.State}
 */
export default class Main extends Phaser.State {
    //背景音乐
    normalback: Phaser.Sound;

    constructor() {
        super();
    }

    create() {
        //背景
        this.game.add.image(0, 0, 'background');
        //版权
        this.game.add.image(12, this.game.height - 16, 'copyright');
        //我的飞机
        var myplane = this.game.add.sprite(100, 100, 'myplane');
        myplane.animations.add('fly');
        myplane.animations.play('fly', 12, true);
        //开始按钮
        this.add.button(70, 200, 'startbutton', this.onStartClick, this, 1, 1, 0);
        // 背景音乐
        this.normalback = this.game.add.audio('normalback', 0.2, true);
        this.normalback.play();
    }

    onStartClick() {
        this.game.state.start('start');
        this.normalback.stop();
    }
}
