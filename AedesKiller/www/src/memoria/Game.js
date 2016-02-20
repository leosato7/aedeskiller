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
var escolha1 = null;
var escolha2 = null;

var objEscolha1;
var objEscolha2;

var ok_moeda;
var no;
var win2;

var style = { font: "bold 16px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };
var style2 = { font: "bold 28px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

var countText; 
var countTent = 0;
var winTxt;

var countWins = 0;

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
        this.scale.forceLandscape = true;
        
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
        
        this.load.image('dorcabeca', '../asset/memoria/dorcabeca.png');
        this.load.image('dornasjuntas', '../asset/memoria/dornasjuntas.png');
        
        this.load.image('faltadeapetite', '../asset/memoria/faltadeapetite.png');
        this.load.image('manchas', '../asset/memoria/manchas.png');
        
        this.load.image('chikungunya', '../asset/memoria/chikungunya.png');
        this.load.image('dengue', '../asset/memoria/dengue.png');
        
        this.load.image('ciclodevida', '../asset/memoria/ciclodevida.png');
        
        this.load.image('fundocard', '../asset/memoria/fundocard.png');
        
        this.load.image('bg', '../asset/memoria/madeira.jpeg');
        
        this.load.image('home', '../asset/memoria/home.png');
        this.load.image('reset', '../asset/memoria/reset.png');
        
        imgArr.push('febre');
        imgArr.push('olho');
        imgArr.push('dorcabeca');
        imgArr.push('dornasjuntas');
        imgArr.push('faltadeapetite');
        imgArr.push('manchas');
        imgArr.push('chikungunya');
        imgArr.push('dengue');
        imgArr.push('ciclodevida');
        
        this.load.audio('ok_moeda', '../asset/memoria/ok_moeda.mp3');
        this.load.audio('mosquito', '../asset/memoria/Fly.mp3');
        this.load.audio('no', '../asset/memoria/no.mp3');
        
        
        this.load.audio('win2', '../asset/memoria/win2.mp3');
        
        // this.load.spritesheet('button', 'assets/buttons/button_sprite_sheet.png', 193, 71);
        
    },

    create: function () {
        
        
        this.bg = this.add.image(0, 0, "bg");
        
        this.home = this.add.image(540, 140, "home");
        this.home.scale.setTo(0.3, 0.3);
        this.home.inputEnabled = true;
        this.home.name = "btnHome";
        this.home.events.onInputUp.add(home, this);
        
        this.reset = this.add.image(540, 250, "reset");
        this.reset.scale.setTo(0.3, 0.3);
        this.reset.inputEnabled = true;
        this.reset.name = "btnReset";
        this.reset.events.onInputUp.add(reset, this);
        
        this.countTent = this.add.text(540, 3, "Tentativas", style);
        this.countTent.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
                        
        winTxt = this.add.text(540, 65, "", style);
        winTxt.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        
        countText = this.add.text(540, 20, "0", style2);
        countText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
       
        grupo = this.add.group();
        
        ok_moeda = this.add.audio('ok_moeda');
        ok_moeda.volume = 0.5;
        
        win2 = this.add.audio('win2');
        win2.volume = 0.5;
        
        no = this.add.audio('no');
        no.volume = 0.6;
   
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
            imgObj.name = 'card_'+imgArr[i] + "_" + rand_;
            
            grupo.add(imgObj);
            
            
            var imgFundoObj = this.add.image(posicao_.x, posicao_.y, "fundocard");//345, 475
            
            imgFundoObj.scale.setTo(0.14, 0.14);
            imgFundoObj.inputEnabled = true;
            imgFundoObj.name = 'capa_'+imgArr[i] + "_" + rand_;
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
            imgObj.name = 'card_'+imgArr[i] + "_" + rand_;
            
            grupo.add(imgObj);
            
            var imgFundoObj = this.add.image(posicao_.x, posicao_.y, "fundocard");//345, 475
            
            imgFundoObj.scale.setTo(0.14, 0.14);
            imgFundoObj.inputEnabled = true;
            imgFundoObj.name = 'capa_'+imgArr[i] + "_" + rand_;
            imgFundoObj.events.onInputUp.add(listener, this);
            
            grupo.add(imgFundoObj);
            
            //imgObj.events.onInputDown.add(listener, this);
            
            /*var imgFundoObj = this.add.image(posicao_.x, posicao_.y, "fundocard");//345, 475
            
            imgFundoObj.scale.setTo(0.14, 0.14);
            
            imgFundoObj.events.onInputDown.add(listener, this);
            
            grupo.add(imgObj);*/
            
        }
        
        this.stage.backgroundColor = '#CCC';
        
        //this.stage.height = 5000;
        
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

function home(sprite, pointer){
    
    location.href = "../index.html";
    
}

function reset(sprite, pointer){
    
    location.href = "index.html";
    
}

function listener(sprite, pointer){
    
    var vals = sprite.name.split("_");
    
    //console.log("OK_click_ "+sprite.name);
    
    if( escolha1 == null || escolha2 == null ){ sprite.alpha = 0; }
    
    //  This tween will wait 2 seconds before starting
    

    
    
    if( escolha1 == null ){ 
        //imgObj.name = 'card_'+imgArr[i] + "_" + rand_;
        //imgFundoObj.name = 'capa_'+imgArr[i] + "_" + rand_;
        escolha1 = vals[1];
        objEscolha1 = sprite;
        
    }else if( escolha1 != null && escolha2 == null ) {
        
        escolha2 = vals[1];
        objEscolha2 = sprite;
        
        var tween = this.add.tween(sprite).to( { alpha: 0 }, 500, "Linear", true, 500);
        //tween.onStart.add(verificar, this);
        tween.onComplete.add(verificar, this);
    }
    
}

function verificar(){
    
    if( escolha1 != null && escolha2 != null ){
    
        
        
        //testa
        if( escolha1 == escolha2 ){
            
             countWins++;
            
             objEscolha1.destroy();
             objEscolha2.destroy();
            
             escolha1 = null;
             escolha2 = null;
            
             objEscolha1 = null;
             objEscolha2 = null;
            
            if(countWins==9){
                
                win2.play();

                winTxt.text = "Vitória";

            }else{
                
                ok_moeda.play();
            }
             
            
        }else{
            
             no.play();
             objEscolha1.alpha = 1;
             objEscolha2.alpha = 1;
            
             escolha1 = null;
             escolha2 = null;
            
             objEscolha1 = null;
             objEscolha2 = null;
            
        }
        
        countTent++;
        countText.text = ""+countTent;
        
        
    }
    
}