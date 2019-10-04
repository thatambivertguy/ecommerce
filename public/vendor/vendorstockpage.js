$(function(){
    $.get('/vendor/getallproducts',(data)=>{
        printingdetails(data);
    })
    $('#next').click(()=>{
        console.log('next clicked') 
        // $('.inp').attr('disabled')
        var selected_option =$( "#sel option:selected" ).text(); 
        var stock=$('#num').val()
        var price=$('#price').val()
        var desc=$('#desc').val()  
    $.post('/vendor/updatestock',{stock:stock,price:price,description:desc,productname:selected_option},function(data){
        console.log(data)
    })    
    })
 
  });

function printingdetails(data){
    products=$('#products')
    sel=$(`<select></select>`)
    for(let i=0;i<data.length;i++){
        sel.append(`<option value="${data[i].name}">${data[i].name}</option>`)


    }
    $(sel).attr('id','sel');
    sel.change(()=>{
        console.log('njfsdkjfdsdkj')
        var selected_option =$( "#sel option:selected" ).text();
        console.log(selected_option)
        $.post('/vendor/stockstatus',{name:selected_option},function(data){
            console.log(data)
            $('#num').val(data.stock)
            $('#price').val(data.price)
            $('#desc').val(data.description)
        })
    })
    products.append(sel);
}


function printstock(data)
{
    num=$('#num');
    num.val(data.stock);
}

