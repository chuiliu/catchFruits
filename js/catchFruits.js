/*初始化事件*/
var initEvent = function() {
    var self = this;
    var newGame = document.getElementById('newGame');
    if(window.addEventListener) {
        newGame.addEventListener('click', function() {
            startNewGame();
        }, false);
    } else {
        newGame.attachEvent('click', function() {
            startNewGame();
        }, false);
    }
};

initEvent();

/*新游戏*/
var startNewGame = function() {
    console.log('开始新游戏')
    cancelAnimationFrame(window.game);
    ctx.clearRect(0, 0, 400, 550);
    gameStart();
};

// canvas画布
var canvas = document.getElementById('canvas');
canvas.width = 400;
canvas.height = 550;
var ctx = canvas.getContext('2d');

// 分数和计时
var score = 0;
var time = 0;

// 计时器
var calculateTime;  // 计算时间
var newFruit;  // 创建水果

// 分数和计时的DOM元素
var scoreEle = document.getElementById('score').getElementsByTagName('span')[0];
var timeEle = document.getElementById('time').getElementsByTagName('span')[0];

// 获取水果图片
var getFruitImg = function() {
    var fruitSrcArr = ['apple', 'orange', 'banana', 'watermelon','grape','papaya','pineapple','greenApple','strawberry'];
    var fruitIndex = Math.ceil(Math.random()*8);
    // console.log(fruitSrcArr[fruitIndex]);
    var fruitImg = new Image();
    fruitImg.src = '../gainFruits/img/' + fruitSrcArr[fruitIndex] + '.png';
    return fruitImg;
};

// 获取兔子图片
var getRabbitImg = function() {
    var rabbitImg = new Image();
    rabbitImg.src = '../gainFruits/img/rabbit.png';
    return rabbitImg;
}



// 水果对象
var Fruit = function(obj) {
    this.imgObj = obj;
    this.x = Math.random() * (400 - 50);
    this.y = 0;
    this.width = 60;
    this.height = 60;
    this.speed = 3;
    // 是否被接住
    this.isCatch = false;
    // 是否超出范围
    this.isOut = false;
};

// 水果出现
Fruit.prototype.draw = function() {
    ctx.drawImage(this.imgObj, this.x, this.y, this.width, this.height);
};

// 水果掉下的过程
Fruit.prototype.fall = function() {
    if(!this.isCatch && this.y < 550) {
        this.y += this.speed;
    } else {
        this.isOut = true;
    }
};

// 兔子对象
var Rabbit = function(obj) {
    this.imgObj = obj;
    this.width = 80;
    this.height = 80;
    this.x = (400 - this.width) / 2;  // 居中
    this.y = 440;
    this.speed = 20;
}

// 画出兔子
Rabbit.prototype.draw = function() {
    ctx.drawImage(this.imgObj, this.x, this.y, this.width, this.height);
};

// 兔子移动
Rabbit.prototype.move = function() {
    var self = this;
    document.onkeydown = function(e) {
        console.log(e.keyCode,'>>>',self.x,'>>>')
        // 左移
        if((self.x >= 0) && (e.keyCode == 37)) {
            self.x -= self.speed;
            // ctx.translate
        }
        // 右移
        if((self.x < (400 - self.width)) && (e.keyCode == 39)) {
            self.x += self.speed;
        }
    };
};

// 是否接到水果
var isCatch = function(rabbit, fruit) {
    var rabbitX = rabbit.x;
    var rabbitY = rabbit.y;
    var fruitX = fruit.x;
    var fruitY = fruit.y;
    if(fruit.isCatch == false && rabbitY - fruitY < 0 && Math.abs(rabbitX - fruitX) < 40) {
        score += 10;
        scoreEle.innerHTML = score;
        fruit.isCatch = true;
    }
};



// 游戏开始
var gameStart = function(options) {
    console.log('游戏开始')
    window.score = 0;
    time = 10;

    // 清除计时器
    clearInterval(calculateTime);
    clearInterval(newFruit);

    // 计时开始
    calculateTime = setInterval(function() {
        timeEle.innerHTML = time--;
        if (time < 0) {
            cancelAnimationFrame(window.game);
            clearInterval(calculateTime);
            var result = document.getElementById('result');
            result.getElementsByTagName('span')[0].innerHTML = score;
            result.style.display = 'block';
        }
    }, 1000);

    var fruitArr = [];
    var rabbitImg = getRabbitImg();
    var rabbit = new Rabbit(rabbitImg);

    newFruit = setInterval(function() {
        var fruitImg = getFruitImg();
        var fruit = new Fruit(fruitImg);
        fruitArr.push(fruit);
    }, 1500);


    var start = function() {
        ctx.clearRect(0, 0, 400, 550);
        rabbit.draw();
        rabbit.move();

        for (var i in fruitArr) {
            fruitArr[i].draw();
            fruitArr[i].fall();
            isCatch(rabbit, fruitArr[i]);

        }

        window.game = requestAnimationFrame(start);
    };

    start();


};

