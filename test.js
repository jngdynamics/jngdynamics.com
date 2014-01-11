function iscollide(x1, y1, w1, h1, x2, y2, w2, h2) {
	return !(((y1 + h1) < y2) || (y1 > (y2 + h2)) || ((x1 + w1) < x2) || (x1 > (x2 + w2)));
};

function isdescendant(parent, child) {
	var node = child.parentNode;
	while (node != null) {
		if (node == parent) {
			return true;
		}
		node = node.parentNode;
	}
	return false;
}

var bodymouselisteners = [];

function addbodymouselistener(name, type, panel, callback) {
	bodymouselisteners.push({
		name:name,
		type:type,
		panel:panel,
		callback:callback
	});
};

function bodymouselistener(event) {
	for(var x = 0; x < bodymouselisteners.length; x++) {
		if(bodymouselisteners[x].type == event.type)
			bodymouselisteners[x].callback(event);
	}
};

document.body.addEventListener('mousemove', bodymouselistener, false);
document.body.addEventListener('mousedown', bodymouselistener, false);
document.body.addEventListener('mouseup', bodymouselistener, false);

var DDRP = {};

DDRP.docks = [];

DDRP.adddock = function(name, bx, by, bw, bh, dx, dy, dw, dh, enterbuffer, leavebuffer, enterdock, leavedock) {
	var dock = {
		name:name,
		index:null,
		b:{
			x:bx,
			y:by,
			w:bw,
			h:bh,
			enter:enterbuffer,
			leave:leavebuffer, 
		},
		d:{
			x:bx+dx,
			y:by+dy,
			w:dw,
			h:dh,
			enter:enterdock,
			leave:leavedock
		},
		checkarea:function(panel, index, deltax, deltay) {
			if(iscollide(panel.startl + deltax, panel.startt + deltay, panel.e.offsetWidth, panel.e.offsetHeight, this.d.x, this.d.y, this.d.w, this.d.h)) {
				if(!panel.docks[index].ondock) {
					this.d.enter(panel);
					if(panel.docks[index].onbuffer) {
						this.b.leave(panel);
						panel.docks[index].leavebuffer(panel, this);
					}
					panel.docks[index].ondock = true;
					panel.docks[index].onbuffer = false;
					panel.docks[index].enterdock(panel, this);
				}
				else
					panel.docks[index].onbuffer = false;
				return 2;
			}
			else if(iscollide(panel.startl + deltax, panel.startt + deltay, panel.e.offsetWidth, panel.e.offsetHeight, this.b.x, this.b.y, this.b.w, this.b.h)) {
				if(!panel.docks[index].onbuffer) {
					this.b.enter(panel);
					if(panel.docks[index].ondock) {
						this.d.leave(panel);
						panel.docks[index].leavedock(panel, this);
					}
					panel.docks[index].onbuffer = true;
					panel.docks[index].ondock = false;
					panel.docks[index].enterbuffer(panel, this);
				}
				else
					panel.docks[index].ondock = false;
				return 1;
			}
			if(panel.docks[index].ondock) {
				this.d.leave(panel);
				panel.docks[index].onbuffer = false;
				panel.docks[index].ondock = false;
				panel.docks[index].leavedock(panel, this);
			}
			else if(panel.docks[index].onbuffer) {
				this.b.leave(panel);
				panel.docks[index].onbuffer = false;
				panel.docks[index].ondock = false;
				panel.docks[index].leavebuffer(panel, this);
			}
			return 0;
		}
	};
	var hole = false;
	for(var x = 0; x < this.docks.length; x++) {
		if(this.docks[x] == null) {
			this.docks[x] = dock;
			dock.inedx = x;
			hole = true;
			break;
		}
	}
	if(!hole) {
		dock.index = this.docks.length;
		this.docks.push(dock);
	}
	return dock;
};

DDRP.removedockzone = function(name) {
	
};


DDRP.addpanel = function(name, x, y, w, h, move, resize) {
	var ddrp = this;
	var e = document.createElement('div');
	e.className = 'ddrpanel';
	e.style.left = x;
	e.style.top = y;
	e.style.width = w;
	e.style.height = h;
	e.innerHTML = ''
	+'<div class="panel-left resize"></div>'
	+'<div class="panel-left drag"></div>'
	+'<div class="panel-topleft resize"></div>'
	+'<div class="panel-top resize"></div>'
	+'<div class="panel-top drag"></div>'
	+'<div class="panel-topright resize"></div>'
	+'<div class="panel-right resize"></div>'
	+'<div class="panel-right drag"></div>'
	+'<div class="panel-bottomright resize"></div>'
	+'<div class="panel-bottom resize"></div>'
	+'<div class="panel-bottom drag"></div>'
	+'<div class="panel-bottomleft resize"></div>'
	+'<div class="content"></div>';
	
	document.body.appendChild(e);
	
	var panel = {
		name:name,
		e:e,
		dragging:false,
		resizing:false,
		resizedirection:null,
		startx:0,
		starty:0,
		startl:0,
		startt:0,
		docked:false,
		dockedinex:null,
		docks:[],
		adddock:function(dockindex, enterbuffer, leavebuffer, enterdock, leavedock) {
			this.docks.push({
				dockindex:dockindex,
				enterbuffer:enterbuffer, 
				onbuffer:false,
				leavebuffer:leavebuffer, 
				enterdock:enterdock, 
				ondock:false,
				leavedock:leavedock
			});
		},
		mousedown:false,
		addmouseevent:function(el) {
			var t = this;
			addbodymouselistener(name + '_mousedown', 'mousedown', t, function(event) {
				if(event.target == t.e || isdescendant(t.e, event.target)) {
					var d = event.target;
					while(d.className.indexOf('panel') == -1) {
						if(d == t.e)
							return false;
						d = d.parentNode;
					}
					if(d.className.indexOf('resize') != -1) {
						t.resizing = true;
						if(d.className.indexOf('-left ') != -1)
							t.resizedirection = 'left';
						else if(d.className.indexOf('-topleft') != -1)
							t.resizedirection = 'topleft';
						else if(d.className.indexOf('-top ') != -1)
							t.resizedirection = 'top';
						else if(d.className.indexOf('-topright') != -1)
							t.resizedirection = 'topright';
						else if(d.className.indexOf('-right' ) != -1)
							t.resizedirection = 'right';
						else if(d.className.indexOf('-bottomright') != -1)
							t.resizedirection = 'bottomright';
						else if(d.className.indexOf('-bottom ') != -1)
							t.resizedirection = 'bottom';
						else if(d.className.indexOf('-bottomleft') != -1)
							t.resizedirection = 'bottomleft';
						t.startx = event.pageX;
						t.starty = event.pageY;
						t.mousedown = true;
					}
					else if(d.className.indexOf('drag') != -1) {
						t.startx = event.pageX;
						t.starty = event.pageY;
						t.mousedown = true;
					}
				}
			});
			addbodymouselistener(name + '_mouseup', 'mouseup', t, function(event) {
				if(t.mousedown) {
					t.resizing = false;
					if(t.dragging)
						t.dragging = false;
					t.mousedown = false;
				}
			});
		},
		dragstart:function() {
			var t = this;
			t.startl = t.e.offsetLeft;
			t.startt = t.e.offsetTop,
			t.startw = t.e.offsetWidth;
			t.starth = t.e.offsetHeight;
			t.dragging = true;
		},
		resize:resize,
		move:move,
		init:function() {
			var t = this;
			for(var x = 0; x < t.e.children.length; x++) {
				if(t.e.children[x].className.indexOf('panel') != -1)
					t.addmouseevent(t.e.children[x]);
			}
			
			addbodymouselistener(name + '_mousemove', 'mousemove', t, function(event) {
				if(!t.dragging) {
					if(t.mousedown && (event.pageX - t.startx > 2 || event.pageX - t.startx < -2) && (event.pageY - t.starty > 2 || event.pageY - t.starty < -2))
						t.dragstart();
				}
				if(t.dragging) {
					var deltax = event.pageX - t.startx;
					var deltay = event.pageY - t.starty;
					if(!t.resizing) {
						if(t.docked) {
							if(ddrp.docks[t.dockedindex].checkarea(t, t.dockedindex, deltax, deltay) != 2)
								t.docked = false;
						}
						else {
							for(var x = 0; x < t.docks.length; x++) {
								if(ddrp.docks[t.docks[x].dockindex].checkarea(t, x, deltax, deltay) == 2) {
									t.docked = true;
									t.dockedindex = x;
									t.startx = event.pageX;
									t.starty = event.pageY;
									t.dragstart();
									break;
								}
							}
						}
						if(!t.docked) {
							t.e.style.left = t.startl + deltax;
							t.e.style.top = t.startt + deltay;
							t.move(event);
						}
					}
					else {
						console.log(t.resizedirection);
						switch(t.resizedirection) {
							case 'left':
								t.e.style.left = t.startl + deltax/2;
								t.e.style.width = t.startw - deltax/2;
								break;
							case 'topleft':
								t.e.style.left = t.startl + deltax/2;
								t.e.style.width = t.startw - deltax/2;
								t.e.style.top = t.startt + deltay/2;
								t.e.style.height = t.starth - deltay/2;
								break;
							case 'top':
								t.e.style.top = t.startt + deltay/2;
								t.e.style.height = t.starth - deltay/2;
								break;
							case 'topright':
								t.e.style.width = t.startw + deltax;
								t.e.style.top = t.startt + deltay/2;
								t.e.style.height = t.starth - deltay/2;
								break;
							case 'right':
								t.e.style.width = t.startw + deltax;
								break;
							case 'bottomright':
								t.e.style.width = t.startw + deltax;
								t.e.style.height = t.starth + deltay;
								break;
							case 'bottom':
								t.e.style.height = t.starth + deltay;
								break;
							case 'bottomleft':
								t.e.style.left = t.startl + deltax/2;
								t.e.style.width = t.startw - deltax/2;
								t.e.style.height = t.starth + deltay;
								break;
						}
						t.resize(event);
					}
				}
			});
		}
	}

	return panel;
};


var testdockarea = DDRP.adddock('testdockarea', 0, 200, 60, 200, 0, 50, 30, 100, function(panel) {
	console.log(panel, 'dock:enterbuffer');
}, function(panel) {
	console.log(panel, 'dock:leavebuffer');
}, function(panel) {
	console.log(panel, 'dock:enterdock');
}, function(panel) {
	console.log(panel, 'dock:leavedock');
});

var testpanel = DDRP.addpanel('testpanel', '400px', '400px', '200px', '200px', function(event) {

}, function(event) {

});

testpanel.init();

testpanel.adddock(testdockarea.index,function(panel, dock) {
	console.log(dock, 'panel:enterbuffer');
	panel.e.style.backgroundColor = 'green';
}, function(panel, dock) {
	console.log(dock, 'panel:leavebuffer');
	if(!panel.docks[dock.index].ondock)
		panel.e.style.backgroundColor = 'blue';
}, function(panel, dock) {
	console.log(dock, 'panel:enterdock');
	panel.e.style.backgroundColor = 'red';
	panel.e.style.left = 0;
}, function(panel, dock) {
	console.log(dock, 'panel:leavedock');
	if(!panel.docks[dock.index].onbuffer)
		panel.e.style.backgroundColor = 'blue';
});
