/* globals Phaser:false */
// create BasicGame Class
// menu e configuracoes gerais
var BasicGame = {
    
};
var naveUtils;
var gameItens = {};
gameItens.acmenu = null;
gameItens.graphics = null;
gameItens.textAcSkill = "";

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
        this.load.image('seta_up', '../asset/nave/seta-up.png');
        this.load.image('seta_down', '../asset/nave/seta-down.png');
        this.load.spritesheet('soldier', '../asset/nave/soldier.png', 32, 32, 96);
        this.load.spritesheet('casas', '../asset/nave/casas-sprite.png', 46.3, 59.5, 114);
        this.load.image('reload', '../asset/nave/reload.png');
        this.load.image('reloading', '../asset/nave/reloading.png');
        
        this.load.image('sk_0', '../asset/nave/skills/EX-lancer.png');
        this.load.image('sk_1', '../asset/nave/skills/black-hole.png');
        this.load.image('sk_2', '../asset/nave/skills/fire.png');
        this.load.image('sk_3', '../asset/nave/skills/ice.png');
        this.load.image('sk_4', '../asset/nave/skills/thunder.png');
        this.load.image('sk_5', '../asset/nave/skills/venon.png');
    },

    create: function () {
        
        this.fundo = this.add.sprite(
           this.world.centerX, // (centerX, centerY) is the center coordination
            this.world.centerY,
            'fundo');
        
        this.fundo.anchor.setTo(0.5, 0.5);
        this.fundo.scale.setTo(4, 4);
        
        naveUtils = new NaveUtils(this);
        
        naveUtils.actionMenu();
        naveUtils.addSkills();

        naveUtils.criarCasa(-46.3, 160, 5);
        naveUtils.criarCasa(-46.3, 190, 6);
        naveUtils.criarCasa(-46.3, 220, 11);
        naveUtils.criarCasa(-46.3, 250, 25);
        naveUtils.criarCasa(-46.3, 290, 19);
        naveUtils.criarCasa(-46.3, 320, 23);
        naveUtils.criarCasa(-46.3, 350, 24);
        naveUtils.criarCasa(-46.3, 390, 35);
        naveUtils.criarCasa(-46.3, 420, 16);
        
        this.soldier = this.add.sprite(
            this.world.width - gameItens.graphics.width - 90,
            180, 
            'soldier'
        );
        
        this.soldier.animations.frame = 13;
        this.soldier.animations.add('down', [0,1,2]);
        this.soldier.animations.add('up', [36, 37, 38]);
        
        this.reloading = this.add.sprite(
            gameItens.graphics.x + (gameItens.graphics.width / 2),
            50,
            'reloading'
        );
        this.reloading.visible = false;
        this.reloading.anchor.set(0.5);
        this.reloading.scale.set(0.4);
        
        this.reloadBtn = this.add.button(
            gameItens.graphics.x + (gameItens.graphics.width / 2), 
            200, 
            'reload', 
            naveUtils.reload, 
            this, 
            1, 0, 2);
            
        this.reloadBtn.anchor.set(0.5);
        this.reloadBtn.scale.set(0.4);
        
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    },
    
    update: function() {
        this.reloading.rotation += 0.10;
        naveUtils.movimentarSoldado();
    }, 
    
    render: function() {
        
    },
    
    pause: function() {
        
    }

};