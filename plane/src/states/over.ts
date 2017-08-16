import GameStatus from '../status';
/**
 * 结束
 * 
 * @export
 * @class Over
 * @extends {Phaser.State}
 */
export default class Over extends Phaser.State {

    // 背景音乐
    normalback: Phaser.Sound;

    constructor() {
        super();
    }

    create() {
        let game = this.game;
        //背景
        game.add.image(0, 0, 'background');
        //版权
        game.add.image(12, this.game.height - 16, 'copyright');
        // 我的飞机
        let myplane = game.add.sprite(100, 100, 'myplane');
        myplane.animations.add('fly');
        myplane.animations.play('fly', 12, true);
        // 分数
        let style = { font: "bold 32px Arial", fill: "#ff0000", boundsAlignH: "center", boundsAlignV: "middle" };
        let text = game.add.text(0, 0, `Score: ${GameStatus.score}`, style);
        text.setTextBounds(0, 0, game.width, game.height);
        // 重来按钮
        game.add.button(30, 300, 'replaybutton', this.onReplayClick, this, 0, 0, 1);
        // 分享按钮
        game.add.button(130, 300, 'sharebutton', this.onShareClick, this, 0, 0, 1);
        // 背景音乐
        this.normalback = game.add.audio('normalback', 0.2, true);
        this.normalback.play();
    }

    onReplayClick() {
        this.normalback.stop();
        this.game.state.start('start');
    }

    onShareClick() {
        let score = GameStatus.score;
        if (score < 1000) {
            document.title = "简版飞机大战，还挺难的，我才" + score + "分，你能得多少分呢？";
        } else {
            document.title = "简版飞机大战，我是天才，得了" + score + "分，你能得多少分呢？";
        }
        document.getElementById('share').style.display = 'block';
    }
}