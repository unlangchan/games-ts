webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(1);
__webpack_require__(2);
__webpack_require__(3);
//导入场景文件
const boot_1 = __webpack_require__(9);
const preload_1 = __webpack_require__(10);
const main_1 = __webpack_require__(11);
// import Start from './states/start';
window.onload = () => {
    //创建游戏容器
    var game = new Phaser.Game(240, 400, Phaser.CANVAS, 'game');
    //添加场景至game对象
    game.state.add('boot', boot_1.default);
    game.state.add('preload', preload_1.default);
    game.state.add('main', main_1.default);
    // game.state.add('start', Start);
    //跳转至引导场景
    game.state.start('boot');
};


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 引导场景
 *
 * @export
 * @class Boot
 * @extends {Phaser.State}
 */
class Boot extends Phaser.State {
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
exports.default = Boot;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 预加载场景
 *
 * @export
 * @class Preload
 * @extends {Phaser.State}
 */
class Preload extends Phaser.State {
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
exports.default = Preload;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 主菜单场景
 *
 * @export
 * @class Main
 * @extends {Phaser.State}
 */
class Main extends Phaser.State {
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
exports.default = Main;


/***/ })
],[4]);