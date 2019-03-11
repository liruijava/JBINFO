(function(g){function b(l){var k=l.data;var i=g.data(k.target,"resizable").options;if(k.dir.indexOf("e")!=-1){var j=k.startWidth+l.pageX-k.startX;j=Math.min(Math.max(j,i.minWidth),i.maxWidth);k.width=j}if(k.dir.indexOf("s")!=-1){var h=k.startHeight+l.pageY-k.startY;h=Math.min(Math.max(h,i.minHeight),i.maxHeight);k.height=h}if(k.dir.indexOf("w")!=-1){var j=k.startWidth-l.pageX+k.startX;j=Math.min(Math.max(j,i.minWidth),i.maxWidth);k.width=j;k.left=k.startLeft+k.startWidth-k.width}if(k.dir.indexOf("n")!=-1){var h=k.startHeight-l.pageY+k.startY;h=Math.min(Math.max(h,i.minHeight),i.maxHeight);k.height=h;k.top=k.startTop+k.startHeight-k.height}}function e(j){var i=j.data;var h=g(i.target);h.css({left:i.left,top:i.top});if(h.outerWidth()!=i.width){h._outerWidth(i.width)}if(h.outerHeight()!=i.height){h._outerHeight(i.height)}}function a(h){g.fn.resizable.isResizing=true;g.data(h.data.target,"resizable").options.onStartResize.call(h.data.target,h);return false}function d(h){b(h);if(g.data(h.data.target,"resizable").options.onResize.call(h.data.target,h)!=false){e(h)}return false}function f(h){g.fn.resizable.isResizing=false;b(h,true);e(h);g.data(h.data.target,"resizable").options.onStopResize.call(h.data.target,h);g(document).unbind(".resizable");g("body").css("cursor","");return false}function c(p){var h=g(p.data.target).resizable("options");var q=g(p.data.target);var l="";var m=q.offset();var j=q.outerWidth();var s=q.outerHeight();var k=h.edge;if(p.pageY>m.top&&p.pageY<m.top+k){l+="n"}else{if(p.pageY<m.top+s&&p.pageY>m.top+s-k){l+="s"}}if(p.pageX>m.left&&p.pageX<m.left+k){l+="w"}else{if(p.pageX<m.left+j&&p.pageX>m.left+j-k){l+="e"}}var r=h.handles.split(",");r=g.map(r,function(i){return g.trim(i).toLowerCase()});if(g.inArray("all",r)>=0||g.inArray(l,r)>=0){return l}for(var n=0;n<l.length;n++){var o=g.inArray(l.substr(n,1),r);if(o>=0){return r[o]}}return""}g.fn.resizable=function(h,i){if(typeof h=="string"){return g.fn.resizable.methods[h](this,i)}return this.each(function(){var j=null;var k=g.data(this,"resizable");if(k){g(this).unbind(".resizable");j=g.extend(k.options,h||{})}else{j=g.extend({},g.fn.resizable.defaults,g.fn.resizable.parseOptions(this),h||{});g.data(this,"resizable",{options:j})}if(j.disabled==true){return}g(this).bind("mousemove.resizable",{target:this},function(m){if(g.fn.resizable.isResizing){return}var l=c(m);g(m.data.target).css("cursor",l?l+"-resize":"")}).bind("mouseleave.resizable",{target:this},function(l){g(l.data.target).css("cursor","")}).bind("mousedown.resizable",{target:this},function(o){var l=c(o);if(l==""){return}function n(p){var q=parseInt(g(o.data.target).css(p));if(isNaN(q)){return 0}else{return q}}var m={target:o.data.target,dir:l,startLeft:n("left"),startTop:n("top"),left:n("left"),top:n("top"),startX:o.pageX,startY:o.pageY,startWidth:g(o.data.target).outerWidth(),startHeight:g(o.data.target).outerHeight(),width:g(o.data.target).outerWidth(),height:g(o.data.target).outerHeight(),deltaWidth:g(o.data.target).outerWidth()-g(o.data.target).width(),deltaHeight:g(o.data.target).outerHeight()-g(o.data.target).height()};g(document).bind("mousedown.resizable",m,a);g(document).bind("mousemove.resizable",m,d);g(document).bind("mouseup.resizable",m,f);g("body").css("cursor",l+"-resize")})})};g.fn.resizable.methods={options:function(h){return g.data(h[0],"resizable").options},enable:function(h){return h.each(function(){g(this).resizable({disabled:false})})},disable:function(h){return h.each(function(){g(this).resizable({disabled:true})})}};g.fn.resizable.parseOptions=function(i){var h=g(i);return g.extend({},g.parser.parseOptions(i,["handles",{minWidth:"number",minHeight:"number",maxWidth:"number",maxHeight:"number",edge:"number"}]),{disabled:(h.attr("disabled")?true:undefined)})};g.fn.resizable.defaults={disabled:false,handles:"n, e, s, w, ne, se, sw, nw, all",minWidth:10,minHeight:10,maxWidth:10000,maxHeight:10000,edge:5,onStartResize:function(h){},onResize:function(h){},onStopResize:function(h){}};g.fn.resizable.isResizing=false})(jQuery);