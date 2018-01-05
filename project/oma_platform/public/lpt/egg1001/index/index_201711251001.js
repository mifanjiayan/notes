var _typeof2="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function e(t,i,o){function r(n,a){if(!i[n]){if(!t[n]){var l="function"==typeof require&&require;if(!a&&l)return l(n,!0);if(s)return s(n,!0);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}var d=i[n]={exports:{}};t[n][0].call(d.exports,function(e){var i=t[n][1][e];return r(i?i:e)},d,d.exports,e,t,i,o)}return i[n].exports}for(var s="function"==typeof require&&require,n=0;n<o.length;n++)r(o[n]);return r}({1:[function(e,t,i){!function(e){e(function(){var t={prizes:[],itemWidth:0,spaceBetween:.2,slidesOffsetBefore:.2,slidesOffsetAfter:.2,showLucky:!1},i=function(i,o){o=e.extend({},t,o);var r=0,s=e('<div id="prizes-wrapper"></div>');o.prizes.forEach(function(e,t){if(!e.hidden||"lucky"===e.prizeType&&o.showLucky){var i=e.image;"function"==typeof"".ossimg&&(i=i.ossimg());var n='<div class="prize-item" style="display: inline-block; margin-right: '+o.spaceBetween+'rem;" data-id="'+e.id+'" data-type="'+e.prizeType+'">';n+='<div class="prize-img-box"><img class="prize-img" src="'+i+'" /></div><p class="prize-name">'+e.title+"</p></div>",s.append(n),r++}});var n=r*(o.itemWidth+o.spaceBetween)+o.slidesOffsetAfter+o.slidesOffsetBefore;s.css({width:n+"rem","padding-left":o.slidesOffsetBefore+"rem","padding-right":o.slidesOffsetAfter+"rem"}),e(i).html(s).append('<div class="prize-tag"></div>'),e("#prizes-wrapper").attr("data-length",r)};window.prizesRender=i})}(Zepto)},{}],2:[function(e,t,i){!function(t){e("../../../../../unit/lib/lib-animate/1.0.0/animate"),e("../../components/prizesRender");var i={jumpInterval:null,lastResult:null,hasNoTimes:!1,againOrderId:null,records:null,storageIndex:null,isShowBuoy:!1,init:function(){this.loadFiles({styleCb:this.styleCb,optionCb:this.optionCb,loadCb:this.loadCb}),this.events()},styleCb:function(e){var i=[["body","backgroundColor","bgColor"],[".main","backgroundImage","bgImage"],[".record","backgroundImage","record"],[".prize-list","backgroundColor","prizeBgColor"],[".prize-tag","backgroundImage","prizeTag"],[".needCredits","color","needCreditsColor"],[".apple","color","apple"],[".apple","backgroundColor","appleBg"],[".rule","backgroundImage","ruleImage"],[".egg","backgroundImage","egg"],[".egg.active","backgroundImage","egg-active"],[".egg.active.smashed","backgroundImage","egg-smashed"],[".egg.jump","backgroundImage","egg-jump"],[".chuizi","backgroundImage","chuizi"]];requireStyle.init(e,i),t("head").append("<style>.prize-list .prize-img-box{border-color: "+requireStyle.getStyle("prizeBordeColor")+";}</style>"),t("#db-content").show()},optionCb:function(e){var o=i,r=e.data;o.renderElement(r),window.prizesRender("#prize-list",{prizes:r.options,itemWidth:.68,spaceBetween:.05,slidesOffsetBefore:.15,slidesOffsetAfter:0});for(var s="",n=r.options.length,a=0;a<n;a++)t(".eggs").append('<div class="egg"></div>');switch(n){case 2:s="two";break;case 4:s="four";break;case 5:s="five";break;case 7:s="seven";break;case 8:s="eight"}t(".eggs").addClass(s)},loadCb:function(){var e=i;new IScroll("#prize-list",{scrollX:!0,scrollY:!1,mouseWheel:!1,scrollbars:!0,shrinkScrollbars:"clip",fadeScrollbars:!1}),e.getRecord(),initAppleDesc()},events:function(){var e=this;t("#prize-list").on("click",".prize-item",function(){new GetPrizeDetail({url:"/activity/getPrizeDetail",prizeType:t(this).data("type"),data:{optionId:t(this).data("id")}})}),t("#db-content").on("click",".recommend-modal .close",function(){e.hit.reInit()}),t("#db-content").on("click",".egg",function(){t(this).hasClass("active")||(e.eggsJump(!1),e.start.call(this))}),e.eggsJump(!0)},getOrder:function(){var e=this,t={};this.againOrderId&&(t.againOrderId=this.againOrderId),this.getActivityOrder({data:t,success:function(t){var i=e.getActivityErrorCode(t.code);"success"==i?(e.againOrderId=null,e.renderElement(t.data),e.isShowBuoy=t.data.isShowBuoy,setTimeout(function(){e.getLottery(t.data.orderId)},500)):"networkError"==i?e.showModal("networkError"):"over"==i?e.showModal("over"):"preview"==i&&e.showModal("preview")},error:function(t,i){e.hit.reset(),"timeout"==i?(window.xhr&&window.xhr.abort(),e.showModal("systemError",{message:"请求超时"})):e.showModal("networkError")}})},getLottery:function(e){var t=this;this.getActivityLottery({data:{orderId:e},success:function(i){this_aid=i.data.lottery.id || '',$.ajax({url: '/ts/activity/vpCount',dataType: 'json',type: 'post',data: {random: this_random, awid: this_awid, aid: this_aid, id: this_id,pos:2},success: function () {}
});t.lastResult=i;var o=t.getActivityErrorCode(i.code);"success"==o&&"wait"==i.data.status?setTimeout(function(){t.getLottery(e)},1e3):(t.lastResult=i,t.hit.stop())},error:function(e,i){t.hit.reset(),"timeout"==i?(window.xhr&&window.xhr.abort(),t.showModal("systemError",{message:"请求超时"})):t.showModal("networkError")}})},start:function(){var e=i;if(e.hasNoTimes)e.showModal("over");else{if("ready"!=e.hit.status)return!1;e.getOrder(),e.hit.init(this)}},hit:{status:"ready",$chuizi:t("#chuizi"),$egg:null,init:function(e){this.$egg=t(e),this.run()},run:function(){function e(){o.$chuizi.animate({rotate:"-20deg"},200,function(){if(o.$egg.addClass("active"),"stop"==o.status){if(o.$egg.addClass("smashed"),r.setRecord(o.$egg.index()),r.lastResult)if("networkError"==r.getActivityErrorCode(r.lastResult.code))r.showModal("networkError");else if(r.againOrderId=r.lastResult.data.againOrderId?r.lastResult.data.againTag:null,"success"==r.getActivityErrorCode(r.lastResult.code)&&0!=r.lastResult.data.result)if(2==r.lastResult.data.result){var i=r.lastResult.data.lottery;if("coupon"==i.type||"lucky"==i.type){var s=function(){window.showCouponPrize({result:r.lastResult.data,callback:{close:function(){r.hit.reset()},use:function(){t(".J_modalShowPrize").remove(),r.hit.reset()},again:function(){t(".J_modalShowPrize").remove(),r.hit.reInit()}}})};s()}else if("alipay"===i.type){var n=function(){window.showAlipayPrize({result:r.lastResult.data,callback:{close:function(){r.hit.reset()}}})};n()}else"physical"===i.type?window.showObjectPrize({result:r.lastResult.data,callback:{close:function(){r.hit.reset()}}}):window.showVirtualPrize({result:r.lastResult.data,callback:{close:function(){r.hit.reset()}}})}else 1==r.lastResult.data.result&&r.showModal("again");else window.showThanks({result:r.lastResult.data,callback:{close:function(){r.hit.reset()}}});return!1}o.$chuizi.animate({rotate:"0deg"},200,function(){o.$egg.removeClass("active"),"reset"==o.status?o.doReset():e()})})}this.status="run";var o=this,r=i,s=o.$egg.offset(),n=o.$egg.position();o.$chuizi.animate({left:s.left+ +(o.$egg.width()/2)+"px",top:n.top+o.$egg.height()/10+"px"},150,e)},stop:function(){this.status="stop"},reset:function(){this.reInit(),setTimeout(function(){i.hasNoTimes?i.showModal("over"):i.showPlugin(i.isShowBuoy)},600)},reInit:function(){"run"==this.status?this.status="reset":"ready"!=this.status&&this.doReset()},doReset:function(){var e=this,t=i;this.$chuizi.animate({rotate:"15deg",left:"2.65rem",top:"-0.15rem"},150,function(){e.status="ready",e.$chuizi.css({transform:null}),t.eggsJump(!0)})}},showModal:function(e,t){var i=this,o=this.createErrorObject(e,t);"over"===o.type?i.setModalInterval("showRecommend"):(o.clickCallback=function(){i.hit.reset()},window.errorMsgModal.show(o))},eggsJump:function(e){var i=this;e?i.jumpInterval=window.setInterval(function(){i.jumpLoop(),i.chuiziLoop()},350):(t(".egg").removeClass("jump"),window.clearInterval(i.jumpInterval))},jumpLoop:function(){var e=t(".egg.jump");e.length?(e.nextAll(".egg:not(.active)").length?e.nextAll(".egg:not(.active)").first().addClass("jump"):t(".egg:not(.active)").first().addClass("jump"),e.removeClass("jump")):t(".egg:not(.active)").first().addClass("jump")},chuiziLoop:function(){var e=t(".chuizi");e.toggleClass("jump")},renderElement:function(e){t(".needCredits").html(this.getActivityStatusText(e)).show(),e.limitTimes||CFG.preview?this.hasNoTimes=!1:this.hasNoTimes=!0},getRecord:function(){var e=this;if(window.localStorage.records&&JSON.parse(window.localStorage.records)){var i=new Date;i.setHours(0),i.setMinutes(0),i.setSeconds(0),i.setMilliseconds(0),i=i.getTime();var o=JSON.parse(localStorage.records),r=o.filter(function(e){return e.date==i});r.forEach(function(o,r){o.date==i&&o.deviceId==t.cookie("_coll_device")&&o.id==e.getParams("id")&&(e.storageIndex=r,o.arrays.forEach(function(e){t(".egg")[e]&&t(t(".egg")[e]).addClass("active smashed")}))}),localStorage.records=JSON.stringify(r)}},setRecord:function(e){var i=this;if(window.localStorage)if(null==i.storageIndex||isNaN(i.storageIndex)){var o=new Date;if(o.setHours(0),o.setMinutes(0),o.setSeconds(0),o.setMilliseconds(0),o=o.getTime(),localStorage.records&&JSON.parse(localStorage.records))var r=JSON.parse(localStorage.records);else var r=[];r.push({date:o,deviceId:t.cookie("_coll_device"),id:i.getParams("id"),arrays:[e]}),i.storageIndex=r.length-1,localStorage.records=JSON.stringify(r)}else{var r=JSON.parse(localStorage.records);r[i.storageIndex].arrays.push(e),console.log(r),localStorage.records=JSON.stringify(r)}},getParams:function(e){var t="[\\?&]"+e+"=([^&#]*)",i=new RegExp(t),o=i.exec(location.href);return null===o?"":o[1]}};i=t.extend({},i,window.Public),i.init(),t.fn.nextAll=function(e){var i=[],o=this[0];if(!o)return t([]);for(;o.nextElementSibling;){var r=o.nextElementSibling;e?t(r).is(e)&&i.push(r):i.push(r),o=r}return t(i)}}(Zepto)},{"../../../../../unit/lib/lib-animate/1.0.0/animate":3,"../../components/prizesRender":1}],3:[function(e,t,i){var o="function"==typeof Symbol&&"symbol"===_typeof2(Symbol.iterator)?function(e){return"undefined"==typeof e?"undefined":_typeof2(e)}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":"undefined"==typeof e?"undefined":_typeof2(e)};!function(e){function t(e){return e.replace(/([a-z])([A-Z])/,"$1-$2").toLowerCase()}function i(e){return r?r+e:e.toLowerCase()}var r,s,n,a,l,c,d,u,f,g,p="",h={Webkit:"webkit",Moz:"",O:"o"},m=document.createElement("div"),v=/^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,y={};e.each(h,function(e,t){if(void 0!==m.style[e+"TransitionProperty"])return p="-"+e.toLowerCase()+"-",r=t,!1}),s=p+"transform",y[n=p+"transition-property"]=y[a=p+"transition-duration"]=y[c=p+"transition-delay"]=y[l=p+"transition-timing-function"]=y[d=p+"animation-name"]=y[u=p+"animation-duration"]=y[g=p+"animation-delay"]=y[f=p+"animation-timing-function"]="",e.fx={off:void 0===r&&void 0===m.style.transitionProperty,speeds:{_default:400,fast:200,slow:600},cssPrefix:p,transitionEnd:i("TransitionEnd"),animationEnd:i("AnimationEnd")},e.fn.animate=function(t,i,o,r,s){return e.isFunction(i)&&(r=i,o=void 0,i=void 0),e.isFunction(o)&&(r=o,o=void 0),e.isPlainObject(i)&&(o=i.easing,r=i.complete,s=i.delay,i=i.duration),i&&(i=("number"==typeof i?i:e.fx.speeds[i]||e.fx.speeds._default)/1e3),s&&(s=parseFloat(s)/1e3),this.anim(t,i,o,r,s)},e.fn.anim=function(i,r,p,h,m){var w,b,z,S={},k="",C=this,I=e.fx.transitionEnd,x=!1;if(void 0===r&&(r=e.fx.speeds._default/1e3),void 0===m&&(m=0),e.fx.off&&(r=0),"string"==typeof i)S[d]=i,S[u]=r+"s",S[g]=m+"s",S[f]=p||"linear",I=e.fx.animationEnd;else{b=[];for(w in i)v.test(w)?k+=w+"("+i[w]+") ":(S[w]=i[w],b.push(t(w)));k&&(S[s]=k,b.push(s)),r>0&&"object"===("undefined"==typeof i?"undefined":o(i))&&(S[n]=b.join(", "),S[a]=r+"s",S[c]=m+"s",S[l]=p||"linear")}return z=function(t){if("undefined"!=typeof t){if(t.target!==t.currentTarget)return;e(t.target).unbind(I,z)}else e(this).unbind(I,z);x=!0,!e(this).attr("stop")&&e(this).css(y),h&&h.call(this)},r>0&&(this.bind(I,z),setTimeout(function(){x||z.call(C)},1e3*(r+m)+25)),this.size()&&this.get(0).clientLeft,this.css(S),r<=0&&setTimeout(function(){C.each(function(){z.call(this)})},0),this},m=null}(Zepto)},{}]},{},[2]);