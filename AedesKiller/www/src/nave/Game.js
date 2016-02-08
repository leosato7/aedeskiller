/* globals Phaser:false */
// create BasicGame Class
// menu e configuracoes gerais
var BasicGame = {
    
};

var gameItens = {};
gameItens.acmenu = null;
gameItens.graphics = null;

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
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
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
        this.load.image('fundo', '../asset/nave/fundo.png');
        this.load.spritesheet('soldier', '../asset/nave/soldier.png', 32, 32, 96);
    },

    create: function () {
        
        this.fundo = this.add.sprite(
           this.world.centerX, // (centerX, centerY) is the center coordination
            this.world.centerY,
            'fundo');
        
        this.fundo.anchor.setTo(0.5, 0.5);
        this.fundo.scale.setTo(4, 4);
        
        gameItens.graphics = this.add.graphics(100, 100);

        // draw a rectangle
        gameItens.graphics.lineStyle(0);
        gameItens.graphics.beginFill(0xFFFF0B, 0.5);
        gameItens.graphics.drawRect(0, 0, 80, 600);
        gameItens.graphics.y = 0;
        gameItens.graphics.x = this.world.width - gameItens.graphics.width;
        
        this.soldier = this.add.sprite(
            100,
            150,
            'soldier'
        );

        //this.sprite.scale.set(2);
        //this.sprite.animations.add('walk');
        //this.sprite.animations.play('walk', 20, true);

        
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    },
    
    update: function() {
        
    }, 
    
    render: function() {
        
    },
    
    pause: function() {
        
    }

};