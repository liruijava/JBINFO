layui.define("jquery",function(b){var c=layui.$,a={fixbar:function(v){var j,p,f="layui-fixbar",d="layui-fixbar-top",e=c(document),h=c("body");v=c.extend({showHeight:200},v),v.bar1=v.bar1===!0?"&#xe606;":v.bar1,v.bar2=v.bar2===!0?"&#xe607;":v.bar2,v.bgcolor=v.bgcolor?"background-color:"+v.bgcolor:"";var m=[v.bar1,v.bar2,"&#xe604;"],k=c(['<ul class="'+f+'">',v.bar1?'<li class="layui-icon" lay-type="bar1" style="'+v.bgcolor+'">'+m[0]+"</li>":"",v.bar2?'<li class="layui-icon" lay-type="bar2" style="'+v.bgcolor+'">'+m[1]+"</li>":"",'<li class="layui-icon '+d+'" lay-type="top" style="'+v.bgcolor+'">'+m[2]+"</li>","</ul>"].join("")),w=k.find("."+d),q=function(){var g=e.scrollTop();g>=v.showHeight?j||(w.show(),j=1):j&&(w.hide(),j=0)};c("."+f)[0]||("object"==typeof v.css&&k.css(v.css),h.append(k),q(),k.find("li").on("click",function(){var l=c(this),g=l.attr("lay-type");"top"===g&&c("html,body").animate({scrollTop:0},200),v.click&&v.click.call(this,g)}),e.on("scroll",function(){clearTimeout(p),p=setTimeout(function(){q()},100)}))},countdown:function(u,p,k){var s=this,h="function"==typeof p,d=new Date(u).getTime(),f=new Date(!p||h?(new Date).getTime():p).getTime(),j=d-f,q=[Math.floor(j/86400000),Math.floor(j/3600000)%24,Math.floor(j/60000)%60,Math.floor(j/1000)%60];h&&(k=p);var m=setTimeout(function(){s.countdown(u,f+1000,k)},1000);return k&&k(j>0?q:[0,0,0,0],p,m),j<=0&&clearTimeout(m),m},timeAgo:function(g,h){var f=this,d=[[],[]],j=(new Date).getTime()-new Date(g).getTime();return j>691200000?(j=new Date(g),d[0][0]=f.digit(j.getFullYear(),4),d[0][1]=f.digit(j.getMonth()+1),d[0][2]=f.digit(j.getDate()),h||(d[1][0]=f.digit(j.getHours()),d[1][1]=f.digit(j.getMinutes()),d[1][2]=f.digit(j.getSeconds())),d[0].join("-")+" "+d[1].join(":")):j>=86400000?(j/1000/60/60/24|0)+"天前":j>=3600000?(j/1000/60/60|0)+"小时前":j>=120000?(j/1000/60|0)+"分钟前":j<0?"未来":"刚刚"},digit:function(g,h){var f="";g=String(g),h=h||2;for(var d=g.length;d<h;d++){f+="0"}return g<Math.pow(10,h)?f+(0|g):g},toDateString:function(g,j){var f=this,d=new Date(g||new Date),k=[f.digit(d.getFullYear(),4),f.digit(d.getMonth()+1),f.digit(d.getDate())],h=[f.digit(d.getHours()),f.digit(d.getMinutes()),f.digit(d.getSeconds())];return j=j||"yyyy-MM-dd HH:mm:ss",j.replace(/yyyy/g,k[0]).replace(/MM/g,k[1]).replace(/dd/g,k[2]).replace(/HH/g,h[0]).replace(/mm/g,h[1]).replace(/ss/g,h[2])},escape:function(d){return String(d||"").replace(/&(?!#?[a-zA-Z0-9]+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/'/g,"&#39;").replace(/"/g,"&quot;")}};!function(x,p,k){function v(){h=p[j](function(){d.each(function(){var o=x(this),l=o.width(),g=o.height(),r=x.data(this,m);(l!==r.w||g!==r.h)&&o.trigger(q,[r.w=l,r.h=g])}),v()},f[y])}var h,d=x([]),f=x.resize=x.extend(x.resize,{}),j="setTimeout",q="resize",m=q+"-special-event",y="delay",w="throttleWindow";f[y]=250,f[w]=!0,x.event.special[q]={setup:function(){if(!f[w]&&this[j]){return !1}var g=x(this);d=d.add(g),x.data(this,m,{w:g.width(),h:g.height()}),1===d.length&&v()},teardown:function(){if(!f[w]&&this[j]){return !1}var g=x(this);d=d.not(g),g.removeData(m),d.length||clearTimeout(h)},add:function(i){function g(u,s,t){var z=x(this),n=x.data(this,m)||{};n.w=s!==k?s:z.width(),n.h=t!==k?t:z.height(),l.apply(this,arguments)}if(!f[w]&&this[j]){return !1}var l;return x.isFunction(i)?(l=i,g):(l=i.handler,void (i.handler=g))}}}(c,window),b("util",a)});