
if (typeof(wFORMS) == "undefined") {
    throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms repeat behavior.
 * See: http://www.formassembly.com/wForms/v2.0/documentation/examples/repeat.html
 */
wFORMS.behaviors.repeat = {

    /**
     * Selector expression for catching repeat elements
     * @final
     * @see http://www.w3.org/TR/css3-selectors/
     */
    SELECTOR_REPEAT : '*[class~="repeat"]',

    /**
     * Selector expression for catching removable section
     * @final
     * @see http://www.w3.org/TR/css3-selectors/
     */
    SELECTOR_REMOVEABLE : '*[class~="removeable"]',

    /**
     * Suffix for the ID of 'repeat' link
     * @final
     */
    ID_SUFFIX_DUPLICATE_LINK : '-wfDL',

    /**
     * Suffix for the ID of the repeat counter hidden element
     * @final
     */
    ID_SUFFIX_COUNTER : '-RC',

    /**
     * CSS class for duplicate span/link
     * @final
     */
    CSS_DUPLICATE_LINK : 'duplicateLink',
    CSS_DUPLICATE_SPAN : 'duplicateSpan',
    /**
     * CSS class for delete link
     * @final
     */
    CSS_DELETE_LINK : 'removeLink',
    CSS_DELETE_SPAN : 'removeSpan',
    /**
     * CSS class for field group that could be removed
     * @final
     */
    CSS_REMOVEABLE : 'removeable',

    /**
     * CSS class for field group that could be repeat
     * @final
     */
    CSS_REPEATABLE : 'repeat',

    /**
     * Attribute specifies that current group is duplicate
     * @final
     */
    ATTR_DUPLICATE : 'wfr__dup',

    /**
     * Attribute specifies that current group is duplicate
     * @final
     */
    ATTR_DUPLICATE_ELEM : 'wfr__dup_elem',


    /**
     * Means that element has been already handled by repeat behavior
     */
    ATTR_HANDLED : 'wfr_handled',

    /**
     * Attribute specifies ID of the master section on its dublicate
     * @final
     */
    ATTR_MASTER_SECTION : 'wfr__master_sec',

    /**
     * Special attribute name that is set to Remove link with section ID
     * should be deleted when link is clicked
     * @final
     */
    ATTR_LINK_SECTION_ID : 'wfr_sec_id',

    /**
     * Messages collection used for creating links
     * @final
     */
    MESSAGES : {
        ADD_CAPTION : "Add another response",
        ADD_TITLE : "Will duplicate this question or section.",

        REMOVE_CAPTION : "Remove",
        REMOVE_TITLE : "Will remove this question or section"
    },

    /**
     * Array of the attribute names that shoud be updated in the duplicated tree
     */
    UPDATEABLE_ATTR_ARRAY : [
        'id',
        'name',
        'for'
    ],

    /**
     * Allows to leave names of the radio buttons the same (behavior-wide setting)
     */
    preserveRadioName : false,

    /**
     * Allows to leave names of the radio buttons the same (field-level setting)
     * This class attribute can be set on a repeated element to override the
     * behavior's preserveRadioName setting.
     */
    CSS_PRESERVE_RADIO_NAME: "preserveRadioName",


    /**
     * Custom function that could be overridden.
     * Evaluates after section is duplicated
     * @param   {HTMLElement}   elem    Duplicated section
     */
    onRepeat : function(elem){},

    /**
     * Custom function that could be overridden.
     * Evaluates after the section is removed
     * @param   {HTMLElement}   elem    a copy of the removed section - detached from the document
     */
    onRemove : function(elem){},

    /**
     * Custom function that could be overridden.
     * Returns if section could be repeated
     * @param   {HTMLElement}   elem    Section to be duplicated
     * @param   {wFORMS.behaviors.repeat}   b   Behavior mapped to repeatable section
     * @return  boolean
     */
    allowRepeat : function(elem, b){
        return true;
    },

    /*
     * list callback registered by 3rd party code.
     */
    _callbacks : { 'onRepeat':[], 'onRemove':[], 'onMasterIdChange': [], 'onRepeatIdCreate': [] },

    /**
     * Creates new instance of the behavior
     * @param   {HTMLElement}   f   Form element
     * @constructor
     */
    instance : function(f) {
        this.behavior = wFORMS.behaviors.repeat;
        this.target = f;
        /*
         * Keeps track of all ids changed during one repeat run. Passed on to onRepeat observers and reset after each run.
         */
        this._idUpdates = { 'master': {}, 'repeat': {} };
    }
}

/*
 * Temporary shortcuts
 */
var _b = wFORMS.behaviors.repeat;
var _i = wFORMS.behaviors.repeat.instance;

/**
 * Factory Method.
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 * @return {object} an instance of the behavior
 */
_b.applyTo = function(f) {
    // look up for the all elements that could be repeated.
    // Trying to add event listeners to elements for adding new container.
    // If need create Add new section element
    var _self = this;
    var b = new Array();

    if(!f.querySelectorAll){base2.DOM.bind(f);}

    if(wFORMS.behaviors.repeat.getMasterSection(f)){
        var masterArray = Array();
        var masterSection = wFORMS.behaviors.repeat.getMasterSection(f);
            if(!masterSection.querySelectorAll){base2.DOM.bind(masterSection);}

        var masterNodes = masterSection.querySelectorAll(this.SELECTOR_REPEAT);
            masterNodes.forEach(function(elem){
                masterArray.push(elem.querySelector(".duplicateLink").innerHTML);
            });
    }

    f.querySelectorAll(this.SELECTOR_REPEAT).forEach(
        function(elem,index){
            if(_self.isHandled(elem)){
                return ;
            }
            if(!elem.id) elem.id = wFORMS.helpers.randomId();

            var _b = new _self.instance(elem);
            if(masterArray && masterArray[index]){
                _b.behavior.MESSAGES.ADD_CAPTION = masterArray[index];
            }
            var e = _b.getOrCreateRepeatLink(elem);
            e.addEventListener('click', function(event) { _b.run(event, e)}, false);
            _b.setElementHandled(elem);
            b.push(_b);
        }
    );

    if(!f.hasClass) {
        f.hasClass = function(className) { return base2.DOM.HTMLElement.hasClass(this,className) };
    }

    if(f.hasClass(this.CSS_REMOVEABLE)){
        var m  = this.getMasterSection(f);
        var _i = wFORMS.getBehaviorInstance(m, 'repeat');
        if(_i) {
            _i.getOrCreateRemoveLink(f);
        } else if(b[0]){
            b[0].getOrCreateRemoveLink(f);
        }
    }

    f.querySelectorAll(this.SELECTOR_REMOVEABLE).forEach(function(e){
        var m  = wFORMS.behaviors.repeat.getMasterSection(e);
        var _i = wFORMS.getBehaviorInstance(m, 'repeat');
        if(_i) {
            _i.getOrCreateRemoveLink(e);
        } else if(b[0]){
            b[0].getOrCreateRemoveLink(e);
        }
    });

    for(var i=0;i<b.length;i++) {
        b[i].onApply();
    }
    return b;
}

/**
 * Executed once the behavior has been applied to the document.
 * Can be overwritten.
 */
_i.prototype.onApply = function() {}


//counter flag to count the number of repeated fields/sections at any time
_i.prototype.counterRepeatedFields=1;

/**
 * Returns repeat link for specified area if it exists,
 * otherwise creates new one and returns it
 * @param   {HTMLElement}   elem    Element repeat link is related to
 * @return  {HTMLElement}
 */
_i.prototype.getOrCreateRepeatLink = function(elem){
    var id = elem.id + this.behavior.ID_SUFFIX_DUPLICATE_LINK;
    var e = document.getElementById(id);
    if(!e || e == ''){
        e = this.createRepeatLink(id);

        // Wraps in a span for better CSS positionning control.
        var spanElem = document.createElement('span');
        spanElem.className = this.behavior.CSS_DUPLICATE_SPAN;
        e = spanElem.appendChild(e);

        if(elem.tagName.toUpperCase() == 'TR'){
            var tdElem = elem.getElementsByTagName('TD');
            if(!tdElem){
                tdElem = elem.appendChild(document.createElement('TD'));
            } else {
                tdElem = tdElem[tdElem.length-1];
            }
            tdElem.appendChild(spanElem);
        }else{
            elem.appendChild(spanElem);
            // elem.parentNode.insertBefore(spanElem, elem.nextSibling);
        }
    }
    return base2.DOM.bind(e);
}

/**
 * Returns repeat link for specified area if it exists,
 * otherwise creates new one and returns it
 * @param   {DOMString} id  ID of the group
 * @return  {HTMLElement}
 */
_i.prototype.createRepeatLink = function(id){
    // Creates repeat link element
    var linkElem = document.createElement("A");

    linkElem.id = id;
    linkElem.setAttribute('href', '#');
    linkElem.className = this.behavior.CSS_DUPLICATE_LINK;
    linkElem.setAttribute('title', this.behavior.MESSAGES.ADD_TITLE);

    // Appends text inside the <span element (for CSS replacement purposes) to <a element
    linkElem.appendChild(document.createElement('span').appendChild(
        document.createTextNode(this.behavior.MESSAGES.ADD_CAPTION)));

    return linkElem;
}

/*
 * Add remove link to duplicated section
 * @param   {DOMElement}    duplicated section.
 */
_i.prototype.getOrCreateRemoveLink= function(elem){
    var e  = this.createRemoveLink(elem.id);
    // looking for the place where to paste link
    if(elem.tagName == 'TR'){
        var tds = elem.getElementsByTagName('TD');
        var tdElem = tds[tds.length-1];
        tdElem.appendChild(e);
    } else {
        elem.appendChild(e)
    }
}

/**
 * Returns remove link for specified area
 * @param   {DOMString} id  ID of the field group
 * @return  {HTMLElement}
 */
_i.prototype.createRemoveLink = function(id){
    // Creates repeat link element
    var linkElem = document.createElement("a");

    linkElem.id = id + this.behavior.ID_SUFFIX_DUPLICATE_LINK;
    linkElem.setAttribute('href', '#');
    linkElem.className = this.behavior.CSS_DELETE_LINK;
    linkElem.setAttribute('title', this.behavior.MESSAGES.REMOVE_TITLE);
    linkElem.setAttribute(this.behavior.ATTR_LINK_SECTION_ID, id);

    // Appends text inside the <span element (for CSS image replacement) to <a element
    var spanElem = document.createElement('span');
    spanElem.appendChild(document.createTextNode(this.behavior.MESSAGES.REMOVE_CAPTION));
    linkElem.appendChild(spanElem);

    var _self = this;
    linkElem.onclick = function(event) { _self.onRemoveLinkClick(event, linkElem); return false; };

    // Wraps in a span for better CSS positionning control.
    var spanElem = document.createElement('span');
    spanElem.className = this.behavior.CSS_DELETE_SPAN;
    spanElem.appendChild(linkElem);

    return spanElem;
}
/**
 *counter flag to count the number of repeated fields/sections at any time
 */
_i.prototype.counterRepeatedFields=1;

/**
 * Duplicates repeat section. Changes ID of the elements, adds event listeners
 * @param   {HTMLElement}   elem    Element to duplicate
 */
_i.prototype.duplicateSection = function(elem){
    // Call custom function. By default return true
    if(!this.behavior.allowRepeat(elem, this)){
        return false;
    }
    this.updateMasterSection(elem);
    // Creates clone of the group
    var newElem = elem.cloneNode(true);

    // Update the ids, names and other attributes that must be changed.
    // (do it before inserting the element back in the DOM to prevent reseting radio buttons, see bug #152)
    var index  = this.getNextDuplicateIndex(this.target);
    var suffix = this.createSuffix(elem, index);

    this.updateDuplicatedSection(newElem, index, suffix);
    // Insert in DOM
    newElem = elem.parentNode.insertBefore(newElem, this.getInsertNode(elem));

    // Call registered observers (better way to handle callbacks)
    this.callRepeatCompleteObservers(elem, newElem);

    // duplicateSection

    wFORMS.applyBehaviors(newElem);

	//increasing the counter each time a field is duplicated.
	//to keep track of number of repeated fields.
	this.counterRepeatedFields++;

	//getting the repeat limit
	var limit=elem.getAttribute('data-repeatlimit');

	// getting the id of the repeat link
	var id = elem.id + this.behavior.ID_SUFFIX_DUPLICATE_LINK;

	//if there is limit to the repeatable fields
	if(limit != null){
		//hiding the repeated link as the limit is reached

	    if(this.counterRepeatedFields >=  limit){ document.getElementById(id).style.display = 'none';}
	}

    // Calls custom function
    this.behavior.onRepeat(newElem);

    wFORMS.helpers.spotlight(newElem);
}

/**
 * Removes section specified by id
 * @param   {DOMElement}    element to remove
 */
_i.prototype.removeSection = function(elem){
    if(elem){
		//finding the element to which this element is the duplicate
		var repeatElem=this.behavior.getMasterSection(elem);

        // Add id to list of removed elements.
        this.logRemovedSection(elem);

        // Removes section
        var elem = elem.parentNode.removeChild(elem);

        // Better event management
        this.callRemoveCompleteObservers(elem);

		//decreasing the counter each time a field/section is removed.
		//to keep track of number of repeated fields/sections.
		this.counterRepeatedFields--;

		//getting the repeat limit
		var limit=elem.getAttribute('data-repeatlimit');

		// getting the id of the repeat link
		var id = repeatElem.id + this.behavior.ID_SUFFIX_DUPLICATE_LINK;

		//if there is limit to the repeatable fields
		if(limit != null){
			//re-showing the repeated link as the limit is reached
			if(this.counterRepeatedFields <=  limit){ document.getElementById(id).style.display = '';}
		}

        // Calls custom function (@DEPRECATED)
        this.behavior.onRemove(elem);
    }
}

/**
 * Keeps track of removed section to faciliate server-side processing
 * by adding the element's id to a prepared hidden field called 'tfa_removedRepeats'.
 * If 'tfa_removedRepeats' is not present, this has no effect.
 * @param  {DomElement} elem The element being removed.
 */
_i.prototype.logRemovedSection = function(elem) {
    if(!elem || !elem.id) {
        return;
    }
    var id = elem.id;

    // get master section
    var master = this.behavior.getMasterSection(elem);
    var counterField = this.getOrCreateCounterField( master );

    if(counterField) {
        var counterValue = counterField.value.split('|');
        var deletedIds   = [];

        if(counterValue[1]) {
            deletedIds = counterValue[1].split(',');
        }
        counterValue = counterValue[0];

        deletedIds.push(id);

        counterField.value = counterValue + "|" + deletedIds.join(',');
    }
}

/**
 * Looking for the place where to insert the cloned element
 * @param   {DOMElement}    source element
 * @return  {DOMElement}    target element for 'insertBefore' call.
 */
_i.prototype.getInsertNode = function(elem) {
    var insertNode = elem.nextSibling;

    if(insertNode && insertNode.nodeType==1 && !insertNode.hasClass) {
        insertNode.hasClass = function(className) { return base2.DOM.HTMLElement.hasClass(this,className) };
    }

    while(insertNode &&
		 (insertNode.nodeType!=1 ||       // skip text-node that can be generated server-side when populating a previously repeated group
          insertNode.hasClass(this.behavior.CSS_REMOVEABLE))) {

        insertNode = insertNode.nextSibling;

        if(insertNode && insertNode.nodeType==1 && !insertNode.hasClass) {
            insertNode.hasClass = function(className) { return base2.DOM.HTMLElement.hasClass(this,className) };
        }
    }
    return insertNode;
};
/**
 * Evaluates when user clicks Remove link
 * @param   {DOMEvent}      Event   catched
 * @param   {HTMLElement}   elem    Element produced event
 */
_i.prototype.onRemoveLinkClick = function(event, link){
    var e  = document.getElementById(link.getAttribute(this.behavior.ATTR_LINK_SECTION_ID));
    this.removeSection(e);
    if(event) event.preventDefault();
};

/**
 * Updates attributes inside the master element
  * @param  {HTMLElement}   elem
 */
_i.prototype.updateMasterSection = function(elem){
    // do it once
    if(elem.doItOnce==true) {
        return true;
    } else {
        elem.doItOnce=true;
    }
    var oldId = elem.id;

    var suffix = this.createSuffix(elem);
    elem.id = this.clearSuffix(elem.id) + suffix; // ...[0]

    if(elem.id!=oldId) {
        this.callMasterIdChangeObservers(oldId, elem.id);
    }
    this.updateMasterElements(elem, suffix);
};
_i.prototype.updateMasterElements  = function(elem, suffix){

    if(!elem || elem.nodeType!=1)
        return;

    var cn = elem.childNodes;
    for(var i=0;i<cn.length;i++) {
        var n = cn[i];
        if(n.nodeType!=1) continue;

        if(!n.hasClass) { // no base2.DOM.bind to speed up function
            n.hasClass = function(className) { return base2.DOM.HTMLElement.hasClass(this,className) };
        }

        // suffix may change for this node and child nodes, but not sibling nodes, so keep a copy
        var siblingSuffix = suffix;
        if(n.hasClass(this.behavior.CSS_REPEATABLE)) {
            suffix += "[0]";
        }

        var oldId = n.id;
        if(!n.hasClass(this.behavior.CSS_REMOVEABLE)){
            // Iterates over updateable attribute names
            for(var j = 0; j < this.behavior.UPDATEABLE_ATTR_ARRAY.length; j++){
                var attrName = this.behavior.UPDATEABLE_ATTR_ARRAY[j];
                var value = this.clearSuffix(n.getAttribute(attrName));
                if(!value){
                    continue;
                }
                if(attrName=='id' && wFORMS.behaviors.hint && wFORMS.behaviors.hint.isHintId(n.id)){
                    n.id = value.replace(new RegExp("(.*)(" + wFORMS.behaviors.hint.HINT_SUFFIX + ')$'),"$1" + suffix + "$2");
                } else if(attrName=='id' && wFORMS.behaviors.validation && wFORMS.behaviors.validation.isErrorPlaceholderId(n.id)){
                    n.id = value.replace(new RegExp("(.*)(" + wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX + ')$'),"$1" + suffix + "$2");
                } else if(attrName=='id' && n.id.indexOf(this.behavior.ID_SUFFIX_DUPLICATE_LINK) != -1){
                    n.id = value.replace(new RegExp("(.*)(" + this.behavior.ID_SUFFIX_DUPLICATE_LINK + ')$'), "$1" + suffix + "$2");
                } else if(attrName=='id'){
                    n.id = value + suffix;      // do not use setAttribute for the id property (doesn't work in IE6)
                } else if(attrName=='name'){
                    n.name = value + suffix;    // do not use setAttribute for the name property (doesn't work in IE6)
                } else {
                    n.setAttribute(attrName, value + suffix);
                }
            }
            this.updateMasterElements(n, suffix);
        }

        if(n.id!=oldId) {
            this.callMasterIdChangeObservers(oldId, n.id);
        }

        // restore suffix for siblings if needed.
        suffix = siblingSuffix;
    }
};

/**
 * Updates attributes inside the duplicated tree
 * TODO rename
 * @param   {HTMLElement}   dupliocated element (not yet inserted back in DOM)
 * @param   {integer}       row index
 * @param   {string}        array-like notation, to be appended to attributes that must be unique.
 */
_i.prototype.updateDuplicatedSection = function(elem, index, suffix){

    // Caches master section ID in the dublicate
    elem[this.behavior.ATTR_MASTER_SECTION]=elem.id;

    var oldId = elem.id;

    // Updates element ID (possible problems when repeat element is Hint or switch etc)
    elem.id = this.clearSuffix(elem.id) + suffix;
    // Updates classname
    elem.className = elem.className.replace(this.behavior.CSS_REPEATABLE, this.behavior.CSS_REMOVEABLE);

    if(!elem.hasClass) { // no base2.DOM.bind to speed up function
        elem.hasClass = function(className) { return base2.DOM.HTMLElement.hasClass(this,className) };
    }
    // Check for preserverRadioName override
    if(elem.hasClass(this.behavior.CSS_PRESERVE_RADIO_NAME))
        var _preserveRadioName = true;
    else
        var _preserveRadioName = this.behavior.preserveRadioName;

    if(elem.id!=oldId) {
        this.callRepeatIdCreateObservers(oldId, elem.id);
    }

    this.updateSectionChildNodes(elem, suffix, _preserveRadioName);
};


/**
 * Updates NodeList. Changes ID and names attributes
 * For different node elements suffixes could be different - i.e. for the nested
 * repeat section IDs and names should store parent section number
 * @param   elems   Array of the elements should be updated
 * @param   suffix  Suffix value should be added to attributes

 * id/ tfa_1[0] + suffix [1] =>  tfa_1[1]
 */
_i.prototype.updateSectionChildNodes = function(elem, suffix, preserveRadioName){

    /* Fix for Ticket #256 - id of nested repeated element not set properly */
    if(elem.doItOnce) {
        elem.doItOnce = null;
    }

    var removeStack = new Array();
    var i = 0;

    while(elem && elem.childNodes && elem.childNodes[i]) {

        var e = elem.childNodes[i];
        i++;

        if(e.nodeType!=1) {
            // skip text nodes
            continue;
        }
        if(!e.hasClass) { // no base2.DOM.bind to speed up function
            e.hasClass = function(className) { return base2.DOM.HTMLElement.hasClass(this,className) };
        }
        // Removes created descendant duplicated group if any
        if(this.behavior.isDuplicate(e)){
            removeStack.push(e);
            continue;
        }
        // Removes duplicate link
        if(e.hasClass(this.behavior.CSS_DUPLICATE_SPAN)){
            removeStack.push(e);
            continue;
        }
        if(e.hasClass(this.behavior.CSS_DUPLICATE_LINK)){
            removeStack.push(e);
            continue;
        }

        // Clears value
        if((e.tagName == 'INPUT' && e.type != 'button') || e.tagName == 'TEXTAREA'){
            if(e.type != 'radio' && e.type != 'checkbox'){
                e.value = '';
            } else {
                e.checked = false;
            }
        } else {
            if(e.tagName == 'SELECT') {
                e.selectedIndex = -1;
            }
        }

        var oldId = e.id;

        // Fix #152 - Radio name with IE6, IE7?
        if(e.tagName == 'INPUT' && e.type == 'radio' && !preserveRadioName && /*@cc_on @if(@_jscript_version < 5.8)! @end @*/false) {

            // Create a radio input that works in IE and insert it before the input it needs to replace
            var tagHtml = "<INPUT type=\"radio\" name=\""+e.name+suffix+"\"></INPUT>";
            var fixedRadio = e.parentNode.insertBefore(document.createElement(tagHtml),e);

            // Clone other attributes
            fixedRadio.id = e.id;
            fixedRadio.className = e.className;
            fixedRadio.value = e.value;

            // Remove original radio (keep element in memory)
            e = e.parentNode.removeChild(e);

            var l = this.behavior.UPDATEABLE_ATTR_ARRAY.length;

            for (var j = 0; j < l; j++) {
                var attrName = this.behavior.UPDATEABLE_ATTR_ARRAY[j];
                var value = e.getAttribute(attrName);
                fixedRadio.setAttribute(attrName, value);
            }
            // We can now continue with the fixed radio element
            e = fixedRadio;
            if(!e.hasClass) { // no base2.DOM.bind to speed up function
                e.hasClass = function(className) { return base2.DOM.HTMLElement.hasClass(this,className) };
            }
        }

        this.updateAttributes(e, suffix, preserveRadioName);

        if(e.id!=oldId) {
            this.callRepeatIdCreateObservers(oldId, e.id);
        }

        if(e.hasClass(this.behavior.CSS_REPEATABLE)){
            this.updateSectionChildNodes(e, this.createSuffix(e), preserveRadioName);
        } else{
            this.updateSectionChildNodes(e, suffix, preserveRadioName);
        }
    }

    for(var i=0;i<removeStack.length;i++){
        var e = removeStack[i];
        if(e.clearAttributes) {
            // detach all event handler
            e.clearAttributes(false);
        }
        if(e.parentNode) e.parentNode.removeChild(e);
    }

}

/**
 * Creates suffix that should be used inside duplicated repeat section
 * @param   domelement  Repeat section element
 * @param   integer     row index
 */
_i.prototype.createSuffix = function(e, index){

    // var idx = e.getAttribute('dindex');
    var suffix = '[' + (index ? index : '0' ) + ']';
    var reg = /\[(\d+)\]$/;
    e = e.parentNode;
    while(e && e.tagName){
        if(!e.hasClass) { // no base2.DOM.bind to speed up function
            e.hasClass = function(className) { return base2.DOM.HTMLElement.hasClass(this,className) };
        }
        if(e.hasClass(this.behavior.CSS_REPEATABLE) || e.hasClass(this.behavior.CSS_REMOVEABLE)){
            var idx = reg.exec(e.id);
            if(idx) idx = idx[1];
            //var idx = e.getAttribute('dindex');
            suffix = '[' + (idx ? idx : '0' ) + ']' + suffix;
        }
        e = e.parentNode;
    }
    return suffix;
}

/**
 * Removes row counters from ID
 * @param   id  Current element id
 * @return  string
 *
 * repeated field ID is:            fieldid[n]...[n]
 * repeated hint ID is:             fieldid[n]...[n]-H
 * repeated error placeholder is :  fieldid[n]...[n]-E
 * returns fieldid, fieldid-H or fieldid-E
 */
_i.prototype.clearSuffix = function(value){
    if(!value){
        return;
    }
    value = value.replace(/(\[\d+\])+(\-[HE])?$/,"$2");
    return value;
}

/**
 * Updates attributes of the element in the section
 * TODO rename
 * @param   {HTMLElement}   elem
 */
_i.prototype.updateAttributes = function(e, idSuffix, preserveRadioName){
    var isHint = wFORMS.behaviors.hint && wFORMS.behaviors.hint.isHintId(e.id);
    var isErrorPlaceholder = wFORMS.behaviors.validation && wFORMS.behaviors.validation.isErrorPlaceholderId(e.id);
    var isDuplicateLink = e.id.indexOf(this.behavior.ID_SUFFIX_DUPLICATE_LINK) != -1;

    // Sets that element belongs to duplicate group
    this.setInDuplicateGroup(e);

    if(this.behavior.isHandled(e)){
        this.removeHandled(e)
    }

    if(wFORMS.behaviors['switch'] && wFORMS.behaviors['switch'].isHandled(e)){
        wFORMS.behaviors['switch'].removeHandle(e);
    }
    if(wFORMS.behaviors['calculation'] && wFORMS.behaviors['calculation'].isHandled(e)){
        wFORMS.behaviors['calculation'].removeHandledFlag(e);
    }
    // Iterates over updateable attribute names
    var l = this.behavior.UPDATEABLE_ATTR_ARRAY.length;
    for(var i = 0; i < l; i++){
        var attrName = this.behavior.UPDATEABLE_ATTR_ARRAY[i];

        var value = this.clearSuffix(e.getAttribute(attrName));
        if(!value){
            continue;
        }

        if(attrName == 'name' && e.tagName == 'INPUT' && preserveRadioName){
            continue;
        } else if(isErrorPlaceholder && attrName=='id'){
            e.id = value.replace(new RegExp("(.*)(" + wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX + ')$'),"$1" + idSuffix + "$2");
        } else if(isHint && attrName=='id'){
            e.id = value.replace(new RegExp("(.*)(" + wFORMS.behaviors.hint.HINT_SUFFIX + ')$'),"$1" + idSuffix + "$2");
        } else if(isDuplicateLink && attrName=='id'){
            e.id = value.replace(new RegExp("(.*)(" + this.behavior.ID_SUFFIX_DUPLICATE_LINK + ')$'),"$1" + idSuffix + "$2");
        } else if(attrName=='id'){
            e.id = value + idSuffix;    // do not use setAttribute for the id property (doesn't work in IE6)
        } else if(attrName=='name'){
            e.name = value + idSuffix;  // do not use setAttribute for the id property (doesn't work in IE6)
        } else {
            e.setAttribute(attrName, value + idSuffix);
        }
    }
}

/**
 * Returns index of the next created duplicate by section HTML element
 * @param   {HTMLElement}   elem
 * @return  {Integer}
 */
_i.prototype.getNextDuplicateIndex = function(elem){
    var counterField = this.getOrCreateCounterField(elem);
    var counterValue = counterField.value.split('|');
    var deletedIds   = [];

    if(counterValue[1]) {
        deletedIds = counterValue[1].split(',');
    }
    counterValue = counterValue[0];

    var newValue = parseInt( counterValue ) + 1;
    counterField.value = newValue + (deletedIds.length>0?'|'+deletedIds.join(','):'');
    return newValue;
}


/**
 * Returns counter field fo specified area if exists. Otherwise creates new one
 * @param   {HTMLElement}   elem
 * @return  {HTMLElement}
 */
_i.prototype.getOrCreateCounterField = function(elem){

    var cId = elem.id + this.behavior.ID_SUFFIX_COUNTER;

    // Using getElementById except matchSingle because of lib bug
    // when element is not exists exception is thrown
    var cElem = document.getElementById(cId);
    if(!cElem || cElem == ''){
        cElem = this.createCounterField(cId);
        // Trying to find form element
        var formElem = elem.parentNode;
        while(formElem && formElem.tagName.toUpperCase() != 'FORM'){
            formElem = formElem.parentNode;
        }

        formElem.appendChild(cElem);
    }
    return cElem;
}

/**
 * Creates counter field with specified ID
 * @param   {DOMString} id
 * @return  {HTMLElement}
 */
_i.prototype.createCounterField = function(id){

    cElem = document.createElement('input');
    cElem.id = id;
    cElem.setAttribute('type', 'hidden');
    cElem.setAttribute('name', id);
    cElem.value = '0';
    return cElem;
}

/**
 * Returns count of already duplicated sections. If was called from the behavior
 * belonged to duplicated section, returns false
 * @public
 * @return  {Integer} or {boolean}
 */
_i.prototype.getSectionsCount = function(){
    if(this.behavior.isDuplicate(this.target)){
        return false;
    }
    return parseInt(this.getOrCreateCounterField(this.target).value.split('|')[0] ) + 1;
}

/**
 * Specifies that element is inside the duplicate group
 * @param   {HTMLElement}   elem
 * @return  boolean
 */
_i.prototype.setInDuplicateGroup = function(elem){
    return elem.setAttribute(this.behavior.ATTR_DUPLICATE_ELEM, true);
}


/**
 * setElementHandled
 * @param   {HTMLElement}   elem
 * @return  boolean
 */
_i.prototype.setElementHandled = function(elem){
    return elem.setAttribute(this.behavior.ATTR_HANDLED, true);
};

/**
 * Remove handled attribute from element
 * @param   {HTMLElement}   elem
 * @return  boolean
 */
_i.prototype.removeHandled = function(elem){
    return elem.removeAttribute(this.behavior.ATTR_HANDLED);
};

/**
 * Returns true if element is duplicate of initial group, false otherwise
 * @param   {HTMLElement}   elem
 * @return  boolean
 */
_b.isDuplicate = function(elem){
        if(!elem.hasClass) { // no base2.DOM.bind to speed up function
            elem.hasClass = function(className) { return base2.DOM.HTMLElement.hasClass(this,className) };
        }
    return elem.hasClass(this.CSS_REMOVEABLE);
};

_b.isMaster = function(elem){
        if(!elem.hasClass) { // no base2.DOM.bind to speed up function
            elem.hasClass = function(className) { return base2.DOM.HTMLElement.hasClass(this,className) };
        }
    return elem.hasClass(this.CSS_REPEATABLE);
};


/**
 * @deprecated - NOT RELIABLE
 *
 * Returns true if element belongs to duplicate group
 * (to be used by other behaviors)
 * @param   {HTMLElement}   elem
 * @return  boolean
 */
_b.isInDuplicateGroup = function(elem){
    return elem.getAttribute(this.ATTR_DUPLICATE_ELEM) ? true : false;
};

/**
 * Returns the parent element with the repeat behavior for any given DOM Element.
 * @param  {DOMElement} elem the element belonging to a repeatable section.
 * @return {DOMElement} The repeatable section (or the element itself if it's repeatable). Null if none found.
 */
_b.getRepeatedElement = function(elem) {

	while (elem && elem.nodeType==1 && elem.tagName != 'BODY') {

		if( base2.DOM.HTMLElement.hasClass(elem,this.CSS_REMOVEABLE) ||
			base2.DOM.HTMLElement.hasClass(elem,this.CSS_REPEATABLE)) {
			return elem;
		}
		elem = elem.parentNode;
	}
	return null;
};

/**
 * Checks if element is already handled
 * @param   {HTMLElement}   elem
 * @return  boolean
 */
_b.isHandled = function(elem){
    return elem.getAttribute(this.ATTR_HANDLED);
}


/**
 * Returns html element of the master section (repeatable) from its duplicate
 * @param   {HTMLElement}   elem
 * @return  {HTMLElement} or false
 */
_b.getMasterSection = function(elem){
    if(!this.isDuplicate(elem)) return false;

    if( elem[this.ATTR_MASTER_SECTION] ) {
        return document.getElementById(elem[this.ATTR_MASTER_SECTION]);
    } else {
        // ATTR_MASTER_SECTION not set (server-side generated markup)
        elem = elem.previousSibling;
        while(elem && ( elem.nodeType!=1 || !this.isMaster(elem) )) {
            elem = elem.previousSibling;
        }
        return elem;
    }
}

/**
 * Register a callback for when an element changes id due to repeat behavior.
 * @param   f  a function that takes 3 arguments: the element, the old id and the new id.
 */
 _b.observeMasterIdChange = function(f) {

    // remove first if already present (ensures callback is added only once)
    this.stopObservingMasterIdChange(f);
    this._callbacks.onMasterIdChange.push(f);
}

_b.stopObservingMasterIdChange = function(f) {

    for(var i=0;i<this._callbacks.onMasterIdChange.length;i++) {
        if(this._callbacks.onMasterIdChange[i].toString() == f.toString()) {
            this._callbacks.onMasterIdChange.splice(i,1);
            return;
        }
    }
}

_i.prototype.callMasterIdChangeObservers = function(old, updated) {

    this._idUpdates.master[old] = updated;

    for(var i=0;i<this.behavior._callbacks.onMasterIdChange.length;i++) {
        this.behavior._callbacks.onMasterIdChange[i].call(window,old,updated);
    }
}
/**
 * Register a callback for when a new element gets an id due to repeat behavior.
 * @param   f  a function that takes 3 arguments: the element, the  id of the original element, the id of the new copy.
 */
_b.observeRepeatIdCreate = function(f) {
    // remove first if already present (ensures callback is added only once)
    this.stopObservingRepeatIdCreate(f);
    // add to stack of callbacks.
    this._callbacks.onRepeatIdCreate.push(f);
}

_b.stopObservingRepeatIdCreate = function(f) {

    for(var i=0;i<this._callbacks.onRepeatIdCreate.length;i++) {
        if(this._callbacks.onRepeatIdCreate[i].toString() == f.toString()) {
            this._callbacks.onRepeatIdCreate.splice(i,1);
            return;
        }
    }
}

_i.prototype.callRepeatIdCreateObservers = function(original, copy) {

    this._idUpdates.repeat[original] = copy;

    for(var i=0;i<this.behavior._callbacks.onRepeatIdCreate.length;i++) {
        this.behavior._callbacks.onRepeatIdCreate[i].call(window,original,copy);
    }
}

/**
 * Register a callback for when a new repeated element is created
 * @param   f  a function that takes 3 arguments: the orginal element, its repeated copy, a json object listing how IDs have changed
 */
_b.observeRepeatComplete = function(f) {

    this.stopObservingRepeatComplete(f);
    this._callbacks.onRepeat.push(f);

};

_b.stopObservingRepeatComplete = function(f) {

    for(var i=0;i < this._callbacks.onRepeat.length;i++) {
        if(this._callbacks.onRepeat[i].toString() == f.toString()) {
            this._callbacks.onRepeat.splice(i,1);
            return;
        }
    }
}

_i.prototype.callRepeatCompleteObservers = function(original,copy) {

    function clone(obj) {
        if(obj == null || typeof(obj) != 'object')
            return obj;

        var temp = obj.constructor();

        for(var key in obj) {
            if(obj.hasOwnProperty(key)) {
                temp[key] = clone(obj[key]);
            }
        }
        return temp;
    }

    for(var i=0;i<this.behavior._callbacks.onRepeat.length;i++) {
        this.behavior._callbacks.onRepeat[i].call(window,original,copy,clone(this._idUpdates));
    }
    // reset
    this._idUpdates = { 'master': {}, 'repeat': {} };
}

/**
 * Register a callback for when a repeated element is removed
 * @param   f  a function that takes 1 argument: the removed copy (already detached from the document)
 */
_b.observeRemoveComplete = function(f) {

    this.stopObservingRemoveComplete(f);
    this._callbacks.onRemove.push(f);

}

_b.stopObservingRemoveComplete = function(f) {

    for(var i=0;i < this._callbacks.onRemove.length;i++) {
        if(this._callbacks.onRemove[i].toString() == f.toString()) {
            this._callbacks.onRemove.splice(i,1);
            return;
        }
    }
}

_i.prototype.callRemoveCompleteObservers = function(copy) {
    for(var i=0;i<this.behavior._callbacks.onRemove.length;i++) {
        this.behavior._callbacks.onRemove[i].call(window,copy);
    }
}

/**
 * Executes the behavior
 * @param {event} e
 */
_i.prototype.run = function(e){

    if(!wFORMS.LOADER.enabled) {
        this.duplicateSection(this.target);
    } else {
        // run through timeout only if loader is enabled (breaks test suite otherwise)
        var self = this;
        wFORMS.LOADER.show(self.target);
        setTimeout( function() {
            self.duplicateSection(self.target);
            wFORMS.LOADER.hide(self.target, true);
        }, 1);
    }
    if(e) e.preventDefault();
}