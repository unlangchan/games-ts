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

        //添加进度条,并将其设为进度条精灵
        var preloadSprite = this.game.add.sprite(10, this.game.height / 2, 'loading');
        this.game.load.setPreloadSprite(preloadSprite);

        //加载游戏资源
        this.game.load.image('background', 'assets/bg.jpg');
        this.game.load.image('copyright', 'assets/copyright.png');
        this.game.load.spritesheet('myplane', 'assets/myplane.png', 40, 40, 4);
        this.game.load.spritesheet('startbutton', 'assets/startbutton.png', 100, 40, 2);
        this.game.load.spritesheet('replaybutton', 'assets/replaybutton.png', 80, 30, 2);
        this.game.load.spritesheet('sharebutton', 'assets/sharebutton.png', 80, 30, 2);
        this.game.load.image('mybullet', 'assets/mybullet.png');
        this.game.load.image('bullet', 'assets/bullet.png');
        this.game.load.image('enemy1', 'assets/enemy1.png');
        this.game.load.image('enemy2', 'assets/enemy2.png');
        this.game.load.image('enemy3', 'assets/enemy3.png');
        this.game.load.spritesheet('explode1', 'assets/explode1.png', 20, 20, 3);
        this.game.load.spritesheet('explode2', 'assets/explode2.png', 30, 30, 3);
        this.game.load.spritesheet('explode3', 'assets/explode3.png', 50, 50, 3);
        this.game.load.spritesheet('myexplode', 'assets/myexplode.png', 40, 40, 3);
        this.game.load.image('award', 'assets/award.png');
        this.game.load.audio('normalback', 'assets/normalback.mp3');
        this.game.load.audio('playback', 'assets/playback.mp3');
        this.game.load.audio('fashe', 'assets/fashe.mp3');
        this.game.load.audio('crash1', 'assets/crash1.mp3');
        this.game.load.audio('crash2', 'assets/crash2.mp3');
        this.game.load.audio('crash3', 'assets/crash3.mp3');
        this.game.load.audio('ao', 'assets/ao.mp3');
        this.game.load.audio('pi', 'assets/pi.mp3');
        this.game.load.audio('deng', 'assets/deng.mp3');
    }

    create() {
        //跳转至主菜单
        this.game.state.start('main');
    }
}
