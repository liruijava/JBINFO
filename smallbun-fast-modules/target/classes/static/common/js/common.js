(function(b){var a=b(".table");b.extend({table:{_option:{},_params:{},init:function(c){b.table._option=c;b.table._params=b.common.isEmpty(c.queryParams)?b.table.queryParams:c.queryParams;var d=b.common.isEmpty(c.sortOrder)?"asc":c.sortOrder;var e=b.common.isEmpty(c.sortName)?"":c.sortName;a.bootstrapTable({width:"auto",height:"auto",url:c.url,contentType:"application/x-www-form-urlencoded",method:"post",cache:false,sortable:true,sortStable:true,sortName:e,sortOrder:d,pagination:b.common.visible(c.pagination),clickToSelect:true,pageNumber:1,pageSize:20,pageList:[20,30,40],iconSize:"sm",sidePagination:b.common.isNotEmpty(c.sidePagination)?c.pagination:"server",paginationLoop:false,cardView:true,toolbar:"#toolbar",search:b.common.visible(c.search),showRefresh:b.common.visible(c.showRefresh),showColumns:b.common.visible(c.showColumns),showToggle:b.common.visible(c.showToggle),showExport:b.common.visible(c.showExport),queryParams:b.table._params,columns:c.columns,responseHandler:b.table.responseHandler})},queryParams:function(c){return{size:c.limit,current:c.offset/c.limit+1,searchValue:c.search,orderByColumn:c.sort,isAsc:c.order}},responseHandler:function(c){if(c.status==="200"){if(b.common.isNotEmpty(b.table._option.sidePagination)&&b.table._option.sidePagination==="client"){return{rows:c.result}}else{return{rows:c.page.records,total:c.page.total}}}else{b.modal.alert(c.status+":"+c.msg,modal_status.FAIL);return{rows:[],total:0}}},search:function(e){var c=b.common.isEmpty(e)?b("form").attr("id"):e;var d={};b.each(b("#"+c).serializeArray(),function(f,g){d[g.name]=g.value});a.bootstrapTable("refresh",{query:d})},exportExcel:function(d){var c=b.common.isEmpty(d)?b("form").attr("id"):d;b.modal.loading("正在导出数据，请稍后...");b.post(b.table._option.exportUrl,b("#"+c).serializeArray(),function(e){if(e.status===web_status.SUCCESS){window.location.href=contextPath+"fast/download?fileName="+e.msg+"&delete="+true}b.modal.loading()})},importExcel:function(d){var c=b.common.isEmpty(d)?b("form").attr("id"):d;b.modal.loading("正在导出数据，请稍后...");b.post(b.table._option.exportUrl,b("#"+c).serializeArray(),function(e){if(e.status===web_status.SUCCESS){window.location.href=contextPath+"fast/download?fileName="+e.msg+"&delete="+true}b.modal.loading()})},refresh:function(){a.bootstrapTable("refresh",{url:b.table._option.url,silent:true})},selectColumns:function(c){return b.map(a.bootstrapTable("getSelections"),function(d){return d[c]})},selectFirstColumns:function(){return b.map(a.bootstrapTable("getSelections"),function(c){return c[b.table._option.columns[1].field]})},selectDictLabel:function(d,c){var e=[];b.each(d,function(f,g){if(g.dictValue===c){e.push("<span class='badge badge-"+g.listClass+"'>"+g.dictLabel+"</span>");return false}});return e.join("")},view:function(c,e){var d=[];d.push('<a  href="#" onclick="$.operate.view(\''+e.id+"','')\">"+c+"</a> ");return d.join("")},emptyProcessing:function(d,e,c){if(b.common.isEmpty(d)){return"-"}return d}},treeTable:{_option:{},_treeTable:{},init:function(c){b.table._option=c;b.treeTable._treeTable=a.bootstrapTable({url:c.url,method:"post",singleSelect:true,striped:true,clickToSelect:true,toolbarAlign:"left",buttonsAlign:"right",width:"auto",height:"760",sidePagination:"server",toolbar:"#toolbar",showRefresh:b.common.visible(c.showRefresh),showColumns:b.common.visible(c.showColumns),showToggle:b.common.visible(c.showToggle),iconSize:"sm",idField:c.idField,rootParentId:c.rootParentId,parentIdField:c.parentIdField,columns:c.columns,treeShowField:c.treeShowField,responseHandler:b.treeTable.responseHandler,onLoadSuccess:function(d){a.treegrid({initialState:c.initialState,treeColumn:1,expanderExpandedClass:"treegrid-expander glyphicon glyphicon-chevron-down",expanderCollapsedClass:"treegrid-expander glyphicon glyphicon-chevron-right",onChange:function(){a.bootstrapTable("resetWidth")}})}})},search:function(e){var c=b.common.isEmpty(e)?b("form").attr("id"):e;var d={};b.each(b("#"+c).serializeArray(),function(f,g){d[g.name]=g.value});b.treeTable._treeTable.bootstrapTable("refresh",d)},responseHandler:function(c){if(c.status!==web_status.SUCCESS){b.modal.alert(c.status+":"+c.msg,modal_status.FAIL);return[]}else{return c.result}},refresh:function(){b.treeTable._treeTable.bootstrapTable("refresh")},expandAll:function(){a.removeClass("treegrid-collapsed");a.treegrid("expandAll");a.addClass("treegrid-expanded")},collapseAll:function(){a.removeClass("treegrid-expanded");a.treegrid("collapseAll");a.addClass("treegrid-collapsed")},expandOrCollapse:function(){a.addClass("treegrid-collapsed");if(a.treegrid("isExpanded")){b.treeTable.collapseAll();return}if(a.treegrid("isCollapsed")){b.treeTable.expandAll()}}},form:{reset:function(d){var c=b.common.isEmpty(d)?b("form").attr("id"):d;b("#"+c)[0].reset();b.table.refresh()},selectCheckeds:function(d){var c="";b('input:checkbox[name="'+d+'"]:checked').each(function(e){if("0"===e){c=b(this).val()}else{c+=(","+b(this).val())}});c=c.substring(1,c.length);return c},selectSelects:function(c){var d="";b("#"+c+" option:selected").each(function(e){if("0"===e){d=b(this).val()}else{d+=(","+b(this).val())}});return d}},modal:{icon:function(d){var c="";if(d===modal_status.WARNING){c=0}else{if(d===modal_status.SUCCESS){c=1}else{if(d===modal_status.FAIL){c=2}else{c=3}}}return c},msg:function(d,c){if(c!==undefined){layer.msg(d,{icon:b.modal.icon(c),time:1000,shift:5})}else{layer.msg(d)}},msgError:function(c){b.modal.msg(c,modal_status.FAIL)},msgSuccess:function(c){b.modal.msg(c,modal_status.SUCCESS)},msgWarning:function(c){b.modal.msg(c,modal_status.WARNING)},alert:function(d,c){layer.alert(d,{icon:b.modal.icon(c),title:"系统提示",btn:["确认"],btnclass:["btn btn-primary"],})},msgReload:function(d,c){layer.msg(d,{icon:b.modal.icon(c),time:500,shade:[0.1,"#8F8F8F"]},function(){b.modal.reload()})},alertError:function(c){b.modal.alert(c,modal_status.FAIL)},alertSuccess:function(c){b.modal.alert(c,modal_status.SUCCESS)},alertWarning:function(c){b.modal.alert(c,modal_status.WARNING)},close:function(){var c=parent.layer.getFrameIndex(window.name);parent.layer.close(c)},confirm:function(c,d){layer.confirm(c,{icon:3,title:"系统提示",btn:["确认","取消"],btnclass:["btn btn-primary","btn btn-danger"],},function(e){layer.close(e);d(true)})},open:function(f,d,e,c,g){if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){e="auto";c="auto"}if(b.common.isEmpty(f)){f=false}if(b.common.isEmpty(d)){d="404.html"}if(b.common.isEmpty(e)){e=1000}if(b.common.isEmpty(c)){c=(b(window).height()-45)}if(b.common.isEmpty(g)){g=function(j,i){var h=top.layer.getChildFrame("body",j);var k=i.find("iframe")[0];k.contentWindow.doSubmit()}}alert(d);layer.open({type:2,area:[e+"px",c+"px"],fix:false,maxmin:true,shade:0.3,title:f,content:d,btn:["确定","关闭"],yes:g,cancel:function(h){}})},view:function(f,d,e,c){if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){e="auto";c="auto"}if(b.common.isEmpty(f)){f=false}if(b.common.isEmpty(d)){d="404.html"}if(b.common.isEmpty(e)){e=1000}if(b.common.isEmpty(c)){c=(b(window).height()-50)}layer.open({type:2,area:[e+"px",c+"px"],fix:false,maxmin:true,shade:0.3,title:f,content:d,btn:["关闭"],cancel:function(g){}})},openFull:function(g,e,f,c){if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){f="auto";c="auto"}if(b.common.isEmpty(g)){g=false}if(b.common.isEmpty(e)){e="404.html"}if(b.common.isEmpty(f)){f=800}if(b.common.isEmpty(c)){c=(b(window).height()-50)}var d=layer.open({type:2,area:[f+"px",c+"px"],fix:false,maxmin:true,shade:0.3,title:g,content:e});layer.full(d)},loading:function(c){App.blockUI({boxed:true,message:c,animate:false})},closeLoading:function(){setTimeout(function(){App.unblockUI()},50)},reload:function(){parent.location.reload()},saveSuccess:function(c){if(c.status===web_status.SUCCESS){b.modal.loading("保存成功,正在刷新数据请稍后……");b.modal.reload()}b.modal.closeLoading()},openTab:function(e,d,c){addTab({id:e,title:d,close:true,url:c,list_id:b.common.isNotEmpty(window.frameElement)?window.frameElement.getAttribute("id").substring(7,window.frameElement.getAttribute("id").length):null})}},select:{selectUser:function(c,e){if(c.tagName=="SPAN"){c=b(c).prev()}if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){width="auto";height="auto"}if(b.common.isEmpty(e)){e=function(i,h){var g=top.layer.getChildFrame("body",i);var j=h.find("iframe")[0];var f=j.contentWindow.selectUsers();b(c).val(f.get("userName"));b(b(c).attr("idObj")).val(f.get("userId"));layer.close(i)}}var d=layer.open({type:2,area:[500+"px",500+"px"],fix:false,maxmin:true,shade:0.3,title:"选择用户",content:contextPath+"user/selectUser",btn:["确定","关闭"],yes:e,cancel:function(f){}});layer.full(d)}},operate:{submit:function(e,f,c,g){b.modal.loading("正在处理中，请稍后...");var d={url:e,type:f,dataType:c,data:g,success:function(h){b.operate.ajaxSuccess(h)}};b.ajax(d)},post:function(c,d){b.operate.submit(c,"post","json",d)},remove:function(c){b.modal.confirm("确定删除该条"+b.table._option.modalName+"信息吗？",function(){var d=b.table._option.removeUrl;var e={id:c};b.operate.submit(d,"post","json",e)})},batRemove:function(){var c=b.common.isEmpty(b.table._option.id)?b.table.selectFirstColumns():b.table.selectColumns(b.table._option.id);if(c.length===0){b.modal.alertWarning("请至少选择一条记录");return}b.modal.confirm("确认要删除选中的"+c.length+"条数据吗?",function(){var d=b.table._option.batRemoveUrl;var e={ids:c.join()};b.operate.submit(d,"post","json",e)})},add:function(d){var c=b.common.isEmpty(d)?b.table._option.createUrl.replace("{id}",""):b.table._option.createUrl.replace("{id}",d);b.modal.open("添加"+b.table._option.modalName,c)},addTab:function(e){var c="_tab"+Math.random().toString(36).substring(2);var d=b.common.isEmpty(e)?b.table._option.createUrl.replace("{id}",""):b.table._option.createUrl.replace("{id}","?id="+e);b.modal.openTab(c,"添加"+b.table._option.modalName,d)},viewTab:function(e){var c="_tab"+Math.random().toString(36).substring(2);var d=b.common.isEmpty(e)?b.table._option.updateUrl.replace("{id}",""):b.table._option.updateUrl.replace("{id}","?id="+e);b.modal.openTab(c,"查看"+b.table._option.modalName,d)},editTab:function(e){var c="_tab"+Math.random().toString(36).substring(2);var d="/404.html";if(b.common.isNotEmpty(e)){d=b.table._option.updateUrl.replace("{id}","?id="+e)}else{e=b.common.isEmpty(b.table._option.uniqueId)?b.table.selectFirstColumns():b.table.selectColumns(b.table._option.uniqueId);if(e.length===0){b.modal.alertWarning("请至少选择一条记录");return}else{if(e.length>1){b.modal.alertWarning("只能选择一条数据");return}else{d=b.table._option.updateUrl.replace("{id}","?id="+e)}}}b.modal.openTab(c,"修改"+b.table._option.modalName,d)},edit:function(d){var c="/404.html";if(b.common.isNotEmpty(d)){c=b.table._option.updateUrl.replace("{id}","?id="+d)}else{d=b.common.isEmpty(b.table._option.uniqueId)?b.table.selectFirstColumns():b.table.selectColumns(b.table._option.uniqueId);if(d.length===0){b.modal.alertWarning("请至少选择一条记录");return}else{if(d.length>1){b.modal.alertWarning("只能选择一条数据");return}else{c=b.table._option.updateUrl.replace("{id}","?id="+d)}}}b.modal.open("修改"+b.table._option.modalName,c)},view:function(d,c){if(b.common.isNotEmpty(d)){if(b.common.isEmpty(c)){c=b.table._option.updateUrl.replace("{id}","?id="+d)}else{c=c+"?id="+d}}else{d=b.common.isEmpty(b.table._option.uniqueId)?b.table.selectFirstColumns():b.table.selectColumns(b.table._option.uniqueId);if(d.length===0){b.modal.alertWarning("请至少选择一条记录");return}else{if(d.length>1){b.modal.alertWarning("只能选择一条数据");return}else{if(b.common.isEmpty(c)){c=b.table._option.updateUrl.replace("{id}","?id="+d)}else{c=c+"?id="+d}}}}b.modal.view("查看"+b.table._option.modalName,c)},tabView:function(e,d){if(b.common.isNotEmpty(e)){if(b.common.isEmpty(d)){d=b.table._option.updateUrl.replace("{id}","?id="+e)}else{d=d+"?id="+e}}else{e=b.common.isEmpty(b.table._option.uniqueId)?b.table.selectFirstColumns():b.table.selectColumns(b.table._option.uniqueId);if(e.length===0){b.modal.alertWarning("请至少选择一条记录");return}else{if(e.length>1){b.modal.alertWarning("只能选择一条数据");return}else{if(b.common.isEmpty(d)){d=b.table._option.updateUrl.replace("{id}","?id="+e)}else{d=d+"?id="+e}}}}var c="_tab"+Math.random().toString(36).substring(2);b.modal.openTab(c,"查看"+b.table._option.modalName,d)},addFull:function(d){var c=b.common.isEmpty(d)?b.table._option.createUrl:b.table._option.createUrl.replace("{id}",d);b.modal.openFull("添加"+b.table._option.modalName,c)},editFull:function(d){var c=b.table._option.updateUrl.replace("{id}",d);b.modal.openFull("修改"+b.table._option.modalName,c)},saveCurrentTabPage:function(d,e){b.modal.loading("正在处理中，请稍后...");var c={url:d,type:"post",dataType:"json",data:e,success:function(f){if(f.status===web_status.SUCCESS){b.modal.msgSuccess(f.msg);parent.saveCurrentTabPage(window)}b.modal.closeLoading()}};b.ajax(c)},save:function(d,e){b.modal.loading("正在处理中，请稍后...");var c={url:d,type:"post",dataType:"json",data:e,success:function(f){b.modal.saveSuccess(f)}};b.ajax(c)},ajaxSuccess:function(c){if(c.status===web_status.SUCCESS){b.modal.msgSuccess(c.msg);b.table.refresh()}b.modal.closeLoading()}},common:{parseParam:function(e,c){var d="";if(e instanceof String||e instanceof Number||e instanceof Boolean){d+="&"+c+"="+encodeURIComponent(e)}else{b.each(e,function(g){var f=c==null?g:c+(e instanceof Array?"["+g+"]":"."+g);d+="&"+b.common.parseParam(this,f)})}return d.substr(1)},isNotEmpty:function(c){return !b.common.isEmpty(c)},isEmpty:function(c){return c==null||this.trim(c)===""},visible:function(c){return !!(b.common.isEmpty(c)||c===true)},trim:function(c){if(c==null){return""}return c.toString().replace(/(^\s*)|(\s*$)|\r|\n/g,"")},random:function(d,c){return Math.floor((Math.random()*c)+d)}},comboGrid:{init:function(g){b(g.comboGridId).combogrid({panelHeight:b.comboGrid.fixHeight(0.4),idField:g.idField,textField:g.textField,url:g.url,delay:b.common.isEmpty(g.delay)?500:g.delay,pageSize:b.common.isEmpty(g.pageSize)?10:g.pageSize,pageList:b.common.isEmpty(g.pageList)?10:[10,15,20,25,30],fitColumns:true,striped:true,editable:b.common.isEmpty(g.editable)?false:true,pagination:true,rownumbers:false,collapsible:false,fit:true,method:g.method,columns:g.columns,keyHandler:{up:function(){},down:function(){},enter:function(){},query:function(i){h(i);b(g.comboGridId).combogrid("setValue",i);b("#easyui-combogrid-id").val(i);b(g.valueId).val("")}},loader:c,onSelect:function(){var i=b(g.comboGridId).combogrid("grid").datagrid("getSelected");b("#easyui-combogrid-id").val(i[""+g.idField+""]);b(g.valueId).val(i.id);b(g.valueId+"-error").remove();b(".input-group.panel-noscroll.has-error").removeClass("has-error")}});var e=b(g.comboGridId).combogrid("grid").datagrid("getPager");if(e){b(e).pagination({pageSize:g.pageSize,pageList:g.pageList,beforePageText:"第",afterPageText:"页    共 {pages} 页",displayMsg:"共 {total} 条记录",onSelectPage:function(j,i){d(j,i);b(g.comboGridId).combogrid("grid").datagrid("options").pageSize=i;b(g.comboGridId).combogrid("setValue",b("#easyui-combogrid-id").val())},onChangePageSize:function(){},onRefresh:function(j,i){d(j,i);b(g.comboGridId).combogrid("setValue",b("#easyui-combogrid-id").val())}})}var d=function(j,i){b.ajax({type:g.method,url:g.url,data:{current:j,size:i},success:function(k){b(g.comboGridId).combogrid("grid").datagrid("loadData",f(k))}})};var h=function(j){var i={};i[""+g.textField+""]=j;b.ajax({type:g.method,url:g.url,data:i,dataType:"json",success:function(k){b(g.comboGridId).combogrid("grid").datagrid("loadData",f(k))}})};function c(p,o,k){var m=b(this);var l=m.datagrid("options");if(!l.url){return false}var j=m.data().datagrid.cache;var n={current:l.pageNumber,size:l.pageSize};if(!j){b.ajax({type:l.method,url:l.url,data:n,dataType:"json",success:function(q){m.data().datagrid.cache=q;o(i(q))}})}else{o(i(j))}function i(u){var r=b.extend({},u);var v=[];var w=(p.page-1)*parseInt(p.rows);var q=w+parseInt(p.rows);var t=u.page.records;for(var s=w;s<q;s++){if(t[s]){v.push(t[s])}else{break}}r.rows=v;r.total=u.page.total;return r}}var f=function(j){var i=b.extend({});i.rows=j.page.records;i.total=j.page.total;return i}},fixHeight:function(c){return(document.body.clientHeight)*c},fixWidth:function(c){return(document.body.clientWidth-5)*c}},comboTreeGrid:{init:function(f){var d=b(f.comboTreeGridId);d.combotreegrid({width:b.common.isEmpty(f.width)?"100%":f.width,panelWidth:b.common.isEmpty(f.panelWidth)?"400":f.panelWidth,editable:b.common.isEmpty(f.editable)?false:f.editable,idField:b.common.isEmpty(f.idField)?"#id":f.idField,treeField:f.treeField,columns:f.columns,loader:c,onChange:function(i,h){var g=b.common.isEmpty(b(f.contrastField).val())?"#id":b(f.contrastField).val();if(g===i){b.modal.alert("不能选择同级节点,请重新选择！",modal_status.FAIL);d.combotreegrid("clear","none");d.combotreegrid("setValue",h)}else{d.val(i)}}});function c(i,h,g){b.ajax({type:f.method,url:f.url,dataType:"json",success:function(j){h(e(j))}})}function e(g){return g.result}}},ztree:{searchNode:function(c){},expandTree:function(d){var c=b.fn.zTree.getZTreeObj(d);c.expandAll(true)},closeTree:function(d){var c=b.fn.zTree.getZTreeObj(d);c.expandAll(false)},checkAllTrue:function(d){var c=b.fn.zTree.getZTreeObj(d);c.checkAllNodes(true)},checkAllFalse:function(d){var c=b.fn.zTree.getZTreeObj(d);c.checkAllNodes(false)},getCheckedNodes:function(d){var c=b.fn.zTree.getZTreeObj(d);return c.getCheckedNodes(true)}},pop_up_tree:{init:function(d){var h="zTree"+Math.random().toString(36).substring(2);var j="tree-layer"+Math.random().toString(36).substring(2);var e={data:{simpleData:{enable:true,idKey:d.idKey,pIdKey:d.pIdKey,rootPId:d.rootPId},key:{name:d.name,url:"x"}}};var f;var i=b("#"+d.obj);i.after('<div id="'+j+'" style="display: none;">   <div class="box-header" id="search" style="display: block;padding: 20px;">    <label for="keyword">关键字：</label><input autocomplete="off" type="text" id="keyword" style="line-height: 24px; width:60%;border: 1px solid #bbb;padding: 0 4px;" maxlength="50">    <a class="btn btn-xs ibtn-primary" style="line-height: 22px;" onclick="$.ztree.searchNode(\''+String(h)+'\')">搜索</a>   </div>   <div style="padding:10px 20px">      <div class="pull-right">         <a class="btn btn-box-tool" id="expand_default"   onclick="$.ztree.expandTree(\''+String(h)+'\')">展开</a>/         <a class="btn btn-box-tool" id="collapse_default" onclick="$.ztree.closeTree(\''+String(h)+'\')">折叠</a>      </div>      <input  id="'+d.value+'" type="text"  name="'+d.value+'" class="hidden"/>      <ul id="'+h+'" class="ztree"></ul>   </div></div>');var g=b("#"+d.value);if(b.common.isNotEmpty(i.val())){g.val(i.val());if(i.val()===d.rootPId){i.val(b.common.isNotEmpty(d.topName)?d.topName:"主目录")}}else{if(!d.required&&!i.attr("required")&&!i.hasClass("required")){g.val(d.rootPId);i.val(b.common.isNotEmpty(d.topName)?d.topName:"主目录")}else{i.attr("required","required");i.val(d.topName)}}b.ajax({type:d.type,url:d.url,contentType:"application/json",async:false,dataType:"json",success:function(k){if(k.status===web_status.SUCCESS){f=b.fn.zTree.init(b("#"+h),e,k.result);var l=f.getNodeByParam(d.idKey,g.val());if(l!=null){f.selectNode(l);i.val(l[d.name])}f.expandAll(d.expand)}},error:function(){alert("系统错误，请稍后重试！")}});i.bind("click",c);i.parent().find(".input-group-addon").bind("click",c);function c(){var l="300px";var k="450px";if(navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)){l="auto";k="auto"}layer.open({type:1,offset:"50px",title:"请选择",area:[l,k],shade:0,shadeClose:false,content:jQuery("#"+j),btn:["确定","取消"],btn1:function(m){var n=f.getSelectedNodes();if(n.length>0){g.val(n[0][d.idKey]);i.val(n[0][d.name])}layer.close(m);try{i.valid()}catch(o){}}})}}}})})(jQuery);web_status={SUCCESS:"200",FAIL:"500",DEMO_ERROR:"900001"};modal_status={SUCCESS:"success",FAIL:"error",WARNING:"warning"};