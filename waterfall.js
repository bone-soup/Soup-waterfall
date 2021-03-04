// ===================================================================================================
// name:waterfall
// author:bone
// ===================================================================================================

;(function () {
	
	function WaterFall(options) {
		var options = options || {};
		var defaultOptions = {
			id:'waterFall',		
			itemClass:'waterItem',	
			imgClass:'waterImg',
			col:3,	
			padding:10,
			background:'#fff',
		}
		for (key in options) {
			defaultOptions[key] = options[key];
		}
		this.init(defaultOptions);
	}
	
	WaterFall.prototype = {
		version:'0.1',
		constructor:WaterFall,
		
		init: function(obj) {
			this.options = obj;
			this.addStyle(obj);
			this.createList(obj);
			this.clientControl(obj);
		},
		
		addStyle:function (obj) {
			var style = document.createElement('style');
			var styleText = '#' + obj.id + '{position:relative;width:100%;} #' + obj.id + ' .' + obj.itemClass + '{position:absolute;overflow:hidden;background:' + obj.background + ';}';
			style.innerHTML = styleText;
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(style);
		},
		
		createList:function (obj) {
			var container = document.getElementById(obj.id),
					itemList = document.getElementsByClassName(obj.itemClass);
					arrH = [],
					that = this,
					width = Math.floor((container.clientWidth - ((obj.col - 1) * obj.padding)) / obj.col);
			for (var w = 0; w < obj.col; w ++ ) {	arrH.push(0);	}
			for (var i = 0; i < itemList.length; i ++) {
				var j = i % obj.col,		
						min = this.findMin(arrH);
				itemList[i].style.width = width + 'px';
				if (i < obj.col) {
					itemList[i].style.left = i * width + (i == 0 ? 0 : obj.padding * i) + 'px';
					itemList[i].style.top = 0;
					arrH[i] = parseInt(itemList[i].offsetHeight);
				} else {
					itemList[i].style.left = min * width + obj.padding * min + 'px';
					itemList[i].style.top = arrH[min] + obj.padding + 'px';
					arrH[min] = arrH[min] + parseInt(itemList[i].offsetHeight) + obj.padding;
				}
			}
			var max = that.findMax(arrH);
			container.style.height = arrH[max] + 'px';
		},
		
		findMax:function (arr) {
			var m = 0;
			for (var i = 0; i < arr.length; i++) {
				m = Math.max(arr[m], arr[i]) == arr[m] ? m : i;
			}
			return m;
		},
		
		findMin:function (arr) {
			var m = 0;
			for (var i = 0; i < arr.length; i++) {
				m = Math.min(arr[m], arr[i]) == arr[m] ? m : i;
			}
			return m;
		},
		
		addItem:function (newArr) {
			var that = this;
			for (var i = 0; i < newArr.length; i ++) {
				(function (i) {
					var container = document.getElementById(that.options.id);
					container.appendChild(newArr[i]);
				})(i)
			}
			var imgList = document.getElementsByClassName(this.options.imgClass);
			var count = 0;
			for (var i = 0;i < imgList.length; i ++) {
				(function (i) {
					imgList[i].onload = function () {
						count = count + 1;
						if (count == newArr.length) {
							that.createList(that.options);
						}
					}
				})(i)
			}
		},
		
		setCol:function (e) {
			this.options.col = e;
			this.createList(this.options);
		},
		
		clientControl:function (obj) {
			var that = this,
					timer = null;
			window.addEventListener('resize',function () {
				if (!timer) {
					timer = setTimeout(function () {
						that.createList(obj);
						timer = null
					},400)
				}
			})
		}
	}
	
	if (typeof window != "undefined") {
	  if (window.WaterFall) {
	    window._WaterFall = window.WaterFall;
	  }
	  window.WaterFall = WaterFall;
	}
	
})();
