# Soup-waterfall
## usage method
``` 
var myWaterfall = new MyMouse({
  id:'waterFall',					// 列表id
  col:3,									// 列数
  itemClass:'waterItem',	// 子项class
  imgClass:'waterImg',		// 子项图片class
  padding:10,							// 子项间隙
  background:'#fff',			// 子项背景色
})

动态添加数据,arr为已经添加好新数据的子项dom元素列表
myWaterfall.addItem(arr);
```
## example
```
var myWaterfall = new MyMouse();
var doma = document.createElement('div'),
    arr = [],
    domaHtml = '<div class="image-box"><img src="images/i2.png" class="waterImg"/><p class="brief">子项</p></div>'；
doma.innerHtml = domaHtml;
doma.setAttribute('class','item waterItem');
arr.push(doma);
myWaterfall.addItem(arr);
```

## compatibility
主流浏览器，IE9及以上
