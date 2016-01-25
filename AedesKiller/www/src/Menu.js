function Menu() {
    var _self = this;
    var menuBloqueado = false;
    
    _self.configurarAcordeon = function() {
        var $accordion = $('.accordion');
        var allPanels = $accordion.find('li.content-accordion').hide();

        $accordion.find('li.titulo-accordion').click(function() {
            if(menuBloqueado) return;
            var data = $(this).data();
            var $conteudo = $(data.conteudo);
            
            if($conteudo.is(':visible')) return;
            
            menuBloqueado = true;
            allPanels.slideUp();
            $conteudo.slideDown(function() {
                menuBloqueado = false;
            });
            
            return false;
        });
    };
    
    _self.construtor = function() {
        _self.configurarAcordeon();
    };
    
    _self.construtor();
    
}

var menu;


$(function(){
    menu = new Menu();
})();