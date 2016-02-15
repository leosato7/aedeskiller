/* globals Phaser:false */
// create BasicGame Class
// menu e configuracoes gerais
var BasicGame = {

};

var imgWidth = 152;
var imgHeight = 208;
var imgSpace = 3;
var imgArr = new Array(); 
var grupo;

var posicao = new Array(); //[1:{3,3}, ];

    posicao[1] = {x:3, y:3};
    posicao[2] = {x:90, y:3};
    posicao[3] = {x:180, y:3};
    posicao[4] = {x:270, y:3};
    posicao[5] = {x:360, y:3};
    posicao[6] = {x:450, y:3};

    posicao[7] = {x:3, y:118};
    posicao[8] = {x:90, y:118};
    posicao[9] = {x:180, y:118};
    posicao[10] = {x:270, y:118};
    posicao[11] = {x:360, y:118};
    posicao[12] = {x:450, y:118};

    posicao[13] = {x:3, y:235};
    posicao[14] = {x:90, y:235};
    posicao[15] = {x:180, y:235};
    posicao[16] = {x:270, y:235};
    posicao[17] = {x:360, y:235};
    posicao[18] = {x:450, y:235};

// create Game function in BasicGame
BasicGame.Game = function (game) {
};

// set Game function prototype
BasicGame.Game.prototype = {

    init: function () {
        
         /* var height = window.innerHeight;
          var width = window.innerWidth;

          this.width = width;
          this.height = height;
        
          this.camera.setSize(width, height);
        
        this.stage.bounds.width = width;
        this.stage.bounds.height = height;*/
        
        
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
        this.scale.forceOrientation( true, false);
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
        this.load.image('logo', '../asset/memoria/febre.png');
        
        this.load.image('febre', '../asset/memoria/febre.png');
        this.load.image('olho', '../asset/memoria/olhos.png');
        
        this.load.image('img1', '../asset/memoria/febre.png');
        this.load.image('img2', '../asset/memoria/febre.png');
        
        this.load.image('img3', '../asset/memoria/febre.png');
        this.load.image('img4', '../asset/memoria/febre.png');
        
        this.load.image('img5', '../asset/memoria/febre.png');
        this.load.image('img6', '../asset/memoria/febre.png');
        
        this.load.image('img7', '../asset/memoria/febre.png');
        
        this.load.image('fundocard', '../asset/memoria/fundocard.png');
        
        this.load.image('img1', '../asset/memoria/febre.png');
        
        imgArr.push('febre');
        imgArr.push('olho');
        imgArr.push('img1');
        imgArr.push('img2');
        imgArr.push('img3');
        imgArr.push('img4');
        imgArr.push('img5');
        imgArr.push('img6');
        imgArr.push('img7');
        
        // this.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
        
    },

    create: function () {
       
        grupo = this.add.group();
        
        var arrBusca = new Array();
            arrBusca.push(20);
        
        var rand_;
        
        for( var i=0; i<imgArr.length; i++ ){
            
            /***
            *  IMG 1
            */
            rand_ = Math.floor((Math.random() * 18) + 1);
            
            while( checkPosicao(rand_, arrBusca)  ){
                
                rand_ = Math.floor((Math.random() * 18) + 1)
                
            }
            
            arrBusca.push(rand_);
            
            posicao_ = posicao[rand_];
            
            //console.log("I="+i+" rand_="+rand_);
            
            var imgObj = this.add.image(posicao_.x, posicao_.y, imgArr[i]);//345, 475
            
            imgObj.scale.setTo(0.14, 0.14);
            
            grupo.add(imgObj);
            
            
            
            var imgFundoObj = this.add.image(posicao_.x, posicao_.y, "fundocard");//345, 475
            
            imgFundoObj.scale.setTo(0.14, 0.14);
            imgFundoObj.inputEnabled = true;
            imgFundoObj.name = rand_;
            imgFundoObj.events.onInputUp.add(listener, this);
            
            grupo.add(imgFundoObj);
            
            
            /***
            *  IMG COPIA
            */
            rand_ = Math.floor((Math.random() * 18) + 1);
            
            while( checkPosicao(rand_, arrBusca)  ){
                
                rand_ = Math.floor((Math.random() * 18) + 1)
                
            }
            
            arrBusca.push(rand_);
            
            posicao_ = posicao[rand_];
            //console.log("I="+i+" rand_="+rand_+" -- COPIA");
            
            var imgObj = this.add.image(posicao_.x, posicao_.y, imgArr[i]);//345, 475
            
            imgObj.scale.setTo(0.14, 0.14);
            
            grupo.add(imgObj);
            
            
            
            var imgFundoObj = this.add.image(posicao_.x, posicao_.y, "fundocard");//345, 475
            
            imgFundoObj.scale.setTo(0.14, 0.14);
            imgFundoObj.inputEnabled = true;
            imgFundoObj.name = rand_;
            imgFundoObj.events.onInputUp.add(listener, this);
            
            grupo.add(imgFundoObj);
            
            //imgObj.events.onInputDown.add(listener, this);
            
            /*var imgFundoObj = this.add.image(posicao_.x, posicao_.y, "fundocard");//345, 475
            
            imgFundoObj.scale.setTo(0.14, 0.14);
            
            imgFundoObj.events.onInputDown.add(listener, this);
            
            grupo.add(imgObj);*/
            
        }
        
        this.stage.backgroundColor = '#CCC';
        
    },

    gameResized: function (width, height) {

        // This could be handy if you need to do any extra processing if the 
        // game resizes. A resize could happen if for example swapping 
        // orientation on a device or resizing the browser window. Note that 
        // this callback is only really useful if you use a ScaleMode of RESIZE 
        // and place it inside your main game state.

    }

};

function checkPosicao(valor, arrBusca){
    
    //console.log(valor);
    
    for( i=0; i<arrBusca.length; i++ ){
        
        if(valor==arrBusca[i]) return true;
        
    }
    
    return false;
}


function listener(sprite, pointer){
    
    console.log("OK_click_ "+sprite.name);
    sprite.alpha = 0;
}