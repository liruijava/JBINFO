$(document).ready(function(){$(".query-a").click(function(){var c=$(".query-a");var b=$(".table");var a=$(".search-form");if(a.is(":hidden")){a.slideToggle("slow",function(){$(".bootstrap-table").css("border-top","1px solid #ddd");b.bootstrapTable("resetView",{height:$(".ibox-content-table").height()-$(".search-form").outerHeight(true)-1});c.text("");c.append("<li class='fa fa-filter'/></li> 隐藏");c.css("background-color","#3276b1");c.css("border-color","#285e8e")})}else{a.slideToggle("slow",function(){$(".bootstrap-table").css("border-top","0 solid #ddd");b.bootstrapTable("resetView",{height:$(".ibox-content-table").height()-1});c.text("");c.removeAttr("style");c.append("<li class='fa fa-filter'></li> 查询")})}})});$(".ibox-content-table").resize(function(a){if(typeof($(".ibox-content-tree").css("marginTop"))!=="undefined"){$(".ibox-content-tree").height($(".ibox").height()-$(".ibox-title").outerHeight(true)-$(".ibox-content-tree").css("marginTop").replace("px",""))}$(".ibox-content-table").outerHeight($(".ibox").height()-$(".ibox-title").outerHeight(true));$(".table").bootstrapTable("resetView",{height:$(".ibox-content-table").height()-1});$(".table").bootstrapTable("resetView")});$(".ibox-content-tree").resize(function(a){if(typeof($(".ibox-content-tree").css("marginTop"))!=="undefined"){$(".ibox-content-tree").height($(".ibox").height()-$(".ibox-title").outerHeight(true)-$(".ibox-content-tree").css("marginTop").replace("px",""))}});$(".ibox-content-tree-table").resize(function(a){$(".ibox-content-tree-table").outerHeight($(".ibox").height()-$(".ibox-title").outerHeight(true));$(".table").bootstrapTable("resetView",{height:$(".ibox-content-tree-table").height()-1})});