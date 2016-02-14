function NaveUtils(thisGame) {
    var _self = this;
    _self.gameScope = thisGame;
    _self.skillMAX = 130; // deve ser relativo aos valores das skills abaixo
    _self.skillNumber = 0;
    _self.reloading = false; // bloqueio, evita bugs.
    _self.skillTimerEvent = null;
    _self.inimigoTimerEvent = null;
    _self.dificuldade = 'medio';
    
    
    _self.addSpearEX = function() {
        _self.gameScope.shoot_0 = _self.gameScope.add.sprite(
            _self.gameScope.soldier.x - 25, // (centerX, centerY) is the center coordination
            _self.gameScope.soldier.y,
            'shoot_0'
        );
        
        _self.gameScope.shoot_0.animations.frame = 0;
        _self.gameScope.shoot_0.scale.set(-1);
        _self.gameScope.shoot_0.anchor.setTo(1);
        
        _self.gameScope.shoot_0.x--;
        
        return _self.gameScope.shoot_0;
    };
    
    _self.addBlackHole = function() {
        _self.gameScope.shoot_1 = _self.gameScope.add.sprite(
            _self.gameScope.soldier.x, // (centerX, centerY) is the center coordination
            _self.gameScope.soldier.y,
            'shoot_1'
        );
        
        _self.gameScope.shoot_1.anchor.setTo(0.5, 0.5);
        
        return _self.gameScope.shoot_1;
    };
    
    _self.addFire = function() {
        _self.gameScope.shoot_2 = _self.gameScope.add.sprite(
            _self.gameScope.soldier.x, // (centerX, centerY) is the center coordination
            _self.gameScope.soldier.y,
            'shoot_2'
        );
        
        _self.gameScope.shoot_2.animations.add('st2', [0, 1, 2, 3, 4, 5, 6, 7]);
        _self.gameScope.shoot_2.animations.play('st2', 10, true);
        _self.gameScope.shoot_2.scale.set(1.4);
        _self.gameScope.shoot_2.anchor.setTo(1, 0);
        
        return _self.gameScope.shoot_2;
    };
    
    _self.addIce = function() {
        _self.gameScope.shoot_3 = _self.gameScope.add.sprite(
            _self.gameScope.soldier.x, // (centerX, centerY) is the center coordination
            _self.gameScope.soldier.y,
            'shoot_3'
        );
        
        _self.gameScope.shoot_3.animations.add('st3', [0, 1]);
        _self.gameScope.shoot_3.animations.play('st3', 5, true);
        _self.gameScope.shoot_3.scale.setTo(-3, 6);
        _self.gameScope.shoot_3.anchor.setTo(0, 0.5);
        
        return _self.gameScope.shoot_3;
    };
    
    _self.addThunder = function() {
        _self.gameScope.shoot_4 = _self.gameScope.add.sprite(
            _self.gameScope.soldier.x, // (centerX, centerY) is the center coordination
            _self.gameScope.soldier.y,
            'shoot_4'
        );
        
        _self.gameScope.shoot_4.animations.add('st4', [0, 1]);
        _self.gameScope.shoot_4.animations.play('st4', 5, true);
        _self.gameScope.shoot_4.scale.set(0.8);
        _self.gameScope.shoot_4.anchor.setTo(1, 0);
        
        return _self.gameScope.shoot_4;
    };
    
    _self.addVenon = function() {
        _self.gameScope.shoot_5 = _self.gameScope.add.sprite(
            _self.gameScope.soldier.x, // (centerX, centerY) is the center coordination
            _self.gameScope.soldier.y,
            'shoot_5'
        );
        
        _self.gameScope.shoot_5.animations.add('st5', [0, 1, 2, 3]);
        _self.gameScope.shoot_5.animations.play('st5', 8, true);
        _self.gameScope.shoot_5.scale.set(3);
        _self.gameScope.shoot_5.anchor.setTo(1, 0.5);
        
        return _self.gameScope.shoot_5;
    };
    
    
    
    _self.addInimigo = function(inimigoNum, posY) {
        _self.gameScope.inimigo = _self.gameScope.add.sprite(
            -15,
            posY,
            _self.inimigos[_self.dificuldade][inimigoNum].sprite
        );
        
        if(_self.inimigos[_self.dificuldade][inimigoNum].spritePos.length > 0) {
            _self.gameScope.inimigo.animations.add('inimigoplay', _self.inimigos[_self.dificuldade][inimigoNum].spritePos);
            _self.gameScope.inimigo.animations.play('inimigoplay', 10, true);
        }
        
        _self.gameScope.inimigo.scale.set(_self.inimigos[_self.dificuldade][inimigoNum].scale);
        _self.gameScope.inimigo.anchor.setTo(0, _self.inimigos[_self.dificuldade][inimigoNum].anchorY);            
    
        return _self.gameScope.inimigo;
    };
    
    
    // a chance é o máximo em random, a % de chances varia pelo espaço ocupado
    // com 160 no max as chances de VENON é uma média de 3,125%
    _self.skills = [
        // {nome, chances de ativar, tempo de recarga em milisegundos, função de criação, objetos em mundo, velocidade do tiro}
        {name: "LANÇA \nEX", chance: [21, 45], time: 1200, func: _self.addSpearEX, objetos: [], speed: 1.4, limitX: 0, rotation: 0}, // 25x
        {name: "BLACK \nHOLE", chance: [6, 20], time: 13000, func: _self.addBlackHole, objetos: [], speed: 0.4, limitX: _self.gameScope.world.centerX - 40, rotation: 0.10}, // 15x
        {name: "FIRE", chance: [76, 105], time: 2300, func: _self.addFire, objetos: [], speed: 0.8, limitX: 0, rotation: 0}, // 30x
        {name: "ICE", chance: [106, 130], time: 5500, func: _self.addIce, objetos: [], speed: 0, limitX: 0, rotation: 0}, // 25x
        {name: "THUNDER", chance: [46, 75], time: 3300, func: _self.addThunder, objetos: [], speed: 3, limitX: 0, rotation: 0}, // 30x
        {name: "VENON", chance: [0, 5], time: 16000, func: _self.addVenon, objetos: [], speed: 0.2, limitX: _self.gameScope.world.centerX + 70, rotation: 0} // 5x
    ];
    
    _self.inimigos = {
        medio: [
            {name: "Mosquito", chance: [], func: _self.addInimigo, objetos:[], speed: 0.7, spritePos: [24, 25, 26], sprite: 'mosquito', scale: 1, anchorY: 0},
            {name: "Dengue", chance: [], func: _self.addInimigo, objetos:[], speed: 2.3, spritePos: [72, 73, 74], sprite: 'mosquito', scale: 1, anchorY: 0},
            {name: "Dengão", chance: [], func: _self.addInimigo, objetos:[], speed: 0.4, spritePos: [0, 1, 2, 3, 4], sprite: 'mosquito_boss_1', scale: 0.4, anchorY: 0.5},
            {name: "Dengão Mortífero", chance: [], func: _self.addInimigo, objetos:[], speed: 0.2, spritePos: [], sprite: 'mosquito_boss_2', scale: 0.6, anchorY: 0.7}
        ],
        dificil: [
            {name: "Mosquito", chance: [], func: _self.addInimigo, objetos:[], speed: 0.6, spritePos: [24, 25, 26], sprite: 'mosquito', scale: 1, anchorY: 0},
            {name: "Dengue", chance: [], func: _self.addInimigo, objetos:[], speed: 2, spritePos: [72, 73, 74], sprite: 'mosquito', scale: 1, anchorY: 0},
            {name: "Dengão", chance: [], func: _self.addInimigo, objetos:[], speed: 0.6, spritePos: [0, 1, 2, 3, 4], sprite: 'mosquito_boss_1', scale: 0.4, anchorY: 0.5},
            {name: "Dengão Mortífero", chance: [], func: _self.addInimigo, objetos:[], speed: 0.3, spritePos: [], sprite: 'mosquito_boss_2', scale: 0.6, anchorY: 0.7}
        ]     
    };
    
    // os espaços movimentados ficam apenas em Y
    // os mosquitos se movimentam em X mas eles só possuem posições Y
    // que o player possa andar
    _self.movimentacao = {
        blocosMovimentos: [160, 200, 240, 280, 320],
        blocoAtual: 0,
        mover: 0 // 1 sobe, -1 desce, 0 parado
    };
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
        if(_self.movimentacao.mover != 0) return;
        _self.gameScope.soldier.animations.play('up', 10, true);
        _self.movimentacao.mover = 1;
    };
    
    _self.btnDownActive = function() {
        if(_self.movimentacao.mover != 0) return;
        _self.gameScope.soldier.animations.play('down', 10, true);
        _self.movimentacao.mover = -1;
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
    
    _self.skillCharging = function() {
        gameItens.textChargeBar = _self.gameScope.add.text(
            gameItens.graphics.x + (gameItens.graphics.width / 2),
            5,
            "", 
            {
                font: "15px Arial",
                fill: "#00f400",
                align: "center"
            }
        );

        gameItens.textChargeBar.anchor.setTo(0.5, 0);
    };
    
    _self.abrirChargeTime = function(txt) {
        gameItens.textChargeBar.visible = true;
        gameItens.textChargeBar.setText(txt + 's');
    };
    
    _self.removerChargeTime = function() {
        gameItens.textChargeBar.visible = false;
        gameItens.textChargeBar.setText('');
    };
    
    _self.reload = function() {
        if(_self.reloading) return;
        
        _self.reloading = true;
        _self.gameScope.reloading.visible = true;
        _self.hideSkills();
        gameItens.textAcSkill.setText('???');
        
        _self.gameScope.time.events.add(Phaser.Timer.SECOND * 3, function(){
            _self.gameScope.time.events.remove(_self.skillTimerEvent);
            _self.limparSkillArray(_self.skillNumber);
            _self.skillNumber = _self.getRandomSkill();
            _self.gameScope.reloading.visible = false;
            _self.gameScope['sk_'+_self.skillNumber].visible = true;
            gameItens.textAcSkill.setText(_self.skills[_self.skillNumber].name);
            _self.dispararSkill(_self.skills[_self.skillNumber].time);
            _self.reloading = false;
        }, _self.gameScope);
        
    };
    
    _self.nascerInimigo = function(time) {
        _self.inimigoTimerEvent = _self.gameScope.time.events.add(time, function(){
            
            // são 3 random, 1 para o inimigo, tempo e outro para o local
            var dados = {
                sprite: _self.inimigos[_self.dificuldade][0].func(0, _self.movimentacao.blocosMovimentos[2]),
                life: 10,
                effectSprite: null
            };
            
            _self.inimigos[_self.dificuldade][0].objetos.push(dados);
            
            _self.nascerInimigo(1000);
            
        }, _self.gameScope);
    };
    
    // ATENÇÃO: Função recursiva!
    _self.dispararSkill = function(shootTime) {
        _self.skillTimerEvent = _self.gameScope.time.events.add(shootTime, function(){
            _self.removerChargeTime();
            _self.skills[_self.skillNumber].objetos.push(
                _self.skills[_self.skillNumber].func()
            );
            _self.dispararSkill(_self.skills[_self.skillNumber].time);
        }, _self.gameScope);
    };
    
    _self.movimentarSoldado = function() {
        if(_self.movimentacao.mover != 0) {
            _self.skillTimerEvent.timer.pause();
            if(_self.movimentacao.mover > 0) {
                // subir
                if(_self.movimentacao.blocoAtual >= 0) {
                    if(_self.gameScope.soldier.y > _self.movimentacao.blocosMovimentos[_self.movimentacao.blocoAtual - 1]) {
                        _self.gameScope.soldier.y -= 1;
                    } else {
                        _self.movimentacao.blocoAtual--;
                        _self.movimentacao.mover = 0;
                    }
                } else {
                    _self.movimentacao.blocoAtual = 0;
                    _self.movimentacao.mover = 0;
                }
            } else if (_self.movimentacao.mover < 0) {
                // descer
                if(_self.movimentacao.blocoAtual < _self.movimentacao.blocosMovimentos.length) {
                    if(_self.gameScope.soldier.y < _self.movimentacao.blocosMovimentos[_self.movimentacao.blocoAtual + 1]) {
                        _self.gameScope.soldier.y += 1;
                    } else {
                        _self.movimentacao.blocoAtual++;
                        _self.movimentacao.mover = 0;
                    }
                } else {
                    _self.movimentacao.blocoAtual = _self.movimentacao.blocosMovimentos.length - 1;
                    _self.movimentacao.mover = 0;
                }
            }
        } else {
            _self.skillTimerEvent.timer.resume();
            _self.gameScope.soldier.animations.frame = 13;        
        }
    };
    
    _self.movimentarInimigos = function() {
        for(var i in _self.inimigos[_self.dificuldade]) {
            if(_self.inimigos[_self.dificuldade][i].objetos.length > 0) {
                for(var j in _self.inimigos[_self.dificuldade][i].objetos){
                    var limit = (_self.gameScope.world.width - gameItens.graphics.width) - 50;
                    _self.inimigos[_self.dificuldade][i].objetos[j].sprite.x += _self.inimigos[_self.dificuldade][i].speed;

                    if(_self.inimigos[_self.dificuldade][i].objetos[j].sprite.x >= limit) {
                        _self.inimigos[_self.dificuldade][i].objetos[j].sprite.destroy(); // elimina da memória
                    }

                }
            }
        }
    };
    
    _self.movimentarSkills = function() {
        for(var i in _self.skills) {
            if(_self.skills[i].objetos.length > 0) {
                for(var j in _self.skills[i].objetos) {
                    var objShoot = _self.skills[i].objetos[j];
                    if(objShoot.x > _self.skills[i].limitX) {
                        objShoot.x -= _self.skills[i].speed;
                    }
                    objShoot.rotation += _self.skills[i].rotation;
                        
                    if(i == 1 || i == 3 || i == 5) {
                        if(_self.skills[i].speed == 0) {
                            _self.fadeSkill(objShoot);
                        } else {
                            if(objShoot.x <= _self.skills[i].limitX) {
                                _self.fadeSkill(objShoot);
                            }
                        }
                    } else {
                        if(objShoot.x <= 0) {
                            objShoot.destroy(); // elimina da memória
                        }
                    }
                }
            }
        }
    };
    
    _self.fadeSkill = function(item) {
        var tween = _self.gameScope.add.tween(item);
        tween.to( { alpha: 0 }, 3000, Phaser.Easing.Linear.None);
        tween.onComplete.add(function() {
            item.destroy();
        }, _self.gameScope);
        tween.start();
    };
    
    // ATENÇÃO COM ESTA FUNÇÃO, ELA ALIVIA A MÉMORIA EM 2 CASOS CRÍTICOS
    // 1 - A CADA VEZ QUE A SKILL É TROCADA LIMPANDO O ARRAY DA SKILL ANTIGA
    // 2 - NO RENDER IMPEDE QUE O ARRAY SE ACUMULE EM ESCALA MAIOR DO QUE A VISIVEL NO PALCO MAS SÓ VALE PARA A POSIÇÃO DA SKILL
    // AS DEMAIS JÁ SÃO LIMPADAS PELO CASO 1 ESTARÃO MENORES QUE 5 OU 6 ELEMENTOS SENDO ASSIM NÃO SERÁ GRANDE PROBLEMA.
    _self.limparSkillArray = function(numeroSkill) {
        for(var j in _self.skills[numeroSkill].objetos) {
            if(!_self.skills[numeroSkill].objetos[j].alive) {
                _self.skills[numeroSkill].objetos.splice(j, 1);
            }
        }
    };
    
    // LIMPA DA MEMÓRIA ARRAY DE INIMIGOS QUE NÃO ESTÃO VIVOS
    _self.limparInimigosArray = function() {
        for(var i in _self.inimigos[_self.dificuldade]) {
            if(_self.inimigos[_self.dificuldade][i].objetos.length > 0) {
                for(var j in _self.inimigos[_self.dificuldade][i].objetos){
                    if(!_self.inimigos[_self.dificuldade][i].objetos[j].sprite.alive) {
                        _self.inimigos[_self.dificuldade][i].objetos.splice(j, 1); // elimina da memória
                    }
                }
            }
        }
    };
    
}

