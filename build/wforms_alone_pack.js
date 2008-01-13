if(typeof (wFORMS)=="undefined"){throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")}wFORMS.behaviors.hint={CSS_INACTIVE:"field-hint-inactive",CSS_ACTIVE:"field-hint",HINT_SELECTOR:'*[id$="-H"]',HINT_SUFFIX:"-H",instance:function(A){this.behavior=wFORMS.behaviors.hint;this.target=A}};wFORMS.behaviors.hint.applyTo=function(B){var A=new wFORMS.behaviors.hint.instance(B);B.querySelectorAll(wFORMS.behaviors.hint.HINT_SELECTOR).forEach(function(C){var D=A.getElementByHintId(C.id);if(D){if(!D.addEventListener){base2.DOM.bind(D)}if(D.tagName=="SELECT"||D.tagName=="TEXTAREA"||(D.tagName=="INPUT"&&D.type!="radio"&&D.type!="checkbox")){D.addEventListener("focus",function(E){A.run(E,this)},false);D.addEventListener("blur",function(E){A.run(E,this)},false)}else{D.addEventListener("mouseover",function(E){A.run(E,D)},false);D.addEventListener("mouseout",function(E){A.run(E,D)},false)}}});A.onApply();return A};wFORMS.behaviors.hint.instance.prototype.onApply=function(){};wFORMS.behaviors.hint.instance.prototype.run=function(B,A){var C=this.getHintElement(A);if(!C){return }if(B.type=="focus"||B.type=="mouseover"){C.removeClass(wFORMS.behaviors.hint.CSS_INACTIVE);C.addClass(wFORMS.behaviors.hint.CSS_ACTIVE);this.setup(C,A)}else{C.addClass(wFORMS.behaviors.hint.CSS_INACTIVE);C.removeClass(wFORMS.behaviors.hint.CSS_ACTIVE)}};wFORMS.behaviors.hint.instance.prototype.getElementByHintId=function(C){var B=C.substr(0,C.length-wFORMS.behaviors.hint.HINT_SUFFIX.length);var A=document.getElementById(B);return A};wFORMS.behaviors.hint.instance.prototype.getHintElement=function(A){var B=document.getElementById(A.id+this.behavior.HINT_SUFFIX);return B&&B!=""?B:null};wFORMS.behaviors.hint.instance.prototype.setup=function(D,C){var A=((C.tagName=="SELECT"?+C.offsetWidth:0)+wFORMS.helpers.getLeft(C));var B=(wFORMS.helpers.getTop(C)+C.offsetHeight);D.style.left=A+"px";D.style.top=B+"px"};wFORMS.behaviors.hint.isHintId=function(A){return A.match(new RegExp(wFORMS.behaviors.hint.HINT_SUFFIX+"$"))!=null};if(typeof (wFORMS)=="undefined"){throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")}wFORMS.behaviors.paging={SELECTOR:".wfPage",CSS_PAGE:"wfPage",CSS_CURRENT_PAGE:"wfCurrentPage",CSS_BUTTON_NEXT:"wfPageNextButton",CSS_BUTTON_PREVIOUS:"wfPagePreviousButton",CSS_BUTTON_PLACEHOLDER:"wfPagingButtons",ID_BUTTON_NEXT_PREFIX:"wfPageNextId",ID_BUTTON_PREVIOUS_PREFIX:"wfPagePreviousId",CSS_SUBMIT_HIDDEN:"wfHideSubmit",ID_PAGE_PREFIX:"wfPgIndex-",ID_PLACEHOLDER_SUFFIX:"-buttons",ATTR_INDEX:"wfPageIndex_activate",MESSAGES:{CAPTION_NEXT:"Next Page",CAPTION_PREVIOUS:"Previous Page"},runValidationOnPageNext:true,onPageNext:function(){},onPagePrevious:function(){},onPageChange:function(){},instance:function(A){this.behavior=wFORMS.behaviors.paging;this.target=A;this.currentPageIndex=1}};wFORMS.behaviors.paging.applyTo=function(E){var B=new wFORMS.behaviors.paging.instance(E);var D=wFORMS.behaviors.paging;var C=(wFORMS.behaviors.validation&&wFORMS.behaviors.paging.runValidationOnPageNext);var A=false;E.querySelectorAll(wFORMS.behaviors.paging.SELECTOR).forEach(function(H){A=true;var J=B.getOrCreatePlaceHolder(H);var F=wFORMS.behaviors.paging.getPageIndex(H);if(F==1){var I=base2.DOM.bind(J.appendChild(D._createNextPageButton(F)));if(C){I.addEventListener("click",function(L){var K=wFORMS.getBehaviorInstance(B.target,"validation");if(K.run(L,H)){B.run(L,I)}},false)}else{I.addEventListener("click",function(K){B.run(K,I)},false)}wFORMS.behaviors.paging.showPage(H)}else{var I=base2.DOM.bind(D._createPreviousPageButton(F));J.insertBefore(I,J.firstChild);I.addEventListener("click",function(K){B.run(K,I)},false);if(!wFORMS.behaviors.paging.isLastPageIndex(F,true)){var G=base2.DOM.bind(J.appendChild(D._createNextPageButton(F)));if(C){G.addEventListener("click",function(L){var K=wFORMS.getBehaviorInstance(B.target,"validation");if(K.run(L,H)){B.run(L,G)}},false)}else{G.addEventListener("click",function(K){B.run(K,G)},false)}}}});if(A){p=B.findNextPage(0);B.currentPageIndex=0;B.activatePage(wFORMS.behaviors.paging.getPageIndex(p));B.onApply()}return B};wFORMS.behaviors.paging.instance.prototype.onApply=function(){};wFORMS.behaviors.paging.getPageIndex=function(B){if(B&&B.id){var A=B.id.replace(new RegExp(wFORMS.behaviors.paging.ID_PAGE_PREFIX+"(\\d+)"),"$1");A=parseInt(A);return !isNaN(A)?A:false}return false};wFORMS.behaviors.paging._createNextPageButton=function(A){var B=this.createNextPageButton();B.setAttribute(this.ATTR_INDEX,A+1);B.id=this.ID_BUTTON_NEXT_PREFIX+A;return B};wFORMS.behaviors.paging.createNextPageButton=function(){var A=document.createElement("input");A.setAttribute("value",this.MESSAGES.CAPTION_NEXT);A.type="button";A.className=this.CSS_BUTTON_NEXT;return A};wFORMS.behaviors.paging._createPreviousPageButton=function(A){var B=this.createPreviousPageButton();B.setAttribute(this.ATTR_INDEX,A-1);B.id=this.ID_BUTTON_PREVIOUS_PREFIX+A;return B};wFORMS.behaviors.paging.createPreviousPageButton=function(){var A=document.createElement("input");A.setAttribute("value",this.MESSAGES.CAPTION_PREVIOUS);A.type="button";A.className=this.CSS_BUTTON_PREVIOUS;return A};wFORMS.behaviors.paging.instance.prototype.getOrCreatePlaceHolder=function(A){var C=A.id+this.ID_PLACEHOLDER_SUFFIX;var B=document.getElementById(C);if(!B){B=A.appendChild(document.createElement("div"));B.id=C;B.className=this.CSS_BUTTON_PLACEHOLDER}return B};wFORMS.behaviors.paging.hidePage=function(A){if(A){if(!A.removeClass){A.removeClass=function(B){return base2.DOM.HTMLElement.removeClass(this,B)}}if(!A.addClass){A.addClass=function(B){return base2.DOM.HTMLElement.addClass(this,B)}}A.removeClass(wFORMS.behaviors.paging.CSS_CURRENT_PAGE);A.addClass(wFORMS.behaviors.paging.CSS_PAGE)}};wFORMS.behaviors.paging.showPage=function(A){if(A){if(!A.removeClass){A.removeClass=function(B){return base2.DOM.HTMLElement.removeClass(this,B)}}A.removeClass(wFORMS.behaviors.paging.CSS_PAGE);if(!A.addClass){A.addClass=function(B){return base2.DOM.HTMLElement.addClass(this,B)}}A.addClass(wFORMS.behaviors.paging.CSS_CURRENT_PAGE)}};wFORMS.behaviors.paging.instance.prototype.activatePage=function(B){if(B==this.currentPageIndex){return false}B=parseInt(B);if(B>this.currentPageIndex){var C=this.findNextPage(this.currentPageIndex)}else{var C=this.findPreviousPage(this.currentPageIndex)}if(C){var A=this;var B=A.behavior.getPageIndex(C);A.setupManagedControls(B);A.behavior.hidePage(A.behavior.getPageByIndex(A.currentPageIndex));A.behavior.showPage(C);var D=A.currentPageIndex;A.currentPageIndex=B;if(C.scrollIntoView){C.scrollIntoView()}else{location.hash="#"+wFORMS.behaviors.paging.ID_PAGE_PREFIX+B}A.behavior.onPageChange(C);if(B>D){A.behavior.onPageNext(C)}else{A.behavior.onPagePrevious(C)}}};wFORMS.behaviors.paging.instance.prototype.setupManagedControls=function(B){if(!B){B=this.currentPageIndex}var A=wFORMS.behaviors.paging;if(A.isFirstPageIndex(B)){if(ctrl=A.getPreviousButton(B)){ctrl.style.visibility="hidden"}}else{if(ctrl=A.getPreviousButton(B)){ctrl.style.visibility="visible"}}if(A.isLastPageIndex(B)){if(ctrl=A.getNextButton(B)){ctrl.style.visibility="hidden"}this.showSubmitButtons()}else{if(ctrl=A.getNextButton(B)){ctrl.style.visibility="visible"}this.hideSubmitButtons()}};wFORMS.behaviors.paging.instance.prototype.showSubmitButtons=function(){var A=this.target.getElementsByTagName("input");for(var B=0;B<A.length;B++){if(A[B].type=="submit"){A[B].className=A[B].className.replace(new RegExp("(^|\\s)"+this.behavior.CSS_SUBMIT_HIDDEN+"(\\s|$)","g"),"$2")}}};wFORMS.behaviors.paging.instance.prototype.hideSubmitButtons=function(){var A=this.target.getElementsByTagName("input");for(var B=0;B<A.length;B++){if(A[B].type=="submit"){if(!(new RegExp("(^|\\s)"+this.behavior.CSS_SUBMIT_HIDDEN+"(\\s|$)")).test(A[B].className)){A[B].className+=" "+this.behavior.CSS_SUBMIT_HIDDEN}}}};wFORMS.behaviors.paging.getPageByIndex=function(A){var B=document.getElementById(wFORMS.behaviors.paging.ID_PAGE_PREFIX+A);return B?base2.DOM.bind(B):false};wFORMS.behaviors.paging.getNextButton=function(A){return document.getElementById(wFORMS.behaviors.paging.ID_BUTTON_NEXT_PREFIX+A)};wFORMS.behaviors.paging.getPreviousButton=function(A){return document.getElementById(wFORMS.behaviors.paging.ID_BUTTON_PREVIOUS_PREFIX+A)};wFORMS.behaviors.paging.isLastPageIndex=function(C,B){C=parseInt(C)+1;var A=wFORMS.behaviors.paging;var D=A.getPageByIndex(C);if((_b=wFORMS.behaviors["switch"])&&!B){while(D&&_b.isSwitchedOff(D)){C++;D=A.getPageByIndex(C)}}return D?false:true};wFORMS.behaviors.paging.isFirstPageIndex=function(C,B){C=parseInt(C)-1;var A=wFORMS.behaviors.paging;var D=A.getPageByIndex(C);if((_b=wFORMS.behaviors["switch"])&&!B){while(D&&_b.isSwitchedOff(D)){C--;D=A.getPageByIndex(C)}}return D?false:true};wFORMS.behaviors.paging.instance.prototype.findNextPage=function(B){B=parseInt(B)+1;var A=wFORMS.behaviors.paging;var C=A.getPageByIndex(B);if(_b=wFORMS.behaviors["switch"]){while(C&&_b.isSwitchedOff(C)){B++;C=A.getPageByIndex(B)}}return C};wFORMS.behaviors.paging.instance.prototype.findPreviousPage=function(B){B=parseInt(B)-1;var A=wFORMS.behaviors.paging;var C=A.getPageByIndex(B);if(_b=wFORMS.behaviors["switch"]){while(C&&_b.isSwitchedOff(C)){B--;C=A.getPageByIndex(B)}}return C?C:false};wFORMS.behaviors.paging.instance.prototype.run=function(B,A){this.activatePage(A.getAttribute(wFORMS.behaviors.paging.ATTR_INDEX))};if(typeof (wFORMS)=="undefined"){throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")}wFORMS.behaviors.repeat={SELECTOR_REPEAT:'*[class~="repeat"]',SELECTOR_REMOVEABLE:'*[class~="removeable"]',ID_SUFFIX_DUPLICATE_LINK:"-wfDL",ID_SUFFIX_COUNTER:"-RC",CSS_DUPLICATE_LINK:"duplicateLink",CSS_DUPLICATE_SPAN:"duplicateSpan",CSS_DELETE_LINK:"removeLink",CSS_DELETE_SPAN:"removeSpan",CSS_REMOVEABLE:"removeable",CSS_REPEATABLE:"repeat",ATTR_DUPLICATE:"wfr__dup",ATTR_DUPLICATE_ELEM:"wfr__dup_elem",ATTR_HANDLED:"wfr_handled",ATTR_MASTER_SECTION:"wfr__master_sec",ATTR_LINK_SECTION_ID:"wfr_sec_id",MESSAGES:{ADD_CAPTION:"Add another response",ADD_TITLE:"Will duplicate this question or section.",REMOVE_CAPTION:"Remove",REMOVE_TITLE:"Will remove this question or section"},UPDATEABLE_ATTR_ARRAY:["id","name","for"],preserveRadioName:false,CSS_PRESERVE_RADIO_NAME:"preserveRadioName",onRepeat:function(A){},onRemove:function(){},allowRepeat:function(B,A){return true},instance:function(A){this.behavior=wFORMS.behaviors.repeat;this.target=A}};var _b=wFORMS.behaviors.repeat;var _i=wFORMS.behaviors.repeat.instance;_b.applyTo=function(F){var C=this;var B=new Array();if(!F.querySelectorAll){base2.DOM.bind(F)}F.querySelectorAll(this.SELECTOR_REPEAT).forEach(function(H){if(C.isHandled(H)){return }if(!H.id){H.id=wFORMS.helpers.randomId()}var G=new C.instance(H);var I=G.getOrCreateRepeatLink(H);I.addEventListener("click",function(J){G.run(J,I)},false);G.setElementHandled(H);B.push(G)});if(F.hasClass(this.CSS_REMOVEABLE)){var A=this.getMasterSection(F);var E=wFORMS.getBehaviorInstance(A,"repeat");if(E){E.getOrCreateRemoveLink(F)}else{if(B[0]){B[0].getOrCreateRemoveLink(F)}}}F.querySelectorAll(this.SELECTOR_REMOVEABLE).forEach(function(I){var G=wFORMS.behaviors.repeat.getMasterSection(I);var H=wFORMS.getBehaviorInstance(G,"repeat");if(H){H.getOrCreateRemoveLink(I)}else{if(B[0]){B[0].getOrCreateRemoveLink(I)}}});for(var D=0;D<B.length;D++){B[D].onApply()}return B};_i.prototype.onApply=function(){};_i.prototype.getOrCreateRepeatLink=function(C){var E=C.id+this.behavior.ID_SUFFIX_DUPLICATE_LINK;var D=document.getElementById(E);if(!D||D==""){D=this.createRepeatLink(E);var A=document.createElement("span");A.className=this.behavior.CSS_DUPLICATE_SPAN;D=A.appendChild(D);if(C.tagName.toUpperCase()=="TR"){var B=C.getElementsByTagName("TD");if(!B){B=C.appendChild(document.createElement("TD"))}else{B=B[B.length-1]}B.appendChild(A)}else{C.appendChild(A)}}return base2.DOM.bind(D)};_i.prototype.createRepeatLink=function(B){var A=document.createElement("A");A.id=B;A.setAttribute("href","#");A.className=this.behavior.CSS_DUPLICATE_LINK;A.setAttribute("title",this.behavior.MESSAGES.ADD_TITLE);A.appendChild(document.createElement("span").appendChild(document.createTextNode(this.behavior.MESSAGES.ADD_CAPTION)));return A};_i.prototype.getOrCreateRemoveLink=function(C){var D=this.createRemoveLink(C.id);if(C.tagName=="TR"){var B=C.getElementsByTagName("TD");var A=B[B.length-1];A.appendChild(D)}else{C.appendChild(D)}};_i.prototype.createRemoveLink=function(D){var B=document.createElement("a");B.id=D+this.behavior.ID_SUFFIX_DUPLICATE_LINK;B.setAttribute("href","#");B.className=this.behavior.CSS_DELETE_LINK;B.setAttribute("title",this.behavior.MESSAGES.REMOVE_TITLE);B.setAttribute(this.behavior.ATTR_LINK_SECTION_ID,D);var C=document.createElement("span");C.appendChild(document.createTextNode(this.behavior.MESSAGES.REMOVE_CAPTION));B.appendChild(C);var A=this;B.onclick=function(E){A.onRemoveLinkClick(E,B)};var C=document.createElement("span");C.className=this.behavior.CSS_DELETE_SPAN;C.appendChild(B);return C};_i.prototype.duplicateSection=function(B){if(!this.behavior.allowRepeat(B,this)){return false}this.updateMasterSection(B);var A=B.cloneNode(true);A=B.parentNode.insertBefore(A,this.getInsertNode(B));this.updateDuplicatedSection(A);wFORMS.applyBehaviors(A);this.behavior.onRepeat(A);wFORMS.helpers.spotlight(A)};_i.prototype.removeSection=function(A){if(A){A.parentNode.removeChild(A);this.behavior.onRemove()}};_i.prototype.getInsertNode=function(B){var A=B.nextSibling;if(A&&A.nodeType==1&&!A.hasClass){A=base2.DOM.bind(A)}while(A&&(A.nodeType==3||A.hasClass(this.behavior.CSS_REMOVEABLE))){A=A.nextSibling;if(A&&A.nodeType==1&&!A.hasClass){A=base2.DOM.bind(A)}}return A};_i.prototype.onRemoveLinkClick=function(B,A){var C=document.getElementById(A.getAttribute(this.behavior.ATTR_LINK_SECTION_ID));this.removeSection(C);if(B){B.preventDefault()}};_i.prototype.updateMasterSection=function(A){if(A.doItOnce==true){return true}else{A.doItOnce=true}var B=this.createSuffix(A);A.id=this.clearSuffix(A.id)+B;this.updateMasterElements(A,B)};_i.prototype.updateMasterElements=function(B,I){if(!B||B.nodeType!=1){return }var G=B.childNodes;for(var E=0;E<G.length;E++){var A=G[E];if(A.nodeType!=1){continue}if(!A.hasClass){A.hasClass=function(J){return base2.DOM.HTMLElement.hasClass(this,J)}}var C=I;if(A.hasClass(this.behavior.CSS_REPEATABLE)){I+="[0]"}if(!A.hasClass(this.behavior.CSS_REMOVEABLE)){for(var D=0;D<this.behavior.UPDATEABLE_ATTR_ARRAY.length;D++){var F=this.behavior.UPDATEABLE_ATTR_ARRAY[D];var H=this.clearSuffix(A.getAttribute(F));if(!H){continue}if(F=="id"&&wFORMS.behaviors.hint&&wFORMS.behaviors.hint.isHintId(A.id)){A.id=H.replace(new RegExp("(.*)("+wFORMS.behaviors.hint.HINT_SUFFIX+")$"),"$1"+I+"$2")}else{if(F=="id"&&wFORMS.behaviors.validation&&wFORMS.behaviors.validation.isErrorPlaceholderId(A.id)){A.id=H.replace(new RegExp("(.*)("+wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX+")$"),"$1"+I+"$2")}else{if(F=="id"&&A.id.indexOf(this.behavior.ID_SUFFIX_DUPLICATE_LINK)!=-1){A.id=H.replace(new RegExp("(.*)("+this.behavior.ID_SUFFIX_DUPLICATE_LINK+")$"),"$1"+I+"$2")}else{if(F=="id"){A.id=H+I}else{if(F=="name"){A.name=H+I}else{A.setAttribute(F,H+I)}}}}}}this.updateMasterElements(A,I)}I=C}};_i.prototype.updateDuplicatedSection=function(C){var A=this.getNextDuplicateIndex(this.target);var D=this.createSuffix(C,A);C[this.behavior.ATTR_MASTER_SECTION]=C.id;C.id=this.clearSuffix(C.id)+D;C.className=C.className.replace(this.behavior.CSS_REPEATABLE,this.behavior.CSS_REMOVEABLE);if(!C.hasClass){C.hasClass=function(E){return base2.DOM.HTMLElement.hasClass(this,E)}}if(C.hasClass(this.behavior.CSS_PRESERVE_RADIO_NAME)){var B=true}else{var B=this.behavior.preserveRadioName}this.updateSectionChildNodes(C,D,B)};_i.prototype.updateSectionChildNodes=function(E,G,B){var C=new Array();var A=E.childNodes.length;for(var D=0;D<A;D++){var F=E.childNodes[D];if(F.nodeType!=1){continue}if(!F.hasClass){F.hasClass=function(H){return base2.DOM.HTMLElement.hasClass(this,H)}}if(this.behavior.isDuplicate(F)){C.push(F);continue}if(F.hasClass(this.behavior.CSS_DUPLICATE_SPAN)){C.push(F);continue}if(F.hasClass(this.behavior.CSS_DUPLICATE_LINK)){C.push(F);continue}if(F.tagName=="INPUT"||F.tagName=="TEXTAREA"){if(F.type!="radio"&&F.type!="checkbox"){F.value=""}else{F.checked=false}}this.updateAttributes(F,G,B);if(F.hasClass(this.behavior.CSS_REPEATABLE)){this.updateSectionChildNodes(F,this.createSuffix(F),B)}else{this.updateSectionChildNodes(F,G,B)}}for(var D=0;D<C.length;D++){var F=C[D];if(F.clearAttributes){F.clearAttributes(false)}if(F.parentNode){F.parentNode.removeChild(F)}}};_i.prototype.createSuffix=function(E,B){var D="["+(B?B:"0")+"]";var C=/\[(\d+)\]$/;E=E.parentNode;while(E){if(E.hasClass&&(E.hasClass(this.behavior.CSS_REPEATABLE)||E.hasClass(this.behavior.CSS_REMOVEABLE))){var A=C.exec(E.id);if(A){A=A[1]}D="["+(A?A:"0")+"]"+D}E=E.parentNode}return D};_i.prototype.clearSuffix=function(A){if(!A){return }if(A.indexOf("[")!=-1){return A.substring(0,A.indexOf("["))}return A};_i.prototype.updateAttributes=function(F,D,H){var J=wFORMS.behaviors.hint&&wFORMS.behaviors.hint.isHintId(F.id);var C=wFORMS.behaviors.validation&&wFORMS.behaviors.validation.isErrorPlaceholderId(F.id);var B=F.id.indexOf(this.behavior.ID_SUFFIX_DUPLICATE_LINK)!=-1;this.setInDuplicateGroup(F);if(this.behavior.isHandled(F)){this.removeHandled(F)}if(wFORMS.behaviors["switch"]&&wFORMS.behaviors["switch"].isHandled(F)){wFORMS.behaviors["switch"].removeHandle(F)}var A=this.behavior.UPDATEABLE_ATTR_ARRAY.length;for(var E=0;E<A;E++){var G=this.behavior.UPDATEABLE_ATTR_ARRAY[E];var I=this.clearSuffix(F.getAttribute(G));if(!I){continue}if(G=="name"&&F.tagName=="INPUT"&&H){continue}else{if(C&&G=="id"){F.id=I+D+wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX}else{if(J&&G=="id"){F.id=I+D+wFORMS.behaviors.hint.HINT_SUFFIX}else{if(B&&G=="id"){F.id=I.replace(new RegExp("(.*)("+this.behavior.ID_SUFFIX_DUPLICATE_LINK+")$"),"$1"+D+"$2")}else{if(G=="id"){F.id=I+D}else{if(G=="name"){F.name=I+D}else{F.setAttribute(G,I+D)}}}}}}}};_i.prototype.getNextDuplicateIndex=function(A){var C=this.getOrCreateCounterField(A);var B=parseInt(C.value)+1;C.value=B;return B};_i.prototype.getOrCreateCounterField=function(C){var A=C.id+this.behavior.ID_SUFFIX_COUNTER;var B=document.getElementById(A);if(!B||B==""){B=this.createCounterField(A);var D=C.parentNode;while(D&&D.tagName.toUpperCase()!="FORM"){D=D.parentNode}D.appendChild(B)}return B};_i.prototype.createCounterField=function(A){cElem=document.createElement("input");cElem.id=A;cElem.setAttribute("type","hidden");cElem.setAttribute("name",A);cElem.value="0";return cElem};_i.prototype.getSectionsCount=function(){if(this.behavior.isDuplicate(this.target)){return false}return parseInt(this.getOrCreateCounterField(this.target).value)+1};_i.prototype.setInDuplicateGroup=function(A){return A.setAttribute(this.behavior.ATTR_DUPLICATE_ELEM,true)};_i.prototype.setElementHandled=function(A){return A.setAttribute(this.behavior.ATTR_HANDLED,true)};_i.prototype.removeHandled=function(A){return A.removeAttribute(this.behavior.ATTR_HANDLED)};_b.isDuplicate=function(A){return A.hasClass(this.CSS_REMOVEABLE)};_b.isInDuplicateGroup=function(A){return A.getAttribute(this.ATTR_DUPLICATE_ELEM)?true:false};_b.isHandled=function(A){return A.getAttribute(this.ATTR_HANDLED)};_b.getMasterSection=function(A){if(!this.isDuplicate(A)){return false}return document.getElementById(A[this.ATTR_MASTER_SECTION])};_i.prototype.run=function(B,A){this.duplicateSection(this.target);if(B){B.preventDefault()}};if(typeof (wFORMS)=="undefined"){throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")}wFORMS.behaviors["switch"]={SELECTOR:'*[class*="switch-"]',CSS_PREFIX:"switch-",CSS_OFFSTATE_PREFIX:"offstate-",CSS_ONSTATE_PREFIX:"onstate-",CSS_ONSTATE_FLAG:"swtchIsOn",CSS_OFFSTATE_FLAG:"swtchIsOff",onSwitchOn:function(A){},onSwitchOff:function(A){},onSwitch:function(A){},instance:function(A){this.behavior=wFORMS.behaviors["switch"];this.target=A}};wFORMS.behaviors["switch"].applyTo=function(B){var A=new wFORMS.behaviors["switch"].instance(B);B.querySelectorAll(wFORMS.behaviors["switch"].SELECTOR).forEach(function(G){if(!G.id){G.id=wFORMS.helpers.randomId()}switch(G.tagName.toUpperCase()){case"OPTION":var C=G.parentNode;while(C&&C.tagName!="SELECT"){C=C.parentNode}if(!C.addEventListener){base2.DOM.bind(C)}if(C&&!wFORMS.behaviors["switch"].isHandled(C)){C.addEventListener("change",function(H){A.run(H,C)},false);A.setupTargets(C);wFORMS.behaviors["switch"].handleElement(C)}break;case"INPUT":if(G.type&&G.type.toUpperCase()=="RADIO"){if(!wFORMS.behaviors["switch"].isHandled(G)){A.setupTargets(G)}var D=G.form[G.name];for(var F=D.length-1;F>=0;F--){var E=base2.DOM.bind(D[F]);if(!wFORMS.behaviors["switch"].isHandled(E)){E.addEventListener("click",function(H){A.run(H,E)},false);wFORMS.behaviors["switch"].handleElement(E)}}}else{G.addEventListener("click",function(H){A.run(H,G)},false);A.setupTargets(G)}break;default:G.addEventListener("click",function(H){A.run(H,G)},false);break}});A.onApply();return A};wFORMS.behaviors["switch"].instance.prototype.onApply=function(){};wFORMS.behaviors["switch"].isHandled=function(A){return A.getAttribute("rel")&&A.getAttribute("rel").indexOf("wfHandled")>-1};wFORMS.behaviors["switch"].handleElement=function(A){return A.setAttribute("rel",(A.getAttribute("rel")||"")+" wfHandled")};wFORMS.behaviors["switch"].removeHandle=function(A){if(attr=A.getAttribute("rel")){if(attr=="wfHandled"){A.removeAttribute("rel")}else{if(attr.indexOf("wfHandled")!=-1){A.setAttribute("rel",attr.replace(/(.*)( wfHandled)(.*)/,"$1$3"))}}}};wFORMS.behaviors["switch"].instance.prototype.getTriggersByElements=function(A,I){var C={ON:new Array(),OFF:new Array(),toString:function(){return"ON: "+this.ON+"\nOFF: "+this.OFF}};for(var G=0;G<A.length;G++){var D=A[G];switch(D.tagName.toUpperCase()){case"OPTION":if(D.selected){C.ON=C.ON.concat(this.behavior.getSwitchNamesFromTrigger(D,I))}else{C.OFF=C.OFF.concat(this.behavior.getSwitchNamesFromTrigger(D,I))}break;case"SELECT":for(var E=0;E<D.options.length;E++){var B=D.options.item(E);if(B.selected){C.ON=C.ON.concat(this.behavior.getSwitchNamesFromTrigger(B,I))}else{C.OFF=C.OFF.concat(this.behavior.getSwitchNamesFromTrigger(B,I))}}break;case"INPUT":if(D.type&&D.type.toUpperCase()=="RADIO"){var F=D.form[D.name];if(!F){break}for(var E=F.length-1;E>=0;E--){var K=F[E];if(K==D||!wFORMS.helpers.contains(A,K)){if(K.checked){C.ON=C.ON.concat(this.behavior.getSwitchNamesFromTrigger(K,I))}else{C.OFF=C.OFF.concat(this.behavior.getSwitchNamesFromTrigger(K,I))}}}}else{if(D.checked){C.ON=C.ON.concat(this.behavior.getSwitchNamesFromTrigger(D,I))}else{C.OFF=C.OFF.concat(this.behavior.getSwitchNamesFromTrigger(D,I))}}break;default:if(D.hasClass(this.behavior.CSS_ONSTATE_FLAG)){C.ON=C.ON.concat(this.behavior.getSwitchNamesFromTrigger(D,I))}else{C.OFF=C.OFF.concat(this.behavior.getSwitchNamesFromTrigger(D,I))}break}}var H=new Array();for(var G=0;G<C.ON.length;G++){if(!wFORMS.helpers.contains(H,C.ON[G])){H.push(C.ON[G])}}var J=new Array();for(var G=0;G<C.OFF.length;G++){if(!wFORMS.helpers.contains(J,C.OFF[G])){J.push(C.OFF[G])}}C.ON=H;C.OFF=J;return C};wFORMS.behaviors["switch"].getSwitchNamesFromTrigger=function(B,A){return wFORMS.behaviors["switch"].getSwitchNames(B.className,"trigger",A)};wFORMS.behaviors["switch"].getSwitchNamesFromTarget=function(B,A){return wFORMS.behaviors["switch"].getSwitchNames(B.className,"target",A)};wFORMS.behaviors["switch"].getSwitchNames=function(D,C,H){if(!D||D==""){return[]}var F=D.split(" ");var I=new Array();if(C=="trigger"){var E=true}else{var E=false}for(var B=F.length-1;B>=0;B--){var G=F[B];if(E){if(G.indexOf(this.CSS_PREFIX)==0){var A=G.substring(this.CSS_PREFIX.length)}}else{if(G.indexOf(this.CSS_ONSTATE_PREFIX)==0){var A=G.substring(this.CSS_ONSTATE_PREFIX.length)}else{if(G.indexOf(this.CSS_OFFSTATE_PREFIX)==0){var A=G.substring(this.CSS_OFFSTATE_PREFIX.length)}}}if(A&&(!H||wFORMS.helpers.contains(H,A))){I.push(A)}}return I};wFORMS.behaviors["switch"].instance.prototype.getTargetsBySwitchName=function(F,E){var C=new Array();var B=this;var A=wFORMS.behaviors.repeat;if(arguments[1]=="ON"){var D=[wFORMS.behaviors["switch"].CSS_ONSTATE_PREFIX+F]}else{var D=[wFORMS.behaviors["switch"].CSS_OFFSTATE_PREFIX+F]}this.target.querySelectorAll("."+D).forEach(function(G){if(A&&A.isInDuplicateGroup(G)&&!(A.isDuplicate(B.target)||A.isInDuplicateGroup(B.target))){return }C.push(base2.DOM.bind(G))});return C};wFORMS.behaviors["switch"].instance.prototype.getTriggersByTarget=function(E){var C=new Array();var B=this;var D=wFORMS.behaviors["switch"].getSwitchNamesFromTarget(E);var A=wFORMS.behaviors.repeat;base2.forEach(D,function(F){B.target.querySelectorAll("."+wFORMS.behaviors["switch"].CSS_PREFIX+F).forEach(function(G){if(A&&A.isInDuplicateGroup(G)&&!(A.isDuplicate(E)||A.isInDuplicateGroup(E))){return }C.push(base2.DOM.bind(G))})});return this.getTriggersByElements(C,D)};wFORMS.behaviors["switch"].instance.prototype.setupTargets=function(A){this.run(null,A)};wFORMS.behaviors["switch"].isSwitchedOff=function(A){return(A.className.match(new RegExp(wFORMS.behaviors["switch"].CSS_OFFSTATE_PREFIX+"[^ ]*"))?true:false)&&(A.className.match(new RegExp(wFORMS.behaviors["switch"].CSS_ONSTATE_PREFIX+"[^ ]*"))?false:true)};wFORMS.behaviors["switch"].instance.prototype.run=function(D,B){if(!B.hasClass){base2.DOM.bind(B)}if(B.hasClass(this.behavior.CSS_ONSTATE_FLAG)){B.removeClass(this.behavior.CSS_ONSTATE_FLAG);B.addClass(this.behavior.CSS_OFFSTATE_FLAG);if(D){D.preventDefault()}}else{if(B.hasClass(this.behavior.CSS_OFFSTATE_FLAG)){B.removeClass(this.behavior.CSS_OFFSTATE_FLAG);B.addClass(this.behavior.CSS_ONSTATE_FLAG);if(D){D.preventDefault()}}}var C=this.getTriggersByElements(new Array(B));var A=this;base2.forEach(C.OFF,function(F){var E=A.getTargetsBySwitchName(F,"ON");base2.forEach(E,function(H){var G=A.getTriggersByTarget(H);if(G.ON.length==0){H.addClass(wFORMS.behaviors["switch"].CSS_OFFSTATE_PREFIX+F);H.removeClass(wFORMS.behaviors["switch"].CSS_ONSTATE_PREFIX+F);A.behavior.onSwitchOff(H)}})});base2.forEach(C.ON,function(F){var E=A.getTargetsBySwitchName(F,"OFF");base2.forEach(E,function(G){G.removeClass(wFORMS.behaviors["switch"].CSS_OFFSTATE_PREFIX+F);G.addClass(wFORMS.behaviors["switch"].CSS_ONSTATE_PREFIX+F);A.behavior.onSwitchOn(G)})});if(b=wFORMS.getBehaviorInstance(this.target,"paging")){b.setupManagedControls()}this.behavior.onSwitch(this.target)};if(typeof (wFORMS)=="undefined"){throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")}wFORMS.behaviors.validation={ERROR_PLACEHOLDER_SUFFIX:"-E",rules:{isRequired:{selector:".required",check:"validateRequired"},isAlpha:{selector:".validate-alpha",check:"validateAlpha"},isAlphanum:{selector:".validate-alphanum",check:"validateAlphanum"},isDate:{selector:".validate-date",check:"validateDate"},isTime:{selector:".validate-time",check:"validateTime"},isEmail:{selector:".validate-email",check:"validateEmail"},isInteger:{selector:".validate-integer",check:"validateInteger"},isFloat:{selector:".validate-float",check:"validateFloat"},isCustom:{selector:".validate-custom",check:"validateCustom"}},styling:{fieldError:"errFld",errorMessage:"errMsg"},messages:{isRequired:"This field is required. ",isAlpha:"The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed.",isEmail:"This does not appear to be a valid email address.",isInteger:"Please enter an integer.",isFloat:"Please enter a number (ex. 1.9).",isAlphanum:"Please use alpha-numeric characters only [a-z 0-9].",isDate:"This does not appear to be a valid date.",isCustom:"Please enter a valid value.",notification:"%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided."},instance:function(A){this.behavior=wFORMS.behaviors.validation;this.target=A},onPass:function(A){},onFail:function(A){}};wFORMS.behaviors.validation.applyTo=function(D){if(!D||!D.tagName){throw new Error("Can't apply behavior to "+D)}if(D.tagName!="FORM"){if(D.form){D=D.form}else{var E=D;for(D=D.parentNode;D&&D.tagName!="FORM";D=D.parentNode){continue}if(!D||D.tagName!="FORM"){D=E.getElementsByTagName("form")}}}if(!D.tagName&&D.length>0){var A=new Array();for(var B=0;B<D.length;B++){var C=new wFORMS.behaviors.validation.instance(D[B]);if(!D[B].addEventListener){base2.DOM.bind(D[B])}D[B].addEventListener("submit",function(F){return C.run(F,this)},false);A.push(C);C.onApply()}}else{var A=new wFORMS.behaviors.validation.instance(D);if(!D.addEventListener){base2.DOM.bind(D)}D.addEventListener("submit",function(F){return A.run(F,this)},false);A.onApply()}return A};wFORMS.behaviors.validation.instance.prototype.onApply=function(){};wFORMS.behaviors.validation.instance.prototype.run=function(E,B){var F=0;this.elementsInError={};for(var C in this.behavior.rules){var D=this.behavior.rules[C];var A=this;if(!B.querySelectorAll){base2.DOM.bind(B)}B.querySelectorAll(D.selector).forEach(function(G){if(A.isSwitchedOff(G)){return }var H=wFORMS.helpers.getFieldValue(G);if(D.check.call){var I=D.check.call(A,G,H)}else{var I=A[D.check].call(A,G,H)}if(!I){if(!G.id){G.id=wFORMS.helpers.randomId()}A.elementsInError[G.id]={id:G.id,rule:C};A.removeErrorMessage(G);if(D.fail){D.fail.call(A,G,C)}else{A.fail.call(A,G,C)}F++}else{if(!A.elementsInError[G.id]){A.removeErrorMessage(G)}if(D.pass){D.pass.call(A,G)}else{A.pass.call(A,G)}}})}if(F>0){if(E){E.preventDefault?E.preventDefault():E.returnValue=false}if(this.behavior.onFail){this.behavior.onFail()}return false}if(this.behavior.onPass){this.behavior.onPass()}return true};wFORMS.behaviors.validation.instance.prototype.fail=function(A,B){A.addClass(this.behavior.styling.fieldError);this.addErrorMessage(A,this.behavior.messages[B])},wFORMS.behaviors.validation.instance.prototype.pass=function(A){};wFORMS.behaviors.validation.instance.prototype.addErrorMessage=function(A,B){if(!A.id){A.id=wFORMS.helpers.randomId()}var C=document.createTextNode(B);var D=document.getElementById(A.id+this.behavior.ERROR_PLACEHOLDER_SUFFIX);if(!D){D=document.createElement("div");D.setAttribute("id",A.id+this.behavior.ERROR_PLACEHOLDER_SUFFIX);if(A.tagName=="TR"){D=(A.getElementsByTagName("TD")[0]).appendChild(D)}else{D=A.parentNode.insertBefore(D,A.nextSibling)}}D.appendChild(C);base2.DOM.bind(D);D.addClass(this.behavior.styling.errorMessage)};wFORMS.behaviors.validation.instance.prototype.removeErrorMessage=function(B){if(!B.hasClass){base2.DOM.bind(B)}if(B.hasClass(this.behavior.styling.fieldError)){B.removeClass(this.behavior.styling.fieldError);var A=document.getElementById(B.id+this.behavior.ERROR_PLACEHOLDER_SUFFIX);if(A){A.parentNode.removeChild(A)}}};wFORMS.behaviors.validation.instance.prototype.isSwitchedOff=function(B){var C=wFORMS.getBehaviorInstance(this.target,"switch");if(C){var A=B;while(A&&A.tagName!="BODY"){if(A.className&&A.className.indexOf(C.behavior.CSS_OFFSTATE_PREFIX)!=-1&&A.className.indexOf(C.behavior.CSS_ONSTATE_PREFIX)==-1){return true}A=A.parentNode}}return false};wFORMS.behaviors.validation.isErrorPlaceholderId=function(A){return A.match(new RegExp(wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX+"$"))!=null};wFORMS.behaviors.validation.instance.prototype.isEmpty=function(A){var B=/^\s+$/;return((A==null)||(A.length==0)||B.test(A))};wFORMS.behaviors.validation.instance.prototype.validateRequired=function(A,C){switch(A.tagName){case"INPUT":var B=A.getAttribute("type");if(!B){B="text"}switch(B.toLowerCase()){case"checkbox":case"radio":return A.checked;break;default:return !this.isEmpty(C)}break;case"SELECT":return !this.isEmpty(C);break;case"TEXTAREA":return !this.isEmpty(C);break;default:return this.validateOneRequired(A);break}return false};wFORMS.behaviors.validation.instance.prototype.validateOneRequired=function(B){if(B.nodeType!=1){return false}if(this.isSwitchedOff(B)){return false}switch(B.tagName){case"INPUT":var C=B.getAttribute("type");if(!C){C="text"}switch(C.toLowerCase()){case"checkbox":case"radio":return B.checked;break;default:return !this.isEmpty(wFORMS.helpers.getFieldValue(B))}break;case"SELECT":return !this.isEmpty(wFORMS.helpers.getFieldValue(B));break;case"TEXTAREA":return !this.isEmpty(wFORMS.helpers.getFieldValue(B));break;default:for(var A=0;A<B.childNodes.length;A++){if(this.validateOneRequired(B.childNodes[A])){return true}}break}return false};wFORMS.behaviors.validation.instance.prototype.validateAlpha=function(A,C){var B=/^[a-zA-Z\s]+$/;return this.isEmpty(C)||B.test(C)};wFORMS.behaviors.validation.instance.prototype.validateAlphanum=function(A,C){var B=/^[\w\s]+$/;return this.isEmpty(C)||B.test(C)};wFORMS.behaviors.validation.instance.prototype.validateDate=function(B,C){var A=new Date(C);return this.isEmpty(C)||!isNaN(A)};wFORMS.behaviors.validation.instance.prototype.validateTime=function(A,B){return true};wFORMS.behaviors.validation.instance.prototype.validateEmail=function(A,B){var C=/\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,3}$/;return this.isEmpty(B)||C.test(B)};wFORMS.behaviors.validation.instance.prototype.validateInteger=function(A,C){var B=/^[+]?\d+$/;return this.isEmpty(C)||B.test(C)};wFORMS.behaviors.validation.instance.prototype.validateFloat=function(A,B){return this.isEmpty(B)||!isNaN(parseFloat(B))};wFORMS.behaviors.validation.instance.prototype.validateCustom=function(A,D){var C=new RegExp("/(.*)/([gi]*)");var B=A.className.match(C);if(B&&B[0]){var E=new RegExp(B[1],B[2]);if(!D.match(E)){return false}}return true};if(typeof (wFORMS)=="undefined"){throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.")}wFORMS.behaviors.calculation={VARIABLE_SELECTOR_PREFIX:"calc-",CHOICE_VALUE_SELECTOR_PREFIX:"calcval-",CALCULATION_SELECTOR:'*[class*="formula="]',CALCULATION_ERROR_MESSAGE:"There was an error computing this field.",instance:function(A){this.behavior=wFORMS.behaviors.calculation;this.target=A;this.calculations=[]}};wFORMS.behaviors.calculation.applyTo=function(B){var A=new wFORMS.behaviors.calculation.instance(B);B.querySelectorAll(wFORMS.behaviors.calculation.CALCULATION_SELECTOR).forEach(function(E){var G=E.className.substr(E.className.indexOf("formula=")+8).split(" ")[0];var F=G.split(/[^a-zA-Z]+/g);A.varFields=[];for(var D=0;D<F.length;D++){if(F[D]!=""){B.querySelectorAll('*[class*="'+wFORMS.behaviors.calculation.VARIABLE_SELECTOR_PREFIX+F[D]+'"]').forEach(function(H){var I=((" "+H.className+" ").indexOf(" "+wFORMS.behaviors.calculation.VARIABLE_SELECTOR_PREFIX+F[D]+" ")!=-1);if(!I){return }switch(H.tagName+":"+H.getAttribute("type")){case"INPUT:":case"INPUT:null":case"INPUT:text":case"INPUT:hidden":case"INPUT:password":case"TEXTAREA:null":if(!H._wforms_calc_handled){H.addEventListener("blur",function(J){return A.run(J,this)},false);H._wforms_calc_handled=true}break;case"INPUT:radio":case"INPUT:checkbox":if(!H._wforms_calc_handled){H.addEventListener("click",function(J){return A.run(J,this)},false);H._wforms_calc_handled=true}break;case"SELECT:null":if(!H._wforms_calc_handled){H.addEventListener("change",function(J){return A.run(J,this)},false);H._wforms_calc_handled=true}break;default:return ;break}A.varFields.push({name:F[D],field:H})})}}var C={field:E,formula:G,variables:A.varFields};A.calculations.push(C);A.compute(C)});A.onApply();return A};wFORMS.behaviors.calculation.instance.prototype.onApply=function(){};wFORMS.behaviors.calculation.instance.prototype.run=function(E,D){for(var C=0;C<this.calculations.length;C++){var B=this.calculations[C];for(var A=0;A<B.variables.length;A++){if(D==B.variables[A].field){this.compute(B)}}}};wFORMS.behaviors.calculation.instance.prototype.compute=function(calculation){var f=this.target;var formula=calculation.formula;var _processedVariables=new Array();for(var i=0;i<calculation.variables.length;i++){var v=calculation.variables[i];var varval=0;var _self=this;if(wFORMS.helpers.contains(_processedVariables,v.name)){continue}else{_processedVariables.push(v.name)}f.querySelectorAll('*[class*="'+_self.behavior.VARIABLE_SELECTOR_PREFIX+v.name+'"]').forEach(function(f){var exactMatch=((" "+f.className+" ").indexOf(" "+wFORMS.behaviors.calculation.VARIABLE_SELECTOR_PREFIX+v.name+" ")!=-1);if(!exactMatch){return }if(_self.hasValueInClassName(f)){var value=_self.getValueFromClassName(f)}else{var value=wFORMS.helpers.getFieldValue(f)}if(!value){value=0}if(value.constructor==Array){for(var j=0;j<value.length;j++){varval+=parseFloat(value[j])}}else{varval+=parseFloat(value)}});var rgx=new RegExp("([^a-z])("+v.name+")([^a-z])","gi");while((" "+formula+" ").match(rgx)){formula=(" "+formula+" ").replace(rgx,"$1"+varval+"$3")}}try{var result=eval(formula);if(result=="Infinity"||result=="NaN"||isNaN(result)){result="error"}}catch(x){result="error";console.log(calculation.formula,formula)}var validationBehavior=wFORMS.getBehaviorInstance(this.target,"validation");if(validationBehavior){if(!wFORMS.behaviors.validation.messages["calculation"]){wFORMS.behaviors.validation.messages["calculation"]=this.behavior.CALCULATION_ERROR_MESSAGE}validationBehavior.removeErrorMessage(calculation.field);if(result=="error"){validationBehavior.fail(calculation.field,"calculation")}}calculation.field.value=result;if(calculation.field.className&&(calculation.field.className.indexOf(this.behavior.VARIABLE_SELECTOR_PREFIX)!=-1)){this.run(null,calculation.field)}};wFORMS.behaviors.calculation.instance.prototype.hasValueInClassName=function(B){switch(B.tagName){case"SELECT":for(var A=0;A<B.options.length;A++){if(B.options[A].className&&B.options[A].className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)!=-1){return true}}return false;break;default:if(!B.className||(" "+B.className).indexOf(" "+this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)==-1){return false}break}return true};wFORMS.behaviors.calculation.instance.prototype.getValueFromClassName=function(C){switch(C.tagName){case"INPUT":if(!C.className||C.className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)==-1){return null}var D=C.className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(" ")[0];if(C.type=="checkbox"){return C.checked?D:null}if(C.type=="radio"){return C.checked?D:null}return D;break;case"SELECT":if(C.selectedIndex==-1){return null}if(C.getAttribute("multiple")){var A=[];for(var B=0;B<C.options.length;B++){if(C.options[B].selected){if(C.options[B].className&&C.options[B].className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)!=-1){var D=C.options[B].className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(" ")[0];A.push(D)}}}if(A.length==0){return null}return A}if(C.options[C.selectedIndex].className&&C.options[C.selectedIndex].className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)!=-1){var D=C.options[C.selectedIndex].className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(" ")[0];return D}break;case"TEXTAREA":if(!C.className||C.className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)==-1){return null}var D=C.className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(" ")[0];return D;break;default:return null;break}return null}