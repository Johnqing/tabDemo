(function($){
	/**
	 * tab切换类
	 * @param  {[Object]}   obj      [容器]
	 * @param  {[Object]}   option   [设置参数]
	 * @param  {Function} callback [回调函数]
	 */
	var tab = function(obj,option,callback){
		this.callback = (typeof option === 'function') ? option : callback;
		this.settings = $.extend(defaultConfig, option || {});
		this.obj = obj;

		this.items = obj.find("*["+this.settings.hookKey+"="+this.settings.hookItemVal+"]"),
        this.contens = obj.find("*["+this.settings.hookKey+"="+this.settings.hookContentVal+"]");

		this.init();
	}
	tab.prototype = {
		/**
		 * 基础方法
		 */
		init: function(){
			var self = this;
			if (self.items.length != self.contens.length) {
	            return false;
			}
			this._bindEvent();
			this.callback();
		},
		/**
		 * 事件绑定
		 */
		_bindEvent: function(){
			var self = this,
			curr = self.settings.currClass;
			console.log(self.items);

			self.items.each(function(i){
				$(this).bind(self.settings.event,function(){
					var item = self.items.eq(i),
						left = item.find('h2').offset().left;
					console.log(left);
					self.obj.find('.'+curr).removeClass(curr);
					item.addClass(curr);
					startMove($('.tab-curr'),{left:left});
				})
				.bind('mouseleave',function(){

				});
			});
		}
	}
	/**
	 * 获取style
	 * @param  {[Object]} obj  [需要获取的元素]
	 * @param  {[String]} attr [获取值]
	 * @return {[String]}      [字符串]
	 */
	var getStyle = function(obj, attr){
	    if(obj.currentStyle){
	        return obj.currentStyle[attr];
	    }else{
	        return getComputedStyle(obj, false)[attr];
	    }
	}
	/**
	 * 运动函数
	 * @param  {[Object]}   obj  [执行对象]
	 * @param  {[Object]}   json [执行参数]
	 * @param  {Function} fn   [回调函数]
	 */
	var startMove = function(obj, json, fn){
	    obj = obj[0];
	    clearInterval(obj.timer);
	    obj.timer=setInterval(function (){
	        var bStop=true;        //这一次运动就结束了——所有的值都到达了
	        for(var attr in json){
	        //1.取当前的值
	            var iCur=0;
	        
	            if(attr=='opacity'){
	                iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
	            }else{
	                iCur=parseInt(getStyle(obj, attr));
	            }
	        
	        //2.算速度
	            var iSpeed=(json[attr]-iCur)/8;
	            iSpeed= iSpeed>0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
	        
	        //3.检测停止
	            if(iCur!=json[attr]){
	                bStop=false;
	            }
	        
	            if(attr=='opacity'){
	                obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
	                obj.style.opacity=(iCur+iSpeed)/100;
	            }else{
	                obj.style[attr]=iCur+iSpeed+'px';
	            }
	        }
	        if(bStop){
	            clearInterval(obj.timer);
	            if(fn){
	                fn();
	            }
	        }
	    }, 30);
	}
	/**
	 * jquery tab
	 * @param  {[Object]}   option   [设置参数]
	 * @param  {Function} callback [回调]
	 * @return {[Object]}            
	 */
	$.fn.tab = function(option,callback){
		return new tab($(this),option,callback);
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