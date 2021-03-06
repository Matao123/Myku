﻿	// 封装事件函数.
	// 该函数期望传入三个参数
	// 参数1.   要枚举的元素集合，
	// 参数2.   要绑定的事件，
	// 参数3.   要做的事情
	function getNodelist(nodeList,eventType,fn){
			if(arguments.length == 2){
				fn = arguments[1]
				eventType = "onclick"
			}
			// if(arguments.length == 3){
			// 	for(var n = 0;n<arguments.length;n++){
			// 		if(typeof arguments[n] == "object"){
			// 			var a = arguments[n]
			// 		}
			// 		if(typeof arguments[n] == "string"){
			// 			var b = arguments[n]
			// 		}
			// 		if(typeof arguments[n] == "function"){
			// 			var c = arguments[n]
			// 		}
			// 	}	
			// }
			for(var i = 0; i<nodeList.length;i++){
				nodeList[i][eventType] = fn
			}
	}
	// 获取节点方法
	// 该函数期望传入一个带有字符串的（选择器 / 标签名）
	function $(selector){
		var str = selector.slice(1)
		if(selector[0] == "."){
			return document.getElementsByClassName(str)
		}
		if(selector[0] == "#"){
			return document.getElementById(str)
		}
		if(selector[0] != "." && selector[0] != "#"){
			return document.getElementsByTagName(selector)
		}
	}
	// 获取16进制颜色的方法
	function getColor(){
		var result = "#"
		var arr = [0,1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"]
		for(var i=0;i<6;i++){
			var newColor = Math.floor(Math.random() * 16)
			result += arr[newColor]
		}
		return result	
	}
	// 返回insertAfter的节点方法
	// 该函数期望传入两个参数,返回插入后的样子
	// 参数1. newElement (要参入的元素节点)
	// 参数2. obj (要插入的位置节点)
	function insertAfter(newElement,obj){
		var parent=obj.parentNode
		if (parent.lastChild == obj) {
			parent.appendChild(newElement)
		} 
		else{
			parent.insertBefore(newElement,obj.nextSibling)
		}
	}
	// 倒计时方法
	function daojishi(){
		var nowTime = new Date()
		var overTime = new Date()
		var ri = overTime.setDate(30)
		var month = overTime.setMonth(0)
		var hour = overTime.setHours(18)
		var minute = overTime.setMinutes(0)
		var second = overTime.setSeconds(0)
		var miao = (overTime.getTime() - nowTime.getTime())/1000
		var t = Math.floor(miao/86400)
		var h = Math.floor((miao-86400*t)/3600)
		var m = Math.floor((miao-86400*t-3600*h)/60)
		var s = Math.floor(miao-86400*t-3600*h-60*m)
		if(t<10){
			t = "0"+t
		}
		if(h<10){
			h = "0"+h
		}
		if(m<10){
			m = "0"+m
		}
		if(s<10){
			s = "0"+s
		}
		shi.innerHTML = h
		fen.innerHTML = m
		miaoL.innerHTML = s
	}
	// 重新实现nextSibling,直接寻找下一个兄弟元素节点
	// 该函数期望传入一个node节点
	// 找到距离他最近的下一个兄弟元素节点
	function nextBrotherNode(brother){
		while(brother.nextSibling.nodeType!=1){
			brother = brother.nextSibling
			if(brother.nextSibling.nodeType==1){
				return brother.nextSibling
			}
		}
	}
	// 该函数期望传入一个node节点
	// 找到该节点里面的所有子元素节点
	function sunchild(sun){
		for(var a=0;a<sun.childNodes.length;a++){
			if(sun.childNodes[a].nodeType==1){
				console.log(sun.childNodes[a])
			}
		}
	}


	// 获取cookie属性所对应的属性值
	// 该函数期望传入一个属性名
	function getCookie(parameter){
		//1.获取到要找的属性在字符串中的起始位startIndex
		//2.获取到要找的属性所对应的属性值在字符串中的终止位置endIndex
		//3.从起始位startIndex，截取到终止位endIndex
		//4.以=为切割点，将第三步截取到的字符串切割为长度2的数组，数组下标[1]就是寻找属性对应的属性值.
		//获取设置过的cookie
		var str = document.cookie
		var startIndex = str.indexOf(parameter)
		var endIndex = str.indexOf(";",startIndex)
		if(endIndex == -1){
			endIndex = str.length
		}
		var result = str.substring(startIndex,endIndex).split("=")[1]
		return result
	}
	// 设置cookie属性所对应的属性值
	function setCookie(data,date){
		var d = new Date()
		d.setDate(d.getDate() + date)
		for(var i in data){
			document.cookie = i + "=" + data[i] + ";expires=" + d
		}
	}
	// 删除cookie属性所对应的属性值
	function removeCookie(attrName){
		var d = new Date()
		d.setDate(d.getDate() - 1)
		document.cookie = attrName + "=1;expires=" + d
	}

	// 拖拽功能方法
	function drag(option){
		var obj = option.obj  // 拖拽的对象
		var distance = option.distance || false // 是否超出可视区域
		var scope = option.scope  // 拖拽的范围
		var style = option.style || "shadow" // 阴影的样式
		var body = document.getElementsByTagName("body")[0]
		obj.style.position = "absolute" 
		obj.style.top = obj.offsetTop
		obj.style.left = obj.offsetLeft
		obj.onmousedown = function(event){
			x = event.clientX
			y = event.clientY
			var newobj = obj.cloneNode(true) 
			body.appendChild(newobj)
			if(style == "shadow"){
				newobj.style.opacity = 0.3
			}
			if(style == "dashed"){
				newobj.style.backgroundColor = "transparent"
				newobj.style.border = "1px dashed #000"
			}
			newobj.style.position = "absolute"
			newobj.style.top = obj.style.marginTop
			newobj.style.left = obj.style.marginLeft
			newobj.style.marginLeft = 0
			newobj.style.marginTop = 0
			var ml = parseInt(newobj.style.left)
			var mt = parseInt(newobj.style.top)
			body.onselectstart = function(){
				return false                 
			}  
			window.onmousemove = function(event){
				X = event.clientX
				Y = event.clientY
				newobj.style.left = X - x + ml + "px"
				newobj.style.top = Y - y + mt + "px"
				if(!distance){
					if(parseInt(newobj.style.left) < 0){
						newobj.style.left = 0;
					}
					if(parseInt(newobj.style.left) > body.offsetWidth - newobj.offsetWidth){
						newobj.style.left = body.offsetWidth - newobj.offsetWidth + "px";
					}
					if(parseInt(newobj.style.top) < 0){
						newobj.style.top = 0;
					}
					if(parseInt(newobj.style.top) > body.offsetHeight - newobj.offsetHeight){
						newobj.style.top = body.offsetHeight - newobj.offsetHeight + "px";
					}
				}
			}
			window.onmouseup = function(event){
				obj.style.marginLeft = newobj.style.left
				obj.style.marginTop = newobj.style.top
				window.onmousemove = null;
				window.onmouseup = null;
				body.removeChild(newobj)
			}
		}
	}

	// 数组查重方法
	function arr(a){
		var newarr = []
		for(var i = 0;i<a.length;i++){
			if(newarr.indexOf(a[i]) == -1){
				newarr.push(a[i])
			}
		}
		return newarr
	}

	// 字符串转对象方法
	function str(url){
		var n = url.indexOf("?")
		url = url.slice(n+1)
		var arr = url.split("&")
		var obj = {}
		for(var i = 0;i<arr.length;i++){
			var m = arr[i].indexOf("=")
			obj[arr[i].slice(0,m)] = arr[i].slice(m+1)
		}
		return obj
	}

	// canvas绘制矩形方法
	function drawRect(opt){
		cxt = opt.context
		xWidth = opt.xWidth || 300
		yHeight = opt.yHeight || 300
		x1 = opt.x1 || 0
		y1 = opt.y1 || 0
		lineWidth = opt.lineWidth || 3
		strokeStyle = opt.strokeStyle
		fillStyle = opt.fillStyle
		cxt.beginPath()
		cxt.lineTo(x1,y1)
		cxt.lineTo(x1 + xWidth,y1)
		cxt.lineTo(x1 + xWidth,y1 + yHeight)
		cxt.lineTo(x1,y1 + yHeight)
		cxt.closePath()
		cxt.lineWidth = lineWidth
		cxt.strokeStyle = strokeStyle
		if(opt.fillStyle){
			cxt.fillStyle = fillStyle
			cxt.fill()
		}
		cxt.stroke()
	}