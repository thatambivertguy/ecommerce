$(function(){

    $('.home').click(function(e){
        //console.log($(this).parent()[0].childNodes[1].childNodes[0].nodeValue);
       // console.log($(this).parent());
        var theid=$(this).parent()[0].childNodes[1].childNodes[0].nodeValue;
        //var abc=theid.split();
        // $.get('/user/singleproduct',{id:theid},function(data){
        //     console.log('yeah'+ data.name)
        // })

        console.log(theid)
          //  var id=(theid);
            //console.log(id);
        $.ajax({
            type:'get',
            url: "/user/singleproduct",
            
            data: {id:theid},

            success: function(response) {
                //Do Something
                console.log(response.name)
            },
            
        });
    })

})