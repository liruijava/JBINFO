layui.define("jquery",function(p){var k=layui.$,g=(layui.hint(),layui.device(),{config:{},set:function(a){var c=this;return c.config=k.extend({},c.config,a),c},on:function(c,a){return layui.onevent.call(this,y,c,a)}}),y="carousel",w="layui-this",j=">*[carousel-item]>*",f="layui-carousel-left",b="layui-carousel-right",q="layui-carousel-prev",z="layui-carousel-next",x="layui-carousel-arrow",v="layui-carousel-ind",h=function(c){var a=this;a.config=k.extend({},a.config,g.config,c),a.render()};h.prototype.config={width:"600px",height:"280px",full:!1,arrow:"hover",indicator:"inside",autoplay:!0,interval:3000,anim:"",trigger:"click",index:0},h.prototype.render=function(){var a=this,c=a.config;c.elem=k(c.elem),c.elem[0]&&(a.elemItem=c.elem.find(j),c.index<0&&(c.index=0),c.index>=a.elemItem.length&&(c.index=a.elemItem.length-1),c.interval<800&&(c.interval=800),c.full?c.elem.css({position:"fixed",width:"100%",height:"100%",zIndex:9999}):c.elem.css({width:c.width,height:c.height}),c.elem.attr("lay-anim",c.anim),a.elemItem.eq(c.index).addClass(w),a.elemItem.length<=1||(a.indicator(),a.arrow(),a.autoplay(),a.events()))},h.prototype.reload=function(a){var c=this;clearInterval(c.timer),c.config=k.extend({},c.config,a),c.render()},h.prototype.prevIndex=function(){var c=this,a=c.config,d=a.index-1;return d<0&&(d=c.elemItem.length-1),d},h.prototype.nextIndex=function(){var c=this,a=c.config,d=a.index+1;return d>=c.elemItem.length&&(d=0),d},h.prototype.addIndex=function(c){var a=this,d=a.config;c=c||1,d.index=d.index+c,d.index>=a.elemItem.length&&(d.index=0)},h.prototype.subIndex=function(c){var a=this,d=a.config;c=c||1,d.index=d.index-c,d.index<0&&(d.index=a.elemItem.length-1)},h.prototype.autoplay=function(){var c=this,a=c.config;a.autoplay&&(c.timer=setInterval(function(){c.slide()},a.interval))},h.prototype.arrow=function(){var c=this,d=c.config,a=k(['<button class="layui-icon '+x+'" lay-type="sub">'+("updown"===d.anim?"&#xe619;":"&#xe603;")+"</button>",'<button class="layui-icon '+x+'" lay-type="add">'+("updown"===d.anim?"&#xe61a;":"&#xe602;")+"</button>"].join(""));d.elem.attr("lay-arrow",d.arrow),d.elem.find("."+x)[0]&&d.elem.find("."+x).remove(),d.elem.append(a),a.on("click",function(){var i=k(this),e=i.attr("lay-type");c.slide(e)})},h.prototype.indicator=function(){var c=this,d=c.config,a=c.elemInd=k(['<div class="'+v+'"><ul>',function(){var e=[];return layui.each(c.elemItem,function(i){e.push("<li"+(d.index===i?' class="layui-this"':"")+"></li>")}),e.join("")}(),"</ul></div>"].join(""));d.elem.attr("lay-indicator",d.indicator),d.elem.find("."+v)[0]&&d.elem.find("."+v).remove(),d.elem.append(a),"updown"===d.anim&&a.css("margin-top",-(a.height()/2)),a.find("li").on("hover"===d.trigger?"mouseover":d.trigger,function(){var i=k(this),e=i.index();e>d.index?c.slide("add",e-d.index):e<d.index&&c.slide("sub",d.index-e)})},h.prototype.slide=function(s,r){var A=this,d=A.elemItem,o=A.config,t=o.index,a=o.elem.attr("lay-filter");A.haveSlide||("sub"===s?(A.subIndex(r),d.eq(o.index).addClass(q),setTimeout(function(){d.eq(t).addClass(b),d.eq(o.index).addClass(b)},50)):(A.addIndex(r),d.eq(o.index).addClass(z),setTimeout(function(){d.eq(t).addClass(f),d.eq(o.index).addClass(f)},50)),setTimeout(function(){d.removeClass(w+" "+q+" "+z+" "+f+" "+b),d.eq(o.index).addClass(w),A.haveSlide=!1},300),A.elemInd.find("li").eq(o.index).addClass(w).siblings().removeClass(w),A.haveSlide=!0,layui.event.call(this,y,"change("+a+")",{index:o.index,prevIndex:t,item:d.eq(o.index)}))},h.prototype.events=function(){var c=this,a=c.config;a.elem.data("haveEvents")||(a.elem.on("mouseenter",function(){clearInterval(c.timer)}).on("mouseleave",function(){c.autoplay()}),a.elem.data("haveEvents",!0))},g.render=function(c){var a=new h(c);return a},p(y,g)});