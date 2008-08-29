/* wForms 3.0
A javascript extension to web forms.

Copyright (c) 2005-2007 Cedric Savarese <cedric@veerwest.com> and contributors.
This software is licensed under the CC-GNU LGPL <http://creativecommons.org/licenses/LGPL/2.1/>
For more information, visit: http://www.formassembly.com/wForms

wForms version 3.0 by Demid Nikitin and Cedric Savarese.
wForms 3.0 requires base2 - copyright 2007, Dean Edwards. */

var base2={name:"base2",version:"1.0 (beta 2)",exports:"Base,Package,Abstract,Module,Enumerable,Map,Collection,RegGrp,"+"assert,assertArity,assertType,assignID,copy,detect,extend,"+"forEach,format,global,instanceOf,match,rescape,slice,trim,typeOf,"+"I,K,Undefined,Null,True,False,bind,delegate,flip,not,unbind",global:this,detect:new function(_){var global=_;var jscript=NaN/*@cc_on||@_jscript_version@*/;var java=_.java?true:false;if(_.navigator){var element=document.createElement("span");var userAgent=navigator.platform+" "+navigator.userAgent.replace(/([a-z])[\s\/](\d)/gi,"$1$2");if(!jscript)userAgent=userAgent.replace(/MSIE[\d.]+/,"");java&=navigator.javaEnabled()}return function(a){var r=false;var b=a.charAt(0)=="!";if(b)a=a.slice(1);if(a.charAt(0)=="("){try{eval("r=!!"+a)}catch(error){}}else{r=new RegExp("("+a+")","i").test(userAgent)}return!!(b^r)}}(this)};new function(_){var _0="function base(o,a){return o.base.apply(o,a)};";eval(_0);var detect=base2.detect;var Undefined=K(),Null=K(null),True=K(true),False=K(false);var _1=/%([1-9])/g;var _2=/^\s\s*/;var _3=/\s\s*$/;var _4=/([\/()[\]{}|*+-.,^$?\\])/g;var _5=/eval/.test(detect)?/\bbase\s*\(/:/.*/;var _6=["constructor","toString","valueOf"];var _7=detect("(jscript)")?new RegExp("^"+rescape(isNaN).replace(/isNaN/,"\\w+")+"$"):{test:False};var _8=1;var _9=Array.prototype.slice;var slice=Array.slice||function(a){return _9.apply(a,_9.call(arguments,1))};_10();var _11=function(a,b){base2.__prototyping=this.prototype;var c=new this;extend(c,a);delete base2.__prototyping;var d=c.constructor;function _12(){if(!base2.__prototyping){if(this.constructor==arguments.callee||this.__constructing){this.__constructing=true;d.apply(this,arguments);delete this.__constructing}else{return extend(arguments[0],c)}}return this};c.constructor=_12;for(var i in Base)_12[i]=this[i];_12.toString=K(String(d));_12.ancestor=this;_12.base=Undefined;_12.init=Undefined;extend(_12,b);_12.prototype=c;_12.init();return _12};var Base=_11.call(Object,{constructor:function(){if(arguments.length>0){this.extend(arguments[0])}},base:function(){},extend:delegate(extend)},Base={ancestorOf:delegate(_13),extend:_11,forEach:delegate(_10),implement:function(a){if(typeof a=="function"){if(_13(Base,a)){a(this.prototype)}}else{extend(this.prototype,a)}return this}});var Package=Base.extend({constructor:function(d,e){this.extend(e);if(this.init)this.init();if(this.name!="base2"){if(!this.parent)this.parent=base2;this.parent.addName(this.name,this);this.namespace=format("var %1=%2;",this.name,String(this).slice(1,-1))}var f=/[^\s,]+/g;if(d){d.imports=Array2.reduce(this.imports.match(f),function(a,b){eval("var ns=base2."+b);assert(ns,format("Package not found: '%1'.",b),ReferenceError);return a+=ns.namespace},_0+base2.namespace+JavaScript.namespace);d.exports=Array2.reduce(this.exports.match(f),function(a,b){var c=this.name+"."+b;this.namespace+="var "+b+"="+c+";";return a+="if(!"+c+")"+c+"="+b+";"},"",this)}},exports:"",imports:"",name:"",namespace:"",parent:null,addName:function(a,b){if(!this[a]){this[a]=b;this.exports+=","+a;this.namespace+=format("var %1=%2.%1;",a,this.name)}},addPackage:function(a){this.addName(a,new Package(null,{name:a,parent:this}))},toString:function(){return format("[%1]",this.parent?String(this.parent).slice(1,-1)+"."+this.name:this.name)}});var Abstract=Base.extend({constructor:function(){throw new TypeError("Class cannot be instantiated.");}});var Module=Abstract.extend(null,{extend:function(a,b){var c=this.base();c.implement(this);c.implement(a);extend(c,b);c.init();return c},implement:function(d){var e=this;if(typeof d=="function"){if(!_13(d,e)){this.base(d)}if(_13(Module,d)){forEach(d,function(a,b){if(!e[b]){if(typeof a=="function"&&a.call&&d.prototype[b]){a=function(){return d[b].apply(d,arguments)}}e[b]=a}})}}else{extend(e,d);_10(Object,d,function(b,c){if(c.charAt(0)=="@"){if(detect(c.slice(1))){forEach(b,arguments.callee)}}else if(typeof b=="function"&&b.call){e.prototype[c]=function(){var a=_9.call(arguments);a.unshift(this);return e[c].apply(e,a)}}})}return e}});var Enumerable=Module.extend({every:function(c,d,e){var f=true;try{this.forEach(c,function(a,b){f=d.call(e,a,b,c);if(!f)throw StopIteration;})}catch(error){if(error!=StopIteration)throw error;}return!!f},filter:function(d,e,f){var i=0;return this.reduce(d,function(a,b,c){if(e.call(f,b,c,d)){a[i++]=b}return a},[])},invoke:function(b,c){var d=_9.call(arguments,2);return this.map(b,(typeof c=="function")?function(a){return(a==null)?undefined:c.apply(a,d)}:function(a){return(a==null)?undefined:a[c].apply(a,d)})},map:function(c,d,e){var f=[],i=0;this.forEach(c,function(a,b){f[i++]=d.call(e,a,b,c)});return f},pluck:function(b,c){return this.map(b,function(a){return(a==null)?undefined:a[c]})},reduce:function(c,d,e,f){var g=arguments.length>2;this.forEach(c,function(a,b){if(g){e=d.call(f,e,a,b,c)}else{e=a;g=true}});return e},some:function(a,b,c){return!this.every(a,not(b),c)}},{forEach:forEach});var _14="#";var Map=Base.extend({constructor:function(a){this.merge(a)},copy:delegate(copy),forEach:function(a,b){for(var c in this)if(c.charAt(0)==_14){a.call(b,this[c],c.slice(1),this)}},get:function(a){return this[_14+a]},getKeys:function(){return this.map(flip(I))},getValues:function(){return this.map(I)},has:function(a){/*@cc_on@*//*@if(@_jscript_version<5.5)return $Legacy.has(this,_14+a);@else@*/return _14+a in this;/*@end@*/},merge:function(b){var c=flip(this.put);forEach(arguments,function(a){forEach(a,c,this)},this);return this},remove:function(a){delete this[_14+a]},put:function(a,b){if(arguments.length==1)b=a;this[_14+a]=b},size:function(){var a=0;for(var b in this)if(b.charAt(0)==_14)a++;return a},union:function(a){return this.merge.apply(this.copy(),arguments)}});Map.implement(Enumerable);var _15="~";var Collection=Map.extend({constructor:function(a){this[_15]=new Array2;this.base(a)},add:function(a,b){assert(!this.has(a),"Duplicate key '"+a+"'.");this.put.apply(this,arguments)},copy:function(){var a=this.base();a[_15]=this[_15].copy();return a},forEach:function(a,b){var c=this[_15];var d=c.length;for(var i=0;i<d;i++){a.call(b,this[_14+c[i]],c[i],this)}},getAt:function(a){if(a<0)a+=this[_15].length;var b=this[_15][a];return(b===undefined)?undefined:this[_14+b]},getKeys:function(){return this[_15].concat()},indexOf:function(a){return this[_15].indexOf(String(a))},insertAt:function(a,b,c){assert(Math.abs(a)<this[_15].length,"Index out of bounds.");assert(!this.has(b),"Duplicate key '"+b+"'.");this[_15].insertAt(a,String(b));this[_14+b]==null;this.put.apply(this,_9.call(arguments,1))},item:Undefined,put:function(a,b){if(arguments.length==1)b=a;if(!this.has(a)){this[_15].push(String(a))}var c=this.constructor;if(c.Item&&!instanceOf(b,c.Item)){b=c.create.apply(c,arguments)}this[_14+a]=b},putAt:function(a,b){assert(Math.abs(a)<this[_15].length,"Index out of bounds.");arguments[0]=this[_15].item(a);this.put.apply(this,arguments)},remove:function(a){if(this.has(a)){this[_15].remove(String(a));delete this[_14+a]}},removeAt:function(a){var b=this[_15].removeAt(a);delete this[_14+b]},reverse:function(){this[_15].reverse();return this},size:function(){return this[_15].length},sort:function(c){if(c){var d=this;this[_15].sort(function(a,b){return c(d[_14+a],d[_14+b],a,b)})}else this[_15].sort();return this},toString:function(){return String(this[_15])}},{Item:null,init:function(){this.prototype.item=this.prototype.getAt},create:function(a,b){return this.Item?new this.Item(a,b):b},extend:function(a,b){var c=this.base(a);c.create=this.create;extend(c,b);if(!c.Item){c.Item=this.Item}else if(typeof c.Item!="function"){c.Item=(this.Item||Base).extend(c.Item)}c.init();return c}});var _16=/\\(\d+)/g,_17=/\\./g,_18=/\(\?[:=!]|\[[^\]]+\]/g,_19=/\(/g,_20=/\$(\d+)/,_21=/^\$\d+$/;var RegGrp=Collection.extend({constructor:function(a,b){this.base(a);if(typeof b=="string"){this.global=/g/.test(b);this.ignoreCase=/i/.test(b)}},global:true,ignoreCase:false,exec:function(h,j){var k=(this.global?"g":"")+(this.ignoreCase?"i":"");h=String(h)+"";if(arguments.length==1){var l=this;var m=this[_15];j=function(a){if(a){var b,c=1,i=0;while((b=l[_14+m[i++]])){var d=c+b.length+1;if(arguments[c]){var e=b.replacement;switch(typeof e){case"function":var f=_9.call(arguments,c,d);var g=arguments[arguments.length-2];return e.apply(l,f.concat(g,h));case"number":return arguments[c+e];default:return e}}c=d}}return""}}return h.replace(new RegExp(this,k),j)},insertAt:function(a,b,c){if(instanceOf(b,RegExp)){arguments[1]=b.source}return base(this,arguments)},test:function(a){return this.exec(a)!=a},toString:function(){var e=0;return"("+this.map(function(c){var d=String(c).replace(_16,function(a,b){return"\\"+(1+Number(b)+e)});e+=c.length+1;return d}).join(")|(")+")"}},{IGNORE:"$0",init:function(){forEach("add,get,has,put,remove".split(","),function(b){_22(this,b,function(a){if(instanceOf(a,RegExp)){arguments[0]=a.source}return base(this,arguments)})},this.prototype)},Item:{constructor:function(a,b){if(typeof b=="number")b=String(b);else if(b==null)b="";if(typeof b=="string"&&_20.test(b)){if(_21.test(b)){b=parseInt(b.slice(1))}else{var Q=/'/.test(b.replace(/\\./g,""))?'"':"'";b=b.replace(/\n/g,"\\n").replace(/\r/g,"\\r").replace(/\$(\d+)/g,Q+"+(arguments[$1]||"+Q+Q+")+"+Q);b=new Function("return "+Q+b.replace(/(['"])\1\+(.*)\+\1\1$/,"$1")+Q)}}this.length=RegGrp.count(a);this.replacement=b;this.toString=K(String(a))},length:0,replacement:""},count:function(a){a=String(a).replace(_17,"").replace(_18,"");return match(a,_19).length}});var JavaScript={name:"JavaScript",version:base2.version,exports:"Array2,Date2,String2",namespace:"",bind:function(c){forEach(this.exports.match(/\w+/g),function(a){var b=a.slice(0,-1);extend(c[b],this[a]);this[a](c[b].prototype)},this);return this}};if((new Date).getYear()>1900){Date.prototype.getYear=function(){return this.getFullYear()-1900};Date.prototype.setYear=function(a){return this.setFullYear(a+1900)}}Function.prototype.prototype={};if("".replace(/^/,K("$$"))=="$"){extend(String.prototype,"replace",function(a,b){if(typeof b=="function"){var c=b;b=function(){return String(c.apply(null,arguments)).split("$").join("$$")}}return this.base(a,b)})}var Array2=_23(Array,Array,"concat,join,pop,push,reverse,shift,slice,sort,splice,unshift",[Enumerable,{combine:function(d,e){if(!e)e=d;return this.reduce(d,function(a,b,c){a[b]=e[c];return a},{})},contains:function(a,b){return this.indexOf(a,b)!=-1},copy:function(a){var b=_9.call(a);if(!b.swap)this(b);return b},flatten:function(c){var d=0;return this.reduce(c,function(a,b){if(this.like(b)){this.reduce(b,arguments.callee,a,this)}else{a[d++]=b}return a},[],this)},forEach:_24,indexOf:function(a,b,c){var d=a.length;if(c==null){c=0}else if(c<0){c=Math.max(0,d+c)}for(var i=c;i<d;i++){if(a[i]===b)return i}return-1},insertAt:function(a,b,c){this.splice(a,b,0,c);return c},item:function(a,b){if(b<0)b+=a.length;return a[b]},lastIndexOf:function(a,b,c){var d=a.length;if(c==null){c=d-1}else if(c<0){c=Math.max(0,d+c)}for(var i=c;i>=0;i--){if(a[i]===b)return i}return-1},map:function(c,d,e){var f=[];this.forEach(c,function(a,b){f[b]=d.call(e,a,b,c)});return f},remove:function(a,b){var c=this.indexOf(a,b);if(c!=-1)this.removeAt(a,c);return b},removeAt:function(a,b){return this.splice(a,b,1)},swap:function(a,b,c){if(b<0)b+=a.length;if(c<0)c+=a.length;var d=a[b];a[b]=a[c];a[c]=d;return a}}]);Array2.reduce=Enumerable.reduce;Array2.like=function(a){return!!(a&&typeof a=="object"&&typeof a.length=="number")};var _25=/^((-\d+|\d{4,})(-(\d{2})(-(\d{2}))?)?)?T((\d{2})(:(\d{2})(:(\d{2})(\.(\d{1,3})(\d)?\d*)?)?)?)?(([+-])(\d{2})(:(\d{2}))?|Z)?$/;var _26={FullYear:2,Month:4,Date:6,Hours:8,Minutes:10,Seconds:12,Milliseconds:14};var _27={Hectomicroseconds:15,UTC:16,Sign:17,Hours:18,Minutes:20};var _28=/(((00)?:0+)?:0+)?\.0+$/;var _29=/(T[0-9:.]+)$/;var Date2=_23(Date,function(a,b,c,h,m,s,d){switch(arguments.length){case 0:return new Date;case 1:return new Date(a);default:return new Date(a,b,arguments.length==2?1:c,h||0,m||0,s||0,d||0)}},"",[{toISOString:function(c){var d="####-##-##T##:##:##.###";for(var e in _26){d=d.replace(/#+/,function(a){var b=c["getUTC"+e]();if(e=="Month")b++;return("000"+b).slice(-a.length)})}return d.replace(_28,"").replace(_29,"$1Z")}}]);Date2.now=function(){return(new Date).valueOf()};Date2.parse=function(a,b){if(arguments.length>1){assertType(b,"number","defaultDate should be of type 'number'.")}var c=String(a).match(_25);if(c){if(c[_26.Month])c[_26.Month]--;if(c[_27.Hectomicroseconds]>=5)c[_26.Milliseconds]++;var d=new Date(b||0);var e=c[_27.UTC]||c[_27.Hours]?"UTC":"";for(var f in _26){var value=c[_26[f]];if(!value)continue;d["set"+e+f](value);if(d["get"+e+f]()!=c[_26[f]]){return NaN}}if(c[_27.Hours]){var g=Number(c[_27.Sign]+c[_27.Hours]);var h=Number(c[_27.Sign]+(c[_27.Minutes]||0));d.setUTCMinutes(d.getUTCMinutes()+(g*60)+h)}return d.valueOf()}else{return Date.parse(a)}};var String2=_23(String,function(a){return new String(arguments.length==0?"":a)},"charAt,charCodeAt,concat,indexOf,lastIndexOf,match,replace,search,slice,split,substr,substring,toLowerCase,toUpperCase",[{trim:trim}]);function _23(c,constructor,d,e){var f=Module.extend();forEach(d.match(/\w+/g),function(a){f[a]=unbind(c.prototype[a])});forEach(e,f.implement,f);var g=function(){return f(this.constructor==f?constructor.apply(null,arguments):arguments[0])};g.prototype=f.prototype;forEach(f,function(a,b){if(c[b]){f[b]=c[b];delete f.prototype[b]}g[b]=f[b]});g.ancestor=Object;delete g.extend;if(c!=Array)delete g.forEach;return g};function extend(a,b){if(a&&b){if(arguments.length>2){var c=b;b={};b[c]=arguments[2]}var d=(typeof b=="function"?Function:Object).prototype;var i=_6.length,c;if(base2.__prototyping){while(c=_6[--i]){var e=b[c];if(e!=d[c]){if(_5.test(e)){_22(a,c,e)}else{a[c]=e}}}}for(c in b){if(d[c]===undefined){var e=b[c];if(c.charAt(0)=="@"){if(detect(c.slice(1)))arguments.callee(a,e);continue}var f=a[c];if(f&&typeof e=="function"){if(e!=f&&(!f.method||!_13(e,f))){if(_5.test(e)){_22(a,c,e)}else{e.ancestor=f;a[c]=e}}}else{a[c]=e}}}}return a};function _13(a,b){while(b){if(!b.ancestor)return false;b=b.ancestor;if(b==a)return true}return false};function _22(c,d,e){var f=c[d];var g=base2.__prototyping;if(g&&f!=g[d])g=null;function _30(){var a=this.base;this.base=g?g[d]:f;var b=e.apply(this,arguments);this.base=a;return b};_30.ancestor=f;_30.method=e;_30.toString=function(){return String(e)};c[d]=_30};if(typeof StopIteration=="undefined"){StopIteration=new Error("StopIteration")}function forEach(a,b,c,d){if(a==null)return;if(!d){if(typeof a=="function"&&a.call){d=Function}else if(typeof a.forEach=="function"&&a.forEach!=arguments.callee){a.forEach(b,c);return}else if(typeof a.length=="number"){_24(a,b,c);return}}_10(d||Object,a,b,c)};function _24(a,b,c){if(a==null)return;var d=a.length,i;if(typeof a=="string"){for(i=0;i<d;i++){b.call(c,a.charAt(i),i,a)}}else{for(i=0;i<d;i++){/*@cc_on@*//*@if(@_jscript_version<5.2)if($Legacy.has(a,i))@else@*/if(i in a)/*@end@*/b.call(c,a[i],i,a)}}};function _10(g,h,j,k){var l=function(){this.i=1};l.prototype={i:1};var m=0;for(var i in new l)m++;_10=(m>1)?function(a,b,c,d){var e={};for(var f in b){if(!e[f]&&a.prototype[f]===undefined){e[f]=true;c.call(d,b[f],f,b)}}}:function(a,b,c,d){for(var e in b){if(a.prototype[e]===undefined){c.call(d,b[e],e,b)}}};_10(g,h,j,k)};function typeOf(a){var b=typeof a;switch(b){case"object":return a===null?"null":typeof a.call=="function"||_7.test(a)?"function":b;case"function":return typeof a.call=="function"?b:"object";default:return b}};function instanceOf(a,b){if(typeof b!="function"){throw new TypeError("Invalid 'instanceOf' operand.");}if(a==null)return false;/*@cc_on if(typeof a.constructor!="function"){return typeOf(a)==typeof b.prototype.valueOf()}@*//*@if(@_jscript_version<5.1)if($Legacy.instanceOf(a,b))return true;@else@*/if(a instanceof b)return true;/*@end@*/if(Base.ancestorOf==b.ancestorOf)return false;if(Base.ancestorOf==a.constructor.ancestorOf)return b==Object;switch(b){case Array:return!!(typeof a=="object"&&a.join&&a.splice);case Function:return typeOf(a)=="function";case RegExp:return typeof a.constructor.$1=="string";case Date:return!!a.getTimezoneOffset;case String:case Number:case Boolean:return typeof a==typeof b.prototype.valueOf();case Object:return true}return false};function assert(a,b,c){if(!a){throw new(c||Error)(b||"Assertion failed.");}};function assertArity(a,b,c){if(b==null)b=a.callee.length;if(a.length<b){throw new SyntaxError(c||"Not enough arguments.");}};function assertType(a,b,c){if(b&&(typeof b=="function"?!instanceOf(a,b):typeOf(a)!=b)){throw new TypeError(c||"Invalid type.");}};function assignID(a){if(!a.base2ID)a.base2ID="b2_"+_8++;return a.base2ID};function copy(a){var b=function(){};b.prototype=a;return new b};function format(c){var d=arguments;var e=new RegExp("%([1-"+arguments.length+"])","g");return String(c).replace(e,function(a,b){return d[b]})};function match(a,b){return String(a).match(b)||[]};function rescape(a){return String(a).replace(_4,"\\$1")};function trim(a){return String(a).replace(_2,"").replace(_3,"")};function I(i){return i};function K(k){return function(){return k}};function bind(a,b){var c=_9.call(arguments,2);return c.length==0?function(){return a.apply(b,arguments)}:function(){return a.apply(b,c.concat.apply(c,arguments))}};function delegate(b,c){return function(){var a=_9.call(arguments);a.unshift(this);return b.apply(c,a)}};function flip(a){return function(){return a.apply(this,Array2.swap(arguments,0,1))}};function not(a){return function(){return!a.apply(this,arguments)}};function unbind(b){return function(a){return b.apply(a,_9.call(arguments,1))}};base2=new Package(this,base2);eval(this.exports);base2.extend=extend;forEach(Enumerable,function(a,b){if(!Module[b])base2.addName(b,bind(a,Enumerable))});JavaScript=new Package(this,JavaScript);eval(this.exports)};

new function(_){var DOM=new base2.Package(this,{name:"DOM",version:"1.0 (beta 2)",exports:"Interface,Binding,Node,Document,Element,AbstractView,HTMLDocument,HTMLElement,"+"Selector,Traversal,XPathParser,NodeSelector,DocumentSelector,ElementSelector,"+"StaticNodeList,Event,EventTarget,DocumentEvent,ViewCSS,CSSStyleDeclaration",bind:function(a){if(a&&a.nodeType){var b=assignID(a);if(!DOM.bind[b]){switch(a.nodeType){case 1:if(typeof a.className=="string"){(HTMLElement.bindings[a.tagName]||HTMLElement).bind(a)}else{Element.bind(a)}break;case 9:if(a.writeln){HTMLDocument.bind(a)}else{Document.bind(a)}break;default:Node.bind(a)}DOM.bind[b]=true}}return a},"@MSIE5.+win":{bind:function(a){if(a&&a.writeln){a.nodeType=9}return this.base(a)}}});eval(this.imports);var _0=detect("MSIE");var _1=detect("MSIE5");var Interface=Module.extend(null,{implement:function(e){var f=this;if(Interface.ancestorOf(e)){forEach(e,function(a,b){if(e[b]._2){f[b]=function(){return e[b].apply(e,arguments)}}})}else if(typeof e=="object"){this.forEach(e,function(a,b){if(b.charAt(0)=="@"){forEach(a,arguments.callee)}else if(typeof a=="function"&&a.call){if(!f[b]){var c="var fn=function _%1(%2){%3.base=%3.%1.ancestor;var m=%3.base?'base':'%1';return %3[m](%4)}";var d="abcdefghij".split("").slice(-a.length);eval(format(c,b,d,d[0],d.slice(1)));fn._2=b;f[b]=fn}}})}return this.base(e)}});var Binding=Interface.extend(null,{bind:function(a){return extend(a,this.prototype)}});var Node=Binding.extend({"@!(element.compareDocumentPosition)":{compareDocumentPosition:function(a,b){if(Traversal.contains(a,b)){return 4|16}else if(Traversal.contains(b,a)){return 2|8}var c=_3(a);var d=_3(b);if(c<d){return 4}else if(c>d){return 2}return 0}}});var _3=document.documentElement.sourceIndex?function(a){return a.sourceIndex}:function(a){var b=0;while(a){b=Traversal.getNodeIndex(a)+"."+b;a=a.parentNode}return b};var Document=Node.extend(null,{bind:function(b){extend(b,"createElement",function(a){return DOM.bind(this.base(a))});AbstractView.bind(b.defaultView);if(b!=window.document)new DOMContentLoadedEvent(b);return this.base(b)},"@!(document.defaultView)":{bind:function(a){a.defaultView=Traversal.getDefaultView(a);return this.base(a)}}});var _4=/^(href|src|type)$/;var _5={"class":"className","for":"htmlFor"};var Element=Node.extend({"@MSIE.+win":{getAttribute:function(a,b,c){if(a.className===undefined){return this.base(a,b)}var d=_6(a,b);if(d&&(d.specified||b=="value")){if(_4.test(b)){return this.base(a,b,2)}else if(b=="style"){return a.style.cssText}else{return d.nodeValue}}return null},setAttribute:function(a,b,c){if(a.className===undefined){this.base(a,b,c)}else if(b=="style"){a.style.cssText=c}else{c=String(c);var d=_6(a,b);if(d){d.nodeValue=c}else{this.base(a,_5[b]||b,c)}}}},"@!(element.hasAttribute)":{hasAttribute:function(a,b){return this.getAttribute(a,b)!=null}}});extend(Element.prototype,"cloneNode",function(a){var b=this.base(a||false);b.base2ID=undefined;return b});if(_0){var names="colSpan,rowSpan,vAlign,dateTime,accessKey,tabIndex,encType,maxLength,readOnly,longDesc";extend(_5,Array2.combine(names.toLowerCase().split(","),names.split(",")));var _6=_1?function(a,b){return a.attributes[b]||a.attributes[_5[b.toLowerCase()]]}:function(a,b){return a.getAttributeNode(b)}}var TEXT=_0?"innerText":"textContent";var Traversal=Module.extend({getDefaultView:function(a){return this.getDocument(a).defaultView},getNextElementSibling:function(a){while(a&&(a=a.nextSibling)&&!this.isElement(a))continue;return a},getNodeIndex:function(a){var b=0;while(a&&(a=a.previousSibling))b++;return b},getOwnerDocument:function(a){return a.ownerDocument},getPreviousElementSibling:function(a){while(a&&(a=a.previousSibling)&&!this.isElement(a))continue;return a},getTextContent:function(a){return a[TEXT]},isEmpty:function(a){a=a.firstChild;while(a){if(a.nodeType==3||this.isElement(a))return false;a=a.nextSibling}return true},setTextContent:function(a,b){return a[TEXT]=b},"@MSIE":{getDefaultView:function(a){return(a.document||a).parentWindow},"@MSIE5":{getOwnerDocument:function(a){return a.ownerDocument||a.document}}}},{contains:function(a,b){while(b&&(b=b.parentNode)&&a!=b)continue;return!!b},getDocument:function(a){return this.isDocument(a)?a:this.getOwnerDocument(a)},isDocument:function(a){return!!(a&&a.documentElement)},isElement:function(a){return!!(a&&a.nodeType==1)},"@(element.contains)":{contains:function(a,b){return a!=b&&(this.isDocument(a)?a==this.getOwnerDocument(b):a.contains(b))}},"@MSIE5":{isElement:function(a){return!!(a&&a.nodeType==1&&a.tagName!="!")}}});var AbstractView=Binding.extend();var Event=Binding.extend({"@!(document.createEvent)":{initEvent:function(a,b,c,d){a.type=b;a.bubbles=c;a.cancelable=d;a.timeStamp=new Date().valueOf()},"@MSIE":{initEvent:function(a,b,c,d){this.base(a,b,c,d);a.cancelBubble=!a.bubbles},preventDefault:function(a){if(a.cancelable!==false){a.returnValue=false}},stopPropagation:function(a){a.cancelBubble=true}}}},{"@!(document.createEvent)":{"@MSIE":{bind:function(a){if(!a.timeStamp){a.bubbles=!!_7[a.type];a.cancelable=!!_8[a.type];a.timeStamp=new Date().valueOf()}if(!a.target){a.target=a.srcElement}a.relatedTarget=a[(a.type=="mouseout"?"to":"from")+"Element"];return this.base(a)}}}});if(_0){var _7="abort,error,select,change,resize,scroll";var _8="click,mousedown,mouseup,mouseover,mousemove,mouseout,keydown,keyup,submit,reset";_7=Array2.combine((_7+","+_8).split(","));_8=Array2.combine(_8.split(","))}var EventTarget=Interface.extend({"@!(element.addEventListener)":{addEventListener:function(a,b,c,d){var e=assignID(a);var f=assignID(c);var g=_9[e];if(!g)g=_9[e]={};var h=g[b];var i=a["on"+b];if(!h){h=g[b]={};if(i)h[0]=i}h[f]=c;if(i!==undefined){a["on"+b]=_9._10}},dispatchEvent:function(a,b){return _10.call(a,b)},removeEventListener:function(a,b,c,d){var e=_9[a.base2ID];if(e&&e[b]){delete e[b][c.base2ID]}},"@(element.fireEvent)":{dispatchEvent:function(a,b){var c="on"+b.type;b.target=a;if(a[c]===undefined){return this.base(a,b)}else{return a.fireEvent(c,b)}}}}});var _9=new Base({_10:_10,"@MSIE":{_10:function(){var a=this;var b=(a.document||a).parentWindow;if(a.Infinity)a=b;return _10.call(a,b.event)}}});function _10(a){var b=true;var c=_9[this.base2ID];if(c){Event.bind(a);var d=c[a.type];for(var i in d){var listener=d[i];if(listener.handleEvent){var result=listener.handleEvent(a)}else{result=listener.call(this,a)}if(result===false||a.returnValue===false)b=false}}return b};var DocumentEvent=Interface.extend({"@!(document.createEvent)":{createEvent:function(a,b){return Event.bind({})},"@(document.createEventObject)":{createEvent:function(a,b){return Event.bind(a.createEventObject())}}},"@(document.createEvent)":{"@!(document.createEvent('Events'))":{createEvent:function(a,b){return this.base(a,b=="Events"?"UIEvents":b)}}}});var DOMContentLoadedEvent=Base.extend({constructor:function(b){var c=false;this.fire=function(){if(!c){c=true;setTimeout(function(){var a=DocumentEvent.createEvent(b,"Events");Event.initEvent(a,"DOMContentLoaded",false,false);EventTarget.dispatchEvent(b,a)},1)}};EventTarget.addEventListener(b,"DOMContentLoaded",function(){c=true},false);this.listen(b)},listen:function(a){EventTarget.addEventListener(Traversal.getDefaultView(a),"load",this.fire,false)},"@MSIE.+win":{listen:function(a){if(a.readyState!="complete"){var b=this;a.write("<script id=__ready defer src=//:><\/script>");a.all.__ready.onreadystatechange=function(){if(this.readyState=="complete"){this.removeNode();b.fire()}}}}},"@KHTML":{listen:function(a){if(a.readyState!="complete"){var b=this;var c=setInterval(function(){if(/loaded|complete/.test(a.readyState)){clearInterval(c);b.fire()}},100)}}}});new DOMContentLoadedEvent(document);Document.implement(DocumentEvent);Document.implement(EventTarget);Element.implement(EventTarget);var _11=/^\d+(px)?$/i;var _12=/(width|height|top|bottom|left|right|fontSize)$/;var _13=/^(color|backgroundColor)$/;var ViewCSS=Interface.extend({"@!(document.defaultView.getComputedStyle)":{"@MSIE":{getComputedStyle:function(a,b,c){var d=b.currentStyle;var e={};for(var i in d){if(_12.test(i)){e[i]=_14(b,e[i])+"px"}else if(_13.test(i)){e[i]=_15(b,i=="color"?"ForeColor":"BackColor")}else{e[i]=d[i]}}return e}}},getComputedStyle:function(a,b,c){return _16.bind(this.base(a,b,c))}},{toCamelCase:function(c){return c.replace(/\-([a-z])/g,function(a,b){return b.toUpperCase()})}});function _14(a,b){if(_11.test(b))return parseInt(b);var c=a.style.left;var d=a.runtimeStyle.left;a.runtimeStyle.left=a.currentStyle.left;a.style.left=b||0;b=a.style.pixelLeft;a.style.left=c;a.runtimeStyle.left=d;return b};function _15(a,b){var c=a.document.body.createTextRange();c.moveToElementText(a);var d=c.queryCommandValue(b);return format("rgb(%1,%2,%3)",d&0xff,(d&0xff00)>>8,(d&0xff0000)>>16)};var _16=Binding.extend({getPropertyValue:function(a,b){return this.base(a,_17[b]||b)},"@MSIE.+win":{getPropertyValue:function(a,b){return b=="float"?a.styleFloat:a[ViewCSS.toCamelCase(b)]}}});var CSSStyleDeclaration=_16.extend({setProperty:function(a,b,c,d){return this.base(a,_17[b]||b,c,d)},"@MSIE.+win":{setProperty:function(a,b,c,d){if(b=="opacity"){a.opacity=c;a.zoom=1;a.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+(c*100)+")"}else{a.cssText+=format("%1:%2 %3;",b,c,d)}}}});var _17=new Base({"@Gecko":{opacity:"-moz-opacity"},"@KHTML":{opacity:"-khtml-opacity"}});AbstractView.implement(ViewCSS);var NodeSelector=Interface.extend({"@!(element.querySelector)":{querySelector:function(a,b){return new Selector(b).exec(a,1)},querySelectorAll:function(a,b){return new Selector(b).exec(a)}}});extend(NodeSelector.prototype,{querySelector:function(a){return DOM.bind(this.base(a))},querySelectorAll:function(b){return extend(this.base(b),"item",function(a){return DOM.bind(this.base(a))})}});var DocumentSelector=NodeSelector.extend();var ElementSelector=NodeSelector.extend({"@!(element.matchesSelector)":{matchesSelector:function(a,b){return new Selector(b).test(a)}}});var StaticNodeList=Base.extend({constructor:function(b){b=b||[];this.length=b.length;this.item=function(a){return b[a]}},length:0,forEach:function(a,b){for(var i=0;i<this.length;i++){a.call(b,this.item(i),i,this)}},item:Undefined,"@(XPathResult)":{constructor:function(b){if(b&&b.snapshotItem){this.length=b.snapshotLength;this.item=function(a){return b.snapshotItem(a)}}else this.base(b)}}});StaticNodeList.implement(Enumerable);var CSSParser=RegGrp.extend({constructor:function(a){this.base(a);this.cache={};this.sorter=new RegGrp;this.sorter.add(/:not\([^)]*\)/,RegGrp.IGNORE);this.sorter.add(/([ >](\*|[\w-]+))([^: >+~]*)(:\w+-child(\([^)]+\))?)([^: >+~]*)/,"$1$3$6$4")},cache:null,ignoreCase:true,escape:function(b){var c=/'/g;var d=this._18=[];return this.optimise(this.format(String(b).replace(CSSParser.ESCAPE,function(a){return"\x01"+d.push(a.slice(1,-1).replace(c,"\\'"))})))},format:function(a){return a.replace(CSSParser.WHITESPACE,"$1").replace(CSSParser.IMPLIED_SPACE,"$1 $2").replace(CSSParser.IMPLIED_ASTERISK,"$1*$2")},optimise:function(a){return this.sorter.exec(a.replace(CSSParser.WILD_CARD,">* "))},parse:function(a){return this.cache[a]||(this.cache[a]=this.unescape(this.exec(this.escape(a))))},unescape:function(c){var d=this._18;return c.replace(/\x01(\d+)/g,function(a,b){return d[b-1]})}},{ESCAPE:/'(\\.|[^'\\])*'|"(\\.|[^"\\])*"/g,IMPLIED_ASTERISK:/([\s>+~,]|[^(]\+|^)([#.:\[])/g,IMPLIED_SPACE:/(^|,)([^\s>+~])/g,WHITESPACE:/\s*([\s>+~(),]|^|$)\s*/g,WILD_CARD:/\s\*\s/g,_19:function(c,d,e,f,g,h,i,j){f=/last/i.test(c)?f+"+1-":"";if(!isNaN(d))d="0n+"+d;else if(d=="even")d="2n";else if(d=="odd")d="2n+1";d=d.split(/n\+?/);var a=d[0]?(d[0]=="-")?-1:parseInt(d[0]):1;var b=parseInt(d[1])||0;var k=a<0;if(k){a=-a;if(a==1)b++}var l=format(a==0?"%3%7"+(f+b):"(%4%3-%2)%6%1%70%5%4%3>=%2",a,b,e,f,h,i,j);if(k)l=g+"("+l+")";return l}});var XPathParser=CSSParser.extend({constructor:function(){this.base(XPathParser.rules);this.sorter.putAt(1,"$1$4$3$6")},escape:function(a){return this.base(a).replace(/,/g,"\x02")},unescape:function(b){return this.base(b.replace(/\[self::\*\]/g,"").replace(/(^|\x02)\//g,"$1./").replace(/\x02/g," | ")).replace(/'[^'\\]*\\'(\\.|[^'\\])*'/g,function(a){return"concat("+a.split("\\'").join("',\"'\",'")+")"})},"@opera":{unescape:function(a){return this.base(a.replace(/last\(\)/g,"count(preceding-sibling::*)+count(following-sibling::*)+1"))}}},{init:function(){this.values.attributes[""]="[@$1]";forEach(this.types,function(a,b){forEach(this.values[b],a,this.rules)},this)},optimised:{pseudoClasses:{"first-child":"[1]","last-child":"[last()]","only-child":"[last()=1]"}},rules:extend({},{"@!KHTML":{"(^|\\x02) (\\*|[\\w-]+)#([\\w-]+)":"$1id('$3')[self::$2]","([ >])(\\*|[\\w-]+):([\\w-]+-child(\\(([^)]+)\\))?)":function(a,b,c,d,e,f){var g=(b==" ")?"//*":"/*";if(/^nth/i.test(d)){g+=_19(d,f,"position()")}else{g+=XPathParser.optimised.pseudoClasses[d]}return g+"[self::"+c+"]"}}}),types:{identifiers:function(a,b){this[rescape(b)+"([\\w-]+)"]=a},combinators:function(a,b){this[rescape(b)+"(\\*|[\\w-]+)"]=a},attributes:function(a,b){this["\\[([\\w-]+)\\s*"+rescape(b)+"\\s*([^\\]]*)\\]"]=a},pseudoClasses:function(a,b){this[":"+b.replace(/\(\)$/,"\\(([^)]+)\\)")]=a}},values:{identifiers:{"#":"[@id='$1'][1]",".":"[contains(concat(' ',@class,' '),' $1 ')]"},combinators:{" ":"/descendant::$1",">":"/child::$1","+":"/following-sibling::*[1][self::$1]","~":"/following-sibling::$1"},attributes:{"*=":"[contains(@$1,'$2')]","^=":"[starts-with(@$1,'$2')]","$=":"[substring(@$1,string-length(@$1)-string-length('$2')+1)='$2']","~=":"[contains(concat(' ',@$1,' '),' $2 ')]","|=":"[contains(concat('-',@$1,'-'),'-$2-')]","!=":"[not(@$1='$2')]","=":"[@$1='$2']"},pseudoClasses:{"empty":"[not(child::*) and not(text())]","first-child":"[not(preceding-sibling::*)]","last-child":"[not(following-sibling::*)]","not()":_20,"nth-child()":_19,"nth-last-child()":_19,"only-child":"[not(preceding-sibling::*) and not(following-sibling::*)]","root":"[not(parent::*)]"}},"@opera":{init:function(){this.optimised.pseudoClasses["last-child"]=this.values.pseudoClasses["last-child"];this.optimised.pseudoClasses["only-child"]=this.values.pseudoClasses["only-child"];this.base()}}});var _21=new XPathParser;function _20(a,b){return"[not("+_21.exec(trim(b)).replace(/\[1\]/g,"").replace(/^(\*|[\w-]+)/,"[self::$1]").replace(/\]\[/g," and ").slice(1,-1)+")]"};function _19(a,b,c){return"["+CSSParser._19(a,b,c||"count(preceding-sibling::*)+1","last()","not"," and "," mod ","=")+"]"};var _22=":(checked|disabled|enabled|contains)|^(#[\\w-]+\\s*)?\\w+$";if(detect("KHTML")){if(detect("WebKit5")){_22+="|nth\\-|,"}else{_22="."}}_22=new RegExp(_22);var _23;var Selector=Base.extend({constructor:function(a){this.toString=K(trim(a))},exec:function(a,b){return Selector.parse(this)(a,b)},test:function(a){var b=new Selector(this+"[b2-test]");a.setAttribute("b2-test",true);var c=b.exec(Traversal.getOwnerDocument(a),true);a.removeAttribute("b2-test");return c==a},toXPath:function(){return Selector.toXPath(this)},"@(XPathResult)":{exec:function(a,b){if(_22.test(this)){return this.base(a,b)}var c=Traversal.getDocument(a);var d=b?9:7;var e=c.evaluate(this.toXPath(),a,null,d,null);return b?e.singleNodeValue:e}},"@MSIE":{exec:function(a,b){if(typeof a.selectNodes!="undefined"&&!_22.test(this)){var c=b?"selectSingleNode":"selectNodes";return a[c](this.toXPath())}return this.base(a,b)}},"@(true)":{exec:function(a,b){try{var c=this.base(a||document,b)}catch(error){throw new SyntaxError(format("'%1' is not a valid CSS selector.",this));}return b?c:new StaticNodeList(c)}}},{toXPath:function(a){if(!_23)_23=new XPathParser;return _23.parse(a)}});new function(_){var _24={"=":"%1=='%2'","!=":"%1!='%2'","~=":/(^| )%1( |$)/,"|=":/^%1(-|$)/,"^=":/^%1/,"$=":/%1$/,"*=":/%1/};_24[""]="%1!=null";var _25={"checked":"e%1.checked","contains":"e%1[TEXT].indexOf('%2')!=-1","disabled":"e%1.disabled","empty":"Traversal.isEmpty(e%1)","enabled":"e%1.disabled===false","first-child":"!Traversal.getPreviousElementSibling(e%1)","last-child":"!Traversal.getNextElementSibling(e%1)","only-child":"!Traversal.getPreviousElementSibling(e%1)&&!Traversal.getNextElementSibling(e%1)","root":"e%1==Traversal.getDocument(e%1).documentElement"};var _26=detect("(element.sourceIndex)");var _27="var p%2=0,i%2,e%2,n%2=e%1.";var _28=_26?"e%1.sourceIndex":"assignID(e%1)";var _29="var g="+_28+";if(!p[g]){p[g]=1;";var _30="r[r.length]=e%1;if(s)return e%1;";var _31="fn=function(e0,s){indexed++;var r=[],p={},reg=[%1],"+"d=Traversal.getDocument(e0),c=d.body?'toUpperCase':'toString';";var byId=_0?function(a,b){var c=a.all[b]||null;if(!c||c.id==b)return c;for(var i=0;i<c.length;i++){if(c[i].id==b)return c[i]}return null}:function(a,b){return a.getElementById(b)};var indexed=1;function register(a){if(a.rows){a.b2_length=a.rows.length;a.b2_lookup="rowIndex"}else if(a.cells){a.b2_length=a.cells.length;a.b2_lookup="cellIndex"}else if(a.b2_indexed!=indexed){var b=0;var c=a.firstChild;while(c){if(c.nodeType==1&&c.nodeName!="!"){c.b2_index=++b}c=c.nextSibling}a.b2_length=b;a.b2_lookup="b2_index"}a.b2_indexed=indexed;return a};var fn;var reg;var _32;var _33;var _34;var _35;var _36={};var parser=new CSSParser({"^ \\*:root":function(a){_33=false;var b="e%2=d.documentElement;if(Traversal.contains(e%1,e%2)){";return format(b,_32++,_32)}," (\\*|[\\w-]+)#([\\w-]+)":function(a,b,c){_33=false;var d="var e%2=byId(d,'%4');if(e%2&&";if(b!="*")d+="e%2.nodeName=='%3'[c]()&&";d+="Traversal.contains(e%1,e%2)){";if(_34)d+=format("i%1=n%1.length;",_34);return format(d,_32++,_32,b,c)}," (\\*|[\\w-]+)":function(a,b){_35++;_33=b=="*";var c=_27;c+=(_33&&_1)?"all":"getElementsByTagName('%3')";c+=";for(i%2=0;(e%2=n%2[i%2]);i%2++){";return format(c,_32++,_34=_32,b)},">(\\*|[\\w-]+)":function(a,b){var c=_0&&_34;_33=b=="*";var d=_27;d+=c?"children":"childNodes";if(!_33&&c)d+=".tags('%3')";d+=";for(i%2=0;(e%2=n%2[i%2]);i%2++){";if(_33){d+="if(e%2.nodeType==1){";_33=_1}else{if(!c)d+="if(e%2.nodeName=='%3'[c]()){"}return format(d,_32++,_34=_32,b)},"\\+(\\*|[\\w-]+)":function(a,b){var c="";if(_33&&_0)c+="if(e%1.tagName!='!'){";_33=false;c+="e%1=Traversal.getNextElementSibling(e%1);if(e%1";if(b!="*")c+="&&e%1.nodeName=='%2'[c]()";c+="){";return format(c,_32,b)},"~(\\*|[\\w-]+)":function(a,b){var c="";if(_33&&_0)c+="if(e%1.tagName!='!'){";_33=false;_35=2;c+="while(e%1=e%1.nextSibling){if(e%1.b2_adjacent==indexed)break;if(";if(b=="*"){c+="e%1.nodeType==1";if(_1)c+="&&e%1.tagName!='!'"}else c+="e%1.nodeName=='%2'[c]()";c+="){e%1.b2_adjacent=indexed;";return format(c,_32,b)},"#([\\w-]+)":function(a,b){_33=false;var c="if(e%1.id=='%2'){";if(_34)c+=format("i%1=n%1.length;",_34);return format(c,_32,b)},"\\.([\\w-]+)":function(a,b){_33=false;reg.push(new RegExp("(^|\\s)"+rescape(b)+"(\\s|$)"));return format("if(e%1.className&&reg[%2].test(e%1.className)){",_32,reg.length-1)},":not\\((\\*|[\\w-]+)?([^)]*)\\)":function(a,b,c){var d=(b&&b!="*")?format("if(e%1.nodeName=='%2'[c]()){",_32,b):"";d+=parser.exec(c);return"if(!"+d.slice(2,-1).replace(/\)\{if\(/g,"&&")+"){"},":nth(-last)?-child\\(([^)]+)\\)":function(a,b,c){_33=false;b=format("e%1.parentNode.b2_length",_32);var d="if(p%1!==e%1.parentNode)p%1=register(e%1.parentNode);";d+="var i=e%1[p%1.b2_lookup];if(";return format(d,_32)+CSSParser._19(a,c,"i",b,"!","&&","%","==")+"){"},":([\\w-]+)(\\(([^)]+)\\))?":function(a,b,c,d){return"if("+format(_25[b]||"throw",_32,d||"")+"){"},"\\[([\\w-]+)\\s*([^=]?=)?\\s*([^\\]]*)\\]":function(a,b,c,d){var e=_5[b]||b;if(c){var f="e%1.getAttribute('%2',2)";if(!_4.test(b)){f="e%1.%3||"+f}b=format("("+f+")",_32,b,e)}else{b=format("Element.getAttribute(e%1,'%2')",_32,b)}var g=_24[c||""];if(instanceOf(g,RegExp)){reg.push(new RegExp(format(g.source,rescape(parser.unescape(d)))));g="reg[%2].test(%1)";d=reg.length-1}return"if("+format(g,b,d)+"){"}});Selector.parse=function(a){if(!_36[a]){reg=[];fn="";var b=parser.escape(a).split(",");for(var i=0;i<b.length;i++){_33=_32=_34=0;_35=b.length>1?2:0;var c=parser.exec(b[i])||"throw;";if(_33&&_0){c+=format("if(e%1.tagName!='!'){",_32)}var d=(_35>1)?_29:"";c+=format(d+_30,_32);c+=Array(match(c,/\{/g).length+1).join("}");fn+=c}eval(format(_31,reg)+parser.unescape(fn)+"return s?null:r}");_36[a]=fn}return _36[a]}};Document.implement(DocumentSelector);Element.implement(ElementSelector);var HTMLDocument=Document.extend(null,{"@(document.activeElement===undefined)":{bind:function(b){b.activeElement=null;EventTarget.addEventListener(b,"focus",function(a){b.activeElement=a.target},false);return this.base(b)}}});var HTMLElement=Element.extend({addClass:function(a,b){if(!this.hasClass(a,b)){a.className+=(a.className?" ":"")+b}},hasClass:function(a,b){var c=new RegExp("(^|\\s)"+b+"(\\s|$)");return c.test(a.className)},removeClass:function(a,b){var c=new RegExp("(^|\\s)"+b+"(\\s|$)","g");a.className=a.className.replace(c,"$2")},toggleClass:function(a,b){if(this.hasClass(a,b)){this.removeClass(a,b)}else{this.addClass(a,b)}}},{bindings:{},tags:"*",bind:function(a){CSSStyleDeclaration.bind(a.style);return this.base(a)},extend:function(){var b=base(this,arguments);var c=(b.tags||"").toUpperCase().split(",");forEach(c,function(a){HTMLElement.bindings[a]=b});return b},"@!(element.ownerDocument)":{bind:function(a){a.ownerDocument=Traversal.getOwnerDocument(a);return this.base(a)}}});HTMLElement.extend(null,{tags:"APPLET,EMBED",bind:I});eval(this.exports)};

//This should be removed when base2 becomes safari compatable. 
if( navigator.appVersion.search(/Safari/) != -1)
{
NodeList.prototype.forEach = function (a, b) { for (var i = 0; i < this.length; i++) { a.call(b, this.item(i), i, this); } };
} 
//

if (typeof(base2) == "undefined") {
	throw new Error("Base2 not found. wForms 3.0 depends on the base2 library.");
}

if (typeof(wFORMS) == "undefined") {
	wFORMS = {};
}
wFORMS.NAME 	= "wFORMS";
wFORMS.VERSION 	= "3.0";
wFORMS.__repr__ = function () {
	return "[" + this.NAME + " " + this.VERSION + "]";
};
wFORMS.toString = function () {
	return this.__repr__();
};

wFORMS.behaviors = {};
wFORMS.helpers   = {}
wFORMS.instances = []; // keeps track of behavior instances

/**
 * Helper method.
 * @return {string} A randomly generated id (with very high probability of uniqueness). 
 */	
wFORMS.helpers.randomId = function () {
	var seed = (new Date()).getTime();
	seed = seed.toString().substr(6);
	for (var i=0; i<6;i++)
		seed += String.fromCharCode(48 + Math.floor((Math.random()*10)));
	return "id_" + seed;
}

/**
 * getFieldValue 
 * @param {domElement} element 
 * @returns {string} the value of the field. 
 */
wFORMS.helpers.getFieldValue = function(element) {
	switch(element.tagName) {
		case "INPUT":
			if(element.type=='checkbox')
				return element.checked?element.value:null;
			if(element.type=='radio')
				return element.checked?element.value:null;
			return element.value;
			break;
		case "SELECT":		
			if(element.selectedIndex==-1) {					
				return null; 
			} 
			if(element.getAttribute('multiple')) {
				var v=[];
				for(var i=0;i<element.options.length;i++) {
					if(element.options[i].selected) {
						v.push(element.options[i].value);
					}
				}
				return v;
			}											
			return element.options[element.selectedIndex].value;
			break;
		case "TEXTAREA":
			// TODO: fix this
			return element.value;
			break;
		default:
			return null; 
			break;
	} 	 
}

/**
 * DEPRECATED
 * Returns computed style from the element by style name
 * @param	{HTMLElement}	element
 * @param	{String}	styleName
 * @return	{String} or false
 */
wFORMS.helpers.getComputedStyle = function(element, styleName){
	return document.defaultView.getComputedStyle(element, "").getPropertyValue(styleName);
}

/**
 * Returns left position of the element
 * @params	{HTMLElement}	elem	Source element 
 */
wFORMS.helpers.getLeft = function(elem){
	var pos = 0;
	while(elem.offsetParent) {
		try {
			if(document.defaultView.getComputedStyle(elem, "").getPropertyValue('position') == 'relative'){
				return pos;
			}
			if(pos > 0 && document.defaultView.getComputedStyle(elem, "").getPropertyValue('position') == 'absolute'){
				return pos;
			}
		} catch(x) {}
		pos += elem.offsetLeft;
		
		elem = elem.offsetParent;
		
	}
 	if(!window.opera && document.all && document.compatMode && document.compatMode != "BackCompat") {
		pos += parseInt(document.body.currentStyle.marginTop); 	   		
 	}
	return pos;
}

/**
 * Returns top position of the element
 * @params	{HTMLElement}	elem	Source element 
 */
wFORMS.helpers.getTop = function(elem){
	var pos = 0;
	while(elem.offsetParent) {
		try {
			if(document.defaultView.getComputedStyle(elem, "").getPropertyValue('position') == 'relative'){
				return pos;
			}
			if(pos > 0 && document.defaultView.getComputedStyle(elem, "").getPropertyValue('position') == 'absolute'){
				return pos;
			}
		} catch(x) {}
		pos += elem.offsetTop;
		
		elem = elem.offsetParent;
	}
	if(!window.opera && document.all && document.compatMode && document.compatMode != "BackCompat") {
		pos += parseInt(document.body.currentStyle.marginLeft) + 1; 	   		
 	}
	return pos;
}

/**
 * highlight change 
 */ 
wFORMS.helpers.useSpotlight = false;

wFORMS.helpers.spotlight = function(target) {
	// not implemented	 	
}

/**
 * Activating an Alternate Stylesheet (thx to: http://www.howtocreate.co.uk/tutorials/index.php?tut=0&part=27)
 * Use this to activate a CSS Stylesheet that shouldn't be used if javascript is turned off.
 * The stylesheet rel attribute should be 'alternate stylesheet'. The title attribute MUST be set.
 */
wFORMS.helpers.activateStylesheet = function(sheetref) {
	if(document.getElementsByTagName) {
		var ss=document.getElementsByTagName('link');
	} else if (document.styleSheets) {
		var ss = document.styleSheets;
	}
	for(var i=0;ss[i];i++ ) {
		if(ss[i].href.indexOf(sheetref) != -1) {
			ss[i].disabled = true;
			ss[i].disabled = false;			
		}
	}
}

wFORMS.helpers.contains = function(array, needle) {
	var l=array.length;
	for (var i=0; i<l; i++) {
		if(array[i] === needle) {
			return true;
		}
	}
	return false;
}
/**
 * Initialization routine. Automatically applies the behaviors to all web forms in the document.  
 */	
wFORMS.onLoadHandler = function() {
	var forms=document.getElementsByTagName("FORM");
	
	for(var i=0;i<forms.length;i++) {
		if(forms[i].getAttribute('rel')!='no-behavior')
			wFORMS.applyBehaviors(forms[i]);
	}	
}

/**
 * Initialization routine. Automatically applies all behaviors to the given element.
 * @param {domElement} A form element, or any of its children.
 * TODO: Kill existing instances before applying the behavior to the same element. 
 */	
wFORMS.applyBehaviors = function(f) {
	
	if(!f.querySelectorAll) {
		base2.DOM.bind(f);
	}
	// switch must run before paging behavior
	if(wFORMS.behaviors['switch']){
		var b = wFORMS.behaviors['switch'].applyTo(f);
		if(!wFORMS.instances['switch']) {
			wFORMS.instances['switch'] = [b];
		} else {
			wFORMS.removeBehavior(f, 'switch');
			wFORMS.instances['switch'].push(b);
		}		
	}
	for(var behaviorName in wFORMS.behaviors) {
		if(behaviorName == 'switch'){
			continue;
		}		
		if(wFORMS.behaviors[behaviorName].applyTo) {
			// It is a behavior.
			
			var b = wFORMS.behaviors[behaviorName].applyTo(f);
			
			// behaviors may create several instances
			// if single instance returned, convert it to an array
			if(b && b.constructor != Array) {
				b=[b];			
			} 
			
			for(var i=0;b && i<b.length;i++) {
				if(!wFORMS.instances[behaviorName]) {
					wFORMS.instances[behaviorName] = [b[i]];
				} else {
					wFORMS.removeBehavior(f, behaviorName);
					wFORMS.instances[behaviorName].push(b[i]);
				}
			}
		}
	}
	if(wFORMS.behaviors.onApplyAll) {
		wFORMS.behaviors.onApplyAll(f);
	}
}

wFORMS.removeBehavior = function(f, behaviorName) {
	
	return null;
	
	if(!wFORMS.instances[behaviorName]) 
		return null;

	for(var i=0; i < wFORMS.instances[behaviorName].length; i++) {
		if(wFORMS.instances[behaviorName][i].target==f) {
			
			// TODO: call a remove method for each behavior to cleanly remove any event handler
			wFORMS.instances[behaviorName][i] = null;
		}	
	}
	return null;
}

/**
 * Returns the behavior instance associated to the given form/behavior pair.
 * @param	{domElement}	a HTML element (often the form element itself)
 * @param	{string}		the name of the behavior 
 * @return	{object}		the instance of the behavior 
 * TODO: Returns an array if more than one instance for the given form
 */
wFORMS.getBehaviorInstance = function(f, behaviorName) {
	if(!f || !wFORMS.instances[behaviorName]) 
		return null;
	
	for(var i=0; i < wFORMS.instances[behaviorName].length; i++) {
		if(wFORMS.instances[behaviorName][i].target==f) {
			return wFORMS.instances[behaviorName][i];
		}	
	}
	return null;
}

base2.DOM.Element.addEventListener(document, 'DOMContentLoaded',wFORMS.onLoadHandler,false);
// document.addEventListener('DOMContentLoaded',wFORMS.onLoadHandler,false);

// Attach JS only stylesheet.
wFORMS.helpers.activateStylesheet('wforms-jsonly.css');

if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms hint behavior. Show/highlight an HTML element when the associated input gets the focus.
 */
wFORMS.behaviors.hint  = { 
	
	/**
	 * Inactive CSS class for the element
     * @final
	 */
	CSS_INACTIVE : 'field-hint-inactive',

	/**
	 * Active CSS class for the element
     * @final
	 */
	CSS_ACTIVE : 'field-hint',

	/**
	 * Selector expression for the hint elements
     * @final
     * @see	http://www.w3.org/TR/css3-selectors/
	 */
	HINT_SELECTOR : '*[id$="-H"]',

	/**
	 * Suffix of the ID for the hint element
     * @final
	 */
	HINT_SUFFIX : '-H',

	/**
	 * Creates new instance of the behavior
     * @constructor
	 */
	instance : function(f) {
		this.behavior = wFORMS.behaviors.hint; 
		this.target = f;
	}
}

/**
 * Factory Method.
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 * @return {object} an instance of the behavior 
 */	
wFORMS.behaviors.hint.applyTo = function(f) {
	var b = new wFORMS.behaviors.hint.instance(f);
	// Selects all hints elements using predefined selector and attaches
	// event listeners to related HTML elements for each hint
	f.querySelectorAll(wFORMS.behaviors.hint.HINT_SELECTOR).forEach(
		function(elem){
			
			// ID attribute is not checked here because selector already contains it
			// if selector is changed, ID check should also exists
			// if(!elem.id) { return ; }
			var e = b.getElementByHintId(elem.id);
			if(e){
				if(!e.addEventListener) base2.DOM.bind(e);
				if(e.tagName == "SELECT" || e.tagName == "TEXTAREA" || (e.tagName == "INPUT" && e.type != "radio" && e.type != "checkbox")){							
					e.addEventListener('focus', function(event) { b.run(event, this)}, false);
					e.addEventListener('blur',  function(event) { b.run(event, this)}, false);	
				} else {
					e.addEventListener('mouseover', function(event) { b.run(event, e)}, false);
					e.addEventListener('mouseout', function(event) { b.run(event, e)}, false);
				}
			}
		}
	);
	b.onApply();
	return b;
}

/**
 * Executed once the behavior has been applied to the document.
 * Can be overwritten.
 */
wFORMS.behaviors.hint.instance.prototype.onApply = function() {} 

/**
 * Executes the behavior
 * @param {event} event
 * @param {domElement} elem
 */
wFORMS.behaviors.hint.instance.prototype.run = function(event, element) { 	
	
	var hint = this.getHintElement(element);
	if(!hint) return;

	if(event.type == 'focus' || event.type == 'mouseover'){
		hint.removeClass(wFORMS.behaviors.hint.CSS_INACTIVE)
		hint.addClass(wFORMS.behaviors.hint.CSS_ACTIVE);
		this.setup(hint, element);
	} else{
		hint.addClass(wFORMS.behaviors.hint.CSS_INACTIVE);
		hint.removeClass(wFORMS.behaviors.hint.CSS_ACTIVE);
	}
}


/**
 * Returns HTMLElement related to specified hint ID
 * @returns	{HTMLElement}
 */
wFORMS.behaviors.hint.instance.prototype.getElementByHintId = function(hintId){
	var id = hintId.substr(0, hintId.length - wFORMS.behaviors.hint.HINT_SUFFIX.length);
	var e = document.getElementById(id);
	return e;
}

/**
 * Returns HTMLElement Hint element associated with element event catched from
 * @returns	{HTMLElement}
 */
wFORMS.behaviors.hint.instance.prototype.getHintElement = function(element){
	var e = document.getElementById(element.id + this.behavior.HINT_SUFFIX);
	if(e && !e.hasClass){base2.DOM.bind(e);}
	return e && e != '' ? e : null;
}

/**
 * Setups hint position on the screen depend on the element
 * @param	{HTMLElement}	hint	Hint HTML element
 * @param   {HTMLElement}	source	HTML element with focus.
 */
wFORMS.behaviors.hint.instance.prototype.setup = function(hint, source){
	
	var l = ((source.tagName == 'SELECT' ? + source.offsetWidth : 0) + wFORMS.helpers.getLeft(source));
	var t  = (wFORMS.helpers.getTop(source) + source.offsetHeight);	
	hint.style.left = l + "px"; 
	hint.style.top  = t + "px";
}

/**
 * Returns if ID is of the HINT element. Used by repeat behavior to correctly 
 * update hint ID
 * @param	{DOMString}	id
 * @return	boolean
 */
wFORMS.behaviors.hint.isHintId = function(id){
	return id.match(new RegExp(wFORMS.behaviors.hint.HINT_SUFFIX + '$')) != null;
}

if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms paging behavior. 
 * See: http://www.formassembly.com/blog/the-pagination-behavior-explained/
 */
wFORMS.behaviors.paging = {

	/**
	 * Selector expression for catching elements
     * @final
     * @see	http://www.w3.org/TR/css3-selectors/
	 */
	SELECTOR : '.wfPage',

	/**
	 * CSS class indicates page
     * @final
	 */
	CSS_PAGE : 'wfPage',

	/**
	 * CSS class for current page
     * @final
	 */
	CSS_CURRENT_PAGE : 'wfCurrentPage',

	/**
	 * CSS class for next button
     * @final
	 */
	CSS_BUTTON_NEXT : 'wfPageNextButton',

	/**
	 * CSS class for next button
     * @final
	 */
	CSS_BUTTON_PREVIOUS : 'wfPagePreviousButton',
	
	/**
	 * CSS class for the div contains the previous/next buttons
     * @final
	 */
	CSS_BUTTON_PLACEHOLDER : 'wfPagingButtons',
	
	/**
	 * ID prefix for the next buttons
     * @final
	 */
	ID_BUTTON_NEXT_PREFIX : 'wfPageNextId',

	/**
	 * ID prefix for the previos buttons
     * @final
	 */
	ID_BUTTON_PREVIOUS_PREFIX : 'wfPagePreviousId',

	/**
	 * CSS class for hidden submit button
     * @final
	 */
	CSS_SUBMIT_HIDDEN : 'wfHideSubmit',

	/**
	 * ID attribute prefix for page area
     * @final
	 */
	ID_PAGE_PREFIX	: 'wfPgIndex-',

	/**
	 * ID attribute suffix for prev/next buttons placeholder
     * @final
	 */
	ID_PLACEHOLDER_SUFFIX : '-buttons',

	/**
	 * Attribute indicates index of the page button should activate
     * @final
	 */
	ATTR_INDEX : 'wfPageIndex_activate',

	/**
	 * Custom messages used for creating links
     * @final
	 */
	MESSAGES : {
		CAPTION_NEXT : 'Next Page',
		CAPTION_PREVIOUS : 'Previous Page'
	},

	/**
     * Indicates that form should be validated on Next clicked
     * TODO		Possible refactor functionality with validation
	 */
	runValidationOnPageNext : true,

	/**
	 * custom 'Page Next' event handler (to be overridden) 
     * @param	{HTMLElement}	elem	new page
	 */
	 onPageNext: function() {},
	 
	/**
	 * custom 'Page Previous' event handler (to be overridden) 
     * @param	{HTMLElement}	elem	new page
	 */
	 onPagePrevious: function() {}, 
	 
	 /**
	 * custom 'Page Change' event handler (either next or previous) (to be overridden) 
     * @param	{HTMLElement}	elem	new page
	 */
	 onPageChange: function() {}, 
	   
	/**
	 * Creates new instance of the behavior
     * @param	{HTMLElement}	f	Form element
     * @constructor
	 */
	instance: function(f) {
		this.behavior = wFORMS.behaviors.paging; 
		this.target = f;
		this.currentPageIndex = 1;
	}
}

/**
 * Factory Method.
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 * @return {object} an instance of the behavior 
 */	
wFORMS.behaviors.paging.applyTo = function(f) {
	var b = new wFORMS.behaviors.paging.instance(f)
	var behavior = wFORMS.behaviors.paging;
	var isValidationAccepted = (wFORMS.behaviors.validation && wFORMS.behaviors.paging.runValidationOnPageNext);
	// Shows that form contains paging
	var isPagingApplied = false;
	
	// Iterates over the elements with specified class names
	f.querySelectorAll(wFORMS.behaviors.paging.SELECTOR).forEach(
		function(elem){			
			isPagingApplied = true;
			// Creates placeholder for buttons
			var ph = b.getOrCreatePlaceHolder(elem);
			var index = wFORMS.behaviors.paging.getPageIndex(elem);
			// If first page add just Next button
			if(index == 1){
				var ctrl = base2.DOM.bind(ph.appendChild(behavior._createNextPageButton(index)));
				
				if(isValidationAccepted){					
					ctrl.addEventListener('click', function(event) {							
							var v = wFORMS.getBehaviorInstance(b.target,'validation'); 
							if(v.run(event, elem)){b.run(event, ctrl);} 
						}, 
						false);					
				}else{
					ctrl.addEventListener('click', function(event) { b.run(event, ctrl); }, false);
				}

				wFORMS.behaviors.paging.showPage(elem);
			}else{
				// Adds previous button
				var ctrl = base2.DOM.bind(behavior._createPreviousPageButton(index));
				ph.insertBefore(ctrl, ph.firstChild);

				ctrl.addEventListener('click', function(event) { b.run(event, ctrl)}, false);

				// If NOT last page adds next button also
				if(!wFORMS.behaviors.paging.isLastPageIndex(index, true)){
					var _ctrl = base2.DOM.bind(ph.appendChild(behavior._createNextPageButton(index)));

					if(isValidationAccepted){						
						_ctrl.addEventListener('click', function(event) {
							var v = wFORMS.getBehaviorInstance(b.target,'validation'); 							 
							if(v.run(event, elem)){b.run(event, _ctrl);} 
						}, false);
					}else{
						_ctrl.addEventListener('click', function(event) { b.run(event, _ctrl); }, false);
					}
				}
			}
		}
	);
	// Looking for the first active page from 0. 0 is a "fake page"
	if(isPagingApplied){		
		p = b.findNextPage(0);
		b.currentPageIndex = 0;
		b.activatePage(wFORMS.behaviors.paging.getPageIndex(p), false); // no scrolling to the top of the page here
		b.onApply();		
	}
	
	// intercept the submit event
	base2.DOM.Element.addEventListener(f, 'submit', function (e) {b.onSubmit(e, b)});
	
	return b;
}

/**
 * Executed once the behavior has been applied to the document.
 * Can be overwritten.
 */
wFORMS.behaviors.paging.instance.prototype.onApply = function() {}

/** On submit advance the page instead, until the last page. */
wFORMS.behaviors.paging.instance.prototype.onSubmit = function (e, b) {
	if (!wFORMS.behaviors.paging.isLastPageIndex(b.currentPageIndex)) {
		var nextPage = b.findNextPage(b.currentPageIndex);
		e.preventDefault();
		b.activatePage(b.currentPageIndex + 1);
		
		// focus the first form element in the next page
		var first = base2.DOM.Element.querySelector(nextPage, 'input, textarea, select');
		if (first) {
			first.focus();
		}
	}
}

/**
 * Returns page index by the page area element
 * @param	{HTMLElement}	elem
 * @return	{Integer}	or false
 */
wFORMS.behaviors.paging.getPageIndex = function(elem){
	if(elem && elem.id){
		var index = elem.id.replace(
			new RegExp(wFORMS.behaviors.paging.ID_PAGE_PREFIX + '(\\d+)'), "$1");

		index = parseInt(index);
		return !isNaN(index) ? index : false;

	}

	return false;
}

/**
 * Check if the given element is in the visible page.
 * @param	{DOMElement}	an element (such as a field to be validated)
 * @return	{boolean}
 */
wFORMS.behaviors.paging.isElementVisible = function(element){	
	while(element && element.tagName != 'BODY'){
		if(element.className) {
			if(element.className.indexOf(this.CSS_CURRENT_PAGE) != -1) {
				return true;
			}
			if(element.className.indexOf(this.CSS_PAGE) != -1 ) {
				return false;
			}
		} 
		element = element.parentNode;
	}	
	return true;
}

/**
 * Private method for creating button. Uses public method for design creating
 * @param	{Integer}	index 	Index of the page button belongs to
 * @return	{HTMLElement}
 * @private
 * @see wFORMS.behaviors.paging.createNextPageButton
 */
wFORMS.behaviors.paging._createNextPageButton = function(index){
	var elem = this.createNextPageButton();
	elem.setAttribute(this.ATTR_INDEX, index + 1);
	elem.id = this.ID_BUTTON_NEXT_PREFIX + index;
	return elem;
}

/**
 * Creates button for moving to the next page. This method could be overridden
 * And developed for easily customization for users. Behavior uses private method
 * @return	{HTMLElement}
 * @public
 */
wFORMS.behaviors.paging.createNextPageButton = function(){
	var elem = document.createElement('input'); 
	elem.setAttribute('value', this.MESSAGES.CAPTION_NEXT);
	elem.type = 'button';
	elem.className = this.CSS_BUTTON_NEXT;
	return elem;
}

/**
 * Private method for creating button. Uses public method for design creating
 * @param	{Integer}	index 	Index of the page button belongs to
 * @return	{HTMLElement}
 * @private
 * @see wFORMS.behaviors.paging.createPreviousPageButton
 */
wFORMS.behaviors.paging._createPreviousPageButton = function(index){
	var elem = this.createPreviousPageButton();
	elem.setAttribute(this.ATTR_INDEX, index - 1);
	elem.id = this.ID_BUTTON_PREVIOUS_PREFIX + index;;
	return elem;
}

/**
 * Creates button for moving to the next page. This method could be overridden
 * And developed for easily customization for users. Behavior uses private method
 * @return	{HTMLElement}
 * @public
 */
wFORMS.behaviors.paging.createPreviousPageButton = function(){
	var elem = document.createElement('input'); 
	elem.setAttribute('value', this.MESSAGES.CAPTION_PREVIOUS);
	elem.type = 'button';
	elem.className = this.CSS_BUTTON_PREVIOUS;
	return elem;
}

/**
 * Creates place holder for buttons
 * @param	{HTMLElement}	pageElem	Page where placeholder should be created
 * @return	{HTMLElement}
 */
wFORMS.behaviors.paging.instance.prototype.getOrCreatePlaceHolder = function(pageElem){
	var id = pageElem.id + this.behavior.ID_PLACEHOLDER_SUFFIX;
	var elem = document.getElementById(id);

	if(!elem){
		elem = pageElem.appendChild(document.createElement('div'));
		elem.id = id;
		elem.className = this.behavior.CSS_BUTTON_PLACEHOLDER;
	}	

	return elem;
}

/**
 * Hides page specified
 * @param	{HTMLElement}	e
 */
wFORMS.behaviors.paging.hidePage = function(e){
	if(e) {
		if(!e.removeClass) { // no base2.DOM.bind to speed up function 
			e.removeClass = function(className) { return base2.DOM.HTMLElement.removeClass(this,className) };
		}
		if(!e.addClass) { // no base2.DOM.bind to speed up function 
			e.addClass = function(className) { return base2.DOM.HTMLElement.addClass(this,className) };
		}
		e.removeClass(wFORMS.behaviors.paging.CSS_CURRENT_PAGE);
		e.addClass(wFORMS.behaviors.paging.CSS_PAGE);
	}
}

/**
 * Shows page specified
 * @param	{HTMLElement}	e
 */
wFORMS.behaviors.paging.showPage = function(e){
	if(e) {
		if(!e.removeClass) { // no base2.DOM.bind to speed up function 
			e.removeClass = function(className) { return base2.DOM.HTMLElement.removeClass(this,className) };
		}
		e.removeClass(wFORMS.behaviors.paging.CSS_PAGE);
		if(!e.addClass) { // no base2.DOM.bind to speed up function 
			e.addClass = function(className) { return base2.DOM.HTMLElement.addClass(this,className) };
		}
		e.addClass(wFORMS.behaviors.paging.CSS_CURRENT_PAGE);
	}
}

/**
 * Activates page by index
 * @param	{Integer}	index	
 * @param	{Boolean}	[optional] scroll to the top of the page (default to true)
 */
wFORMS.behaviors.paging.instance.prototype.activatePage = function(index /*, scrollIntoView*/){
	
	if(arguments.length>1) {
		var scrollIntoView = arguments[1];
	} else {
		var scrollIntoView = true;
	}
	
	if(index == this.currentPageIndex){
		return false;
	}
	index = parseInt(index);
	if(index > this.currentPageIndex){
		var p = this.findNextPage(this.currentPageIndex);
	} else {
		var p = this.findPreviousPage(this.currentPageIndex);
	}
	
	if(p) { 
		// Workaround for Safari. Otherwise it crashes with Safari 1.2
		var _self = this;
	//	setTimeout(
		//	function(){
				var index = _self.behavior.getPageIndex(p);
				_self.setupManagedControls(index);
				_self.behavior.hidePage(_self.behavior.getPageByIndex(_self.currentPageIndex));				
				_self.behavior.showPage(p);
				var  _currentPageIndex = _self.currentPageIndex;
				_self.currentPageIndex = index;
				
				// go to top of the page
				if (scrollIntoView) {
					if (p.scrollIntoView) {
						p.scrollIntoView();
					}
					else {
						location.hash = "#" + wFORMS.behaviors.paging.ID_PAGE_PREFIX + index;
					}
				}
				
				// run page change event handlers
				_self.behavior.onPageChange(p);
				if(index > _currentPageIndex){
					_self.behavior.onPageNext(p);
				} else {
					_self.behavior.onPagePrevious(p);
				}
		//	}, 1
		//);
	}
}

/**
 * Setups managed controls: Next/Previous/Send buttons
 * @param	{int}	index	Index of the page to make controls setting up. If null setups current page
 */
wFORMS.behaviors.paging.instance.prototype.setupManagedControls = function(index){
	// new 
	if(!index){
		index = this.currentPageIndex;
	}
	
	// new
	var b = wFORMS.behaviors.paging;
	if(b.isFirstPageIndex(index)){
		if(ctrl = b.getPreviousButton(index)){
			ctrl.style.visibility = 'hidden';
		}
	}else{
		if(ctrl = b.getPreviousButton(index)){
			ctrl.style.visibility = 'visible';
		}
	}

	if(b.isLastPageIndex(index)){
		if(ctrl = b.getNextButton(index)){
			ctrl.style.visibility = 'hidden';
		}
		this.showSubmitButtons();
	} else {
		if(ctrl = b.getNextButton(index)){
			ctrl.style.visibility = 'visible';
		}
		this.hideSubmitButtons();
	}
}

/**
 * Shows all submit buttons
 */
wFORMS.behaviors.paging.instance.prototype.showSubmitButtons = function(){
	var nl = this.target.getElementsByTagName('input');
	for(var i=0;i<nl.length;i++) {
		if(nl[i].type=='submit') {
			nl[i].className = nl[i].className.replace(new RegExp("(^|\\s)" + this.behavior.CSS_SUBMIT_HIDDEN + "(\\s|$)", "g"), "$2");
		}	
	}
}

/**
 * Hides all submit button
 */
wFORMS.behaviors.paging.instance.prototype.hideSubmitButtons = function(){
	var nl = this.target.getElementsByTagName('input');
	for(var i=0;i<nl.length;i++) {
		if(nl[i].type=='submit') {
			if(!(new RegExp("(^|\\s)" + this.behavior.CSS_SUBMIT_HIDDEN + "(\\s|$)")).test(nl[i].className)) {
				nl[i].className+=' '+this.behavior.CSS_SUBMIT_HIDDEN;
			}
		}
	}
}

/**
 * Returns page element specified by index
 * @param	{Integer}	index
 * @return	{HTMLElement}
 */
wFORMS.behaviors.paging.getPageByIndex = function(index){
	var page = document.getElementById(wFORMS.behaviors.paging.ID_PAGE_PREFIX + index);
	return page ? base2.DOM.bind(page) : false;
}

/**
 * Returns next button specified by index
 * @param	{int}	index	Index of the page button related to
 * @return	{HTMLElement}
 */
wFORMS.behaviors.paging.getNextButton = function(index){
	// base2 is not using here because of when control is absen it produces an error in IE
	// for example on last page there is not Next button, on first - Previous
	return document.getElementById(wFORMS.behaviors.paging.ID_BUTTON_NEXT_PREFIX + index);
}

/**
 * Returns previous button specified by index
 * @param	{int}	index	Index of the page button related to
 * @return	{HTMLElement}
 */
wFORMS.behaviors.paging.getPreviousButton = function(index){
	// base2 is not using here because of when control is absen it produces an error in IE
	// for example on last page there is not Next button, on first - Previous
	return document.getElementById(wFORMS.behaviors.paging.ID_BUTTON_PREVIOUS_PREFIX + index);
}

/**
 * Check if index passed is index of the last page
 * @param	{Integer}	index
 * @param	{bool}	ignoreSwitch	Ingoneres switch behavior when checking for last index
 * @return	{bool}
 */
wFORMS.behaviors.paging.isLastPageIndex = function(index, ignoreSwitch){
	index = parseInt(index) + 1;
	var b = wFORMS.behaviors.paging;
	var p = b.getPageByIndex(index);

	if((_b = wFORMS.behaviors['switch']) && !ignoreSwitch){
		while(p && _b.isSwitchedOff(p)){
			index++;
			p = b.getPageByIndex(index);
		}
	}

	return p ? false : true;
}

/**
 * Check if index passed is index of the first page
 * @param	{Integer}	index
 * @param	{bool}	ignoreSwitch	Ingoneres switch behavior when checking for first index
 * @return	{bool}
 */
wFORMS.behaviors.paging.isFirstPageIndex = function(index, ignoreSwitch){
	index = parseInt(index) - 1;
	var b = wFORMS.behaviors.paging;
	var p = b.getPageByIndex(index);
	if((_b = wFORMS.behaviors['switch']) && !ignoreSwitch){
		while(p && _b.isSwitchedOff(p)){
			index--;
			p = b.getPageByIndex(index);
		}
	}

	return p ? false : true;
}

/**
 * Returns Next page from the index. Takes in attention switch behavior
 * @param	{int}	index
 */
wFORMS.behaviors.paging.instance.prototype.findNextPage = function(index){
	index = parseInt(index) + 1;
	var b = wFORMS.behaviors.paging;
	var p = b.getPageByIndex(index);

	if(_b = wFORMS.behaviors['switch']){
		while(p && _b.isSwitchedOff(p)){
			index++;
			p = b.getPageByIndex(index);
		}
	}
	return p;
}

/**
 * Returns Next page from the index. Takes in attention switch behavior
 * @param	{int}	index
 */
wFORMS.behaviors.paging.instance.prototype.findPreviousPage = function(index){
	index = parseInt(index) - 1;
	var b = wFORMS.behaviors.paging;
	var p = b.getPageByIndex(index);

	if(_b = wFORMS.behaviors['switch']){
		while(p && _b.isSwitchedOff(p)){
			index--;
			p = b.getPageByIndex(index);
		}
	}

	return p ? p : false;
}





/**
 * Executes the behavior
 * @param {event} e 
 * @param {domElement} element
 */
wFORMS.behaviors.paging.instance.prototype.run = function(e, element){
	this.activatePage(element.getAttribute(wFORMS.behaviors.paging.ATTR_INDEX));
}

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
     * @see	http://www.w3.org/TR/css3-selectors/
	 */
	SELECTOR_REPEAT : '*[class~="repeat"]',

	/**
	 * Selector expression for catching removable section
     * @final
     * @see	http://www.w3.org/TR/css3-selectors/
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
     * @param	{HTMLElement}	elem	Duplicated section
	 */
	onRepeat : function(elem){},

	/**
	 * Custom function that could be overridden. 
	 * Evaluates after the section is removed
	 * @param	{HTMLElement}	elem	a copy of the removed section - detached from the document
	 */
	onRemove : function(elem){},

	/**
	 * Custom function that could be overridden. 
	 * Returns if section could be repeated
     * @param	{HTMLElement}	elem	Section to be duplicated
     * @param	{wFORMS.behaviors.repeat}	b	Behavior mapped to repeatable section 
     * @return	boolean
	 */
	allowRepeat : function(elem, b){
		return true;
	},

	/**
	 * Creates new instance of the behavior
     * @param	{HTMLElement}	f	Form element
     * @constructor
	 */
	instance : function(f) {
		this.behavior = wFORMS.behaviors.repeat; 
		this.target = f;
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
	
	if(!f.querySelectorAll) base2.DOM.bind(f);
	
	f.querySelectorAll(this.SELECTOR_REPEAT).forEach(
		function(elem){
			if(_self.isHandled(elem)){
				return ;
			}
			if(!elem.id) elem.id = wFORMS.helpers.randomId();
			
			var _b = new _self.instance(elem);
			var e = _b.getOrCreateRepeatLink(elem);
			e.addEventListener('click', function(event) { _b.run(event, e)}, false);
			_b.setElementHandled(elem);
			b.push(_b);							
		}
	);
	
	if(!f.hasClass) {
		f = base2.DOM.bind(f);	
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


/**
 * Returns repeat link for specified area if it exists, 
 * otherwise creates new one and returns it
 * @param	{HTMLElement}	elem	Element repeat link is related to
 * @return	{HTMLElement}
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
			elem.appendChild(spanElem)
		}
	}

	return base2.DOM.bind(e);
}

/**
 * Returns repeat link for specified area if it exists, 
 * otherwise creates new one and returns it
 * @param	{DOMString}	id	ID of the group
 * @return	{HTMLElement}
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
 * @param 	{DOMElement}	duplicated section.
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
 * @param	{DOMString}	id	ID of the field group
 * @return	{HTMLElement}
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
	linkElem.onclick = function(event) { _self.onRemoveLinkClick(event, linkElem); };	

	// Wraps in a span for better CSS positionning control.
	var spanElem = document.createElement('span');
	spanElem.className = this.behavior.CSS_DELETE_SPAN;
	spanElem.appendChild(linkElem);
	
	return spanElem;
}


/**
 * Duplicates repeat section. Changes ID of the elements, adds event listeners
 * @param	{HTMLElement}	elem	Element to duplicate
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
	wFORMS.applyBehaviors(newElem);
		
	// Associates repeated input sections with thier calculations.
	if(wFORMS.behaviors.calculation)
	{
	_c = wFORMS.behaviors.calculation;
	inputItem = newElem.querySelector('input');
		if(inputItem)
		{
		if(inputItem.className.search(_c.VARIABLE_SELECTOR_PREFIX) != -1) 
			_c.applyTo(inputItem.form);
		}
	}
	// Calls custom function
	this.behavior.onRepeat(newElem);
	
	wFORMS.helpers.spotlight(newElem);
}

/**
 * Removes section specified by id
 * @param	{DOMElement}	element to remove
 */
_i.prototype.removeSection = function(elem){
	if(elem){
		// Removes section
		var elem = elem.parentNode.removeChild(elem);
		// Calls custom function
		this.behavior.onRemove(elem);
	}
}
/**
 * Looking for the place where to insert the cloned element
 * @param 	{DOMElement} 	source element
 * @return 	{DOMElement} 	target element for 'insertBefore' call.
 */
_i.prototype.getInsertNode = function(elem) {
 	var insertNode = elem.nextSibling;
 	
 	if(insertNode && insertNode.nodeType==1 && !insertNode.hasClass) {
		insertNode = base2.DOM.bind(insertNode); 
	}
  	
	while(insertNode && 
		 (insertNode.nodeType==3 ||       // skip text-node that can be generated server-side when populating a previously repeated group 
		  insertNode.hasClass(this.behavior.CSS_REMOVEABLE))) {						
		
		insertNode = insertNode.nextSibling;
		
		if(insertNode && insertNode.nodeType==1 && !insertNode.hasClass) {
			insertNode = base2.DOM.bind(insertNode);
		}
	}
	return insertNode;
}
/**
 * Evaluates when user clicks Remove link
 * @param	{DOMEvent}		Event	catched
 * @param	{HTMLElement}	elem	Element produced event
 */
_i.prototype.onRemoveLinkClick = function(event, link){
	var e  = document.getElementById(link.getAttribute(this.behavior.ATTR_LINK_SECTION_ID));
	this.removeSection(e);
	if(event) event.preventDefault();
}

/**
 * Updates attributes inside the master element
  * @param	{HTMLElement}	elem
 */
_i.prototype.updateMasterSection = function(elem){
	// do it once 
	if(elem.doItOnce==true)
		return true;
	else
		elem.doItOnce=true;

	var suffix = this.createSuffix(elem);
	elem.id = this.clearSuffix(elem.id) + suffix;
	
	this.updateMasterElements(elem, suffix);
}
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
					n.id = value + suffix;		// do not use setAttribute for the id property (doesn't work in IE6)	
				} else if(attrName=='name'){ 
					n.name = value + suffix;	// do not use setAttribute for the name property (doesn't work in IE6)	
				} else {
					n.setAttribute(attrName, value + suffix);	
				}
			}			
			this.updateMasterElements(n, suffix);
		}
		// restore suffix for siblings if needed.
		suffix = siblingSuffix;
	}
}

/**
 * Updates attributes inside the duplicated tree
 * TODO rename
 * @param	{HTMLElement}	dupliocated element (not yet inserted back in DOM)
 * @param	{integer}		row index
 * @param	{string}		array-like notation, to be appended to attributes that must be unique.
 */
_i.prototype.updateDuplicatedSection = function(elem, index, suffix){
	
	// Caches master section ID in the dublicate
	elem[this.behavior.ATTR_MASTER_SECTION]=elem.id;
		
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
	
	this.updateSectionChildNodes(elem, suffix, _preserveRadioName);
}


/**
 * Updates NodeList. Changes ID and names attributes
 * For different node elements suffixes could be different - i.e. for the nested
 * repeat section IDs and names should store parent section number
 * @param	elems	Array of the elements should be updated
 * @param	suffix	Suffix value should be added to attributes
 */
_i.prototype.updateSectionChildNodes = function(elem, suffix, preserveRadioName){
	
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
				
		// Clears value	(TODO: select?)
		if(e.tagName == 'INPUT' || e.tagName == 'TEXTAREA'){
			if(e.type != 'radio' && e.type != 'checkbox'){
				e.value = '';
			} else {
				e.checked = false;
			}
		}
		
		// Fix #152 - Radio name with IE6+
		if(e.tagName == 'INPUT' && e.type == 'radio' && document.all && !window.opera && !preserveRadioName) {
			// Create a radio input that works in IE and insert it before the input it needs to replace
			var tagHtml = "<INPUT type=\"radio\" name=\""+e.name+suffix+"\"></INPUT>";
			var fixedRadio = e.parentNode.insertBefore(document.createElement(tagHtml),e);
			
			// Remove original radio (keep element in memory)
			e = e.parentNode.removeChild(e);
			
			// Clone other attributes
			fixedRadio.id = e.id;			
			var l = this.behavior.UPDATEABLE_ATTR_ARRAY.length;
			for (var i = 0; i < l; i++) {
				var attrName = this.behavior.UPDATEABLE_ATTR_ARRAY[i];
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
 * @param	domelement	Repeat section element
 * @param	integer		row index	
 */
_i.prototype.createSuffix = function(e, index){

	// var idx = e.getAttribute('dindex');
	var suffix = '[' + (index ? index : '0' ) + ']';
    var reg = /\[(\d+)\]$/;
	e = e.parentNode;
	while(e){
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
 * Removes suffix from ID id was previously set
 * @param	id	Current element id
 * @return	DOMString
 */
_i.prototype.clearSuffix = function(value){
	if(!value){
		return;
	}
	if(value.indexOf('[') != -1){		
		return value.substring(0, value.indexOf('['));
	}

	return value;
}

/**
 * Updates attributes of the element in the section
 * TODO rename
 * @param	{HTMLElement}	elem
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
			e.id = value + idSuffix + wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX;
		} else if(isHint && attrName=='id'){			
			e.id = value + idSuffix + wFORMS.behaviors.hint.HINT_SUFFIX;
		} else if(isDuplicateLink && attrName=='id'){
			e.id = value.replace(new RegExp("(.*)(" + this.behavior.ID_SUFFIX_DUPLICATE_LINK + ')$'),"$1" + idSuffix + "$2");
		} else if(attrName=='id'){ 
			e.id = value + idSuffix;	// do not use setAttribute for the id property (doesn't work in IE6)	
		} else if(attrName=='name'){ 
			e.name = value + idSuffix;	// do not use setAttribute for the id property (doesn't work in IE6)	
		} else {
			e.setAttribute(attrName, value + idSuffix);	
		}
	}
}

/**
 * Returns index of the next created duplicate by section HTML element
 * @param	{HTMLElement}	elem
 * @return	{Integer}
 */
_i.prototype.getNextDuplicateIndex = function(elem){
	var c = this.getOrCreateCounterField(elem);
	var newValue = parseInt(c.value) + 1;
	c.value = newValue;
	return newValue;
}


/**
 * Returns counter field fo specified area if exists. Otherwise creates new one
 * @param	{HTMLElement}	elem
 * @return	{HTMLElement}
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
 * @param	{DOMString}	id
 * @return	{HTMLElement}
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
 * @return	{Integer} or {boolean}
 */
_i.prototype.getSectionsCount = function(){
	if(this.behavior.isDuplicate(this.target)){
		return false;
	}
	return parseInt(this.getOrCreateCounterField(this.target).value) + 1;
}

/**
 * Specifies that element is inside the duplicate group
 * @param	{HTMLElement}	elem
 * @return	boolean
 */
_i.prototype.setInDuplicateGroup = function(elem){
	return elem.setAttribute(this.behavior.ATTR_DUPLICATE_ELEM, true);
}


/**
 * setElementHandled
 * @param	{HTMLElement}	elem
 * @return	boolean
 */
_i.prototype.setElementHandled = function(elem){
	return elem.setAttribute(this.behavior.ATTR_HANDLED, true);
}

/**
 * Remove handled attribute from element
 * @param	{HTMLElement}	elem
 * @return	boolean
 */
_i.prototype.removeHandled = function(elem){
	return elem.removeAttribute(this.behavior.ATTR_HANDLED);
}

/**
 * Returns true if element is duplicate of initial group, false otherwise
 * @param	{HTMLElement}	elem
 * @return	boolean
 */
_b.isDuplicate = function(elem){
	return elem.hasClass(this.CSS_REMOVEABLE);
}


/**
 * Returns true if element belongs to duplicate group
 * (to be used by other behaviors) 
 * @param	{HTMLElement}	elem
 * @return	boolean
 */
_b.isInDuplicateGroup = function(elem){
	return elem.getAttribute(this.ATTR_DUPLICATE_ELEM) ? true : false;
}


/**
 * Checks if element is already handled
 * @param	{HTMLElement}	elem
 * @return	boolean
 */
_b.isHandled = function(elem){
	return elem.getAttribute(this.ATTR_HANDLED);
}


/**
 * Returns html element of the master section (repeatable) from its duplicate
 * @param	{HTMLElement}	elem
 * @return	{HTMLElement} or false
 */
_b.getMasterSection = function(elem){
	if(!this.isDuplicate(elem)) return false;	
	return document.getElementById(elem[this.ATTR_MASTER_SECTION]);
}


/**
 * Executes the behavior
 * @param {event} e 
 * @param {domElement} element
 */
_i.prototype.run = function(e, element){ 	
	this.duplicateSection(this.target);
	if(e) e.preventDefault();
}

if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms switch behavior.  
 * See: http://www.formassembly.com/wForms/v2.0/documentation/conditional-sections.php
 *  and http://www.formassembly.com/wForms/v2.0/documentation/examples/switch_validation.html 
 */
wFORMS.behaviors['switch']  = {

	/**
	 * Selector expression for the switch elements
     * @final
     * @see	http://www.w3.org/TR/css3-selectors/
     * @TODO	Possible change hint due to switch could be not the very first prefix
     * 			but element could contains it as a CSS class
     * @TODO	!!!!!! for some reasons it is not working with IE!!!
     * 			looks like IE does not support selecting by class with selectors
     *			but selectors API allows such thing
	 */
	SELECTOR : '*[class*="switch-"]',

	/**
	 * CSS class name prefix for switch elements
     * @final
	 */
	CSS_PREFIX : 'switch-',

	/**
	 * CSS class prefix for the off state of the target element
     * @final
	 */
	CSS_OFFSTATE_PREFIX : 'offstate-',

	/**
	 * CSS class prefix for the on state of the target element
     * @final
	 */
	CSS_ONSTATE_PREFIX : 'onstate-',
	
	/**
	 * CSS class for switch elements that don't have a native ON state (ie. links)
     * @final
	 */
	CSS_ONSTATE_FLAG : 'swtchIsOn',
	
	/**
	 * CSS class for switch elements that don't have a native OFF state (ie. links)
     * @final
	 */
	CSS_OFFSTATE_FLAG : 'swtchIsOff',
	
	/**
	 * Custom function that could be overridden. 
	 * Evaluates when an element is switched on
     * @param	{HTMLElement}	elem	Duplicated section
	 */
	onSwitchOn: function(elem){ 
	},
	
	/**
	 * Custom function that could be overridden. 
	 * Evaluates when an element is switched off
     * @param	{HTMLElement}	elem	Duplicated section
	 */
	onSwitchOff: function(elem){ 
	},
	
	/**
	 * Custom function that could be overridden. 
	 * Evaluates after a switch is triggered
	 * (after all onSwitchOn and onSwitchOff events)
     * @param	{HTMLElement}	elem	Duplicated section
	 */
	onSwitch: function(form){  
	},
	
	/**
	 * Creates new instance of the behavior
     * @constructor
	 */
	instance : function(f){
		this.behavior = wFORMS.behaviors['switch']; 
		this.target = f;
	}
}

/**
 * Factory Method.
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 * @return {object} an instance of the behavior 
 */	
wFORMS.behaviors['switch'].applyTo = function(f){
	var b = new wFORMS.behaviors['switch'].instance(f);	
	// Iterates all switch elements. Lookup for its triggers and add event listeners
	f.querySelectorAll(wFORMS.behaviors['switch'].SELECTOR).forEach(
		function(elem){
			if(!elem.id){
				elem.id = wFORMS.helpers.randomId()
			}
			switch(elem.tagName.toUpperCase()){
				case 'OPTION' : 
					var sNode = elem.parentNode;
					// Tries to get <select node
					while (sNode && sNode.tagName != 'SELECT'){
						sNode = sNode.parentNode;
					} 

					if(!sNode.addEventListener)
						base2.DOM.bind(sNode);

					if(sNode && !wFORMS.behaviors['switch'].isHandled(sNode)){
						sNode.addEventListener('change', function(event) { b.run(event, sNode) }, false);
						b.setupTargets(sNode);
						wFORMS.behaviors['switch'].handleElement(sNode);
					}
					break;

				case 'INPUT' : 
					if(elem.type && elem.type.toUpperCase() == 'RADIO'){
						if(!wFORMS.behaviors['switch'].isHandled(elem)){
							b.setupTargets(elem);		
						}
						// Retreives all radio group
						var radioGroup = elem.form[elem.name];
						for(var i=radioGroup.length-1;i>=0;i--) {
							// [don] Added element binding
							var _elem = base2.DOM.bind(radioGroup[i]);
							if(!wFORMS.behaviors['switch'].isHandled(_elem)){
								_elem.addEventListener('click', function(event) { b.run(event, _elem) }, false);								
								wFORMS.behaviors['switch'].handleElement(_elem);
							}
						}
					}else{
						elem.addEventListener('click', function(event) { b.run(event, elem) }, false);
						b.setupTargets(elem);
					}
					break;
					
				default:
					// Other type of element with a switch (links for instance).
					// The behavior is not run on initialization (no b.setupTargets(elem))
					elem.addEventListener('click', function(event) { b.run(event, elem) }, false);					
					break;
			}
		}
	);
	b.onApply();
	return b;
}

/**
 * Executed once the behavior has been applied to the document.
 * Can be overwritten.
 */
wFORMS.behaviors['switch'].instance.prototype.onApply = function() {} 



/**
 * Checks if element is already handled
 * @param	{HTMLElement}	elem
 * @return	boolean
 */
wFORMS.behaviors['switch'].isHandled = function(elem){
	// TODO remove wHandled to final constant
	return elem.getAttribute('rel') && elem.getAttribute('rel').indexOf('wfHandled') > -1;
}

/**
 * Checks if element is already handled
 * @param	{HTMLElement}	elem
 * @return	boolean
 */
wFORMS.behaviors['switch'].handleElement = function(elem){
	// TODO remove wHandled to final constant
	return elem.setAttribute('rel', (elem.getAttribute('rel') || "") + ' wfHandled');
}

/**
 * Removes handle attribute from element
 * @param	{HTMLElement}	elem
 * @return	boolean
 */
wFORMS.behaviors['switch'].removeHandle = function(elem){
	// TODO remove wHandled to final constant
	if(attr = elem.getAttribute('rel')){
		if(attr == 'wfHandled'){
			elem.removeAttribute('rel');
		}else if(attr.indexOf('wfHandled') != -1){
			elem.setAttribute('rel', attr.replace(/(.*)( wfHandled)(.*)/, "$1$3"));
		}
	}
}

/**
 * Returns object with two triggers collection: ON, OFF
 * @param	{Array}	elems	HTML Elements array to create triggers from
 * @param	{Array}	includeSwitches	Only that switches should be included
 * @returns	{Object}	Object of type {ON: Array, OFF: Array}
 *
 * Notes: 
 * May 26th (CS) Replaced base2.forEach with a regular loop when possible
 *               Fixed ON/OFF array to remove duplicates
 *               Replaced base2.querySelectorAll to get a radio group. Used form.fields collection instead.
 */
wFORMS.behaviors['switch'].instance.prototype.getTriggersByElements = function(elems, includeSwitches){
	var o = {
		ON : new Array(), 
		OFF : new Array(), 
		toString : function(){
			return "ON: " + this.ON + "\nOFF: " + this.OFF
		}
	};
	for(var i=0;i<elems.length;i++) {
		var elem = elems[i];
		
		// TODO on switch if checked.
		switch(elem.tagName.toUpperCase()){
			case 'OPTION' :
				if(elem.selected){
					o.ON = o.ON.concat(this.behavior.getSwitchNamesFromTrigger(elem, includeSwitches));
				}else{
					o.OFF = o.OFF.concat(this.behavior.getSwitchNamesFromTrigger(elem, includeSwitches));
				}
				break;
				
			case 'SELECT' : 
				// TODO Check behavior
				for(var j=0; j < elem.options.length; j++){
					var opt = elem.options.item(j);
					if(opt.selected){
						o.ON = o.ON.concat(this.behavior.getSwitchNamesFromTrigger(opt, includeSwitches));
					}else{
						o.OFF = o.OFF.concat(this.behavior.getSwitchNamesFromTrigger(opt, includeSwitches));
					}
				}
				break;

			case 'INPUT' : 
				if(elem.type && elem.type.toUpperCase() == 'RADIO'){					
					var radioGroup = elem.form[elem.name];
					if(!radioGroup) break; // bad markup
					for(var j=radioGroup.length-1;j>=0;j--) {						
						var _elem = radioGroup[j];
						// Do not call getSwitchNamesFromTrigger on this radio input 
						// if we have/will process it anyway because it's part of the 
						// collection being evaluated. 
						if(_elem==elem || !wFORMS.helpers.contains(elems, _elem)) { 							
							if(_elem.checked){
								o.ON  = o.ON.concat(this.behavior.getSwitchNamesFromTrigger(_elem, includeSwitches));
							} else {
								o.OFF = o.OFF.concat(this.behavior.getSwitchNamesFromTrigger(_elem, includeSwitches));
							}						
						}
					}					
				}else{
					if(elem.checked){
						o.ON = o.ON.concat(this.behavior.getSwitchNamesFromTrigger(elem, includeSwitches));
					}else{
						o.OFF = o.OFF.concat(this.behavior.getSwitchNamesFromTrigger(elem, includeSwitches));
					}
				}
				break;
				
			default:
				if(elem.hasClass(this.behavior.CSS_ONSTATE_FLAG)){
					o.ON  = o.ON.concat(this.behavior.getSwitchNamesFromTrigger(elem, includeSwitches));
				}else{
					o.OFF = o.OFF.concat(this.behavior.getSwitchNamesFromTrigger(elem, includeSwitches));
				}
				break;
		}
	}
	
	// remove duplicates in arrays
	var _ON = new Array(); 
	for(var i=0;i<o.ON.length;i++) {
		if(!wFORMS.helpers.contains(_ON,o.ON[i])) {
			_ON.push(o.ON[i]);
		}
		
	}
	var _OFF = new Array(); 
	for(var i=0;i<o.OFF.length;i++) {
		if(!wFORMS.helpers.contains(_OFF,o.OFF[i])) {
			_OFF.push(o.OFF[i]);
		}		
	}
	o.ON  = _ON;
	o.OFF = _OFF;
	
	return o;
}

/**
 * Returns all switch names for given trigger element
 * @param	{HTMLElement}	elem
 * @param	{Array}	includeSwitches	Only that switches should be included
 * @return	Array
 */
wFORMS.behaviors['switch'].getSwitchNamesFromTrigger = function(elem, includeSwitches){
	return wFORMS.behaviors['switch'].getSwitchNames(elem.className, "trigger", includeSwitches);
}

/**
 * Returns all switch names for given target element
 * @param	{HTMLElement}	elem
 * @param	{Array}	includeSwitches	Only that switches should be included
 * @return	Array
 */
wFORMS.behaviors['switch'].getSwitchNamesFromTarget = function(elem, includeSwitches){
	return wFORMS.behaviors['switch'].getSwitchNames(elem.className,"target", includeSwitches);
}


/**
 * Returns all switch names for given element
 * @param	{string}	value of class attribute
 * @param	{string}	switch part ('trigger' or 'target') 
 * @param	{Array}		Only these switches should be included
 * @return	Array
 */
wFORMS.behaviors['switch'].getSwitchNames = function(className, switchPart, includeSwitches){
	if(!className || className=='') return [];
	
	var names  = className.split(" ");
	var _names = new Array();
	
	if(switchPart=='trigger') 
		var doTriggers = true;
	else 
		var doTriggers = false; // do switch targets
	
	for(var i=names.length-1;i>=0;i--) {		
		var cn = names[i];
		if(doTriggers) {
			if(cn.indexOf(this.CSS_PREFIX)==0) 
				var sn = cn.substring(this.CSS_PREFIX.length);
		} else {
			if(cn.indexOf(this.CSS_ONSTATE_PREFIX)==0) 
				var sn = cn.substring(this.CSS_ONSTATE_PREFIX.length);
			else if(cn.indexOf(this.CSS_OFFSTATE_PREFIX)==0) 
				var sn = cn.substring(this.CSS_OFFSTATE_PREFIX.length);
		}
		if(sn && (!includeSwitches || wFORMS.helpers.contains(includeSwitches, sn))){
			_names.push(sn);
		}
	}
	//console.log(_names);
	return _names;
}

/**
 * Returns all elements associated with switch name
 * @TODO	Remove to pre-cache
 * @param	{String}	sName
 * @param   'ON'|'OFF'	Specifies whether 'on-state' or 'off-state' elements should be returned 
 * @returns	StaticNodeList
 */
wFORMS.behaviors['switch'].instance.prototype.getTargetsBySwitchName = function(sName, state){
	var res = new Array();
	var clazz = this;
	var b = wFORMS.behaviors.repeat;
	
	if(arguments[1]=='ON')
		var className = [wFORMS.behaviors['switch'].CSS_ONSTATE_PREFIX + sName];
	else {
		var className = [wFORMS.behaviors['switch'].CSS_OFFSTATE_PREFIX + sName];
	}
	
	this.target.querySelectorAll("."+className).forEach(
		function(elem){
			// In case target found, IS in the duplicate group and this 
			// behavior target is NOT in the duplicate section and NOT dupicate itself
			// SKIP this target
			// There is no need to make other checks, because that the only
			// situation could be. Behavior applied to its top element
			// and we are searching elements inside behavior target
			if(b && b.isInDuplicateGroup(elem) && 
				!(b.isDuplicate(clazz.target) || b.isInDuplicateGroup(clazz.target))){
				return;
			}
			res.push(base2.DOM.bind(elem));
		}	
	);
	
	return res;
}

/**
 * Returns all elements associated with switch name
 * @TODO	Remove to pre-cache
 * @param	{String}	sName
 * @returns	StaticNodeList
 */
wFORMS.behaviors['switch'].instance.prototype.getTriggersByTarget = function(target){
	var res = new Array();
	var clazz = this;
	var names = wFORMS.behaviors['switch'].getSwitchNamesFromTarget(target);
	var b = wFORMS.behaviors.repeat;

	base2.forEach(names, function(name){
		clazz.target.querySelectorAll("."+wFORMS.behaviors['switch'].CSS_PREFIX + name).forEach(
				function(elem){
					// In case trigger found IS in the duplicate group and the target
					// is NOT in the duplicate section and NOT dupicate itself
					// SKIP this trigger
					// There is no need to make other checking for because that the only
					// situation could be. Targets in the duplicate section CAN NOT 
					// reach triggers from other duplicates because bahaviors applied
					// to entire section element
					if(b && b.isInDuplicateGroup(elem) && 
						!(b.isDuplicate(target) || b.isInDuplicateGroup(target))){
						return;
					}
					res.push(base2.DOM.bind(elem));
				}	
		);
	
	});
	return this.getTriggersByElements(res, names);
}


/**
 * Setups targets depends on switches and control state. I.e. if control is ON
 * Targets should be ON. 
 * TODO Check for optimization, check for design
 * @param	{HTMLElement}	elem
 */
wFORMS.behaviors['switch'].instance.prototype.setupTargets = function(elem){
	this.run(null, elem)
}

/**
 * Checks if provided element is switched off
 * @param	{HTMLElement}	elem
 * @return	{bool}
 * @public
 */
wFORMS.behaviors['switch'].isSwitchedOff = function(elem){
	// TODO possible base2.DOM.bind
	return (elem.className.match(
		new RegExp(wFORMS.behaviors['switch'].CSS_OFFSTATE_PREFIX + "[^ ]*")) ?
		true : false) &&
		(elem.className.match(
		new RegExp(wFORMS.behaviors['switch'].CSS_ONSTATE_PREFIX + "[^ ]*")) ?
		false : true) ; 
}


/**
 * Executes the behavior
 * @param {event} e Event caught. (!In current implementation it could be null in case of the initialization)
 * @param {domElement} element
 */
wFORMS.behaviors['switch'].instance.prototype.run = function(e, element){ 
	
	if(!element.hasClass) base2.DOM.bind(element);
	
	// If this element does not have a native state attribute (ie. checked/selected)
	// the classes CSS_ONSTATE_FLAG|CSS_OFFSTATE_FLAG are used and must be switched.
	if(element.hasClass(this.behavior.CSS_ONSTATE_FLAG)) {	 	
		element.removeClass(this.behavior.CSS_ONSTATE_FLAG);
		element.addClass(this.behavior.CSS_OFFSTATE_FLAG);
		if(e) e.preventDefault();
		
	} else if(element.hasClass(this.behavior.CSS_OFFSTATE_FLAG)) {
		element.removeClass(this.behavior.CSS_OFFSTATE_FLAG);
		element.addClass(this.behavior.CSS_ONSTATE_FLAG);
		if(e) e.preventDefault();
	}
		
	var triggers = this.getTriggersByElements(new Array(element));
	var clazz = this;
	
	
	base2.forEach(triggers.OFF, function(switchName){
		var targets = clazz.getTargetsBySwitchName(switchName, 'ON');
		base2.forEach(targets, function(elem){
			elem.addClass(wFORMS.behaviors['switch'].CSS_OFFSTATE_PREFIX + switchName);
			elem.removeClass(wFORMS.behaviors['switch'].CSS_ONSTATE_PREFIX + switchName);
			var _triggers = clazz.getTriggersByTarget(elem);
			if(_triggers.ON.length == 0){				
				clazz.behavior.onSwitchOff(elem);
			}
		})
	});

	base2.forEach(triggers.ON, function(switchName){
		var targets = clazz.getTargetsBySwitchName(switchName, 'OFF');
		base2.forEach(targets, function(elem){
			elem.removeClass(wFORMS.behaviors['switch'].CSS_OFFSTATE_PREFIX + switchName);
			elem.addClass(wFORMS.behaviors['switch'].CSS_ONSTATE_PREFIX + switchName);
			clazz.behavior.onSwitchOn(elem);
		})
	});

	if(b = wFORMS.getBehaviorInstance(this.target, 'paging')){
		b.setupManagedControls();
	}
	
	this.behavior.onSwitch(this.target);
	
}

if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms validation behavior
 * 
 */
wFORMS.behaviors.validation = {
	
	/*
	 * Suffix of the ID for the error message placeholder
 	 */
	ERROR_PLACEHOLDER_SUFFIX : '-E',
	
	
	rules: {	
		isRequired	: { selector: ".required", 			  check: 'validateRequired'}, 
		isAlpha		: { selector: ".validate-alpha", 	  check: 'validateAlpha'},
		isAlphanum	: { selector: ".validate-alphanum",	  check: 'validateAlphanum'}, 
		isDate		: { selector: ".validate-date", 	  check: 'validateDate'}, 
		isTime		: { selector: ".validate-time", 	  check: 'validateTime'}, 
		isEmail		: { selector: ".validate-email", 	  check: 'validateEmail'}, 
		isInteger	: { selector: ".validate-integer", 	  check: 'validateInteger'}, 
		isFloat		: { selector: ".validate-float", 	  check: 'validateFloat'}, 
		isCustom	: { selector: ".validate-custom",	  check: 'validateCustom'}
	},	
	
	styling: {
		fieldError	: "errFld",
		errorMessage: "errMsg"
	},
	
	messages: {
		isRequired 		: "This field is required. ",
		isAlpha 		: "The text must use alphabetic characters only (a-z, A-Z). Numbers are not allowed.",
		isEmail 		: "This does not appear to be a valid email address.",
		isInteger 		: "Please enter an integer.",
		isFloat 		: "Please enter a number (ex. 1.9).",
		isAlphanum 		: "Please use alpha-numeric characters only [a-z 0-9].",
		isDate 			: "This does not appear to be a valid date.",
		isCustom		: "Please enter a valid value.",
		notification	: "%% error(s) detected. Your form has not been submitted yet.\nPlease check the information you provided."  // %% will be replaced by the actual number of errors.
	},
	
	
	instance: function(f) {
		this.behavior = wFORMS.behaviors.validation; 
		this.target = f;
	},
	
	onPass: function(f) {},
	onFail: function(f) {}
}

/**
 * Factory Method
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 * @return {object} an instance of the behavior 
 */	
wFORMS.behaviors.validation.applyTo = function(f) {

	if(!f || !f.tagName) {
		throw new Error("Can't apply behavior to " + f);
	}
	if(f.tagName!="FORM") {
		// look for form tag in the ancestor nodes.
		if(f.form) 
			f=f.form;
		else {
			var _f = f;
			for(f = f.parentNode; f && f.tagName!="FORM" ;f = f.parentNode) continue;
			if(!f || f.tagName!="FORM") {
				// form tag not found, look for nested forms.
				f = _f.getElementsByTagName('form');				
			}
		}
	}
	if(!f.tagName && f.length>0) {
		var v = new Array();
		for(var i=0;i<f.length;i++) {
			var _v = new wFORMS.behaviors.validation.instance(f[i]); 	
			if(!f[i].addEventListener) base2.DOM.bind(f[i]);		
			f[i].addEventListener('submit', function(e){ return _v.run(e, this)} ,false);
			v.push(_v);	
			_v.onApply();
		}
	} else {
		var v = new wFORMS.behaviors.validation.instance(f);
		if(!f.addEventListener) base2.DOM.bind(f);
		f.addEventListener('submit', function(e){ return v.run(e, this)} ,false);	
		v.onApply();
	}
	
	return v;	   
}
 
/**
 * Executed once the behavior has been applied to the document.
 * Can be overwritten.
 */
wFORMS.behaviors.validation.instance.prototype.onApply = function() {} 

 
/**
 * Executes the behavior
 * @param {event} e 
 * @param {domElement} element
 * @return	{boolean}	true if validation successful, false otherwise (and prevents event propagation)
 */
wFORMS.behaviors.validation.instance.prototype.run = function(e, element) { 
 	var errorCount = 0;
 	this.elementsInError = {};
 	for (var ruleName in this.behavior.rules) {
 		var rule = this.behavior.rules[ruleName];
   		var _self = this;
		
		if(!element.querySelectorAll)
			base2.DOM.bind(element);
		
 		element.querySelectorAll(rule.selector).forEach(function(element) { 
									
			// Workaround for apparent bug in querySelectorAll not being limited to descendants of 'element':
			// See bug #172 - Check if the element is not on the current page of a multi-page form			
			if(wFORMS.behaviors.paging && !wFORMS.behaviors.paging.isElementVisible(element)) {
				return;	
			}
			
			// Do not validate elements that are switched off by the switch behavior
			if(_self.isSwitchedOff(element))
				return;			
			
			var	value = wFORMS.helpers.getFieldValue(element);	
			if(rule.check.call) {
				var passed = rule.check.call(_self, element, value);
			} else {
				var passed = _self[rule.check].call(_self, element, value);
			}				
 			if(!passed) { 
 				if(!element.id) element.id = wFORMS.helpers.randomId();
 				_self.elementsInError[element.id] = { id:element.id, rule: ruleName };
 				_self.removeErrorMessage(element); 
 				if(rule.fail) {
 					// custom fail method
 					rule.fail.call(_self, element, ruleName);
 				} else {
 					// default fail method
 					_self.fail.call(_self, element, ruleName);
 				} 					
 				errorCount ++;
 			} else {
 				// If no previos rule has found an error on that field,
 				// remove any error message from a previous validation run.
 				if(!_self.elementsInError[element.id])
 					_self.removeErrorMessage(element);
 				
 				if(rule.pass) {
	 				// runs custom pass method. 
	 				rule.pass.call(_self, element);
	 			} else {
	 				// default pass method
	 				_self.pass.call(_self, element);
	 			}	 			
 			}
 		});
 	}
	
 	if(errorCount > 0) {
 		if(e) {
 			e.preventDefault?e.preventDefault():e.returnValue = false;
 		}
 		if(this.behavior.onFail) this.behavior.onFail(this);
 		return false;
 	}
 	if(this.behavior.onPass) this.behavior.onPass(this);
 	return true; 
}
/**
 * fail
 * @param {domElement} element 
 */
wFORMS.behaviors.validation.instance.prototype.fail = function(element, ruleName) { 

	// set class to show that the field has an error
	element.addClass(this.behavior.styling.fieldError);
	// show error message.
	this.addErrorMessage(element, this.behavior.messages[ruleName]);			
},
	
/**
 * pass
 * @param {domElement} element 
 */	
wFORMS.behaviors.validation.instance.prototype.pass = function(element) { /* no implementation needed */ }

/**
 * addErrorMessage
 * @param {domElement} element 
 * @param {string} error message 
 */
wFORMS.behaviors.validation.instance.prototype.addErrorMessage = function(element, message) {
	
	// we'll need an id here.
	if (!element.id) element.id = wFORMS.helpers.randomId(); 
	
	// Prepare error message
	var txtNode = document.createTextNode(message);
	
	// Find error message placeholder.
	var p = document.getElementById(element.id + this.behavior.ERROR_PLACEHOLDER_SUFFIX);
	if(!p) { // create placeholder.
		p = document.createElement("div"); 
		p.setAttribute('id', element.id + this.behavior.ERROR_PLACEHOLDER_SUFFIX);
		if(element.tagName=="TR") {
			p = (element.getElementsByTagName('TD')[0]).appendChild(p);
		} else {		
			p = element.parentNode.insertBefore(p,element.nextSibling);
		}
	}
	// Finish the error message.
	p.appendChild(txtNode);
	base2.DOM.bind(p);  
	p.addClass(this.behavior.styling.errorMessage);							
}

/**
 * removeErrorMessage
 * @param {domElement} element 
 */
wFORMS.behaviors.validation.instance.prototype.removeErrorMessage = function(element) { 
	if(!element.hasClass) base2.DOM.bind(element);
	if(element.hasClass(this.behavior.styling.fieldError)) {
		element.removeClass(this.behavior.styling.fieldError);
		var errorMessage  = document.getElementById(element.id + this.behavior.ERROR_PLACEHOLDER_SUFFIX);
		if(errorMessage)  {				
			errorMessage.parentNode.removeChild(errorMessage); 
		}
	}
}

/**
 * Checks the element's 'visibility' (switch behavior)
 * @param {domElement} element 
 * @return	{boolean}	true if the element is not 'visible' (switched off), false otherwise.
 */
wFORMS.behaviors.validation.instance.prototype.isSwitchedOff = function(element) {
	var sb = wFORMS.getBehaviorInstance(this.target,'switch');
	if(sb) { 
		var parentElement = element;
		while(parentElement && parentElement.tagName!='BODY') {
			// TODO: Check what happens with elements with multiple ON and OFF switches	
			if(parentElement.className && 
			   parentElement.className.indexOf(sb.behavior.CSS_OFFSTATE_PREFIX)!=-1 &&
			   parentElement.className.indexOf(sb.behavior.CSS_ONSTATE_PREFIX)==-1
			   ) {
				// switched off. skip element.
				return true;
			}
			parentElement = parentElement.parentNode;
		}
	}	
	return false;
}
 
/**
 * Checks if the element with the given id is a placeholder for the error message
 * @param {domElement} element 
 * @return	{boolean}	true if the element is a placeholder, false otherwise.
 */
wFORMS.behaviors.validation.isErrorPlaceholderId = function(id) {
	return id.match(new RegExp(wFORMS.behaviors.validation.ERROR_PLACEHOLDER_SUFFIX + '$')) != null;
} 
  
/**
 * Checks if the given string is empty (null or whitespace only)
 * @param {string} s 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.isEmpty = function(s) {				
	var regexpWhitespace = /^\s+$/;
	return  ((s == null) || (s.length == 0) || regexpWhitespace.test(s));
}

/**
 * validateRequired
 * @param {domElement} element 
 * @param {string} element's value (if available) 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateRequired = function(element, value) {
	switch(element.tagName) {
		case "INPUT":
			var inputType = element.getAttribute("type");
			if(!inputType) inputType = 'text'; 
			switch(inputType.toLowerCase()) {
				case "checkbox":
				case "radio":
					return element.checked; 
					break;
				default:
					return !this.isEmpty(value);
			}
			break;
		case "SELECT":							
			return !this.isEmpty(value);
			break;
		case "TEXTAREA":
			return !this.isEmpty(value);
			break;
		default:
			return this.validateOneRequired(element);
			break;
	} 	 
	return false 
};

/**
 * validateOneRequired
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateOneRequired = function(element) {
	if(element.nodeType != 1) return false;
	
	if(this.isSwitchedOff(element))
		return false;	
	
	switch(element.tagName) {
		case "INPUT":
			var inputType = element.getAttribute("type");
			if(!inputType) inputType = 'text'; 
			switch(inputType.toLowerCase()) {
				case "checkbox":
				case "radio":
					return element.checked; 
					break;
				default:
					return !this.isEmpty(wFORMS.helpers.getFieldValue(element));
			}
			break;
		case "SELECT":							
			return !this.isEmpty(wFORMS.helpers.getFieldValue(element));
			break;
		case "TEXTAREA":
			return !this.isEmpty(wFORMS.helpers.getFieldValue(element));
			break;
		default:
			for(var i=0; i<element.childNodes.length;i++) {
				if(this.validateOneRequired(element.childNodes[i])) return true;
			}
			break;
	} 	 
	return false 
}

/**
 * validateAlpha
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateAlpha = function(element, value) {
	var regexp = /^[a-zA-Z\s]+$/; // Add ' and - ?
	return this.isEmpty(value) || regexp.test(value);
}

/**
 * validateAlphanum
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateAlphanum = function(element, value) {
	var regexp = /^[\w\s]+$/;
	return this.isEmpty(value) || regexp.test(value);
}

/**
 * validateDate
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateDate = function(element, value) {
	var testDate = new Date(value);
	return this.isEmpty(value) || !isNaN(testDate);
}

/**
 * validateTime
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateTime = function(element, value) {
	/* not yet implemented */	
	return true;
}

/**
 * validateEmail
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateEmail = function(element, value) {
	var regexpEmail = /\w{1,}[@][\w\-]{1,}([.]([\w\-]{1,})){1,}$/;
	return this.isEmpty(value) || regexpEmail.test(value);
}

/**
 * validateInteger
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateInteger = function(element, value) {
	var regexp = /^[+]?\d+$/;
	return this.isEmpty(value) || regexp.test(value);
}

/**
 * validateFloat
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateFloat = function(element, value) {
	return this.isEmpty(value) || !isNaN(parseFloat(value));
}

/**
 * validateCustom
 * @param {domElement} element 
 * @returns {boolean} 
 */
wFORMS.behaviors.validation.instance.prototype.validateCustom = function(element, value) {	
	var pattern = new RegExp("\/(.*)\/([gi]*)");
	var matches = element.className.match(pattern);
	//console.log(matches);
	if(matches && matches[0]) {										
		var validationPattern = new RegExp(matches[1],matches[2]);
		if(!value.match(validationPattern)) {
			return false									
		}
	}		
	return true;
}

if (typeof(wFORMS) == "undefined") {
	throw new Error("wFORMS core not found. This behavior depends on the wFORMS core.");
}
/**
 * wForms calculation behavior. 
 */
wFORMS.behaviors.calculation  = { 
	
	/**
	 * Selector expression for the variable used in a calculation
     * @final
     * @see	http://www.w3.org/TR/css3-selectors/
	 */
	VARIABLE_SELECTOR_PREFIX : "calc-",
	
	/**
	 * Behavior uses value defined in the class with this prefix if available (e.g. calcval-9.99)
	 * otherwise uses field value property. 
	 */
	CHOICE_VALUE_SELECTOR_PREFIX : "calcval-",

	/**
	 * Suffix of the ID for the hint element
     * @final
	 */
	CALCULATION_SELECTOR : '*[class*="formula="]',

	/**
	 * The error message displayed next to a field with a calculation error
	 */
	CALCULATION_ERROR_MESSAGE : "There was an error computing this field.",
	
	/**
	 * Creates new instance of the behavior
     * @constructor
	 */
	instance : function(f) {
		this.behavior = wFORMS.behaviors.calculation; 
		this.target = f;
		this.calculations = [];
		//this.variables = [];
	}
}

/**
 * Factory Method.
 * Applies the behavior to the given HTML element by setting the appropriate event handlers.
 * @param {domElement} f An HTML element, either nested inside a FORM element or (preferably) the FORM element itself.
 * @return {object} an instance of the behavior 
 */	
wFORMS.behaviors.calculation.applyTo = function(f) {
	var b = new wFORMS.behaviors.calculation.instance(f);

	f.querySelectorAll(wFORMS.behaviors.calculation.CALCULATION_SELECTOR).forEach(
		function(elem){
			// extract formula
			var formula = elem.className.substr(elem.className.indexOf('formula=')+8).split(' ')[0];

			var variables = formula.split(/[^a-zA-Z]+/g);
			b.varFields = [];
			
			// process variables, add onchange/onblur event to update total.
			for (var i = 0; i < variables.length; i++) {
				if(variables[i]!='') {
					f.querySelectorAll("*[class*=\""+wFORMS.behaviors.calculation.VARIABLE_SELECTOR_PREFIX+variables[i]+"\"]").forEach(
						function(variable){
							
							// make sure the variable is an exact match.
							var exactMatch = ((' ' + variable.className + ' ').indexOf(' '+wFORMS.behaviors.calculation.VARIABLE_SELECTOR_PREFIX+variables[i]+' ')!=-1);
							if(!exactMatch) return;
							
							switch(variable.tagName + ":" + variable.getAttribute('type') ) {
								case 'INPUT:':			// (type attribute empty)
								case 'INPUT:null': 		// (type attribute missing)
								case 'INPUT:text':
								case 'INPUT:hidden':
								case 'INPUT:password':
								case 'TEXTAREA:null':
									if(!variable._wforms_calc_handled) {
										variable.addEventListener('blur', function(e){ return b.run(e, this)}, false);
										variable._wforms_calc_handled = true;
									}
									break;
								case 'INPUT:radio':		 						
								case 'INPUT:checkbox':
									if(!variable._wforms_calc_handled) {
										variable.addEventListener('click', function(e){ return b.run(e, this)}, false);
										variable._wforms_calc_handled = true;
									}
									break;			
								case 'SELECT:null':
									if(!variable._wforms_calc_handled) {
										variable.addEventListener('change',  function(e){ return b.run(e, this)}, false);
										variable._wforms_calc_handled = true;
									}
									break;		
								default:
									// error: variable refers to a non supported element.
									return;
									break;
							}
							b.varFields.push({name: variables[i], field: variable});						
						}
					);			
				}		
			}		
			var calc = { field: elem, formula: formula, variables: b.varFields };		
			b.calculations.push(calc);	
			b.compute(calc);
		}
	);
	
	b.onApply();
	
	return b;
}

/**
 * Executed once the behavior has been applied to the document.
 * Can be overwritten.
 */
wFORMS.behaviors.calculation.instance.prototype.onApply = function() {} 

/**
 * Runs when a field is changed, update dependent calculated fields. 
 * @param {event} event
 * @param {domElement} elem
 */
wFORMS.behaviors.calculation.instance.prototype.run = function(event, element) { 
	
	for(var i=0; i<this.calculations.length;i++) {		
		var calc = this.calculations[i];
		for(var j=0; j<calc.variables.length;j++) {		
					
			if(element==calc.variables[j].field) {
				// this element is part of the calculation for calc.field
				this.compute(calc);
			}
		}
	}
} 

/**
 * Can be used to update a calculated field if the run method is not triggered. 
 * @param {event} event
 * @param {domElement} elem
 */
wFORMS.behaviors.calculation.instance.prototype.refresh = function(event, element) { 
	
	for(var i=0; i<this.calculations.length;i++) {		
		var calc = this.calculations[i];
					
		if(element==calc.field) {
			this.compute(calc);
		}
	}
} 
 
wFORMS.behaviors.calculation.instance.prototype.compute = function(calculation) {
	var f = this.target;
	var formula = calculation.formula;
	var _processedVariables = new Array();
	
	for(var i=0; i<calculation.variables.length;i++) {
		var v = calculation.variables[i];
		var varval = 0;
		var _self  = this;
		
		// We don't rely on calculation.variables[i].field because 
		// the form may have changed since we've applied the behavior
		// (repeat behavior for instance).
		
		// Since the calculations can have several variables with the same name
		// querySelectorAll will catch them all, so we don't need to also loop 
		// through all of them.
		if(wFORMS.helpers.contains(_processedVariables,v.name)) {
			continue;
		} else {
			_processedVariables.push(v.name);
		}
		 
		// TODO: Exclude switched-off variables?
		f.querySelectorAll("*[class*=\""+_self.behavior.VARIABLE_SELECTOR_PREFIX+v.name+"\"]").forEach(
			function(f){
				
				// make sure the variable is an exact match.
				var exactMatch = ((' ' + f.className + ' ').indexOf(' '+wFORMS.behaviors.calculation.VARIABLE_SELECTOR_PREFIX+v.name+' ')!=-1);
				if(!exactMatch) return;
				
				// If field value has a different purpose, the value for the calculation can be set in the
				// class attribute, prefixed with CHOICE_VALUE_SELECTOR_PREFIX
				if(_self.hasValueInClassName(f)) {
					var value = _self.getValueFromClassName(f);
				} else {
					var value = wFORMS.helpers.getFieldValue(f);					
				} 
				if(!value) value=0;
				
				if(value.constructor==Array) { // array (multiple select)
					for(var j=0;j<value.length;j++) { 
						if(String(value[j]).search(/^[\d\.,]*$/) != -1)
							varval += parseFloat(value[j]);
						else
							(!varval)?(varval=value[j]):(varval=String(varval).concat(value[j]));
					}
				} else {
						if(String(value).search(/^[\d\.,]*$/) != -1) 
							varval += parseFloat(value);
						else
							(!varval)?(varval=value):(varval=String(varval).concat(value));
				}
			}
		);		
		
	    var rgx = new RegExp("([^a-z])("+v.name+")([^a-z])","gi");
	    while((' '+formula+' ').match(rgx)) {
	    if(String(varval).search(/^[\d\.,]*$/) != -1)
			formula = (' '+formula+' ').replace(rgx, "$1"+varval+"$3");
		else
			formula = (' '+formula+' ').replace(rgx, "$1'"+varval+"'$3");
	    }	      
	} 
	  
	try {
		var result = eval(formula);
		if(result == 'Infinity' || result == 'NaN' || String(result).match('NaN')){
			result = 'error';
		}
	} catch(x) {		
		result = 'error';	
	} 
	// Check if validation behavior is available. Then flag field if error.
	var validationBehavior = wFORMS.getBehaviorInstance(this.target,'validation');	
	if(validationBehavior) {		
		// add validation error message 
		if(!wFORMS.behaviors.validation.messages['calculation']) {
			wFORMS.behaviors.validation.messages['calculation'] = this.behavior.CALCULATION_ERROR_MESSAGE;
		}
		validationBehavior.removeErrorMessage(calculation.field);
		if(result=='error') {			
			validationBehavior.fail(calculation.field, 'calculation');
		}
	}
	calculation.field.value = result;
	
	// If the calculated field is also a variable, recursively update dependant calculations
	if(calculation.field.className && (calculation.field.className.indexOf(this.behavior.VARIABLE_SELECTOR_PREFIX)!=-1)) {
		// TODO: Check for infinite loops?
		this.run(null,calculation.field);
	} 
}
	
wFORMS.behaviors.calculation.instance.prototype.hasValueInClassName = function(element) {
	switch(element.tagName) {
		case "SELECT": 
			for(var i=0;i<element.options.length;i++) {
				if(element.options[i].className && element.options[i].className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)!=-1) {
					return true; 
				}
			}
			return false; 
			break;
		default:
			if(!element.className || (' '+element.className).indexOf(' '+this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)==-1)
				return false;
			break;
	}
	return true;
}
/**
 * getValueFromClassName 
 * If field value has a different purpose, the value for the calculation can be set in the
 * class attribute, prefixed with CHOICE_VALUE_SELECTOR_PREFIX 
 * @param {domElement} element 
 * @returns {string} the value of the field, as set in the className
 */
wFORMS.behaviors.calculation.instance.prototype.getValueFromClassName = function(element) {
	switch(element.tagName) {
		case "INPUT":
			if(!element.className || element.className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)==-1) 
				return null;
			
			var value = element.className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(' ')[0];								
			if(element.type=='checkbox')
				return element.checked?value:null;
			if(element.type=='radio')
				return element.checked?value:null;
			return value;
			break;
		case "SELECT":		
			if(element.selectedIndex==-1) {					
				return null; 
			} 
			if(element.getAttribute('multiple')) {
				var v=[];
				for(var i=0;i<element.options.length;i++) {
					if(element.options[i].selected) {
						if(element.options[i].className && element.options[i].className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)!=-1) { 
							var value = element.options[i].className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(' ')[0];								
							v.push(value);
						}
					}
				}
				if(v.length==0) return null;
				return v;
			}	
			if (element.options[element.selectedIndex].className &&  element.options[element.selectedIndex].className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)!=-1) { 
				var value =  element.options[element.selectedIndex].className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(' ')[0];								
				return value;
			}													
			break;
		case "TEXTAREA":
			if(!element.className || element.className.indexOf(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)==-1) 
				return null;
			var value = element.className.split(this.behavior.CHOICE_VALUE_SELECTOR_PREFIX)[1].split(' ')[0];								
			
			return value;
			break;
		default:
			return null; 
			break;
	} 	 
	return null; 
}