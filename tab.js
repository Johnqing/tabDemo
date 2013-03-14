(function($){
	var tab = function(obj,option,callback){
		this.callback = (typeof option === 'function') ? option : callback;
		this.settings = $.extend(defaultConfig, option || {});

		this.items = obj.find("*["+this.settings.hookKey+"="+this.settings.hookItemVal+"]"),
        this.contens = obj.find("*["+this.settings.hookKey+"="+this.settings.hookContentVal+"]");

		this.init();
	}
	tab.prototype = {
		init: function(){
			var self = this;
			if (self.items.length != self.contens.length) {
	            return false;
			}

			this._bindEvent();
		},
		_bindEvent: function(){
			var self = this;
			console.log(self.items);

			self.items.each(function(i){
				$(this).bind(self.settings.event,function(){
					console.log(i);
				})
				.bind('mouseleave',function(){

				});
			});


		},
		animate: function(){
			
		}
	}
	/**
	 * jquery tab
	 * @param  {[type]}   option   [Object]
	 * @param  {Function} callback [Function]
	 * @return {[type]}            [description]
	 */
	$.fn.tab = function(option,callback){
		new tab($(this),option,callback);
	}
	/**
	 * 默认参数
	 * @type {Object}
	 */
	var defaultConfig = {
	    type: "static",
	    auto: false,
	    event: "click",
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