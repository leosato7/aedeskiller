function Utils() {
    var _self = this;
    _self.message;
    
    /* 
     * @func: replaceAllString(String contentVal, String oldVal, String newVal)
     * @descr: faz replace em todos os locais onde for encontrado o oldVal.
     * @returns String
     */
    _self.replaceAllString = function (contentVal, oldVal, newVal) {
        try {
            var regExp = new RegExp(oldVal, "g");
            contentVal = contentVal.replace(regExp, newVal);
            return contentVal;
        } catch (e) {
            console.log(e.message);
            return contentVal;
        }
    };
    
    /* FUNCÃO INCOMPLETA E MÃO TESTADA
     * @func: (<String> templateRapido, Object params)
     * @descr: Retorna a traduÃ§Ã£o do template enviado jÃ¡ com as variaveis preenchidas.
     * @returns <String> html
     */
    _self.replaceKeys = function (html, params) {
        for (var i in params) {
            var regExp = new RegExp('{' + i + '}', "g");
            html = html.replace(regExp, params[i]);
        }

        return html;
    };
    
    /*
     * @func: tryParseInt(String str, Int defaultValue)
     * @descr: Retorna o valor convertido para Int, se nÃ£o possÃ­vel retorna o defaultValue.
     * @returns Int retValue
     */
    _self.tryParseInt = function (str, defaultValue) {
        str = _self.isUndefined(typeof str) ? null : str;

        if (typeof str == 'number')
            return str;

        var retValue = defaultValue;
        if (str !== null) {
            if (str.length > 0) {
                if (!isNaN(str)) {
                    retValue = parseInt(str);
                }
            }
        }
        return retValue;
    };


    /*
     * @func: tryParseFloat(<String> str, <Float> defaultValue)
     * @descr: Retorna o valor convertido para Float, se nÃ£o possÃ­vel retorna o defaultValue.
     * @dependence <Function> replaceAllString() 
     * @returns <Float> retValue
     */
    _self.tryParseFloat = function (str, defaultValue) {
        str = _self.isUndefined(typeof str) ? null : str;

        if (typeof str == 'number')
            return str;

        var retValue = defaultValue;
        if (str !== null) {
            if (str.length > 0) {
                str = str.replace(/\./g, '');
                str = _self.replaceAllString(str, ',', '.');
                if (!isNaN(str)) {
                    retValue = parseFloat(str);
                }
            }
        }
        return retValue;
    };

    
    
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

