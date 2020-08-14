/**
 * 
 */

$(function(){
	$("#search-body").hide();
	$("#btn-search").click(function(){
		$("#search-body").stop().slideDown();
	});
	
	$("#btn-close").click(function(){
		$("#search-body").stop().slideUp();
	});
});