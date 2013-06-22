/*
 * Plugin name - gTabs
 * Version - 0.1
 * Updated - 2013-6-18
 * 优化 事件绑定到顶层节点、其他处理函数都绑定到事件触发之后
 * author - liuqing
 */
;(function($) {
  var TabClass = function(target, opts){
		this.target = target;
		this.settings = opts;
		this.tabCon = target.find(opts.gTbox);
		this.arr = target.find(opts.anim);
			
		this.init();
	};
	TabClass.prototype = {
		init: function(){
			this.bindEvent();
		},
		bindEvent: function(){
			var self = this;
			self.target.bind(self.settings.bind, function(ev){
				var oTarget = $(ev.target || ev.srcElement);
				if(oTarget.parent().attr('data-gTbtn')){
					var n = oTarget.parent().children().index(oTarget),
						tabConNode = self.tabCon.children().eq(n);
					self.cssChange(oTarget, self, tabConNode);
					self.moving(oTarget, self, n);
					self.imgLoad(oTarget, self, tabConNode);
				}
			});
		},
		cssChange: function(el,self, con){
			el.addClass(self.settings.cur).siblings().removeClass(self.settings.cur);
			con.show().siblings().hide();
		},
		moving: function(el, self, n){
			self.arr.stop().animate({'left':el.width()*n});
		},
		imgLoad: function(el, self, con){
			con.find('img').each(function(){
				 if($(this).attr('gome-src')){
					 $(this).attr('src',$(this).attr('gome-src')).removeAttr('gome-src')
			     };
			});
		}
	};
	$.fn.gTabs = function(opts){
		
	    var defaults = {
	        bind: "mouseover", // 触发控件的动作"hover", "click"
	        delay: 300, //延迟时间
	        gTabs: "[data-gTabs='gTabs']", //Tab最外层的属性及属性名
	        gTbtn: "[data-gTbtn='gTbtn']", //Tab按钮的外层属性及属性名
	        gTbox: "[data-gTbox='gTbox']", //Tab内家的外层属性及属性名
	        hide: 1, //是否隐藏除第一块内容box的其他box，1为隐藏，0为不隐藏
	        isAnim: 1, //btn标签动画
	        anim: "[data-anim='anim']", //动画外层性及属性名
	        animspeed: 300, //动画移动速度
	        cur: "cur", //hover样式名
	        even: null //触发控件的其他响应事件
	    };
	    opts = $.extend({}, defaults, opts);
	    this.each(function(){
	    	new TabClass($(this), opts);
	    });
	}    
})(jQuery);
