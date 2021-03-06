﻿// ECMAScript 5 strict mode
"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

/////////////////////////////////////
// Plugin class
cr.plugins_.NumberToAlias = function(runtime)
{
	this.runtime = runtime;
};

(function ()
{
	var pluginProto = cr.plugins_.NumberToAlias.prototype;
	
	/////////////////////////////////////
	// Object type class
	pluginProto.Type = function(plugin)
	{
		this.plugin = plugin;
		this.runtime = plugin.runtime;
	};

	var typeProto = pluginProto.Type.prototype;

	// called on startup for each object type
	typeProto.onCreate = function()
	{
	};

	/////////////////////////////////////
	// Instance class
	pluginProto.Instance = function(type)
	{
		this.type = type;
		this.runtime = type.runtime;
		this.nta = new NumberAlias(Decimal,NUM);
	};
	
	var instanceProto = pluginProto.Instance.prototype;

	// called whenever an instance is created
	instanceProto.onCreate = function()
	{
		// note the object is sealed after this call; ensure any properties you'll ever need are set on the object
		// e.g...
		// this.myValue = 0;
	};
	
	// called whenever an instance is destroyed
	// note the runtime may keep the object after this call for recycling; be sure
	// to release/recycle/reset any references to other objects in this function.
	instanceProto.onDestroy = function ()
	{
	};
	
	// called when saving the full state of the game
	instanceProto.saveToJSON = function ()
	{
		// return a Javascript object containing information about your object's state
		// note you MUST use double-quote syntax (e.g. "property": value) to prevent
		// Closure Compiler renaming and breaking the save format
		return {
			// e.g.
			//"myValue": this.myValue
		};
	};
	
	// called when loading the full state of the game
	instanceProto.loadFromJSON = function (o)
	{
		// load from the state previously saved by saveToJSON
		// 'o' provides the same object that you saved, e.g.
		// this.myValue = o["myValue"];
		// note you MUST use double-quote syntax (e.g. o["property"]) to prevent
		// Closure Compiler renaming and breaking the save format
	};
	
	// only called if a layout object - draw to a canvas 2D context
	instanceProto.draw = function(ctx)
	{
	};
	
	// only called if a layout object in WebGL mode - draw to the WebGL context
	// 'glw' is not a WebGL context, it's a wrapper - you can find its methods in GLWrap.js in the install
	// directory or just copy what other plugins do.
	instanceProto.drawGL = function (glw)
	{
	};
	
	// The comments around these functions ensure they are removed when exporting, since the
	// debugger code is no longer relevant after publishing.
	/**BEGIN-PREVIEWONLY**/
	instanceProto.getDebuggerValues = function (propsections)
	{
		// Append to propsections any debugger sections you want to appear.
		// Each section is an object with two members: "title" and "properties".
		// "properties" is an array of individual debugger properties to display
		// with their name and value, and some other optional settings.
		propsections.push({
			"title": "My debugger section",
			"properties": []
		});
	};
	
	instanceProto.onDebugValueEdited = function (header, name, value)
	{
		// Called when a non-readonly property has been edited in the debugger. Usually you only
		// will need 'name' (the property name) and 'value', but you can also use 'header' (the
		// header title for the section) to distinguish properties with the same name.
		if (name === "My property")
			this.myProperty = value;
	};
	/**END-PREVIEWONLY**/

	//////////////////////////////////////
	// Conditions
	function Cnds() {};

	pluginProto.cnds = new Cnds();
	
	//////////////////////////////////////
	// Actions
	function Acts() {};

	Acts.prototype.SetLanguage = function(lang_) {
		switch (lang_) {
			case 0: lang_ = "en"; break;
			case 1: lang_ = "id"; break;
		}
		this.nta.SetLanguage(lang_);
	}

	Acts.prototype.SetType = function(type_) {
		switch (type_) {
			case 0: type_ = "name"; break;
			case 1: type_ = "symbol"; break;
		}
		this.nta.SetType(type_);
	}
	
	Acts.prototype.SetWhiteSpace = function(whitespace_) {
		this.nta.SetWhiteSpace(whitespace_);
	}

	Acts.prototype.IsCapitalize = function(type_) {
		switch (type_) {
			case 0: type_ = true; break;
			case 1: type_ = false; break;
		}
		this.nta.SetCapitalize(type_);
	}

	Acts.prototype.SetFixedPoint = function(enable_, length_, minDisplay_) {
		switch (enable_) {
			case 0: enable_ = true; break;
			case 1: enable_ = false; break;
		}
		this.nta.EnableFixedPoint(enable_);

		this.nta.SetFixedPointLength(length_);

		this.nta.SetFixedPointMin(minDisplay_);
	}
	pluginProto.acts = new Acts();
	
	//////////////////////////////////////
	// Expressions
	function Exps() {};

	Exps.prototype.Convert = function (ret, number_)
	{
		if(typeof number_ === "string" && number_.length === 0) {
			ret.set_string("0");
			return;
		}

		ret.set_string(this.nta.Convert(number_));
	}
	
	Exps.prototype.ToString = function(ret, number_)
	{
		if(typeof number_ === "string" && number_.length === 0) {
			ret.set_string("0");
			return;
		}
		
		ret.set_string(this.nta.ConvertToString(number_));
	}

	pluginProto.exps = new Exps();

}());