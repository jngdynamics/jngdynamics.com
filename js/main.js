var loading = false;
var pages = [
	"home",
	"pcrepair",
	"websites",
	"software",
	"design",
	"networks",
	"automation",
	"about"
]

mobilecheck = function () {
	var check = false;
	(function (a) {
		if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true
	})(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}

var mobile = window.mobilecheck();


function output(msg) {
	var debug = document.querySelector('#debug');
	var p = document.createElement('p');
	p.innerHTML = msg;
	debug.appendChild(p);
}


function getCssValuePrefix(name, value) {
	var prefixes = ['', '-o-', '-ms-', '-moz-', '-webkit-'];
	var dom = document.createElement('div');
	for (var i = 0; i < prefixes.length; i++) {
		dom.style[name] = prefixes[i] + value;
		if (dom.style[name])
			return prefixes[i];
		dom.style[name] = '';
	}
}

function setGradient(el, percentage) {
	var prefix = getCssValuePrefix('backgroundImage', 'gradient(radial, ' + percentage + '% center, 0, ' + percentage + '% center, 60, from(rgba(0,0,0,0.8)), to(rgba(0,0,0,0)))');
	el.style.backgroundImage = prefix + 'gradient(radial, ' + percentage + '% center, 0, ' + percentage + '% center, 60, from(rgba(0,0,0,0.8)), to(rgba(0,0,0,0)))';
}

function translate(el, px) {
	el.style["-webkit-transition"] = "all .35s ease-out";
	el.style["-moz-transition"] = "all .35s ease-out";
	el.style["-ms-transition"] = "all .35s ease-out";
	el.style["-o-transition"] = "all .35s ease-out"; 
	el.style["transition"] = "all .35s ease-out";
	el.style["-webkit-transform"] = "translate(" + px + "px, 0px)";
	el.style["-moz-transform"] = "translate(" + px + "px, 0px)";
	el.style["-ms-transform"] = "translate(" + px + "px, 0px)";
	el.style["-o-transform"] = "translate(" + px + "px, 0px)";
	el.style["transform"] = "translate(" + px + "px, 0px)";
}

function translatenone(el) {
	el.style["-webkit-transform"] = "none";
	el.style["-moz-transform"] = "none";
	el.style["-ms-transform"] = "none";
	el.style["-o-transform"] = "none";
	el.style["transform"] = "none";
}

function toggleClass(el, className) {
	if(el) {
		if(el.className.indexOf(className))
			el.className = el.className.replace(className, '');
		else
			el.className += ' ' + className;
	}
};

function makeSlider(element) {
	var S = {
		startX:0,
		startY:0,
		startL:0,
		swiping:false,
		slideWidth:0,
		menuobj:null,
		e:element,
		s:element.querySelector('.s_slide'),
		c:element.querySelector('ul'),
		l:element.querySelector('.s_left'),
		r:element.querySelector('.s_right'),
		listeners:[],
		touchStart:function(event) {
			event.preventDefault();
			this.swiping = true;
			if(mobile) {
				this.startX = event.touches[0].pageX;
				this.startY = event.touches[0].pageY;
			}
			else {
				this.startX = event.pageX;
				this.startY = event.pageY;
			}
			this.startL = this.c.offsetLeft * -1;
		},
		touchMove:function(event) {
			if(this.swiping) {
				var factor = 1;
				if(mobile)
					var curX = event.touches[0].pageX;
				else
					var curX = event.pageX;
				var newPos = this.startL + ((this.startX - curX) * factor);
				if(newPos > this.slideWidth)
					newPos = this.slideWidth;
				else if(newPos < 0)
					newPos = 0;
				this.c.style.left = (-1 * newPos) + 'px';
				var prcnt = newPos/this.slideWidth;
				this.updateShadow(prcnt);
			}
		},
		touchEnd:function(event) {
			var t = this;
			event.preventDefault();
			if(mobile) {
				var curX = event.changedTouches[0].pageX;
				var curY = event.changedTouches[0].pageY;
			}
			else {
				var curX = event.pageX;
				var curY = event.pageY;
			}
			
			if((t.startX-curX < 10 && t.startX-curX > -10) && (t.startY-curY < 10 && t.startY-curY > -10)) {
				var el = document.elementFromPoint(t.startX, t.startY);
				if(el.nodeName == 'A')
					el = el.parentNode;
				if(el.className.indexOf("loaded") == -1) {
					output("click on " + el.innerHTML);
					el.click();
					el.className += ' ' + 'hover';
					setTimeout(function() {
						el.className = el.className.replace('hover', '');
					}, 500);
				}
			}
			t.startX = 0;
			t.startL = 0;
			t.swiping = false;
		},
		updateShadow:function(prcnt) {
			setGradient(this.l, (40 * prcnt) - 45);
			setGradient(this.r, 100 - (40 * (1 - prcnt)) + 45);
		},
		clickLeft:function() {
			var t = this;
			t.r.style.display = 'block';
			var newPos = t.startL - t.c.children[t.startX].offsetWidth;
			if(newPos < t.slideWidth * -1)
				newPos = t.slideWidth * -1;
			if(newPos == t.slideWidth * -1)
				t.l.style.display = 'none';
			translate(t.c, newPos);
			t.startL = newPos;
			t.startX++;
		},
		clickRight:function() {
			var t = this;
			t.l.style.display = 'block';
			t.startX--;
			var newPos = t.startL + t.c.children[t.startX].offsetWidth;
			if(newPos > 0)
				newPos = 0;
			if(newPos == 0)
				t.r.style.display = 'none';
			translate(t.c, newPos);
			t.startL = newPos;
		},
		addListener:function(e, t, f) {
			var a = this;
			var i = a.listeners.length;
			a.listeners.push({
				e:e,
				f:f,
				t:t
			});
			e.addEventListener(t, a.listeners[i].f, false);
		},
		clearListeners:function() {
			var l;
			while(this.listeners.length > 0) {
				l = this.listeners.pop();
				l.e.removeEventListener(l.t, l.f, false);
			}
		},
		showIndicators:function() {
			var t = this;
			t.c.style.left = 0;
			t.startX = 0;
			t.startL = 0;
			translatenone(t.c);
			if(mobile) {
				t.addListener(t.s, 'touchstart', function(event) {
					t.touchStart(event);
				});
				t.addListener(t.s, 'touchmove', function(event) {
					t.touchMove(event);
				});
				t.addListener(t.s, 'touchend', function(event) {
					t.touchEnd(event);
				});
				var prcnt = t.c.offsetLeft/t.slideWidth*-1;
				t.updateShadow(prcnt);
				t.l.style.display = 'block';
				t.r.style.display = 'block';
			}
			else {
				t.addListener(t.l, 'click', function(event) {
					t.clickLeft();
				});
				t.addListener(t.r, 'click', function(event) {
					t.clickRight();
				});
				t.l.className += ' arrow-left';
				t.r.className += ' arrow-right';
				t.l.style.display = 'block';
			}
		},
		hideIndicators:function() {
			var t = this;
			t.c.style.left = 0;
			t.startX = 0;
			t.startL = 0;
			translatenone(t.c);
			t.l.style.display = 'none';
			t.r.style.display = 'none';
			t.clearListeners();
			if(!mobile) {
				t.l.className = t.l.className.replace('arrow-left', '');
				t.r.className = t.r.className.replace('arrow-right', '');
			}
		},
		checkWidth:function() {
			this.slideWidth = this.c.clientWidth - this.s.clientWidth;
			if(this.slideWidth > 20)
				this.showIndicators();
			else if(this.l.style.display != 'none')
				this.hideIndicators();
		},
		init:function(menuobj) {
			var t = this;
			var li, a;
			for(var x = 0; x < menuobj.length; x++) {
				li = document.createElement("li");
				li.style.visibility = 'hidden';
				li.innerHTML = menuobj[x].title;
				t.c.appendChild(li);
				(function(X) {
					li.addEventListener('click', function() {
						console.log(this);
						if(!t.swiping && this.className.indexOf("loaded") == -1)
							t.menuobj[X].func();
					}, false);
				})(x);
			}
			t.menuobj = menuobj;
			window.addEventListener('resize', (function() {
				t.checkWidth();
			}), false);
		}
	};

	return S;
}

var menu = {
	selected:0,
	slider:makeSlider(document.getElementById('menu')),
	set:function(index) {
		var lis = this.slider.c.children;
		for(var x = 0; x < lis.length; x++) {
			lis[x].className = lis[x].className.replace('loaded', '').replace('loading', '');
		}
		this.slider.c.children[index].className += ' loaded';
		this.slider.c.children[index].className = this.slider.c.children[index].className.replace('loading', '');
		this.selected = index;
	},
	loading:function(index) {
		var lis = this.slider.c.children;
		if(loading)
			loading.abort();
		for(var x = 0; x < lis.length; x++) {
			lis[x].className = lis[x].className.replace('loading', '');
		}
		this.slider.c.children[index].className += ' loading';
	},
	show:function() {
		var t = this;
		t.slider.checkWidth();
		t.slider.e.style.visibility = 'visible';
		for(var x = 0; x < t.slider.c.children.length; x++) {
			t.slider.c.children[x].style.visibility = 'visible';
		}
		if(mobile)
			t.slider.e.style.top = '0em';
		else
			t.slider.e.className += ' show';
	}
};

menu.slider.init([
	{
		title:"Home",
		func:function() {
			menu.loading(0);
			pageRequest('pages/home.html');
			return false;
		}
	},
	{
		title:"PC Repair",
		func:function() {
			menu.loading(1);
			pageRequest('pages/pcrepair.html');
			return false;
		}
	},
	{
		title:"Web Development",
		func:function() {
			menu.loading(2);
			pageRequest('pages/websites.html');
			return false;
		}
	},
	{
		title:"Software Services",
		func:function() {
			menu.loading(3);
			pageRequest('pages/software.html');
			return false;
		}
	},
	{
		title:"Design/Prototyping",
		func:function() {
			menu.loading(4);
			pageRequest('pages/design.html');
			return false;
		}
	},
	{
		title:"Network Infrastructure",
		func:function() {
			menu.loading(5);
			pageRequest('pages/networks.html');
			return false;
		}
	},
	{
		title:"Automation",
		func:function() {
			menu.loading(6);
			pageRequest('pages/automation.html');
			return false;
		}
	},
	{
		title:"About Us",
		func:function() {
			menu.loading(7);
			pageRequest('pages/about.html');
			return false;
		}
	}
]);

function pageRequest(url, onload) {
	window.location.hash = '';
	var loader = ''
	+'<div align="center">'
	+'	<table width="100%" height="600" border="0" cellpadding="0" cellspacing="0" style="padding:0px;margin:0px;table-layout:fixed;">'
	+'		<tr>'
	+'			<td>'
	+'				<div align="center">'
	+'					<div class="loader">'
	+'						<div class="inner">'
	+'							<span>L</span>'
	+'							<span>o</span>'
	+'							<span>a</span>'
	+'							<span>d</span>'
	+'							<span>i</span>'
	+'							<span>n</span>'
	+'							<span>g</span>'
	+'						</div>'
	+'					</div>'
	+'				</div>'
	+'			</td>'
	+'		</tr>'
	+'	</table>'
	+'</div>';
	document.querySelector('#content').innerHTML = loader;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", url);
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if(xmlhttp.status == 200 || xmlhttp.status == 0) {
				loading = false;
				var page = xmlhttp.responseText;
				page = page.split("<!--S:W_R-->");
				page = page[1].split("<!--E:W_R-->");
				var W_R = page[0];
				page = page[1].split("<!--S:P_C-->");
				page = page[1].split("<!--E:P_C-->");
				var P_C = page[0];
				page = page[1].split("<!--S:S-->");
				page = page[1].split("<!--E:S-->");
				var S = page[0];
				
				document.querySelector('head').innerHTML += W_R;				
				
				var u = url;
				var hash = url.indexOf("pages/");
				url = url.substring(hash + 6);
				hash = url.indexOf(".html");
				hash = url.substring(0, hash);
				
				if(S) {
					var p = "var url='" + u + "';\n";
					S = p + S + "\menu.set(SM); \nwindow.location.hash = (typeof LH != 'undefined')?(LH):('" + hash + "');\ndelete LH;";
					S = S.replace("<!--SelectedMenu-->", " ");
				}
				
				setTimeout(function() {
					document.querySelector('#content').innerHTML = P_C;
					console.log(S, onload);
					if(S)
						eval(S);
					if(onload)
						onload();
				}, 700);
			}
			else {
				setTimeout(function() {
					document.querySelector('#content').innerHTML = 'Error ' + xmlhttp.status + ': ' + xmlhttp.statusText + '<br>Content: ' + xmlhttp.responseText;
					
					var u = url;
					var hash = url.indexOf("pages/");
					url = url.substring(hash + 6);
					hash = url.indexOf(".html");
					hash = url.substring(0, hash);
					
					console.log(hash);
					
					menu.set(pages.indexOf(hash));
				}, 700);
			}
		}
	}
	xmlhttp.send(null);
	loading = xmlhttp;
}

console.log("obvious refresh");

var urlvars=location.hash.replace('#','').split(/\?/);
hash = (!urlvars[0]?'home':urlvars[0]);
var i = pages.indexOf(hash);
if(i == -1) {
	hash = 'home';
	i = 0;
}
menu.loading(i);
pageRequest('pages/'+ hash +'.html'+((urlvars.length>1)?('?'+urlvars[1]):('')), function() {
	menu.show();
});