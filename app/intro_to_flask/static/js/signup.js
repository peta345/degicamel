+$(function(){

    $('form').on('submit', function(e){
	e.preventDefault();
	if(!allCheck()){
	    console.log("pass")
    	}
	if($('#pass').val() !== $('#pass_check').val()){
	    $('#info').append('<div class="alert alert-warning" role="alert">パスワードが異なります</div>');
	}
    })
    var checkInput = function(){
	
    }  
    var allCheck = function(){
	$('input').each(function(){
	    console.log($(this));
	    if(!$(this).val().match(/\S/g)){
		console.log('kuuhaku is exist');
		return false;
	    }
	    console.log("Hello")
	})
	return true;
    }
})
