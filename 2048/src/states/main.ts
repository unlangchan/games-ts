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
        let game = this.game;
        //背景
        game.add.tileSprite(0, 0, game.width, game.height, 'background');
        // logo
        let logo = game.add.image(0, 0, 'logo');
        logo.reset((game.width - logo.width) / 2, (game.height - logo.height) / 2 - 50);
        //开始按钮
        let startBtn = game.add.button(0, 0, 'btnStart', () => {
            game.state.start('start');
        }, this);
        startBtn.reset((game.width - startBtn.width) / 2, (game.height - startBtn.height) / 2 + 100);
    }
}
