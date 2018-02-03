$(document).ready(function(){
	if($('#ChallengesTab')[0]){
	$('#ChallengesTab').Tabs({
		type: 'vertical',
		width: 'auto',
		fit: true
	});
	}
	//$('.dropdown-menu').bind('click', function (e) { e.stopPropagation() });


// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};
function preventDefault(e) {
	e = e || window.event;
	if (e.preventDefault)
		e.preventDefault();
		e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}	
function disableScroll() {
	if (window.addEventListener) // older FF
		window.addEventListener('DOMMouseScroll', preventDefault, false);
		window.onwheel = preventDefault; // modern standard
		window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
		window.ontouchmove  = preventDefault; // mobile
		document.onkeydown  = preventDefaultForScrollKeys;
}
function enableScroll() {
	if (window.removeEventListener)
		window.removeEventListener('DOMMouseScroll', preventDefault, false);
		window.onmousewheel = document.onmousewheel = null; 
		window.onwheel = null; 
		window.ontouchmove = null;  
		document.onkeydown = null;  
}

	

 	$(".dropdown a, .navbar-right a").hover(function(){    
		MenuLeftSpaceBackground();
		
		
	},function(){
		$('.overlayBox').mouseenter(function(){
			
			$(document).find('.hoverActive').removeClass('hoverActive');
			$('.dropdown.removedActive').addClass("active");
			enableScroll();
			$(this).remove();
	
		})
	});
	
	
	 $('.cloudFirstCol, .menuImageBox').hover(function () {
		 
		 /****** Added on the News and SS get postbyID **/
			$(this).addClass('showButton');
		   },function () {
			  $(this).removeClass('showButton');
		   }
	   );
	
//	$(document).on("click", ".overlayBox", function(){
//		$(document).find('.hoverActive').removeClass('hoverActive');
//		$('.dropdown.removedActive').addClass("active");
//		enableScroll();
//		$(this).remove();
//	});
	
		


	 $('#HeaderSection .dropdown-menu, #HeaderSection .dropdown').hover(function () {
				$(this).closest('.dropdown').addClass('hoverActive');
				$('.dropdown.active').addClass("removedActive").removeClass("active");
				disableScroll();
		   },function () {
			  $(this).closest('.dropdown').removeClass('hoverActive');
			   $('.dropdown.removedActive').addClass("active").removeClass("removedActive");
				enableScroll();
		   }
	   );
	$(".SearchButtonLI a").on('click',function(){
		setTimeout(function() { 	$(".SearchInput").focus(); }, 500);
	});
	if($(".carousel-inner")[0]){
		$(".carousel-inner").swipe( {
			swipeLeft:function(event, direction, distance, duration, fingerCount) {
				$(this).parent().carousel('next'); 
			},
			swipeRight: function() {
				$(this).parent().carousel('prev'); 
			},
			threshold:0
		});
	}
			

	var resizeId;
	$(window).resize(function() {
	    clearTimeout(resizeId);
	    resizeId = setTimeout(MenuLeftSpaceBackground, 800);    
		AccordianActiveOnMobile();
		setTimeout(RelatedLinksHeight, 800);
		setTimeout(subMenuCloseable, 800);
		setTimeout(SwapFooterDiv,800);
		
		setTimeout(SS_HeightScript, 800);

		contactHeight();
		setTimeout(contactHeight,500);
		resizeOpenMenu($('.navbar-toggle'),'resize');
	
	});
	function MenuLeftSpaceBackground(){
		var WindowWidth = $(window).width();
		var WindowHeight = $(window).height();
		var aboveMenuSpace = $('#HeaderSection').height();
		var menuHeight = $(window).height();
		if($(window).width()>1199){ 	 
	
		var sm = $(window).width()-$(".container").outerWidth() - 30 ;
		var LeftSpace = sm/2;
		$(document).find('.LeftSpace').remove();       
		$(document).find('.RightSpace').remove(); 
		$(document).find('.overlayBox').remove(); 
		$(".dropdown-menu").removeAttr('style');
		$(".dropdown-menu").css({"width": WindowWidth}).append("<div class='LeftSpace'></div><div class='RightSpace'></div><div class='overlayBox'></div>");	
		$(".LeftSpace").css({"width":LeftSpace});
		$(".RightSpace").css({"width":LeftSpace});
		$(".overlayBox").css({"width":WindowWidth});
		}else{
			$(document).find('.LeftSpace').remove();       
			$(document).find('.RightSpace').remove(); 
			$(document).find('.overlayBox').remove(); 
			$(".dropdown-menu").css({"margin-left": 'auto', "width": '100%'});	
		}

	}

	$(window).scroll(function(){		
		StickyNavitionShow();
		NewsBar();
		
		var scrollOn = 600; 		
		if($(window).scrollTop() > scrollOn){
			$('.stickyButton').addClass('buttonVisible');
		}else {
			$('.stickyButton').removeClass('buttonVisible');
		}	
        
        if($(window).width()>767) {
            if($('#StickySpace')[0]){
            if($(window).scrollTop() > ($('#StickySpace').offset().top)) {
                $('#newID').addClass('cloudFirstSticky');
                $('#StickySpace').css({'visibility':'hidden'});
            }else {
                  $('#newID').removeClass('cloudFirstSticky');
                      $('#StickySpace').css({'visibility':'visible'});
            }   
		}
        }
	});
    if($('#StickySpace')[0]){
        $('#StickySpace').clone().attr('id','newID').appendTo('#cloudFirstIntroSection');
    }
    
	function StickyNavitionShow(){
		if($(window).scrollTop()>10) {
			 var FixedClass = $("#HeaderSection").attr('class');
			 if(FixedClass != "FixedNav"){		
				$("body").addClass("bodyFixedNav");
				$("#HeaderSection").addClass("FixedNav");	
				if($(window).scrollTop() < 76) {
					$("#HeaderSection").css({'top': '-'+$(window).scrollTop()+'px'});
				}else {
					$("#HeaderSection").css({'top': '-75px'});
				}
				
			}
		}else{
			$("#HeaderSection").removeClass("FixedNav");
			$("body").removeClass("bodyFixedNav");
			$("#HeaderSection").css({'top': '0px'});
		}
	};
	//appendContact();

	function NewsBar(){		
		if($('#NewsEventTitleSticky')[0]){
			var TopSpace = $('#NewsEventTitleSticky').offset().top-106;
			if($(window).scrollTop()>TopSpace) {
				if($(window).width()>991){					
				 $('#TabSection').css({'position':'fixed','top':'72px','background':'#ffffff','z-index':'22','padding-top':'30px','width':'100%'});
				}else{
					$('#TabSection').css({'position':'fixed','top':'51px','background':'#ffffff','z-index':'22','padding-top':'30px','width':'100%'});
				}
				$('#NewsEventTitleSticky').css({'height':$('#TabSection').outerHeight()});
				NewsEventTitleSticky
			}else{
				 $('#TabSection').removeAttr('style');	
				$('#NewsEventTitleSticky').removeAttr('style');	
			}
		}
	};


	$('.CloseMenu').click(function(){
		$(document).find('.open').removeClass('open');		
		$(document).find('.myOpen').removeClass('myOpen');		
		$(document).find('.myOn').removeClass('myOn');
		$(document).find('.myOff').removeClass('myOff');	
		$(document).find('.myOnform .myBox').removeAttr('style');
		$(document).find('.myOnform').removeClass('myOnform');
		
	});
	$('.backMenu').click(function(){
		$(document).find('.myOnform .myBox').removeAttr('style');
		$(document).find('.myOnform').removeClass('myOnform');
	});
	$('.dropdownMenuClose').click(function(){
		
		$(this).closest(".dropdown-menu").css({"display":"none"});
	});
		
	AllowClickMenu();
	function AllowClickMenu(){ 
		$("#HeaderSectionMobile li.dropdown > a").addClass('pull-left').css({'width':'80%'});
		$("#HeaderSectionMobile li.dropdown > .dropdown-menu").css({'clear':'both'});  
		$("#HeaderSectionMobile li.dropdown > span.glyphicon-plus").remove();
		$("#HeaderSectionMobile li.dropdown > a").before('<a class="arrowClick pull-right" style="width:20%"  data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"> <span class="fa fa-angle-down pull-right"></span></a>');		
	}

	$('#HeaderSectionMobile li.dropdown > a.arrowClick').click(function(){ 
		if($(this).attr('aria-expanded')=='false'){
			$('#HeaderSectionMobile li.dropdown').removeClass('active'); 
			$("#HeaderSectionMobile li.dropdown > a.arrowClick").find('span').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
			$(this).find('span.pull-right').removeClass('fa fa-angle-down').addClass('fa fa-angle-up');				
			$(this).closest('li').addClass('active');  
			}else{			
			$(this).find('span.pull-right').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');				
				$(this).closest('li').removeClass('active');  
		}
	});

	
	function resizeOpenMenu(elem, action){
			var RelDiv = $(elem).attr('data-rel-div');	
			// $(".navbar-toggle").attr("aria-expanded","false");
			var menuWidth = ($(window).width() * 90) / 100;
			var closeArea = ($(window).width() * 10) / 100;
			if(action=='resize'){
				if($(elem).attr('aria-expanded')=='true'){ 
					//debugger;
					//$('.LightBoxDiv').css({"display":"none"}); 
					//$('.mobileSlideMenu').removeClass('mobileMenuShow');
					$('.'+RelDiv).css({"height":$(window).height(),"display":"block","width":menuWidth});
					$('.closeArea').css({"height":$(window).height(),"display":"block","width":closeArea});
					$('body, html').addClass("StopScrolling").css({"height":$(window).height()});; 
					return false;
				}else{ 
					return false;
				} 
			}
			if($(elem).attr('aria-expanded')=='false'){	 
					//debugger;
					$(".navbar-toggle").attr("aria-expanded","false");	
					$(".navbar-collapse").removeClass("in").attr("aria-expanded","false");
					$(elem).attr("aria-expanded","true");											
					//$('.LightBoxDiv').css({"display":"none","height":"0px"});
					$('.mobileSlideMenu').addClass('mobileMenuShow');
					$(document).find('.ToggleClose').removeClass('ToggleClose');
					//$('.'+RelDiv+', .closeArea').css({"height":$(window).height(),"display":"block"});					
					
					$('.'+RelDiv).css({"height":$(window).height(),"display":"block","width":menuWidth,"padding-left":closeArea});
					$('.closeArea').css({"height":$(window).height(),"display":"block","width":menuWidth});
					$('body, html').addClass("StopScrolling").css({"height":$(window).height()});;
					 $(elem).addClass('ToggleClose');
					//$(this).find('span').html('<i>&times;</i>');
					
			}else {
				//$('.'+RelDiv+', .closeArea').css({"display":"none"});				
				$('.mobileSlideMenu').removeClass('mobileMenuShow');
				$('body, html').removeClass("StopScrolling").removeAttr('style');
				$(elem).removeClass('ToggleClose');				
				$("#HeaderSectionMobile li.dropdown > a").find('span.pull-right').removeClass('fa fa-angle-up').addClass('fa fa-angle-down');
				
			}
		}
	$('.navbar-toggle').on('click', function(){					
		resizeOpenMenu(this,'click'); 
	});
	$('.closeArea').on('click', function(){					
		$('.navbar-toggle').trigger('click');
	});
	
	
	$('#MainNavigationMobile > ul > li').click(function(){
		
		var LIindex = $(this).index()-1;
		var smsm = $(this).height();
		$(".MainNavigationMobile").animate({
			
			scrollTop: (LIindex * smsm)+LIindex
		});
		});


	
	/** Success Stories Page Script **/
	$('.collapse').on('shown.bs.collapse', function(){        
                var offset = $('.panel > .panel-collapse.in').offset();   
                if(offset) {
                  if($(window).width()<=767){
                    $('html,body').animate({
                        scrollTop: $(this).offset().top - ($(".panel .title").outerHeight() + 90)                
                    }); 
                }
                }
    }).on('hidden.bs.collapse', function(){});
	
	function AccordianActiveOnMobile(){
		if($(window).width()>767){
			$('.panel .title').attr({'data-toggle': ''});
		}else {
			 $('.panel .title').attr({'data-toggle': 'collapse'});
		}
	}
	//RelatedLinksHeight();
	function RelatedLinksHeight(){
	$('#Related a').css({"min-height": "auto"});
	$('#Related a').css({"min-height": Math.max($('.RelatedPrevious').outerHeight(), $('.RelatedNext').outerHeight())});
	}
	/** Success Stories Page Script End **/
	
	(function ($) {
		 $.fn.extend({ MakeSameHeight: function (options) {
			var defaults = { MinWidth: 320 }
			var o = $.extend(defaults, options);
			var MinWidth = o.MinWidth;
			if($(window).width()>=MinWidth) {				
				$(this).css({'height': 'auto'});
				var heights = $(this).map(function () {
				return $(this).outerHeight();
				}).get(),
				maxHeight = Math.max.apply(null, heights);
				$(this).css({'height': maxHeight});
			}else{
				$(this).css({'height': 'auto'});
			}
		 }});
	})(jQuery);	
	
	function ActuveSubMenu(){
		var CurrentPageUrl = window.location.href; 		
		var CurrentUrlArray = CurrentPageUrl.split('/');
		var	CurrentPageName = CurrentUrlArray[CurrentUrlArray.length-2];
		$('.D-ul a, .FooterNavigationBox a').each(function(){
			var urls = $(this).attr('href');
			if(urls != "#"){			
				//var UrlArray = urls.split('/'),
				//DataUrlAcvie = UrlArray[UrlArray.length-2];		
				CurrentPageUrl = CurrentPageUrl.split('?')[0];
				if(urls==CurrentPageUrl){
				
					$(this).parent().addClass('ActiveSubMenu');
				}
			}
		});
//		$('.ActiveSubMenu a').each(function(){
//			if($(this).find('img')[0]){
//			var ImagePath = $(this).find('img').attr('src');
//				$(this).find('img').css({"position":"relative","margin-top": "-57px"});	
//			}
//		});
	}
	ActuveSubMenu();
	
	function SwapFooterDiv(){
		if($(window).width() <1200){	
			if($('.SwapCRB')[0]){
				$('div.SwapCRB').insertAfter($('div.SwapCRB').next('.FooterNavigationBox'));
				$('div.SwapSMB').insertBefore($('div.SwapSMB').prev('.SwapCRB'));
				$('div.SwapSMB').insertBefore($('div.SwapSMB').prev('.FooterNavigationBox'));	
				$('.CopyRightBox').removeClass('SwapCRB');
				$('.SocialMediaBox').removeClass('SwapSMB');
			}	
		}else{
			if(!$('.SwapCRB')[0]){
				$('.CopyRightBox').addClass('SwapCRB');
				$('.SocialMediaBox').addClass('SwapSMB');
				$('div.SwapCRB').insertBefore($('div.SwapCRB').prev('.FooterNavigationBox'));
				$('div.SwapSMB').insertAfter($('div.SwapSMB').next('.SwapCRB'));
				$('div.SwapSMB').insertAfter($('div.SwapSMB').next('.FooterNavigationBox'));
			}
		}
	}
	SwapFooterDiv();
	
//	$('.MenuCenterOuter .platforms a').mouseover(function() { 
//			if(!$(this).parent().attr('class')){
//				var ImagePath = $(this).find('img').attr('src');			
//					$(this).find('img').css({"position":"relative","margin-top": "-57px"});	
//			}
//        });
//    $('.MenuCenterOuter .platforms a').mouseout(function() {
//			if(!$(this).parent().attr('class')){
//				var ImagePath = $(this).find('img').attr('src');
//					$(this).find('img').css({"position":"relative","margin-top":"0"});
//			}
//        });
	

		
	if($('#ChallengesTab')[0]){
		$('#ChallengesTab li').click(function(){						
			$('html, body').animate({scrollTop: $('#ChallengesTab').offset().top-65}, 800);	
		});	
	}
	SS_HeightScript();
	function SS_HeightScript(){
		$('.FeaturedListings .FeaturedItems').MakeSameHeight({MinWidth: 768 });		
	}
	
	
	$('.ThemeColor').mouseover(function() { 
		var ImagePath = $(this).find('img').attr('src');
		if(ImagePath.indexOf("-white.svg") == -1){
			var src = ImagePath.replace(".svg", "-white.svg");
			$(this).find('img').attr('src',src);
		}
	});
    $('.ThemeColor').mouseout(function() {
		var ImagePath = $(this).find('img').attr('src');
		if(ImagePath.indexOf("-white.svg") > -1){
			var src = ImagePath.replace("-white.svg", ".svg");
			$(this).find('img').attr('src',src);
		}
	});
		 
		function mobileMenu (){
			var linkSelector = $('#HeaderSectionMobile .NavBox .navbar-nav .Company .MenuCenterOuter');
			$('.Company_News',linkSelector).insertAfter('#HeaderSectionMobile .NavBox .navbar-nav .Company .MenuCenterOuter .Company_Resources');
			$(".Company_About",linkSelector).insertBefore("#HeaderSectionMobile .NavBox .navbar-nav .Company .MenuCenterOuter .Company_Resources");
			
		}
		
		function activeLinks(){
			var linkName = []; 
			//selector
			if($('#HeaderSection').css('display') == 'block'){
				var selector = $('#HeaderSection .NavigationWrap  .navbar-nav > li'); 
			}
		 
			if($('#HeaderSectionMobile').css('display') == 'block'){ 
				var selector = $('#HeaderSectionMobile #MainNavigationMobile  .navbar-nav > li'); 
			}
			
			
			$(selector).each(function(){ 
				linkName.push('/'+$(this).attr('data-main-nav')+'/'); 
			}); 
			
			for (i = 0; i < linkName.length; i++) {  
				x = linkName[i].replace(/"/g, '');
				//x = x.toLowerCase(); 
				if (location.href.match(x)) {
					$(selector).each(function(){  
						var activetext = $(this).attr('data-main-nav'); 
						x = linkName[i].replace(/\//g, "");
						if(x == activetext){
							$(this).addClass('active');  
						}
					});
				}
			}
		}
		mobileMenu();
		activeLinks();
	
	function contactHeight(rel){		
		var myContactBoxMtop = $("header").outerHeight();
		var contactMenuHeight = $(window).height() - 60;
		var myHeight = $("."+rel+" .myHeight").height();

		if(myHeight > contactMenuHeight){
			//alert("m");
			$("."+rel+" .myBox").css({"height":contactMenuHeight,"overflow-y":"scroll","-webkit-overflow-scrolling":"touch"});
		}else {
			//alert("s");
			$("."+rel+" .myBox").css({"height":contactMenuHeight,"overflow-y":""});
		}
		
	}			
		$(".contactSales").click(function(){				
			contactHeight($(this).attr("data-rel"));
			$(".myContactBox").addClass("myOn");
			$("body").addClass("myOff");
			
		});

		$("#salesClick, #stickyContactButton, #talkToSilicus").click(function(e){	
				e.preventDefault();
				contactHeight($(this).attr("data-rel"));
				$(".mySalesForm").addClass("myOnform");
				if($(this).attr('id')== "talkToSilicus"){
					$("body").addClass("myOff");
					$(".backMenu").css({"display":"none"});
				}else {
					$(".backMenu").css({"display":"block"});
				}
			});
	
		$("#moreInfoClick").click(function(){	
			contactHeight($(this).attr("data-rel"));
			$(".myMoreInfo").addClass("myOnform");
			$("body").addClass("myOff");						
		});
	
	

	
	$(".nextButtonBox a").click(function(e){
		e.preventDefault();
	   var sm = $(this).attr('data-next-section');
	   var TopSpace = 0;		
	   if($(window).width() < 992 && $(window).width() > 767){ 
            if($('.bodyFixedNav')[0]) {
              TopSpace =  -30;
            }else {
               TopSpace = 30; 
            } 
	   } else if($(window).width() <= 767){
		    if($('.bodyFixedNav')[0]) {
              TopSpace =  -30;
            }else {
               TopSpace = 30; 
            } 		   
	   } else if($(window).width() < 1200 && $(window).width() > 991) {
                if($('.bodyFixedNav')[0]) {
                  TopSpace =  -30;
                }else {
                   TopSpace =  30;
                }   
        }else { 
               if($('.bodyFixedNav')[0]) {
                  TopSpace =  -60;
               }else {

                   TopSpace =  -135;
               }   
	   }
	   $("html, body").animate({ 
		   scrollTop: $("#"+sm).offset().top+TopSpace 
	   }, 800);
	});
    
    $(".pointBox").click(function(e){
		e.preventDefault();
	   var sm = $(this).attr('data-next-section');
 
	   var TopSpace = 0;		
	   if($(window).width() < 992 && $(window).width() > 767){ 
            if($('.bodyFixedNav')[0]) {
              TopSpace =  -130;
            }else {
               TopSpace = -60; 
            } 
	   } else if($(window).width() <= 767){
		    if($('.bodyFixedNav')[0]) {
              TopSpace =  -40;
            }else {
               TopSpace = 40; 
            } 		   
	   } else if($(window).width() < 1200 && $(window).width() > 991) {
     
                if($('.bodyFixedNav')[0]) {
                  TopSpace =  -150;
                }else {
                   TopSpace =  -70;
                }   
        }else if($(window).width() < 1366 && $(window).width() > 1199) {
          
                if($('.bodyFixedNav')[0]) {
                  TopSpace =  -170;
               }else {
              
                   TopSpace =  -250;
               }   
        }else { 
               if($('.bodyFixedNav')[0]) {
                  TopSpace =  -170;
               }else {

                   TopSpace =  -250;
               }   
	   }
	   $("html, body").animate({ 
		   scrollTop: $("#"+sm).offset().top+TopSpace 
	   }, 800);
	});
    
	
	subMenuCloseable();
	
	function subMenuCloseable(){
		if($(window).width()<768){
			$('.closeableBoxMobile').each(function(){
					if(!$(this).attr('style')){						
						if($(this).attr('data-view')){
							$(this).prev('h2').remove('span');
							$(this).prev('h2').append('<span class="fa fa-angle-up pull-right"></span>');
							$(this).css({'display':'block'});
						}else {
							$(this).prev('h2').remove('span');
							$(this).prev('h2').append('<span class="fa fa-angle-down pull-right"></span>');
							$(this).css({'display':'none'});
						}
					}
			});
		}else {
			if($('.MenuColumnTitle .fa')[0]){
				$('.MenuColumnTitle span').remove();
				$('.closeableBoxMobile').removeAttr('style');
			}
		}
		
	}

	$('.MenuColumnTitle').click(function(e){
		if($(window).width()<768){
			e.preventDefault();
			e.stopPropagation();
			 if($(this).find('span').attr('class') == 'fa fa-angle-down pull-right'){
				$(this).find('span').removeClass('fa fa-angle-down pull-right');
				$(this).find('span').addClass('fa fa-angle-up pull-right');
			 }else {
				$(this).find('span').removeClass('fa fa-angle-up pull-right');
				$(this).find('span').addClass('fa fa-angle-down pull-right');
			 }		
			$(this).next('.closeableBoxMobile').slideToggle();
		}
	});
	
	function getNewsInNav(){
		var newID = $('.loadNews').attr('data-news-wp-id');
		var newUrl = $('.loadNews').attr('data-url');
		$('.loadNews').load(newUrl+"/post-id-navigation/?mypostid="+newID);
	}	
	getNewsInNav();
	function getSsInNav(){
		var ssID = $('.loadSs').attr('data-ss-wp-id');
		var ssUrl = $('.loadSs').attr('data-url');
		$('.loadSs').load(ssUrl+"/post-id-navigation/?mypostid="+ssID);
	}	
	getSsInNav();
		
	
});

var myObject = {
	init: function(existingOpacity){
		this.myBindFunction(existingOpacity);
	},				
	myBindFunction: function(existingOpacity){		
		$(window).bind('scroll', existingOpacity, this.myScrollFunction);	
		$(document).bind('ready', existingOpacity, this.myScrollFunction);
	},	
	
	myScrollFunction: function(e){
		if($(window).width() >1199){
			var myBoxID = $('.PageIntro').attr('id');
			var scrollTop = $('html').scrollTop();
			var myTop = $('html').scrollTop()*100/165;
			var zoomItem = 100+(myTop/10);
			var myOpacityCheck = (myTop)/210;		
			if(e.data < myOpacityCheck) {
				var myOpacity = myOpacityCheck;
			}else {
				var myOpacity = e.data
			}
			if(scrollTop <301) {
				$("#generatedCSS").remove();
				$('body').append('<style type="text/css" id="generatedCSS">#'+myBoxID+':after { opacity : '+myOpacity+' }</style>');
				$('#myparallax').css({"opacity":1, "transform" : "translateY(-"+myTop+"px)"});
				$('#'+myBoxID).css({'background-size': 'auto '+zoomItem+'%'});

			}else {
				if(scrollTop > 300 && scrollTop < 500) {
					var myVal = 200 - (scrollTop - 300);
					var textOpacity = ((myVal*100)/200)/100;				
				}
				$('#myparallax').css({"opacity": textOpacity, "transform" : "translateY(-"+myTop+"px)"});

			}

		}
	}
}

