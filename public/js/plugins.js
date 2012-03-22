// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
	log.history = log.history || [];   // store logs to an array for reference
	log.history.push(arguments);
	if(this.console) {
    	arguments.callee = arguments.callee.caller;
    	var newarr = [].slice.call(arguments);
    	(typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  	}
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


/* IE7 Array prototypes */
'use strict';

//Add ECMA262-5 method binding if not supported natively
//
if (!('bind' in Function.prototype)) {
 Function.prototype.bind= function(owner) {
     var that= this;
     if (arguments.length<=1) {
         return function() {
             return that.apply(owner, arguments);
         };
     } else {
         var args= Array.prototype.slice.call(arguments, 1);
         return function() {
             return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
         };
     }
 };
}

//Add ECMA262-5 string trim if not supported natively
//
if (!('trim' in String.prototype)) {
 String.prototype.trim= function() {
     return this.replace(/^\s+/, '').replace(/\s+$/, '');
 };
}

//Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
 Array.prototype.indexOf= function(find, i /*opt*/) {
     if (i===undefined) i= 0;
     if (i<0) i+= this.length;
     if (i<0) i= 0;
     for (var n= this.length; i<n; i++)
         if (i in this && this[i]===find)
             return i;
     return -1;
 };
}
if (!('lastIndexOf' in Array.prototype)) {
 Array.prototype.lastIndexOf= function(find, i /*opt*/) {
     if (i===undefined) i= this.length-1;
     if (i<0) i+= this.length;
     if (i>this.length-1) i= this.length-1;
     for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
         if (i in this && this[i]===find)
             return i;
     return -1;
 };
}
if (!('forEach' in Array.prototype)) {
 Array.prototype.forEach= function(action, that /*opt*/) {
     for (var i= 0, n= this.length; i<n; i++)
         if (i in this)
             action.call(that, this[i], i, this);
 };
}
if (!('map' in Array.prototype)) {
 Array.prototype.map= function(mapper, that /*opt*/) {
     var other= new Array(this.length);
     for (var i= 0, n= this.length; i<n; i++)
         if (i in this)
             other[i]= mapper.call(that, this[i], i, this);
     return other;
 };
}
if (!('filter' in Array.prototype)) {
 Array.prototype.filter= function(filter, that /*opt*/) {
     var other= [], v;
     for (var i=0, n= this.length; i<n; i++)
         if (i in this && filter.call(that, v= this[i], i, this))
             other.push(v);
     return other;
 };
}
if (!('every' in Array.prototype)) {
 Array.prototype.every= function(tester, that /*opt*/) {
     for (var i= 0, n= this.length; i<n; i++)
         if (i in this && !tester.call(that, this[i], i, this))
             return false;
     return true;
 };
}
if (!('some' in Array.prototype)) {
 Array.prototype.some= function(tester, that /*opt*/) {
     for (var i= 0, n= this.length; i<n; i++)
         if (i in this && tester.call(that, this[i], i, this))
             return true;
     return false;
 };
}