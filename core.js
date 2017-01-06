// Copyright © 2015 Michael Dobekidis
// Licensed under the terms of the MIT License
var reg = {};
var GameState = function(game) {};
var slider;
var coins;
// Load images and sounds
GameState.prototype.preload = function() {
    this.load.image('bg', "http://i221.photobucket.com/albums/dd22/djmid71/bg1_zpsxrhh1f86.jpg");
    this.load.image('mine', "assets/mine.png");
    this.load.image('button', "assets/emptyBtn.png");
    this.load.atlasJSONHash("player1", "assets/char.png", "assets/char.json");
    this.load.atlasJSONHash("coins", "assets/coins.png", "assets/coins.json");
    //
};

// Setup the example
GameState.prototype.create = function() {
    // Set stage background to something sky colored
    this.game.stage.backgroundColor = 0x1e1e1e;
    this.add.image(0, 0, "bg");

    var title = this.add.text(0, 0, "Click the monster!", {
        fontSize: 52,
        fill: "#000000",
        stroke: "#ffffff",
        strokeThickness: 2,
        wordWrap: true,
        wordWrapWidth: 500,
        font: "Luckiest Guy"
    });

    title.x = this.game.width / 2 - title.width / 2;
    title.y = 150;

    //// buttons ////

    var button1 = this.add.button(0, 0, "button", changeEffect1);
    button1.x = 100;
    button1.y = 50;
    var text1 = this.add.text(button1.x, button1.y + 5, "Up effect", {
        font: '22px Luckiest Guy',
        fill: '#000000',
        stroke: "#ffffff",
        strokeThickness: 2,
    });
    text1.x = button1.x + button1.width / 2 - text1.width / 2;
    text1.y = button1.y + button1.height / 2 - text1.height / 2;
    ////////////////////////
    var button2 = this.add.button(button1.x+button1.width+10, button1.y, "button", changeEffect2);
    var text2 = this.add.text(button2.x, button2.y + 5, "Smoke effect", {
        font: '22px Luckiest Guy',
        fill: '#000000',
        stroke: "#ffffff",
        strokeThickness: 2,
    });
    text2.x = button2.x + button2.width / 2 - text2.width / 2;
    text2.y = button2.y + button2.height / 2 - text2.height / 2;
    //////////////////////////
    var button3 = this.add.button(button2.x+button2.width+10, button1.y, "button", changeEffect3);
    var text3 = this.add.text(button2.x, button2.y + 5, "Explode effect", {
        font: '22px Luckiest Guy',
        fill: '#000000',
        stroke: "#ffffff",
        strokeThickness: 2,
    });
    text3.x = button3.x + button3.width / 2 - text3.width / 2;
    text3.y = button3.y + button3.height / 2 - text3.height / 2;
    ////////////////////////////
    var button4 = this.add.button(button3.x+button3.width+10, button1.y, "button", changeEffect4);
    var text4 = this.add.text(button3.x, button3.y + 5, "Physics effect", {
        font: '22px Luckiest Guy',
        fill: '#000000',
        stroke: "#ffffff",
        strokeThickness: 2,
    });
    text4.x = button4.x + button4.width / 2 - text4.width / 2;
    text4.y = button4.y + button4.height / 2 - text4.height / 2;
    /////////////////////////////
    
    coins = this.add.sprite(0,0,"coins","Coins-1");
    coins.anchor.setTo(0.5);
    coins.animations.add('idle', Phaser.Animation.generateFrameNames("Coins-", 1, 7, '', 0), 14, true, true);
    coins.visible = false;
    
    var char = this.add.sprite(0, 0, "player1", "SlimeMonster01");
    char.scale.setTo(0.6, 0.6);
    char.x = this.game.width / 2 - char.width / 2;
    char.y = this.game.height - char.height - 6;
    char.animations.add("idle", ["SlimeMonster01", "SlimeMonster02"], 4, true, true);
    char.animations.play("idle");
    char.inputEnabled = true;
    char.events.onInputDown.add(function() {
        var dmg = _game.rnd.integerInRange(100, 1000);
        var timeToLive = 200;
        var effect = masterEffect;
        var bg = false;
        var bgColor = 0xfec72a;
        if (dmg > 800) {
            effect = masterEffect === "smoke" ? "explode" : "smoke";
            timeToLive = 600;
        }

        if(masterEffect === "physics") {
            bg = true;
        }

        new FloatingText(this, {
            text: dmg,
            // sprite: coins,
            // spriteAnimationName:"idle",
            // spriteAnimationFrames: Phaser.Animation.generateFrameNames("Coins-", 1, 7, '', 0),
            // spriteAnimationFrameRate: 14,
            animation: effect,
            textOptions: {
                fontSize: 32,
                fill: "#ff18aa",
                stroke: "#ffffff",
                strokeThickness: 1,
                wordWrap: true,
                wordWrapWidth: 200,
                font: "Luckiest Guy"
            },
            hasBackground: bg,
            backgroundColor: bgColor,
            x: char.x + char.width / 2,
            y: char.y - 20,
            timeToLive: timeToLive
        })
    }, this);
};


// The update() method is called every frame
GameState.prototype.update = function() {

};

function changeEffect1() {
    masterEffect = "up";
}

function changeEffect2() {
    masterEffect = "smoke";
}

function changeEffect3() {
    masterEffect = "explode";
}

function changeEffect4() {
    masterEffect = "physics";
}

var masterEffect = "up";
var _game = new Phaser.Game(1024, 600, Phaser.CANVAS, 'game');
_game.state.add('game', GameState, true);


/**
 * [tweenProperty description]
 * @param  {[type]} item     [description]
 * @param  {[type]} property [description]
 * @param  {[type]} obj      [description]
 * @param  {[type]} duration [description]
 * @return {[type]}          [description]
 */
function tweenProperty2(item, property, obj, duration, delay, easing, yoyo, repeat, reverse) {

    delay = delay || {};
    easing = easing || Phaser.Easing.Linear.None;
    yoyo = yoyo || false;
    repeat = repeat || 0;

    var tween = _game.add.tween(item).to(obj, duration, easing, true, delay, repeat, yoyo);
    tween.reverse = reverse || false;
    return tween;
}
