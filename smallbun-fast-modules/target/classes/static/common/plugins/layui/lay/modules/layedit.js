layui.define(["layer","form"],function(D){var R=layui.$,N=layui.layer,V=layui.form,L=(layui.hint(),layui.device()),J="layedit",I="layui-show",G="layui-disabled",T=function(){var a=this;a.index=0,a.config={tool:["strong","italic","underline","del","|","left","center","right","|","link","unlink","face","image"],hideTool:[],height:280}};T.prototype.set=function(b){var a=this;return R.extend(!0,a.config,b),a},T.prototype.on=function(a,b){return layui.onevent(J,a,b)},T.prototype.build=function(w,h){h=h||{};var s=this,e=s.config,b="layui-layedit",o=R("string"==typeof w?"#"+w:w),v="LAY_layedit_"+ ++s.index,l=o.next("."+b),p=R.extend({},e,h),k=function(){var a=[],c={};return layui.each(p.hideTool,function(f,d){c[d]=!0}),layui.each(p.tool,function(f,d){F[d]&&!c[d]&&a.push(F[d])}),a.join("")}(),g=R(['<div class="'+b+'">','<div class="layui-unselect layui-layedit-tool">'+k+"</div>",'<div class="layui-layedit-iframe">','<iframe id="'+v+'" name="'+v+'" textarea="'+w+'" frameborder="0"></iframe>',"</div>","</div>"].join(""));return L.ie&&L.ie<8?o.removeClass("layui-hide").addClass(I):(l[0]&&l.remove(),E.call(s,g,o[0],p),o.addClass("layui-hide").after(g),s.index)},T.prototype.getContent=function(a){var b=B(a);if(b[0]){return S(b[0].document.body.innerHTML)}},T.prototype.getText=function(b){var a=B(b);if(a[0]){return R(a[0].document.body).text()}},T.prototype.setContent=function(e,d,c){var b=B(e);b[0]&&(c?R(b[0].document.body).append(d):R(b[0].document.body).html(d),layedit.sync(e))},T.prototype.sync=function(d){var c=B(d);if(c[0]){var b=R("#"+c[1].attr("textarea"));b.val(S(c[0].document.body.innerHTML))}},T.prototype.getSelection=function(b){var c=B(b);if(c[0]){var a=K(c[0].document);return document.selection?a.text:a.toString()}};var E=function(e,d,c){var b=this,f=e.find("iframe");f.css({height:c.height}).on("load",function(){var i=f.contents(),h=f.prop("contentWindow"),k=i.find("head"),g=R(["<style>","*{margin: 0; padding: 0;}","body{padding: 10px; line-height: 20px; overflow-x: hidden; word-wrap: break-word; font: 14px Helvetica Neue,Helvetica,PingFang SC,Microsoft YaHei,Tahoma,Arial,sans-serif; -webkit-box-sizing: border-box !important; -moz-box-sizing: border-box !important; box-sizing: border-box !important;}","a{color:#01AAED; text-decoration:none;}a:hover{color:#c00}","p{margin-bottom: 10px;}","img{display: inline-block; border: none; vertical-align: middle;}","pre{margin: 10px 0; padding: 10px; line-height: 20px; border: 1px solid #ddd; border-left-width: 6px; background-color: #F2F2F2; color: #333; font-family: Courier New; font-size: 12px;}","</style>"].join("")),a=i.find("body");k.append(g),a.attr("contenteditable","true").css({"min-height":c.height}).html(d.value||""),j.apply(b,[h,f,d,c]),P.call(b,h,e,c)})},B=function(d){var c=R("#LAY_layedit_"+d),b=c.prop("contentWindow");return[b,c]},S=function(a){return 8==L.ie&&(a=a.replace(/<.+>/g,function(b){return b.toLowerCase()})),a},j=function(d,b,h,f){var e=d.document,g=R(e.body);g.on("keydown",function(k){var m=k.keyCode;if(13===m){var i=K(e),c=H(i),o=c.parentNode;if("pre"===o.tagName.toLowerCase()){if(k.shiftKey){return}return N.msg("请暂时用shift+enter"),!1}e.execCommand("formatBlock",!1,"<p>")}}),R(h).parents("form").on("submit",function(){var a=g.html();8==L.ie&&(a=a.replace(/<.+>/g,function(c){return c.toLowerCase()})),h.value=a}),g.on("paste",function(a){e.execCommand("formatBlock",!1,"<p>"),setTimeout(function(){Q.call(d,g),h.value=g.html()},100)})},Q=function(b){var a=this;a.document;b.find("*[style]").each(function(){var c=this.style.textAlign;this.removeAttribute("style"),R(this).css({"text-align":c||""})}),b.find("table").addClass("layui-table"),b.find("script,link").remove()},K=function(a){return a.selection?a.selection.createRange():a.getSelection().getRangeAt(0)},H=function(a){return a.endContainer||a.parentElement().childNodes[0]},A=function(e,d,c){var b=this.document,h=document.createElement(e);for(var g in d){h.setAttribute(g,d[g])}if(h.removeAttribute("text"),b.selection){var f=c.text||d.text;if("a"===e&&!f){return}f&&(h.innerHTML=f),c.pasteHTML(R(h).prop("outerHTML")),c.select()}else{var f=c.toString()||d.text;if("a"===e&&!f){return}f&&(h.innerHTML=f),c.deleteContents(),c.insertNode(h)}},O=function(e,d){var c=this.document,b="layedit-tool-active",g=H(K(c)),f=function(a){return e.find(".layedit-tool-"+a)};d&&d[d.hasClass(b)?"removeClass":"addClass"](b),e.find(">i").removeClass(b),f("unlink").addClass(G),R(g).parents().each(function(){var a=this.tagName.toLowerCase(),h=this.style.textAlign;"b"!==a&&"strong"!==a||f("b").addClass(b),"i"!==a&&"em"!==a||f("i").addClass(b),"u"===a&&f("u").addClass(b),"strike"===a&&f("d").addClass(b),"p"===a&&("center"===h?f("center").addClass(b):"right"===h?f("right").addClass(b):f("left").addClass(b)),"a"===a&&(f("link").addClass(b),f("unlink").removeClass(G))})},P=function(m,i,f){var e=m.document,b=R(e.body),h={link:function(n){var d=H(n),c=R(d).parent();U.call(b,{href:c.attr("href"),target:c.attr("target")},function(o){var l=c[0];"A"===l.tagName?l.href=o.url:A.call(m,"a",{target:o.target,href:o.url,text:o.url},n)})},unlink:function(a){e.execCommand("unlink")},face:function(a){q.call(this,function(c){A.call(m,"img",{src:c.src,alt:c.alt},a)})},image:function(c){var d=this;layui.use("upload",function(l){var a=f.uploadImage||{};l.render({url:a.url,method:a.type,elem:R(d).find("input")[0],done:function(n){0==n.code?(n.data=n.data||{},A.call(m,"img",{src:n.data.src,alt:n.data.title},c)):N.msg(n.msg||"上传失败")}})})},code:function(a){M.call(b,function(c){A.call(m,"pre",{text:c.code,"lay-lang":c.lang},a)})},help:function(){N.open({type:2,title:"帮助",area:["600px","380px"],shadeClose:!0,shade:0.1,skin:"layui-layer-msg",content:["http://www.layui.com/about/layedit/help.html","no"]})}},p=i.find(".layui-layedit-tool"),k=function(){var o=R(this),d=o.attr("layedit-event"),c=o.attr("lay-command");if(!o.hasClass(G)){b.focus();var n=K(e);n.commonAncestorContainer;c?(e.execCommand(c),/justifyLeft|justifyCenter|justifyRight/.test(c)&&e.execCommand("formatBlock",!1,"<p>"),setTimeout(function(){b.focus()},10)):h[d]&&h[d].call(this,n),O.call(m,p,o)}},g=/image/;p.find(">i").on("mousedown",function(){var c=R(this),a=c.attr("layedit-event");g.test(a)||k.call(this)}).on("click",function(){var c=R(this),a=c.attr("layedit-event");g.test(a)&&k.call(this)}),b.on("click",function(){O.call(m,p),N.close(q.index)})},U=function(b,c){var a=this,d=N.open({type:1,id:"LAY_layedit_link",area:"350px",shade:0.05,shadeClose:!0,moveType:1,title:"超链接",skin:"layui-layer-msg",content:['<ul class="layui-form" style="margin: 15px;">','<li class="layui-form-item">','<label class="layui-form-label" style="width: 60px;">URL</label>','<div class="layui-input-block" style="margin-left: 90px">','<input name="url" lay-verify="url" value="'+(b.href||"")+'" autofocus="true" autocomplete="off" class="layui-input">',"</div>","</li>",'<li class="layui-form-item">','<label class="layui-form-label" style="width: 60px;">打开方式</label>','<div class="layui-input-block" style="margin-left: 90px">','<input type="radio" name="target" value="_self" class="layui-input" title="当前窗口"'+("_self"!==b.target&&b.target?"":"checked")+">",'<input type="radio" name="target" value="_blank" class="layui-input" title="新窗口" '+("_blank"===b.target?"checked":"")+">","</div>","</li>",'<li class="layui-form-item" style="text-align: center;">','<button type="button" lay-submit lay-filter="layedit-link-yes" class="layui-btn"> 确定 </button>','<button style="margin-left: 20px;" type="button" class="layui-btn layui-btn-primary"> 取消 </button>',"</li>","</ul>"].join(""),success:function(e,g){var f="submit(layedit-link-yes)";V.render("radio"),e.find(".layui-btn-primary").on("click",function(){N.close(g),a.focus()}),V.on(f,function(h){N.close(U.index),c&&c(h.field)})}});U.index=d},q=function(c){var b=function(){var a=["[微笑]","[嘻嘻]","[哈哈]","[可爱]","[可怜]","[挖鼻]","[吃惊]","[害羞]","[挤眼]","[闭嘴]","[鄙视]","[爱你]","[泪]","[偷笑]","[亲亲]","[生病]","[太开心]","[白眼]","[右哼哼]","[左哼哼]","[嘘]","[衰]","[委屈]","[吐]","[哈欠]","[抱抱]","[怒]","[疑问]","[馋嘴]","[拜拜]","[思考]","[汗]","[困]","[睡]","[钱]","[失望]","[酷]","[色]","[哼]","[鼓掌]","[晕]","[悲伤]","[抓狂]","[黑线]","[阴险]","[怒骂]","[互粉]","[心]","[伤心]","[猪头]","[熊猫]","[兔子]","[ok]","[耶]","[good]","[NO]","[赞]","[来]","[弱]","[草泥马]","[神马]","[囧]","[浮云]","[给力]","[围观]","[威武]","[奥特曼]","[礼物]","[钟]","[话筒]","[蜡烛]","[蛋糕]"],d={};return layui.each(a,function(f,e){d[e]=layui.cache.dir+"images/face/"+f+".gif"}),d}();return q.hide=q.hide||function(a){"face"!==R(a.target).attr("layedit-event")&&N.close(q.index)},q.index=N.tips(function(){var a=[];return layui.each(b,function(f,d){a.push('<li title="'+f+'"><img src="'+d+'" alt="'+f+'"></li>')}),'<ul class="layui-clear">'+a.join("")+"</ul>"}(),this,{tips:1,time:0,skin:"layui-box layui-util-face",maxWidth:500,success:function(a,d){a.css({marginTop:-4,marginLeft:-10}).find(".layui-clear>li").on("click",function(){c&&c({src:b[this.title],alt:this.title}),N.close(d)}),R(document).off("click",q.hide).on("click",q.hide)}})},M=function(b){var c=this,a=N.open({type:1,id:"LAY_layedit_code",area:"550px",shade:0.05,shadeClose:!0,moveType:1,title:"插入代码",skin:"layui-layer-msg",content:['<ul class="layui-form layui-form-pane" style="margin: 15px;">','<li class="layui-form-item">','<label class="layui-form-label">请选择语言</label>','<div class="layui-input-block">','<select name="lang">','<option value="JavaScript">JavaScript</option>','<option value="HTML">HTML</option>','<option value="CSS">CSS</option>','<option value="Java">Java</option>','<option value="PHP">PHP</option>','<option value="C#">C#</option>','<option value="Python">Python</option>','<option value="Ruby">Ruby</option>','<option value="Go">Go</option>',"</select>","</div>","</li>",'<li class="layui-form-item layui-form-text">','<label class="layui-form-label">代码</label>','<div class="layui-input-block">','<textarea name="code" lay-verify="required" autofocus="true" class="layui-textarea" style="height: 200px;"></textarea>',"</div>","</li>",'<li class="layui-form-item" style="text-align: center;">','<button type="button" lay-submit lay-filter="layedit-code-yes" class="layui-btn"> 确定 </button>','<button style="margin-left: 20px;" type="button" class="layui-btn layui-btn-primary"> 取消 </button>',"</li>","</ul>"].join(""),success:function(d,f){var e="submit(layedit-code-yes)";V.render("select"),d.find(".layui-btn-primary").on("click",function(){N.close(f),c.focus()}),V.on(e,function(g){N.close(M.index),b&&b(g.field)})}});M.index=a},F={html:'<i class="layui-icon layedit-tool-html" title="HTML源代码" lay-command="html" layedit-event="html"">&#xe64b;</i><span class="layedit-tool-mid"></span>',strong:'<i class="layui-icon layedit-tool-b" title="加粗" lay-command="Bold" layedit-event="b"">&#xe62b;</i>',italic:'<i class="layui-icon layedit-tool-i" title="斜体" lay-command="italic" layedit-event="i"">&#xe644;</i>',underline:'<i class="layui-icon layedit-tool-u" title="下划线" lay-command="underline" layedit-event="u"">&#xe646;</i>',del:'<i class="layui-icon layedit-tool-d" title="删除线" lay-command="strikeThrough" layedit-event="d"">&#xe64f;</i>',"|":'<span class="layedit-tool-mid"></span>',left:'<i class="layui-icon layedit-tool-left" title="左对齐" lay-command="justifyLeft" layedit-event="left"">&#xe649;</i>',center:'<i class="layui-icon layedit-tool-center" title="居中对齐" lay-command="justifyCenter" layedit-event="center"">&#xe647;</i>',right:'<i class="layui-icon layedit-tool-right" title="右对齐" lay-command="justifyRight" layedit-event="right"">&#xe648;</i>',link:'<i class="layui-icon layedit-tool-link" title="插入链接" layedit-event="link"">&#xe64c;</i>',unlink:'<i class="layui-icon layedit-tool-unlink layui-disabled" title="清除链接" lay-command="unlink" layedit-event="unlink"">&#xe64d;</i>',face:'<i class="layui-icon layedit-tool-face" title="表情" layedit-event="face"">&#xe650;</i>',image:'<i class="layui-icon layedit-tool-image" title="图片" layedit-event="image">&#xe64a;<input type="file" name="file"></i>',code:'<i class="layui-icon layedit-tool-code" title="插入代码" layedit-event="code">&#xe64e;</i>',help:'<i class="layui-icon layedit-tool-help" title="帮助" layedit-event="help">&#xe607;</i>'},z=new T;D(J,z)});