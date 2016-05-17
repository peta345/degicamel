+$(function(){
    var spaceCheck = function(){
	var elem = document.getElementsByTagName('input');
        for(var i=0, num=elem.length;i<num;i++){
            if(!elem[i].value.match(/\S/g)){
                return false;
            }
        }
        return true;
    }

    var checkPassLength = function(){
        var passLen = $('#pass').val().length;
        if(passLen<6 || passLen>12){
            return false;
        } else {
            return true;
        }
    }

    var checkPassText = function(){
        var re = /^[a-zA-Z0-9]+$/;
        if(!$('#pass').val().match(re)){
            return false;
        }
        return true;
    }

    var checkPassMatch = function(){
        if($('#pass').val()!==$('#pass_check').val()){
            return false;
        }
        return true;
    }

    $('form').on('submit', function(e){
        if(!spaceCheck()){
            if($('#space')[0]) return false;
            $('#info').append('<div id="space" class="alert alert-danger" role="alert">未記入の項目があります</div>');
            e.preventDefault();
        } else if(spaceCheck()){
            $('#space').remove();
            if(!checkPassLength()){
                if($('#len')[0]) return false;
                $('#info').append('<div id="len" class="alert alert-danger" role="alert">パスワードは6文字以上12文字以下です</div>');
                e.preventDefault();
            } else if(checkPassLength()){
                $('#len').remove();
                if(!checkPassText()){
                    if($('#txt')[0]) return false;
                    $('#info').append('<div id="txt" class="alert alert-danger" role="alert">半角英数字で記入してください</div>');
                    e.preventDefault();
                } else if(checkPassLength()){
                    $('#txt').remove();
                    if(!checkPassMatch()){
                        if($('#mat')[0]) return false;
                        $('#info').append('<div id="txt" class="alert alert-danger" role="alert">パスワードが異なります</div>');
                        e.preventDefault();
                    } else if(checkPassMatch()){
                        e.preventDefault();
                        $('#myModal').modal('show');
                    }
                    // POST~~
                }
            }
        }

    })
})
