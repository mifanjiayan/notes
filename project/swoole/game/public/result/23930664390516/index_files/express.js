var ExpressFlow=function(t){this.options=t,this.views={}};ExpressFlow.prototype.checkCity=function(){var t=window.location.href;$.ajax({type:"GET",url:"/mapi/loan/Cities",data:{rongid:CONST.RONGID,check_city:1},dataType:"json",success:function(o){(!o.data||!o.data.current_city||!o.data.current_city.id||+o.data.current_city.id<=0)&&(window.location.href="//m.rong360.com/city?src="+encodeURIComponent(t))}})},ExpressFlow.prototype.start=function(){var t=require("m_order_flow:expressrouter");this.router=new t(this)};var componentfactory=require("m_order_flow:component_factory"),Tip=componentfactory("tip"),Loading=componentfactory("loading"),Express_Flow=new ExpressFlow;CONST.CURRENT_APP=Express_Flow,Express_Flow.checkCity(),Express_Flow.start(),$.ajax({type:"GET",url:"/mapi/loan/checkApplyInfo",async:!0,data:{rongid:CONST.RONGID,from:CONST.FROM,from_type:CONST.FROM_TYPE},dataType:"json",timeout:5e4,success:function(t){if("has_user_info"==t.msg){sa.track("has_user_info");var o=require("m_order_flow:order_status");"apply_tjy"==t.data.msg||"apply_doudi"==t.data.msg?($.log({page_name:"quick_loan_pop"}),Event_Bus.trigger("Apply_Doudi",t.data)):"jump_to_ppdai"==t.data.msg?Event_Bus.trigger("Jump_To_PPD",t.data):"jump_to_certification"==t.data.msg?Event_Bus.trigger("NeedCertification",t.data):o({msg:"apply_express"})}else{if("jump_to_taojinyun"!=t.msg)return;window.location.href=t.data.url}}}),$.log({page_name:"new_zhitongche"});