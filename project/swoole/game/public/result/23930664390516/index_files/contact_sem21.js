$(function(){$(".ui-block-apply").on("click",function(){$(this).remove(),$(".sem21-common").show()})});var Contact_View=Backbone.View.extend({tagName:"div",className:"contact_body",initialize:function(n){n.commondata.defbtnval="立即申请",this.options=n,this.parentview=$('[view="contact"]'),this.viewname="contact_view",this.salt="r360",this.startAnimation(),this.render(),Event_Bus.on("Do_User_Check",function(){this.do_user_check()},this)},render:function(){$contact_body=this.parentview.find(".body");var n=require("m_order_flow:contact_common"),i=(new n(this.options,$contact_body),$.cookie("__utmz")),e=i.indexOf("utmcsr"),t=i.indexOf("utmcmd"),o=parseInt($.cookie("abclass").split("_")[1]);if(e>-1&&t>-1){var a=i.substr(e),s=i.substr(t),c=a.indexOf("="),r=a.indexOf("|"),d=s.indexOf("="),m=s.indexOf("|");if(r>-1)var u=a.substring(c+1,r);else var u=a.substring(c+1);if(m>-1)var _=s.substring(d+1,m);else var _=s.substring(d+1);var f=window.navigator.userAgent.toLowerCase();if("weixin"!=u&&"rong360weixin"!=_&&"micromessenger"==f.match(/MicroMessenger/i)){var p="gdt3"==_||"gdt4"==_||"gdt5"==_||"gdt6"==_||"gdt7"==_,v=("mp"==_||"mp1"==_)&&o%2==0;if("tx"==u&&(p||v)){{var w=componentfactory("sem21coupon");new w}$.log({page_name:"landing_popup_test11"}),sa.track("loan_weixin_popup",{type:"coupon_popup",from:"landing",gzh_name:"r360wx"})}}}},events:{},startAnimation:function(){function n(){c.text("Success"),c.removeClass("ani_suc"),a.removeClass("ani_money_1"),o.removeClass("ani_money_2"),setTimeout(function(){a.addClass("ani_money_1"),o.addClass("ani_money_2"),c.addClass("ani_suc")},100)}function i(){c.text("融360"),s.removeClass("ani_id"),setTimeout(function(){s.addClass("ani_id")},100)}var e=$("#swiper"),t=$("#swiper-end"),o=$("#money2"),a=$("#money1"),s=$("#identification"),c=$("#success");e.addClass("ani_swiper"),t.addClass("ani_swiper"),e.on("animationend webkitAnimationEnd",i),o.on("animationend webkitAnimationEnd",i),s.on("animationend webkitAnimationEnd",n)},hide:function(){this.parentview.hide()},show:function(){this.parentview.hide()},do_user_check:function(){$(".sem21-banner").remove(),$(".check_hide").hide(),$("[view=contact]").css({background:"#FFF"})}});