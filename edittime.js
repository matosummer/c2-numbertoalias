function GetPluginSettings()
{
	return {
		"name":			"NumberToAlias",				// as appears in 'insert object' dialog, can be changed as long as "id" stays the same
		"id":			"NumberToAlias",				// this is used to identify this plugin and is saved to the project; never change it
		"version":		"1.0",					// (float in x.y format) Plugin version - C2 shows compatibility warnings based on this
		"description":	"Number to alias/symbol",
		"author":		"Chezt",
		"help url":		"https://www.scirra.com/forum/viewtopic.php?t=199223",
		"category":		"General",				// Prefer to re-use existing categories, but you can set anything here
		"type":			"object",				// either "world" (appears in layout and is drawn), else "object"
		"rotatable":	true,					// only used when "type" is "world".  Enables an angle property on the object.
		"dependency":	"decimal.min.js;NumberToAlias.js;NumberToAlias_Number.js",
		"flags":		pf_singleglobal
	};
};

////////////////////////////////////////
// Parameter types:
// AddNumberParam(label, description [, initial_string = "0"])			// a number
// AddStringParam(label, description [, initial_string = "\"\""])		// a string
// AddAnyTypeParam(label, description [, initial_string = "0"])			// accepts either a number or string
// AddCmpParam(label, description)										// combo with equal, not equal, less, etc.
// AddComboParamOption(text)											// (repeat before "AddComboParam" to add combo items)
// AddComboParam(label, description [, initial_selection = 0])			// a dropdown list parameter
// AddObjectParam(label, description)									// a button to click and pick an object type
// AddLayerParam(label, description)									// accepts either a layer number or name (string)
// AddLayoutParam(label, description)									// a dropdown list with all project layouts
// AddKeybParam(label, description)										// a button to click and press a key (returns a VK)
// AddAnimationParam(label, description)								// a string intended to specify an animation name
// AddAudioFileParam(label, description)								// a dropdown list with all imported project audio files

////////////////////////////////////////
// Conditions


////////////////////////////////////////
// Actions

AddComboParamOption("Name");
AddComboParamOption("Symbol");
AddComboParam("Type", "Choose type.", 0);
AddAction(0, af_none, "Set Type", "", "Set Type <b>{0}</b>", "choose type number or symbol", "SetType");

AddComboParamOption("English");
AddComboParamOption("Indonesia");
AddComboParam("Language", "Choose language.", 0);
AddAction(1, af_none, "Set Type", "", "Set Language <b>{0}</b>", "choose language", "SetLanguage");

AddStringParam("Whitespace", "Set whitespace.", "\" \"");
AddAction(2, af_none, "Set Whitespace", "", "Set whitespace <b>{0}</b>", "Set Whitespace", "SetWhiteSpace");

AddComboParamOption("True");
AddComboParamOption("False");
AddComboParam("Capitalize", "Is Capitalize", 0);
AddAction(3, af_none, "Is Capitalize", "", "Is Capitalize <b>{0}</b>", "Is Capitalize", "SetCapitalize");

AddComboParamOption("True");
AddComboParamOption("False");
AddComboParam("Enable Fixed Point", "Is fixed point enabled", 0);
AddNumberParam("Length", "Length fixed point if enabled", 2);
AddNumberParam("Minimum to display", "Minimum digit to display fixed point, ex: 1M = 6", 6);
AddAction(4, af_none, "Fixed Point", "", "Fixed point <b>{0}</b>, Length <b>{1}</b>, Minimum Length <b>{2}</b>", "Fixed Point", "SetFixedPoint");

////////////////////////////////////////
// Expressions

AddAnyTypeParam("Number", "Number to convert.");
AddExpression(0, ef_return_string, "Get Text", "Convert int to alias", "Convert", "Return string.");

AddAnyTypeParam("Number", "Number to convert.");
AddExpression(1, ef_return_string, "Get Text", "Convert exponential to string", "ToString", "Return string.");

////////////////////////////////////////
ACESDone();

var property_list = [];
	
// Called by IDE when a new object type is to be created
function CreateIDEObjectType()
{
	return new IDEObjectType();
}

// Class representing an object type in the IDE
function IDEObjectType()
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
}

// Called by IDE when a new object instance of this type is to be created
IDEObjectType.prototype.CreateInstance = function(instance)
{
	return new IDEInstance(instance);
}

// Class representing an individual instance of an object in the IDE
function IDEInstance(instance, type)
{
	assert2(this instanceof arguments.callee, "Constructor called as a function");
	
	// Save the constructor parameters
	this.instance = instance;
	this.type = type;
	
	// Set the default property values from the property table
	this.properties = {};
	
	for (var i = 0; i < property_list.length; i++)
		this.properties[property_list[i].name] = property_list[i].initial_value;
		
	// Plugin-specific variables
	// this.myValue = 0...
}

// Called when inserted via Insert Object Dialog for the first time
IDEInstance.prototype.OnInserted = function()
{
}

// Called when double clicked in layout
IDEInstance.prototype.OnDoubleClicked = function()
{
}

// Called after a property has been changed in the properties bar
IDEInstance.prototype.OnPropertyChanged = function(property_name)
{
}

// For rendered objects to load fonts or textures
IDEInstance.prototype.OnRendererInit = function(renderer)
{
}

// Called to draw self in the editor if a layout object
IDEInstance.prototype.Draw = function(renderer)
{
}

// For rendered objects to release fonts or textures
IDEInstance.prototype.OnRendererReleased = function(renderer)
{
}