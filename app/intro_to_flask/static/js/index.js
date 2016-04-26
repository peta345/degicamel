+$(function() {
	'use strict';

	var originalLeave = $.fn.popover.Constructor.prototype.leave;
	$.fn.popover.Constructor.prototype.leave = function(obj){
	  var self = obj instanceof this.constructor ?
		obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
	  var container, timeout;

	  originalLeave.call(this, obj);
	  if(obj.currentTarget) {
		container = $(obj.currentTarget).siblings('.popover')
		timeout = self.timeout;
		container.one('mouseenter', function(){
		  //We entered the actual popover – call off the dogs
		  clearTimeout(timeout);
		  //Let's monitor popover content instead
		  container.one('mouseleave', function(){
			$.fn.popover.Constructor.prototype.leave.call(self, self);
		  });
		})
	  }
	};


	$('.panel-heading').hover(function(){
		let id = this.id;
		$(this).attr('data-content', '<a href='+id+'.pdf>PDF</a> or <a href='+id+'.pdf>HTML</a>を閲覧する');
	})

	$('body').popover({ selector: '[data-popover]', trigger: 'click hover', placement: 'auto', delay: {show: 50, hide: 400}});
	
	// いいねボタンの処理
	$('.glyphicon-hand-up').on('click', function(){
		var num = $(this).text();
		var id = $(this).parent().parent().children().attr('id');
		num = parseInt(num);
		num++;
		iine_post(id, num);
		$(this).text(num);
	});

	var iine_post = function(id, num){
		//var data = JSON.stringify(num);
		var data = {};
		data.id = id;
		data.num = num;
		console.log(data);
		$.ajax({
			type : "POST",
			url : "/iine",
			data: JSON.stringify(data, null, '\t'),
			contentType: 'application/json;charset=UTF-8',
			success: function(result) {
				console.log(result);
			}
		});
	}
});
