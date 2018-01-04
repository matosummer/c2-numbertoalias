function NumberAlias(bn_,num_) {
    this.LANG = "en";
    this.NUM = num_; 
    this.floatLength = 2;
    this.isCapitalize = true;
    this.typeAlias = "name";
    this.whiteSpace = " ";
    this.decimal = bn_;
  }

NumberAlias.prototype.Convert = function(number) {
    var limit = this.NUM["en"][this.typeAlias].length;
    var indexLog = Math.floor(Math.log10(number));
    var indexName = Math.floor(indexLog/3);
    var _numberAlias = "";  
  
    if(indexName > limit) {
      return "Limit Text";
    }
    else if(indexName <= 1) {
        if(number < Math.pow(10, 3))
            return number.toString();
  
        _numberAlias = parseInt(number / this.decimal.pow(10, 3)); 
    } 
    else {
      var numberAfter = new this.decimal(number).dividedBy(this.decimal.pow(10, indexName * 3));
      var _floatLength = 100 * this.floatLength;
      _numberAlias = new this.decimal(numberAfter)
      .toFixed(this.floatLength);
    }
  
    return _numberAlias + this.whiteSpace + this.GetNameAlias(indexName - 1);
}
  
NumberAlias.prototype.GetNameAlias = function(indexNumber) {
    var _lang = this.LANG;
  
    if(indexNumber >= this.NUM[_lang][this.typeAlias].length)
      _lang = "en";
  
    return this.Capitalize(this.NUM[_lang][this.typeAlias][indexNumber]);
}
  
NumberAlias.prototype.Capitalize = function(str) {
    if(this.isCapitalize && this.typeAlias == "name")
      return str.charAt(0).toUpperCase() + str.slice(1);
    else
      return str;
}
  
NumberAlias.prototype.SetWhiteSpace = function(str) {
    this.whiteSpace = str;
}

NumberAlias.prototype.SetLanguage = function(str) {
    this.LANG = str;
}

NumberAlias.prototype.SetType = function(str) {
    this.typeAlias = str;
}

NumberAlias.prototype.SetCapitalize = function(str) {
    this.isCapitalize = str;
}