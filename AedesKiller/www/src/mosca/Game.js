/* globals Phaser:false */
// create BasicGame Class
// menu e configuracoes gerais
var BasicGame = {

};
var score = 0;
var textScore;
var tempo = 60;
var textTempo = "TEMPO \n 60";
var result;

var butonPause;
var buttonResume;
var buttonHome;
var buttonRestart;


var style = { font: "20px Arial", fill: "#FFFAFA"};
var style2 = { font: "20px Arial", fill: "#FFFAFA",align: "center"};
var style3 = { font: "30px Arial", fill: "#FF4500",align: "center"};

var punch;
var backSound;
var fly;

var mosquito;
var mosquito2;
var mosquito3;
var mosquito4;
var mosquito5;
var mosquito6;

// create Game function in BasicGame
BasicGame.Game = function (game) {
};

// set Game function prototype
BasicGame.Game.prototype = {

    init: function () {
        // set up input max pointers
        this.input.maxPointers = 1;
        // set up stage disable visibility change
        this.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        this.scale.scaleMode = Phaser.ScaleManager.RESIZE;
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        
        
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape. 
        // * Set second to true to force portrait.
        this.scale.forceLandscape = true;
        this.scale.forceOrientation(true, false);
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this 
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        this.scale.setResizeCallback(this.gameResized, this);
        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        this.scale.updateLayout(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        this.scale.refresh();

    },

    preload: function () {

        // Here we load the assets required for our preloader (in this case a 
        // background and a loading bar)
        this.load.image('pause', '../asset/mosquitokill/home.png');
        this.load.image('background', '../asset/mosquitokill/focos_casa.jpeg');
        
        this.load.spritesheet('mosquito','../asset/mosquitokill/mosquitos-sprite.png',32,32, 96);
        
        this.load.audio('tap', '../asset/mosquitokill/Punch.mp3');
        this.load.audio('musica', '../asset/mosquitokill/Background.mp3');
        this.load.audio('fly', '../asset/memoria/Fly.mp3');
        
    },

    create: function () {
        
        this.background = this.add.sprite(this.world.centerX,210,'background');
        this.background.anchor.setTo(0.5,0.5);
        
        punch = this.add.audio('tap');
        punch.volume = 0.5;
        
        backSound = this.add.audio('musica');
        backSound.play();
        
        fly = this.add.audio('fly');
        fly.volume = 0.5;
        
        mosquito = this.add.sprite(-100,100, 'mosquito');
        mosquito.scale.set(2);
        mosquito.anchor.setTo(0.5,0.5);
        mosquito.inputEnabled = true;
        mosquito.events.onInputDown.add(listener, this);
        mosquito.animations.add('fly',[24,25,26]);//mosquito yellow
        mosquito.animations.play('fly', 5 , true);
        
        mosquito2 = this.add.sprite(-100,100 + Math.random() *400, 'mosquito');
        mosquito2.scale.set(2);
        mosquito2.anchor.setTo(0.5,0.5);
        mosquito2.inputEnabled = true;
        mosquito2.events.onInputDown.add(listener1, this);
        mosquito2.animations.add('fly2',[27,28,29]);//mosquito yellow
        mosquito2.animations.play('fly2', 7 , true);
        
        mosquito3 = this.add.sprite(-100,100 + Math.random() *400, 'mosquito');
        mosquito3.scale.set(2);
        mosquito3.anchor.setTo(0.5,0.5);
        mosquito3.inputEnabled = true;
        mosquito3.events.onInputDown.add(listener2, this);
        mosquito3.animations.add('fly3',[33,34,35]);//mosquito yellow
        mosquito3.animations.play('fly3', 10 , true);
        
        mosquito4 = this.add.sprite(800,100 + Math.random() *400, 'mosquito');
        mosquito4.scale.set(2);
        mosquito4.anchor.setTo(0.5,0.5);
        mosquito4.inputEnabled = true;
        mosquito4.events.onInputDown.add(listener3, this);
        mosquito4.animations.add('fly4',[12,13,14]);//mosquito yellow
        mosquito4.animations.play('fly4', 5 , true);
        
        mosquito5 = this.add.sprite(800,100 + Math.random() *400, 'mosquito');
        mosquito5.scale.set(2);
        mosquito5.anchor.setTo(0.5,0.5);
        mosquito5.inputEnabled = true;
        mosquito5.events.onInputDown.add(listener4, this);
        mosquito5.animations.add('fly5',[15,16,17]);//mosquito yellow
        mosquito5.animations.play('fly5', 7 , true);
        
        mosquito6 = this.add.sprite(800,100 + Math.random() *400, 'mosquito');
        mosquito6.scale.set(2);
        mosquito6.anchor.setTo(0.5,0.5);
        mosquito6.inputEnabled = true;
        mosquito6.events.onInputDown.add(listener5, this);
        mosquito6.animations.add('fly6',[21,22,23]);//mosquito yellow
        mosquito6.animations.play('fly6', 10 , true);
        
        
        
        textTempo = this.add.text(this.world.centerX, 35, textTempo, style2);
        this.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);
        textTempo.anchor.setTo(0.5,0.5);
        
        textScore = this.add.text(10,10, "Placar: ", style);
        console.log("texto add");
        
        butonPause = this.add.button(this.world.centerX + 250, 7, 'pause', actionOnClick, this);
        butonPause.scale.set(0.2);
        
        
        
        
        
        buttonHome = this.add.text(this.world.centerX, 290, 'Tela Inicial', style3);
        buttonHome.anchor.setTo(0.5,0.5);
        buttonHome.visible = false;
        buttonHome.inputEnabled = true;
        buttonHome.events.onInputDown.add(home, this);
        buttonRestart = this.add.text(this.world.centerX, 330, 'Reiniciar', style3);
        buttonRestart.anchor.setTo(0.5,0.5);
        buttonRestart.visible = false;
        buttonRestart.inputEnabled = true;
        buttonRestart.events.onInputDown.add(restart, this);
    
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    },
    
    update: function(){
        mosquito.x +=1 + Math.random() *4;
        mosquito2.x +=2 + Math.random() *4;
        mosquito3.x +=3 + Math.random() *4;
        mosquito4.x -=1 + Math.random() *4;
        mosquito5.x -=2 + Math.random() *4;
        mosquito6.x -=3 + Math.random() *4;
        
        
        if(mosquito.x >= 700){
            mosquito.x = -200;
            mosquito.y = 90 + Math.random() *200;
            fly.play();
        }
        
        if(mosquito2.x >= 700){
            mosquito2.x = -200;
            mosquito2.y = 80 + Math.random() *200;
            fly.play();
        }
        
        if(mosquito3.x >= 700){
            mosquito3.x = -200;
            mosquito3.y = 80 + Math.random() *200;
            fly.play();
        }
        
        if(mosquito4.x <= -100){
            mosquito4.x = 800;
            mosquito4.y = 80 + Math.random() *200;
        }
        
        if(mosquito5.x <= -100){
            mosquito5.x = 800;
            mosquito5.y = 80 + Math.random() *200;
        }
        
        if(mosquito6.x <= -100){
            mosquito6.x = 800;
            mosquito6.y = 80 + Math.random() *200;
        }
        
        
        if(tempo <= 0){
            
            textTempo.visible = false;
            mosquito.destroy();
            mosquito2.destroy();
            mosquito3.destroy();
            mosquito4.destroy();
            mosquito5.destroy();
            mosquito6.destroy();
            
            buttonHome.visible = true;
            buttonRestart.visible = true;
            result = this.add.text(this.world.centerX , 100, "Placar \n" + score, style3);
            result.anchor.setTo(0.5,0.5);
            fly.stop();
        }
        
        
    }
    

};
    
    function actionOnClick(){
        location.href = "../index.html"
        
    }
    
    function updateCounter(){
        tempo --;
        textTempo.setText("TEMPO \n" + tempo);
    }

    function listener(){
        score +=1;
        mosquito.x = -200;
        mosquito.y = 100 + Math.random() *350;
        textScore.setText("Placar: "+ score);
        punch.play();
        
    }
    function listener1(){
        score +=2;
        mosquito2.x = -200;
        mosquito2.y = 100 + Math.random() *350;
        textScore.setText("Placar: "+ score);
        punch.play();
    }
    function listener2(){
        score +=3;
        mosquito3.x = -200;
        mosquito3.y = 100 + Math.random() *350;
        textScore.setText("Placar: "+ score);
        punch.play();
    }
    function listener3(){
        score +=1;
        mosquito4.x = 800;
        mosquito4.y = 100 + Math.random() *350;
        textScore.setText("Placar: "+ score);
        punch.play();
    }
    function listener4(){
        score +=2;
        mosquito5.x = 800;
        mosquito5.y = 100 + Math.random() *350;
        textScore.setText("Placar: "+ score);
        punch.play();
    }
    function listener5(){
        score +=3;
        mosquito6.x = 800;
        mosquito6.y = 100 + Math.random() *350;
        textScore.setText("Placar: "+ score);
        punch.play();
    }
    function home(){
        location.href = "../index.html"
    }
    function restart(){
        location.href = "index.html";
    }
    
