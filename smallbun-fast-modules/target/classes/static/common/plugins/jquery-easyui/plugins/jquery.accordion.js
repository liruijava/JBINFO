(function(h){function o(A,z){var x=h.data(A,"accordion");var v=x.options;var u=x.panels;var q=h(A);var t=(v.halign=="left"||v.halign=="right");q.children(".panel-last").removeClass("panel-last");q.children(".panel:last").addClass("panel-last");if(z){h.extend(v,{width:z.width,height:z.height})}q._size(v);var s=0;var r="auto";var y=q.find(">.panel>.accordion-header");if(y.length){if(t){h(y[0]).next().panel("resize",{width:q.width(),height:q.height()});s=h(y[0])._outerWidth()}else{s=h(y[0]).css("height","")._outerHeight()}}if(!isNaN(parseInt(v.height))){if(t){r=q.width()-s*y.length}else{r=q.height()-s*y.length}}w(true,r-w(false));function w(D,C){var B=0;for(var E=0;E<u.length;E++){var G=u[E];if(t){var F=G.panel("header")._outerWidth(s)}else{var F=G.panel("header")._outerHeight(s)}if(G.panel("options").collapsible==D){var H=isNaN(C)?undefined:(C+s*F.length);if(t){G.panel("resize",{height:q.height(),width:(D?H:undefined)});B+=G.panel("panel")._outerWidth()-s*F.length}else{G.panel("resize",{width:q.width(),height:(D?H:undefined)});B+=G.panel("panel").outerHeight()-s*F.length}}}return B}}function j(x,w,u,s){var t=h.data(x,"accordion").panels;var q=[];for(var r=0;r<t.length;r++){var v=t[r];if(w){if(v.panel("options")[w]==u){q.push(v)}}else{if(v[0]==h(u)[0]){return r}}}if(w){return s?q:(q.length?q[0]:null)}else{return -1}}function f(q){return j(q,"collapsed",false,true)}function e(r){var q=f(r);return q.length?q[0]:null}function c(r,q){return j(r,null,q)}function g(s,r){var q=h.data(s,"accordion").panels;if(typeof r=="number"){if(r<0||r>=q.length){return null}else{return q[r]}}return j(s,"title",r)}function d(q){var s=h.data(q,"accordion").options;var r=h(q);if(s.border){r.removeClass("accordion-noborder")}else{r.addClass("accordion-noborder")}}function a(r){var q=h.data(r,"accordion");var s=h(r);s.addClass("accordion");q.panels=[];s.children("div").each(function(){var u=h.extend({},h.parser.parseOptions(this),{selected:(h(this).attr("selected")?true:undefined)});var t=h(this);q.panels.push(t);n(r,t,u)});s.bind("_resize",function(u,t){if(h(this).hasClass("easyui-fluid")||t){o(r)}return false})}function n(v,q,y){var x=h.data(v,"accordion").options;q.panel(h.extend({},{collapsible:true,minimizable:false,maximizable:false,closable:false,doSize:false,collapsed:true,headerCls:"accordion-header",bodyCls:"accordion-body",halign:x.halign},y,{onBeforeExpand:function(){if(y.onBeforeExpand){if(y.onBeforeExpand.call(this)==false){return false}}if(!x.multiple){var A=h.grep(f(v),function(B){return B.panel("options").collapsible});for(var t=0;t<A.length;t++){l(v,c(v,A[t]))}}var z=h(this).panel("header");z.addClass("accordion-header-selected");z.find(".accordion-collapse").removeClass("accordion-expand")},onExpand:function(){h(v).find(">.panel-last>.accordion-header").removeClass("accordion-header-border");if(y.onExpand){y.onExpand.call(this)}x.onSelect.call(v,h(this).panel("options").title,c(v,this))},onBeforeCollapse:function(){if(y.onBeforeCollapse){if(y.onBeforeCollapse.call(this)==false){return false}}h(v).find(">.panel-last>.accordion-header").addClass("accordion-header-border");var t=h(this).panel("header");t.removeClass("accordion-header-selected");t.find(".accordion-collapse").addClass("accordion-expand")},onCollapse:function(){if(isNaN(parseInt(x.height))){h(v).find(">.panel-last>.accordion-header").removeClass("accordion-header-border")}if(y.onCollapse){y.onCollapse.call(this)}x.onUnselect.call(v,h(this).panel("options").title,c(v,this))}}));var u=q.panel("header");var r=u.children("div.panel-tool");r.children("a.panel-tool-collapse").hide();var w=h('<a href="javascript:;"></a>').addClass("accordion-collapse accordion-expand").appendTo(r);w.bind("click",function(){s(q);return false});q.panel("options").collapsible?w.show():w.hide();if(x.halign=="left"||x.halign=="right"){w.hide()}u.click(function(){s(q);return false});function s(A){var z=A.panel("options");if(z.collapsible){var t=c(v,A);if(z.collapsed){m(v,t)}else{l(v,t)}}}}function m(t,s){var r=g(t,s);if(!r){return}i(t);var q=h.data(t,"accordion").options;r.panel("expand",q.animate)}function l(q,t){var s=g(q,t);if(!s){return}i(q);var r=h.data(q,"accordion").options;s.panel("collapse",r.animate)}function k(s){var r=h.data(s,"accordion").options;h(s).find(">.panel-last>.accordion-header").addClass("accordion-header-border");var t=j(s,"selected",true);if(t){q(c(s,t))}else{q(r.selected)}function q(v){var u=r.animate;r.animate=false;m(s,v);r.animate=u}}function i(r){var q=h.data(r,"accordion").panels;for(var s=0;s<q.length;s++){q[s].stop(true,true)}}function p(s,q){var v=h.data(s,"accordion");var u=v.options;var t=v.panels;if(q.selected==undefined){q.selected=true}i(s);var r=h("<div></div>").appendTo(s);t.push(r);n(s,r,q);o(s);u.onAdd.call(s,q.title,t.length-1);if(q.selected){m(s,t.length-1)}}function b(y,x){var w=h.data(y,"accordion");var v=w.options;var u=w.panels;i(y);var t=g(y,x);var s=t.panel("options").title;var r=c(y,t);if(!t){return}if(v.onBeforeRemove.call(y,s,r)==false){return}u.splice(r,1);t.panel("destroy");if(u.length){o(y);var q=e(y);if(!q){m(y,0)}}v.onRemove.call(y,s,r)}h.fn.accordion=function(r,q){if(typeof r=="string"){return h.fn.accordion.methods[r](this,q)}r=r||{};return this.each(function(){var s=h.data(this,"accordion");if(s){h.extend(s.options,r)}else{h.data(this,"accordion",{options:h.extend({},h.fn.accordion.defaults,h.fn.accordion.parseOptions(this),r),accordion:h(this).addClass("accordion"),panels:[]});a(this)}d(this);o(this);k(this)})};h.fn.accordion.methods={options:function(q){return h.data(q[0],"accordion").options},panels:function(q){return h.data(q[0],"accordion").panels},resize:function(r,q){return r.each(function(){o(this,q)})},getSelections:function(q){return f(q[0])},getSelected:function(q){return e(q[0])},getPanel:function(r,q){return g(r[0],q)},getPanelIndex:function(r,q){return c(r[0],q)},select:function(r,q){return r.each(function(){m(this,q)})},unselect:function(r,q){return r.each(function(){l(this,q)})},add:function(r,q){return r.each(function(){p(this,q)})},remove:function(r,q){return r.each(function(){b(this,q)})}};h.fn.accordion.parseOptions=function(r){var q=h(r);return h.extend({},h.parser.parseOptions(r,["width","height","halign",{fit:"boolean",border:"boolean",animate:"boolean",multiple:"boolean",selected:"number"}]))};h.fn.accordion.defaults={width:"auto",height:"auto",fit:false,border:true,animate:true,multiple:false,selected:0,halign:"top",onSelect:function(r,q){},onUnselect:function(r,q){},onAdd:function(r,q){},onBeforeRemove:function(r,q){},onRemove:function(r,q){}}})(jQuery);