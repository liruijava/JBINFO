$(function(){var a={url:contextPath+"user/page",createUrl:contextPath+"user/form",updateUrl:contextPath+"user/form{id}",removeUrl:contextPath+"user/removeById",batRemoveUrl:contextPath+"user/removeByIds",exportUrl:contextPath+"user/export",sortOrder:"desc",modalName:"用户",search:false,showRefresh:true,showColumns:true,showToggle:true,columns:[{checkbox:true},{field:"id",visible:false},{field:"jobNumber",title:"工号",visible:false},{field:"username",title:"用户名",formatter:$.table.emptyProcessing},{field:"fullName",title:"姓名",formatter:$.table.emptyProcessing},{field:"phone",title:"手机",formatter:$.table.emptyProcessing},{field:"telephone",title:"电话",formatter:$.table.emptyProcessing},{field:"email",title:"邮箱",visible:true,formatter:$.table.emptyProcessing},{field:"org.orgName",title:"部门",formatter:$.table.emptyProcessing},{field:"userStatusName",title:"状态",align:"center"},{title:"操作",align:"center",visible:true,formatter:function(c,e,b){var d=[];d.push('<div class="btn-group"><button type="button" class="btn ibtn-primary btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-cog"></i>&nbsp;<span class="fa fa-chevron-down"></span></button><ul class="dropdown-menu" role="menu"><li><a href="#" onclick="$.operate.editTab(\''+e.id+'\')"><i class="fa fa-edit"></i>修改</a></li><li><a href="#" onclick="$.operate.remove(\''+e.id+'\')"><i class="fa fa-trash"></i>删除</a></li><li><a href="#" onclick="$.modal.open(\'设置密码\', contextPath+\'user/settingPassword/view\',800,300)"><i class="fa fa-key"></i>设置密码</a></li></ul></div>');return d.join("")}}]};$.table.init(a);loadOrg();laydate.render({elem:"#birthdayStart",theme:"#6284f3",max:new Date().toLocaleDateString()});laydate.render({elem:"#birthdayEnd",theme:"#6284f3",max:new Date().toLocaleDateString()})});function loadOrg(){var a={view:{selectedMulti:false,showLine:true},check:{enable:false,chkboxType:{Y:"ps",N:"ps"}},data:{simpleData:{enable:true,idKey:"orgId",pIdKey:"parentId",rootPId:0},key:{name:"orgName"}},callback:{onClick:function(d,f,e){var b=$("form").attr("id");var c={};$.each($("#"+b).serializeArray(),function(g,h){c[h.name]=h.value});c.orgId=e.id;$(".table").bootstrapTable("refresh",{query:c})}}};$.post(contextPath+"org/list",function(c){var b=$.fn.zTree.init($("#orgTree"),a,c.result);b.expandAll(true)},null,null,"正在加载，请稍后...")};