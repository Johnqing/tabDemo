(function($){
	/**
	 * tab 类
	 * @param  {[type]} index [num]
	 * @param  {[type]} tag   [description]
	 * @return {[type]}       [description]
	 */
	var tab = function (index,tag){
		this.index = index;
		this.tag = tag;
	}
	tab.prototype = {
		init: function(){

		}
	}
	/**
	 * jquery tab
	 * @param  {[type]}   option   [Object]
	 * @param  {Function} callback [Function]
	 * @return {[type]}            [description]
	 */
	$.fn.tab = function(option,callback){
		// function is callback
		callback = (typeof option === 'function') ? option : callback;
		var settings = $.extend(defaultConfig, option || {});

		var items = $(this).find("*["+settings.hookKey+"="+settings.hookItemVal+"]"),
            contens = $(this).find("*["+settings.hookKey+"="+settings.hookContentVal+"]");
			
        if (items.length != contens.length) {
            return false;
		}
		
	}
	/**
	 * 默认参数
	 * @type {Object}
	 */
	var defaultConfig = {
	    type: "static",
	    auto: false,
	    event: "mouseover",
	    currClass: "curr",
	    source: "data-tag",
		hookKey:"data-widget",
		hookItemVal: "tab-item",
	    hookContentVal: "tab-content",
	    stay: 5000,
	    delay: 100,
		threshold:null,
	    mainTimer: null,
	    subTimer: null,
	    index: 0,
		compatible:false
	}

})(jQuery);

$(function(){
	$('#hot').tab();
})