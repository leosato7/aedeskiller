function NaveUtils() {
    var _self = this;
    
    _self.criarCasa = function(thisGame, x, y, frame) {
        thisGame.casas = thisGame.add.sprite(
            thisGame.world.width - gameItens.graphics.width + x,
            y, // 160 é o limite para andar em Y
            'casas'
        );

        thisGame.casas.animations.frame = frame;
    };
    
    _self.actionMenu = function(thisGame) {
        gameItens.graphics = thisGame.add.graphics(100, 100);

        // draw a rectangle
        gameItens.graphics.lineStyle(0);
        gameItens.graphics.beginFill(0x000000, 1);
        gameItens.graphics.drawRect(0, 0, 80, 600);
        gameItens.graphics.y = 0;
        gameItens.graphics.x = thisGame.world.width - gameItens.graphics.width;
        
        thisGame.setaUp = thisGame.add.sprite(
            gameItens.graphics.x + (gameItens.graphics.width / 2), // (centerX, centerY) is the center coordination
            thisGame.world.height - 210,
            'seta_up');
            
        thisGame.setaDown = thisGame.add.sprite(
            gameItens.graphics.x + (gameItens.graphics.width / 2), // (centerX, centerY) is the center coordination
            thisGame.world.height - 160,
            'seta_down');
        
        thisGame.setaUp.scale.set(0.4);
        thisGame.setaDown.scale.set(0.4);
        thisGame.setaUp.anchor.set(0.5);
        thisGame.setaDown.anchor.set(0.5);
        
    };
    
    
}

var naveUtils = new NaveUtils();
