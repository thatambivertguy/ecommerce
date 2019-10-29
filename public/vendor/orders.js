$(function(){
    $.get('/vendor/allorders',(data)=>{
        printingdetails(data);
    console.log(data)    })
  });



  function printingdetails(data){
    var maindiv=$('#table');  
    for(let i=0;i<data.length;i++)
      {
          var rowdiv=$(`<tr></tr>`)
          var count=$(`<td>${i+1}</td>`)
          var productname=$(`<td>${data[i].productname}</td>`)
          var category=$(`<td>${data[i].quantity}</td>`)
          var subcategory=$(`<td>${data[i].price}</td>`)
          var cost=$(`<td>${data[i].paymentmethod}</td>`)
          var quantity=$(`<td>${data[i].status}</td>`)
          var orderid=$(`<td>${data[i].id}</td>`)
        
          var delivered=$('<td><button  type="button" class="btn btn-success">Delivered</button></td>').click(function(e){
            var edited=e.target.parentElement.parentElement.children[1].innerText;
            // console.log(edited)
              $.post('/vendor/orderlist',{id:edited},(data)=>{
                
              window.location.reload("http://localhost:4000/vendor/orderspage");
              })
          })
        

          var del=$('<td><button  type="button" class="btn btn-danger">Delete</button></td>').click(function(e){
            var edited=e.target.parentElement.parentElement.children[1].innerText;
            // console.log(edited)
              $.post('/vendor/deleteorder',{id:edited},(data)=>{
                
              window.location.reload("http://localhost:4000/vendor/orderspage");
              })
          })

          rowdiv.append(count,orderid,productname,category,subcategory,cost,quantity,delivered,del);
          maindiv.append(rowdiv);
      }
  }

