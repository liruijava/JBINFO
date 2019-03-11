layui.define("jquery",function(X){var T=layui.jquery,N={config:{},index:layui.colorpicker?layui.colorpicker.index+10000:0,set:function(a){var b=this;return b.config=T.extend({},b.config,a),b},on:function(b,a){return layui.onevent.call(this,"colorpicker",b,a)}},K=function(){var b=this,a=b.config;return{config:a}},G="colorpicker",O="layui-show",R="layui-colorpicker",Z=".layui-colorpicker-main",ab="layui-icon-down",I="layui-icon-close",W="layui-colorpicker-trigger-span",Y="layui-colorpicker-trigger-i",F="layui-colorpicker-side",M="layui-colorpicker-side-slider",V="layui-colorpicker-basis",E="layui-colorpicker-alpha-bgcolor",U="layui-colorpicker-alpha-slider",Q="layui-colorpicker-basis-cursor",aa="layui-colorpicker-main-input",S=function(d){var b={h:0,s:0,b:0},f=Math.min(d.r,d.g,d.b),c=Math.max(d.r,d.g,d.b),a=c-f;return b.b=c,b.s=0!=c?255*a/c:0,0!=b.s?d.r==c?b.h=(d.g-d.b)/a:d.g==c?b.h=2+(d.b-d.r)/a:b.h=4+(d.r-d.g)/a:b.h=-1,c==f&&(b.h=0),b.h*=60,b.h<0&&(b.h+=360),b.s*=100/255,b.b*=100/255,b},q=function(b){var b=b.indexOf("#")>-1?b.substring(1):b;if(3==b.length){var a=b.split("");b=a[0]+a[0]+a[1]+a[1]+a[2]+a[2]}b=parseInt(b,16);var c={r:b>>16,g:(65280&b)>>8,b:255&b};return S(c)},z=function(g){var d={},h=g.h,f=255*g.s/100,b=255*g.b/100;if(0==f){d.r=d.g=d.b=b}else{var m=b,a=(255-f)*b/255,k=(m-a)*(h%60)/60;360==h&&(h=0),h<60?(d.r=m,d.b=a,d.g=a+k):h<120?(d.g=m,d.b=a,d.r=m-k):h<180?(d.g=m,d.r=a,d.b=a+k):h<240?(d.b=m,d.r=a,d.g=m-k):h<300?(d.b=m,d.g=a,d.r=a+k):h<360?(d.r=m,d.g=a,d.b=m-k):(d.r=0,d.g=0,d.b=0)}return{r:Math.round(d.r),g:Math.round(d.g),b:Math.round(d.b)}},J=function(b){var c=z(b),a=[c.r.toString(16),c.g.toString(16),c.b.toString(16)];return T.each(a,function(f,d){1==d.length&&(a[f]="0"+d)}),a.join("")},j=function(b){var a=/[0-9]{1,3}/g,c=b.match(a)||[];return{r:c[0],g:c[1],b:c[2]}},L=T(window),A=T(document),H=function(b){var a=this;a.index=++N.index,a.config=T.extend({},a.config,N.config,b),a.render()};H.prototype.config={color:"",size:null,alpha:!1,format:"hex",predefine:!1,colors:["#009688","#5FB878","#1E9FFF","#FF5722","#FFB800","#01AAED","#999","#c00","#ff8c00","#ffd700","#90ee90","#00ced1","#1e90ff","#c71585","rgb(0, 186, 189)","rgb(255, 120, 0)","rgb(250, 212, 0)","#393D49","rgba(0,0,0,.5)","rgba(255, 69, 0, 0.68)","rgba(144, 240, 144, 0.5)","rgba(31, 147, 255, 0.73)"]},H.prototype.render=function(){var c=this,d=c.config,b=T(['<div class="layui-unselect layui-colorpicker">',"<span "+("rgb"==d.format&&d.alpha?'class="layui-colorpicker-trigger-bgcolor"':"")+">",'<span class="layui-colorpicker-trigger-span" ','lay-type="'+("rgb"==d.format?d.alpha?"rgba":"torgb":"")+'" ','style="'+function(){var f="";return d.color?(f=d.color,(d.color.match(/[0-9]{1,3}/g)||[]).length>3&&(d.alpha&&"rgb"==d.format||(f="#"+J(S(j(d.color))))),"background: "+f):f}()+'">','<i class="layui-icon layui-colorpicker-trigger-i '+(d.color?ab:I)+'"></i>',"</span>","</span>","</div>"].join("")),a=T(d.elem);d.size&&b.addClass("layui-colorpicker-"+d.size),a.addClass("layui-inline").html(c.elemColorBox=b),c.color=c.elemColorBox.find("."+W)[0].style.background,c.events()},H.prototype.renderPicker=function(){var c=this,d=c.config,b=c.elemColorBox[0],a=c.elemPicker=T(['<div id="layui-colorpicker'+c.index+'" data-index="'+c.index+'" class="layui-anim layui-anim-upbit layui-colorpicker-main">','<div class="layui-colorpicker-main-wrapper">','<div class="layui-colorpicker-basis">','<div class="layui-colorpicker-basis-white"></div>','<div class="layui-colorpicker-basis-black"></div>','<div class="layui-colorpicker-basis-cursor"></div>',"</div>",'<div class="layui-colorpicker-side">','<div class="layui-colorpicker-side-slider"></div>',"</div>","</div>",'<div class="layui-colorpicker-main-alpha '+(d.alpha?O:"")+'">','<div class="layui-colorpicker-alpha-bgcolor">','<div class="layui-colorpicker-alpha-slider"></div>',"</div>","</div>",function(){if(d.predefine){var f=['<div class="layui-colorpicker-main-pre">'];return layui.each(d.colors,function(e,g){f.push(['<div class="layui-colorpicker-pre'+((g.match(/[0-9]{1,3}/g)||[]).length>3?" layui-colorpicker-pre-isalpha":"")+'">','<div style="background:'+g+'"></div>',"</div>"].join(""))}),f.push("</div>"),f.join("")}return""}(),'<div class="layui-colorpicker-main-input">','<div class="layui-inline">','<input type="text" class="layui-input">',"</div>",'<div class="layui-btn-container">','<button class="layui-btn layui-btn-primary layui-btn-sm" colorpicker-events="clear">清空</button>','<button class="layui-btn layui-btn-sm" colorpicker-events="confirm">确定</button>',"</div","</div>","</div>"].join(""));c.elemColorBox.find("."+W)[0];T(Z)[0]&&T(Z).data("index")==c.index?c.removePicker(H.thisElemInd):(c.removePicker(H.thisElemInd),T("body").append(a)),H.thisElemInd=c.index,H.thisColor=b.style.background,c.position(),c.pickerEvents()},H.prototype.removePicker=function(a){var b=this;b.config;return T("#layui-colorpicker"+(a||b.index)).remove(),b},H.prototype.position=function(){var u=this,m=u.config,g=u.bindElem||u.elemColorBox[0],b=u.elemPicker[0],y=g.getBoundingClientRect(),h=b.offsetWidth,k=b.offsetHeight,w=function(a){return a=a?"scrollLeft":"scrollTop",document.body[a]|document.documentElement[a]},x=function(a){return document.documentElement[a?"clientWidth":"clientHeight"]},B=5,p=y.left,v=y.bottom;p-=(h-g.offsetWidth)/2,v+=B,p+h+B>x("width")?p=x("width")-h-B:p<B&&(p=B),v+k+B>x()&&(v=y.top>k?y.top-k:x()-k,v-=2*B),m.position&&(b.style.position=m.position),b.style.left=p+("fixed"===m.position?0:w(1))+"px",b.style.top=v+("fixed"===m.position?0:w())+"px"},H.prototype.val=function(){var k=this,h=(k.config,k.elemColorBox.find("."+W)),d=k.elemPicker.find("."+aa),b=h[0],s=b.style.backgroundColor;if(s){var f=S(j(s)),g=h.attr("lay-type");if(k.select(f.h,f.s,f.b),"torgb"===g&&d.find("input").val(s),"rgba"===g){var m=j(s);if(3==(s.match(/[0-9]{1,3}/g)||[]).length){d.find("input").val("rgba("+m.r+", "+m.g+", "+m.b+", 1)"),k.elemPicker.find("."+U).css("left",280)}else{d.find("input").val(s);var p=280*s.slice(s.lastIndexOf(",")+1,s.length-1);k.elemPicker.find("."+U).css("left",p)}k.elemPicker.find("."+E)[0].style.background="linear-gradient(to right, rgba("+m.r+", "+m.g+", "+m.b+", 0), rgb("+m.r+", "+m.g+", "+m.b+"))"}}else{k.select(0,100,100),d.find("input").val(""),k.elemPicker.find("."+E)[0].style.background="",k.elemPicker.find("."+U).css("left",280)}},H.prototype.side=function(){var ad=this,x=ad.config,v=ad.elemColorBox.find("."+W),p=v.attr("lay-type"),B=ad.elemPicker.find("."+F),P=ad.elemPicker.find("."+M),ae=ad.elemPicker.find("."+V),g=ad.elemPicker.find("."+Q),u=ad.elemPicker.find("."+E),i=ad.elemPicker.find("."+U),s=P[0].offsetTop/180*360,m=100-(g[0].offsetTop+3)/180*100,h=(g[0].offsetLeft+3)/260*100,b=Math.round(i[0].offsetLeft/280*100)/100,ac=ad.elemColorBox.find("."+Y),k=ad.elemPicker.find(".layui-colorpicker-pre").children("div"),f=function(o,y,e,w){ad.select(o,y,e);var r=z({h:o,s:y,b:e});if(ac.addClass(ab).removeClass(I),v[0].style.background="rgb("+r.r+", "+r.g+", "+r.b+")","torgb"===p&&ad.elemPicker.find("."+aa).find("input").val("rgb("+r.r+", "+r.g+", "+r.b+")"),"rgba"===p){var t=0;t=280*w,i.css("left",t),ad.elemPicker.find("."+aa).find("input").val("rgba("+r.r+", "+r.g+", "+r.b+", "+w+")"),v[0].style.background="rgba("+r.r+", "+r.g+", "+r.b+", "+w+")",u[0].style.background="linear-gradient(to right, rgba("+r.r+", "+r.g+", "+r.b+", 0), rgb("+r.r+", "+r.g+", "+r.b+"))"}x.change&&x.change(ad.elemPicker.find("."+aa).find("input").val())},d=T(['<div class="layui-auxiliar-moving" id="LAY-colorpicker-moving"></div'].join("")),a=function(c){T("#LAY-colorpicker-moving")[0]||T("body").append(d),d.on("mousemove",c),d.on("mouseup",function(){d.remove()}).on("mouseleave",function(){d.remove()})};P.on("mousedown",function(n){var c=this.offsetTop,t=n.clientY,l=function(C){var y=c+(C.clientY-t),w=B[0].offsetHeight;y<0&&(y=0),y>w&&(y=w);var o=y/180*360;s=o,f(o,h,m,b),C.preventDefault()};a(l),n.preventDefault()}),B.on("click",function(l){var n=l.clientY-T(this).offset().top;n<0&&(n=0),n>this.offsetHeight&&(n=this.offsetHeight);var c=n/180*360;s=c,f(c,h,m,b),l.preventDefault()}),g.on("mousedown",function(y){var l=this.offsetTop,C=this.offsetLeft,w=y.clientY,c=y.clientX,D=function(ag){var ai=l+(ag.clientY-w),r=C+(ag.clientX-c),o=ae[0].offsetHeight-3,t=ae[0].offsetWidth-3;ai<-3&&(ai=-3),ai>o&&(ai=o),r<-3&&(r=-3),r>t&&(r=t);var af=(r+3)/260*100,ah=100-(ai+3)/180*100;m=ah,h=af,f(s,af,ah,b),ag.preventDefault()};layui.stope(y),a(D),y.preventDefault()}),ae.on("mousedown",function(w){var y=w.clientY-T(this).offset().top-3+L.scrollTop(),l=w.clientX-T(this).offset().left-3+L.scrollLeft();y<-3&&(y=-3),y>this.offsetHeight-3&&(y=this.offsetHeight-3),l<-3&&(l=-3),l>this.offsetWidth-3&&(l=this.offsetWidth-3);var c=(l+3)/260*100,C=100-(y+3)/180*100;m=C,h=c,f(s,c,C,b),w.preventDefault(),g.trigger(w,"mousedown")}),i.on("mousedown",function(n){var c=this.offsetLeft,t=n.clientX,l=function(y){var w=c+(y.clientX-t),o=u[0].offsetWidth;w<0&&(w=0),w>o&&(w=o);var C=Math.round(w/280*100)/100;b=C,f(s,h,m,C),y.preventDefault()};a(l),n.preventDefault()}),u.on("click",function(l){var n=l.clientX-T(this).offset().left;n<0&&(n=0),n>this.offsetWidth&&(n=this.offsetWidth);var c=Math.round(n/280*100)/100;b=c,f(s,h,m,c),l.preventDefault()}),k.each(function(){T(this).on("click",function(){T(this).parent(".layui-colorpicker-pre").addClass("selected").siblings().removeClass("selected");var n,w=this.style.backgroundColor,l=S(j(w)),c=w.slice(w.lastIndexOf(",")+1,w.length-1);s=l.h,h=l.s,m=l.b,3==(w.match(/[0-9]{1,3}/g)||[]).length&&(c=1),b=c,n=280*c,f(l.h,l.s,l.b,c)})})},H.prototype.select=function(k,h,d,b){var u=this,f=(u.config,J({h:k,s:100,b:100})),g=J({h:k,s:h,b:d}),m=k/360*180,p=180-d/100*180-3,v=h/100*260-3;u.elemPicker.find("."+M).css("top",m),u.elemPicker.find("."+V)[0].style.background="#"+f,u.elemPicker.find("."+Q).css({top:p,left:v}),"change"!==b&&u.elemPicker.find("."+aa).find("input").val("#"+g)},H.prototype.pickerEvents=function(){var c=this,d=c.config,b=c.elemColorBox.find("."+W),a=c.elemPicker.find("."+aa+" input"),f={clear:function(e){b[0].style.background="",c.elemColorBox.find("."+Y).removeClass(ab).addClass(I),c.color="",d.done&&d.done(""),c.removePicker()},confirm:function(h,o){var e=a.val(),m=e,k={};if(e.indexOf(",")>-1){if(k=S(j(e)),c.select(k.h,k.s,k.b),b[0].style.background=m="#"+J(k),(e.match(/[0-9]{1,3}/g)||[]).length>3&&"rgba"===b.attr("lay-type")){var g=280*e.slice(e.lastIndexOf(",")+1,e.length-1);c.elemPicker.find("."+U).css("left",g),b[0].style.background=e,m=e}}else{k=q(e),b[0].style.background=m="#"+J(k),c.elemColorBox.find("."+Y).removeClass(I).addClass(ab)}return"change"===o?(c.select(k.h,k.s,k.b,o),void (d.change&&d.change(m))):(c.color=e,d.done&&d.done(e),void c.removePicker())}};c.elemPicker.on("click","*[colorpicker-events]",function(){var g=T(this),h=g.attr("colorpicker-events");f[h]&&f[h].call(this,g)}),a.on("keyup",function(g){var h=T(this);f.confirm.call(this,h,13===g.keyCode?null:"change")})},H.prototype.events=function(){var b=this,c=b.config,a=b.elemColorBox.find("."+W);b.elemColorBox.on("click",function(){b.renderPicker(),T(Z)[0]&&(b.val(),b.side())}),c.elem[0]&&!b.elemColorBox[0].eventHandler&&(A.on("click",function(e){if(!T(e.target).hasClass(R)&&!T(e.target).parents("."+R)[0]&&!T(e.target).hasClass(Z.replace(/\./g,""))&&!T(e.target).parents(Z)[0]&&b.elemPicker){if(b.color){var d=S(j(b.color));b.select(d.h,d.s,d.b)}else{b.elemColorBox.find("."+Y).removeClass(ab).addClass(I)}a[0].style.background=b.color||"",b.removePicker()}}),L.on("resize",function(){return !(!b.elemPicker||!T(Z)[0])&&void b.position()}),b.elemColorBox[0].eventHandler=!0)},N.render=function(b){var a=new H(b);return K.call(a)},X(G,N)});