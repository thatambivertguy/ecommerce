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
          var rowdiv=$(`<tr></tr>`)
          var productname=$(`<td>${data[i].productname}</td>`)
          var quantity=$(`<td>${data[i].quantity}</td>`)
          var price=$(`<td>${data[i].price}</td>`)
          var status=$(`<td>${data[i].status}</td>`)
          
          //   var del=$('<button>delete</button>').click(function(e){
        //     var edited=e.target.parentElement.children[0].innerText;
        //       $.post('/vendor/delete',{name:edited},(data)=>{
        //         //alert('deleted');
        //        // maindiv.empty();
        //       //  printingdetails(data);
        //       window.location.reload("http://localhost:4000/vendor/productdetailspage");
        //       })  
        //   })

          rowdiv.append(serial,productname,quantity,price,status);
          maindiv.append(rowdiv);
      }
  }
