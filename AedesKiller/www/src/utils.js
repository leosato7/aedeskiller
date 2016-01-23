function Utils() {
    var _self = this;
    _self.message;
    
    
    _self.construtor = function() {
        //
        
        // agora antes disso teria um código 
        // para descobrir o idioma do aparelho
        _self.message = lang["BR"];
        
    };
    
    _self.construtor();
    
}

var utils;

(function() {
    utils = new Utils();
})();

