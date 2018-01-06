function NumberAlias(bn_,num_) {
    this.LANG = "en";
    this.NUM = num_; 
    this.fixedPointEnable = true;
    this.fixedPointLength = 2;
    this.fixedPointMin = 6;
    this.isCapitalize = true;
    this.typeAlias = "name";
    this.whiteSpace = " ";
    this.decimal = bn_;
    this.limitLength = this.NUM["en"][this.typeAlias].length + 1;
    //1e42 = Limit length number in en * 3
    this.decimal.set({ toExpPos:42, maxE: 42});
  }

NumberAlias.prototype.Convert = function(number) {
    var indexLog = Math.floor(Math.log10(number));
    var _numberAlias = new this.decimal(number);  
    var indexName = Math.floor(indexLog/3);
    if(indexName >= this.limitLength) {
      return "Limit Text";
    }
    else if(indexName <= 1) {
        if(indexLog >= 3)
            _numberAlias = _numberAlias.dividedBy(1000); 
    } 
    else {
        _numberAlias = _numberAlias.dividedBy(this.decimal.pow(10, indexName*3));
    }
  
    if(this.fixedPointEnable && this.fixedPointLength > 0 && indexLog > this.fixedPointMin) {
        _numberAlias = _numberAlias.toFixed(this.fixedPointLength);
    } else {
        _numberAlias = _numberAlias.toFixed(0);
    }

    if(indexLog < 3)
        return _numberAlias.toString();

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
  
NumberAlias.prototype.ConvertToString = function(number) {
    return new this.decimal(number).toString();
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

NumberAlias.prototype.SetFixedPointLength = function(str) {
    this.fixedPointLength = str;
}

NumberAlias.prototype.SetFixedPointMin = function(str) {
    this.fixedPointMin = str;
}

NumberAlias.prototype.EnableFixedPoint = function(str) {
    this.fixedPointEnable = str;
}