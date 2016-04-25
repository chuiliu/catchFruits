var catchFruits = {

    /*初始化*/
    init: function() {
        var self = this;
        self.initEvent();
    },

    /*初始化事件*/
    initEvent: function() {
        var self = this;
        var newGame = document.getElementById('newGame');
        if(window.addEventListener) {
            newGame.addEventListener('click', function() {
                self.startNewGame();
            }, false);
        } else {
            newGame.attachEvent('click', function() {
                self.startNewGame();
            }, false);
        }
    },

    /*新游戏*/
    startNewGame: function() {
        var self = this;

    },

    gameOver: function() {

    }
};

catchFruits.init();

// canvas画布
var canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 550;
var ctx = canvas.getContext('2d');

var fruit = new Fruit();
var rabbit = new Rabbit();





// 水果
var Fruit = function() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.isCatch = false;
    this.isOut = false;
};

// 水果出现
Fruit.prototype.draw = function() {

};

// 水果掉下的过程
Fruit.prototype.fall = function() {

};

// 小兔子
var Rabbit = function() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.isCatch = false;
}

// 兔子出现
Rabbit.prototype.draw = function() {

};

// 兔子移动
Rabbit.prototype.move = function() {

};

// 接住水果
Rabbit.prototype.catch = function() {

};
