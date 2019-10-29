$(function(){
    $.get('/user/allorders',(data)=>{
        console.log(data)
        printingdetails(data);
    })
  });



  function printingdetails(data){
    var maindiv=$('#table');  
    for(let i=0;i<data.length;i++)
      {   var serial=$(`<th scope="row">${i+1}</th>`)
          var orderid=$(`<td>${data[i].id}</td>`)
          var rowdiv=$(`<tr></tr>`)
          var productname=$(`<td>${data[i].productname}</td>`)
          var quantity=$(`<td>${data[i].quantity}</td>`)
          var price=$(`<td>${data[i].price}</td>`)
          var status=$(`<td>${data[i].status}</td>`)
          if(data[i].status=="Delivered"){
            rowdiv.append(serial,orderid,productname,quantity,price,status);
          }
          else{
          var del=$('<td><button  type="button" class="btn btn-danger">Delete</button></td>').click(function(e){
            var edited=e.target.parentElement.parentElement.children[1].innerText;
            // console.log(edited)
              $.post('/user/orderupdate',{id:edited},(data)=>{
                
              window.location.reload("http://localhost:4000/user/orders");
              })
          })

          rowdiv.append(serial,orderid,productname,quantity,price,status,del);}
          maindiv.append(rowdiv);
      }
  }
