import GameStatus from '../status';
/**
 * 游戏场景
 * 
 * @export
 * @class Play
 * @extends {Phaser.State}
 */
export default class Play extends Phaser.State {
    //我的飞机
    myplane: Phaser.Sprite;
    //我方子弹
    myBullets: Phaser.Group;
    //敌机
    enemys: Phaser.Group;
    //敌方子弹
    enemyBullets: Phaser.Group;
    //背景音乐
    playback: Phaser.Sound;
    //开火声音
    pi: Phaser.Sound;
    //打中敌人音乐
    firesound: Phaser.Sound;
    //爆炸音乐
    crash1: Phaser.Sound;
    crash2: Phaser.Sound;
    crash3: Phaser.Sound;
    //挂了音乐
    ao: Phaser.Sound;
    //接到了奖音乐
    deng: Phaser.Sound;
    //奖
    awards: Phaser.Group;
    //分数文本
    text: Phaser.Text;

    constructor() {
        super();
    }

    create() {
        let game = this.game;
        GameStatus.score = 0;
        //物理引擎
        game.physics.startSystem(Phaser.Physics.ARCADE);
        //背景
        var bg = game.add.tileSprite(0, 0, game.width, game.height, 'background');
        bg.autoScroll(0, 20);
        //我的飞机
        var myplane = this.myplane = game.add.sprite(100, 100, 'myplane');
        myplane.animations.add('fly');
        myplane.animations.play('fly', 12, true);
        game.physics.enable(myplane);
        myplane.body.collideWorldBounds = true;
        //动画
        var tween = game.add.tween(myplane).to({ y: this.game.height - 40 }, 1000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(this.onStart, this);
        //背景音乐
        this.playback = game.add.audio('playback', 0.2, true);
        this.playback.play();
        //开火声音
        this.pi = game.add.audio('pi', 1, false);
        this.firesound = game.add.audio('fashe', 5, false);
        // 爆炸音乐
        this.crash1 = game.add.audio('crash1', 10, false);
        this.crash2 = game.add.audio('crash2', 10, false);
        this.crash3 = game.add.audio('crash3', 20, false);
        // 挂了音乐
        this.ao = game.add.audio('ao', 10, false);
        // 接到了奖音乐
        this.deng = game.add.audio('deng', 10, false);
    }

    onStart() {
        let game = this.game;
        let myplane = this.myplane;
        //允许我方飞机拖拽
        myplane.inputEnabled = true;
        myplane.input.enableDrag();
        myplane['myStartFire'] = true;
        myplane['life'] = 2;
        myplane['lastBullet'] = 0;

        //创建我方飞弹组
        this.myBullets = game.add.group();
        this.myBullets.enableBody = true;

        // 奖牌组
        this.awards = game.add.group();
        game.time.events.loop(Phaser.Timer.SECOND * 3, this.generateAward, this);

        this.enemys = this.game.add.group();
        this.enemys.enableBody = true;
        this.enemys['lastGenerate'] = 0;

        this.enemyBullets = this.game.add.group();
        this.enemyBullets.enableBody = true;


        var style = { font: "16px Arial", fill: "#ff0000" };
        this.text = this.game.add.text(0, 0, "Score: 0", style);

        console.log('game start');
    }
    // 产生一个奖
    generateAward() {
        let game = this.game;
        let awardSize = game.cache.getImage('award');
        let x = game.rnd.integerInRange(0, game.width - awardSize.width);
        let y = -awardSize.height;
        let award = this.awards.getFirstExists(false, true, x, y, 'award');
        award.outOfBoundsKill = true;
        award.checkWorldBounds = true;
        game.physics.arcade.enable(award);
        award.body.velocity.y = 600;
    }

    myplaneFire() {
        var now = new Date().getTime();
        if (this.myplane.alive && now - this.myplane['lastBullet'] > 200) {
            this.pi.play();
            var myBullet = this.getMyPlaneBullet();
            myBullet.body.velocity.y = -200;
            this.myplane['lastBullet'] = now;
            if (this.myplane['life'] >= 2) {
                myBullet = this.getMyPlaneBullet();
                myBullet.body.velocity.x = -20;
                myBullet.body.velocity.y = -200;
                myBullet = this.getMyPlaneBullet();
                myBullet.body.velocity.x = 20;
                myBullet.body.velocity.y = -200;
            }
            if (this.myplane['life'] >= 3) {
                myBullet = this.getMyPlaneBullet();
                myBullet.body.velocity.x = -40;
                myBullet.body.velocity.y = -200;
                myBullet = this.getMyPlaneBullet();
                myBullet.body.velocity.x = 40;
                myBullet.body.velocity.y = -200;
            }
        }
    }

    //获取子弹
    getMyPlaneBullet(): Phaser.Sprite {
        var myBullet = this.myBullets.getFirstExists(false);
        if (myBullet) {
            myBullet.reset(this.myplane.x + 15, this.myplane.y - 10);
        } else {
            myBullet = this.game.add.sprite(this.myplane.x + 15, this.myplane.y - 10, 'mybullet');
            myBullet.outOfBoundsKill = true;
            myBullet.checkWorldBounds = true;
            this.myBullets.addChild(myBullet);
            this.game.physics.enable(myBullet, Phaser.Physics.ARCADE);
        }
        return myBullet;
    }

    //生成敌机
    generateEnemy() {
        let game = this.game;
        //取一个随机数
        var now = new Date().getTime();
        if (now - this.enemys['lastGenerate'] > 2000) {
            console.log(233);
            var enemyIndex = game.rnd.integerInRange(1, 3);
            var key = `enemy${enemyIndex}`;
            var size = game.cache.getImage(key).width;
            var x = game.rnd.integerInRange(size / 2, game.width - size / 2);
            var y = 0;

            var enemy: Enemy = this.enemys.getFirstExists(false, true, x, y, key);
            enemy.anchor.setTo(0.5, 0.5);
            //超出边界则回收对象
            enemy.outOfBoundsKill = true;
            enemy.checkWorldBounds = true;
            game.physics.arcade.enable(enemy);
            enemy.body.setSize(size, size);
            enemy.body.velocity.y = 20;
            enemy.size = size;
            enemy.lastFireTime = 0;
            enemy.index = enemy.life = enemyIndex;
            this.enemys['lastGenerate'] = now;

            switch (enemyIndex) {
                case 1:
                    enemy.bulletV = 40;
                    enemy.bulletTime = 6000;
                    enemy.score = 20;
                    break;
                case 2:
                    enemy.bulletV = 80;
                    enemy.bulletTime = 4000;
                    enemy.score = 30;
                    break;
                case 3:
                    enemy.bulletV = 120;
                    enemy.bulletTime = 2000;
                    enemy.score = 50;
                    break;
            }

        }

    }

    enemyFire() {
        var now = new Date().getTime();

        this.enemys.forEachAlive((enemy: Enemy) => {
            if (now - enemy.lastFireTime > enemy.bulletTime) {
                //敌人发射子弹
                var bullet = this.enemyBullets.getFirstExists(false);
                if (bullet) {
                    bullet.reset(enemy.x, enemy.y + enemy.width / 2);
                } else {
                    bullet = this.game.add.sprite(enemy.x, enemy.y + enemy.width / 2, 'bullet');
                    bullet.outOfBoundsKill = true;
                    bullet.checkWorldBounds = true;
                    this.enemyBullets.addChild(bullet);
                    this.game.physics.enable(bullet, Phaser.Physics.ARCADE);
                }

                bullet.body.velocity.y = enemy.bulletV;
                enemy.lastFireTime = now;
            }
        }, this);

    }
    enemyDead(enemy: Enemy) {
        //敌机爆炸的声音
        console.log(`crash${enemy.index}`);
        let sound: Phaser.Sound = this[`crash${enemy.index}`];
        sound.play();
        enemy.kill();
        var explode = this.game.add.sprite(enemy.x, enemy.y, `explode${enemy.index}`);
        explode.anchor.setTo(0.5, 0.5);
        var animate = explode.animations.add('exploade');
        animate.play(30, false, false);
        animate.onComplete.addOnce(() => {
            explode.destroy();
            GameStatus.score += enemy.score;
            this.text.setText(`Score: ${GameStatus.score}`);
        });
    }

    myplaneDead(myplane: Phaser.Sprite) {
        this.ao.play();
        myplane.kill();
        var myexplode = this.game.add.sprite(this.myplane.x, this.myplane.y, 'myexplode');
        var anim = myexplode.animations.add('myexplode');
        myexplode.animations.play('myexplode', 30, false, true);
        anim.onComplete.add(() => {
            this.playback.stop();
            this.game.state.start('over');
        }, this);
    }

    update() {
        if (this.myplane['myStartFire']) {
            //我方开火
            this.myplaneFire();
            //生成敌机
            this.generateEnemy();
            //敌方开火
            this.enemyFire();
            //我方子弹击中敌机
            this.game.physics.arcade.overlap(this.myBullets, this.enemys, (bullet: Phaser.Sprite, enemy: Enemy) => {
                //hitEnemy 
                bullet.kill();
                //敌机中弹的声音
                this.firesound.play();
                enemy.life--;
                if (enemy.life < 1) {
                    this.enemyDead(enemy);
                }
            }, null, this);
            //敌方子弹击中我方飞机
            this.game.physics.arcade.overlap(this.myplane, this.enemyBullets, (myplane: Phaser.Sprite, enemyBullet: Phaser.Sprite) => {
                enemyBullet.kill();
                if (this.myplane['life'] > 1) {
                    this.myplane['life']--;
                } else {
                    this.myplaneDead(myplane);
                }
            }, null, this);
            //与敌机相撞
            this.game.physics.arcade.overlap(this.myplane, this.enemys, (myplane: Phaser.Sprite, enemy: Enemy) => {
                this.enemyDead(enemy);
                this.myplaneDead(myplane);
            }, null, this);
            //获得奖牌
            this.game.physics.arcade.overlap(this.myplane, this.awards, (myplane: Phaser.Sprite, award: Phaser.Sprite) => {
                award.kill();
                if (this.myplane['life'] < 3) {
                    this.myplane['life']++;
                }
            }, null, this);
        }
    }
}

interface Enemy extends Phaser.Sprite {

    /**
     * 索引
     * 
     * @type {number}
     * @memberof Enemy
     */
    index: number;

    /**
     * 大小
     * 
     * @type {number}
     * @memberof Enemy
     */
    size: number;

    /**
     * 最后开火时间
     * 
     * @type {number}
     * @memberof Enemy
     */
    lastFireTime: number;
    /**
     * 子弹速度
     * 
     * @type {number}
     * @memberof Enemy
     */
    bulletV: number;
    /**
     * 子弹发射间隔
     * 
     * @type {number}
     * @memberof Enemy
     */
    bulletTime: number;
    /**
     * 分数
     * 
     * @type {number}
     * @memberof Enemy
     */
    score: number;

    /**
     * 生命值
     * 
     * @type {number}
     * @memberof Enemy
     */
    life: number;
}
