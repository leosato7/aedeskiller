function NaveUtils(thisGame) {
    var _self = this;
    _self.gameScope = thisGame;
    _self.skillMAX = 130; // deve ser relativo aos valores das skills abaixo
    _self.skillNumber = 0;
    _self.reloading = false; // bloqueio, evita bugs.
    
    // a chance é o máximo em random, a % de chances varia pelo espaço ocupado
    // com 160 no max as chances de VENON é de 3,125%
    _self.skills = [
        // {nome, chances de ativar, tempo de recarga em segundos}
        {name: "LANÇA \nEX", chance: [21, 45], time: 2}, // 25x
        {name: "BLACK \nHOLE", chance: [6, 20], time: 40}, // 15x
        {name: "FIRE", chance: [76, 105], time: 3}, // 30x
        {name: "ICE", chance: [106, 130], time: 9}, // 25x
        {name: "THUNDER", chance: [46, 75], time: 5}, // 30x
        {name: "VENON", chance: [0, 5], time: 23} // 5x
    ];
    
    _self.getRandomSkill = function() {
        var num = Math.floor(Math.random() * _self.skillMAX);

        for(var i = 0; i<_self.skills.length; i++) {
            if(_self.skills[i].chance[0] <= num && _self.skills[i].chance[1] >= num) {
                return i;
            }
        }
        
        return 0;
    };
    
    _self.hideSkills = function() {
        for(var i = 0; i < _self.skills.length; i++) {
            _self.gameScope['sk_'+i].visible = false;
        }
    };
    
    _self.addSkills = function() {
        for(var i = 0; i < _self.skills.length; i++) {
            _self.gameScope['sk_'+i] = _self.gameScope.add.sprite(
                gameItens.graphics.x + (gameItens.graphics.width / 2),
                50,
                'sk_'+i
            );

            _self.gameScope['sk_'+i].anchor.set(0.5);
            _self.gameScope['sk_'+i].visible = false;
        }
        _self.gameScope['sk_'+_self.skillNumber].visible = true;
    };
    
    _self.criarCasa = function(x, y, frame) {
        _self.gameScope.casas = _self.gameScope.add.sprite(
            _self.gameScope.world.width - gameItens.graphics.width + x,
            y, // 160 é o limite para andar em Y
            'casas'
        );

        _self.gameScope.casas.animations.frame = frame;
    };
    
    _self.btnUpActive = function() {
        _self.gameScope.soldier.animations.play('up', 10, true);
    };
    
    _self.btnDownActive = function() {
        _self.gameScope.soldier.animations.play('down', 10, true);
    };
    
    _self.actionMenu = function() {
        gameItens.graphics = _self.gameScope.add.graphics(100, 100);

        // draw a rectangle
        gameItens.graphics.lineStyle(0);
        gameItens.graphics.beginFill(0x000000, 1);
        gameItens.graphics.drawRect(0, 0, 80, 600);
        gameItens.graphics.y = 0;
        gameItens.graphics.x = _self.gameScope.world.width - gameItens.graphics.width;
                    
        _self.gameScope.setaUp = _self.gameScope.add.button(
            gameItens.graphics.x + (gameItens.graphics.width / 2), 
            _self.gameScope.world.height - 210, 
            'seta_up', 
            _self.btnUpActive, 
            _self.gameScope, 
            1, 0, 2);
            
        _self.gameScope.setaDown = _self.gameScope.add.button(
            gameItens.graphics.x + (gameItens.graphics.width / 2), 
            _self.gameScope.world.height - 160, 
            'seta_down', 
            _self.btnDownActive, 
            _self.gameScope, 
            1, 0, 2);

        _self.gameScope.setaUp.scale.set(0.4);
        _self.gameScope.setaDown.scale.set(0.4);
        _self.gameScope.setaUp.anchor.set(0.5);
        _self.gameScope.setaDown.anchor.set(0.5);
        
        
        gameItens.textAcSkill = _self.gameScope.add.text(
            gameItens.graphics.x + (gameItens.graphics.width / 2),
            90,
            _self.skills[_self.skillNumber].name, 
            {
                font: "15px Arial",
                fill: "#00f400",
                align: "center"
            }
        );

        gameItens.textAcSkill.anchor.setTo(0.5, 0);
        
    };
    
    _self.reload = function() {
        if(_self.reloading) return;
        
        _self.reloading = true;
        _self.gameScope.reloading.visible = true;
        _self.hideSkills();
        gameItens.textAcSkill.setText('???');

        _self.gameScope.time.events.add(Phaser.Timer.SECOND * 3, function(){
            _self.skillNumber = _self.getRandomSkill();
            _self.gameScope.reloading.visible = false;
            _self.gameScope['sk_'+_self.skillNumber].visible = true;
            gameItens.textAcSkill.setText(_self.skills[_self.skillNumber].name);
            _self.reloading = false;
        }, _self.gameScope);
        
    };
    
}

