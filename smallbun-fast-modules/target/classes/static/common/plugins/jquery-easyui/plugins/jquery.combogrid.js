(function(b){function d(p){var n=b.data(p,"combogrid");var l=n.options;var j=n.grid;b(p).addClass("combogrid-f").combo(b.extend({},l,{onShowPanel:function(){f(this,b(this).combogrid("getValues"),true);var v=b(this).combogrid("panel");var t=v.outerHeight()-v.height();var s=v._size("minHeight");var r=v._size("maxHeight");var u=b(this).combogrid("grid");u.datagrid("resize",{width:"100%",height:(isNaN(parseInt(l.panelHeight))?"auto":"100%"),minHeight:(s?s-t:""),maxHeight:(r?r-t:"")});var q=u.datagrid("getSelected");if(q){u.datagrid("scrollTo",u.datagrid("getRowIndex",q))}l.onShowPanel.call(this)}}));var o=b(p).combo("panel");if(!j){j=b("<table></table>").appendTo(o);n.grid=j}j.datagrid(b.extend({},l,{border:false,singleSelect:(!l.multiple),onLoadSuccess:m,onClickRow:k,onSelect:i("onSelect"),onUnselect:i("onUnselect"),onSelectAll:i("onSelectAll"),onUnselectAll:i("onUnselectAll")}));function h(q){return b(q).closest(".combo-panel").panel("options").comboTarget||p}function m(u){var t=h(this);var s=b(t).data("combogrid");var r=s.options;var q=b(t).combo("getValues");f(t,q,s.remainText);r.onLoadSuccess.call(this,u)}function k(t,u){var s=h(this);var r=b(s).data("combogrid");var q=r.options;r.remainText=false;g.call(this);if(!q.multiple){b(s).combo("hidePanel")}q.onClickRow.call(this,t,u)}function i(q){return function(t,u){var s=h(this);var r=b(s).combogrid("options");if(q=="onUnselectAll"){if(r.multiple){g.call(this)}}else{g.call(this)}r[q].call(this,t,u)}}function g(){var w=b(this);var u=h(w);var t=b(u).data("combogrid");var r=t.options;var v=b.map(w.datagrid("getSelections"),function(x){return x[r.idField]});v=v.concat(r.unselectedValues);var s=w.data("datagrid").dc.body2;var q=s.scrollTop();f(u,v,t.remainText);s.scrollTop(q)}}function e(n,g){var m=b.data(n,"combogrid");var l=m.options;var j=m.grid;var i=j.datagrid("getRows").length;if(!i){return}var k=l.finder.getTr(j[0],null,"highlight");if(!k.length){k=l.finder.getTr(j[0],null,"selected")}var h;if(!k.length){h=(g=="next"?0:i-1)}else{var h=parseInt(k.attr("datagrid-row-index"));h+=(g=="next"?1:-1);if(h<0){h=i-1}if(h>=i){h=0}}j.datagrid("highlightRow",h);if(l.selectOnNavigation){m.remainText=false;j.datagrid("selectRow",h)}}function f(n,g,x){var u=b.data(n,"combogrid");var t=u.options;var r=u.grid;var q=b(n).combo("getValues");var p=b(n).combo("options");var m=p.onChange;p.onChange=function(){};var l=r.datagrid("options");var k=l.onSelect;var i=l.onUnselectAll;l.onSelect=l.onUnselectAll=function(){};if(!b.isArray(g)){g=g.split(t.separator)}if(!t.multiple){g=g.length?[g[0]]:[""]}var o=b.map(g,function(s){return String(s)});o=b.grep(o,function(s,y){return y===b.inArray(s,o)});var h=b.grep(r.datagrid("getSelections"),function(y,s){return b.inArray(String(y[t.idField]),o)>=0});r.datagrid("clearSelections");r.data("datagrid").selectedRows=h;var w=[];t.unselectedValues=[];b.map(o,function(s){var y=r.datagrid("getRowIndex",s);if(y>=0){r.datagrid("selectRow",y)}else{t.unselectedValues.push(s)}w.push(j(s,r.datagrid("getRows"))||j(s,h)||j(s,t.mappingRows)||s)});b(n).combo("setValues",q);p.onChange=m;l.onSelect=k;l.onUnselectAll=i;if(!x){var v=w.join(t.separator);if(b(n).combo("getText")!=v){b(n).combo("setText",v)}}b(n).combo("setValues",g);function j(z,s){var y=b.easyui.getArrayItem(s,t.idField,z);return y?y[t.textField]:undefined}}function a(n,g){var m=b.data(n,"combogrid");var l=m.options;var k=m.grid;m.remainText=true;var o=l.multiple?g.split(l.separator):[g];o=b.grep(o,function(r){return b.trim(r)!=""});if(l.mode=="remote"){j(o);k.datagrid("load",b.extend({},l.queryParams,{q:g}))}else{k.datagrid("highlightRow",-1);var i=k.datagrid("getRows");var p=[];b.map(o,function(s){s=b.trim(s);var r=s;h(l.mappingRows,s);h(k.datagrid("getSelections"),s);var t=h(i,s);if(t>=0){if(l.reversed){k.datagrid("highlightRow",t)}}else{b.map(i,function(u,q){if(l.filter.call(n,s,u)){k.datagrid("highlightRow",q)}})}});j(p)}function h(u,s){for(var r=0;r<u.length;r++){var t=u[r];if((t[l.textField]||"").toLowerCase()==s.toLowerCase()){p.push(t[l.idField]);return r}}return -1}function j(q){if(!l.reversed){f(n,q,true)}}}function c(j){var g=b.data(j,"combogrid");var m=g.options;var l=g.grid;var i=m.finder.getTr(l[0],null,"highlight");g.remainText=false;if(i.length){var k=parseInt(i.attr("datagrid-row-index"));if(m.multiple){if(i.hasClass("datagrid-row-selected")){l.datagrid("unselectRow",k)}else{l.datagrid("selectRow",k)}}else{l.datagrid("selectRow",k)}}var h=[];b.map(l.datagrid("getSelections"),function(n){h.push(n[m.idField])});b.map(m.unselectedValues,function(n){if(b.easyui.indexOfArray(m.mappingRows,m.idField,n)>=0){b.easyui.addArrayItem(h,n)}});b(j).combogrid("setValues",h);if(!m.multiple){b(j).combogrid("hidePanel")}}b.fn.combogrid=function(i,g){if(typeof i=="string"){var h=b.fn.combogrid.methods[i];if(h){return h(this,g)}else{return this.combo(i,g)}}i=i||{};return this.each(function(){var j=b.data(this,"combogrid");if(j){b.extend(j.options,i)}else{j=b.data(this,"combogrid",{options:b.extend({},b.fn.combogrid.defaults,b.fn.combogrid.parseOptions(this),i)})}d(this)})};b.fn.combogrid.methods={options:function(h){var g=h.combo("options");return b.extend(b.data(h[0],"combogrid").options,{width:g.width,height:g.height,originalValue:g.originalValue,disabled:g.disabled,readonly:g.readonly})},cloneFrom:function(h,g){return h.each(function(){b(this).combo("cloneFrom",g);b.data(this,"combogrid",{options:b.extend(true,{cloned:true},b(g).combogrid("options")),combo:b(this).next(),panel:b(g).combo("panel"),grid:b(g).combogrid("grid")})})},grid:function(g){return b.data(g[0],"combogrid").grid},setValues:function(h,g){return h.each(function(){var i=b(this).combogrid("options");if(b.isArray(g)){g=b.map(g,function(j){if(j&&typeof j=="object"){b.easyui.addArrayItem(i.mappingRows,i.idField,j);return j[i.idField]}else{return j}})}f(this,g)})},setValue:function(h,g){return h.each(function(){b(this).combogrid("setValues",b.isArray(g)?g:[g])})},clear:function(g){return g.each(function(){b(this).combogrid("setValues",[])})},reset:function(g){return g.each(function(){var h=b(this).combogrid("options");if(h.multiple){b(this).combogrid("setValues",h.originalValue)}else{b(this).combogrid("setValue",h.originalValue)}})}};b.fn.combogrid.parseOptions=function(h){var g=b(h);return b.extend({},b.fn.combo.parseOptions(h),b.fn.datagrid.parseOptions(h),b.parser.parseOptions(h,["idField","textField","mode"]))};b.fn.combogrid.defaults=b.extend({},b.fn.combo.defaults,b.fn.datagrid.defaults,{loadMsg:null,idField:null,textField:null,unselectedValues:[],mappingRows:[],mode:"local",keyHandler:{up:function(g){e(this,"prev");g.preventDefault()},down:function(g){e(this,"next");g.preventDefault()},left:function(g){},right:function(g){},enter:function(g){c(this)},query:function(g,h){a(this,g)}},inputEvents:b.extend({},b.fn.combo.defaults.inputEvents,{blur:function(i){b.fn.combo.defaults.inputEvents.blur(i);var h=i.data.target;var g=b(h).combogrid("options");if(g.reversed){b(h).combogrid("setValues",b(h).combogrid("getValues"))}}}),panelEvents:{mousedown:function(g){}},filter:function(h,i){var g=b(this).combogrid("options");return(i[g.textField]||"").toLowerCase().indexOf(h.toLowerCase())>=0}})})(jQuery);