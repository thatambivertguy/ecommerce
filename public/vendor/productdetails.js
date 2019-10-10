$(function(){
    $.get('/vendor/getallproducts',(data)=>{
        printingdetails(data);
    })
  });



  function printingdetails(data){
    var maindiv=$('#table');  
    for(let i=0;i<data.length;i++)
      {
          var rowdiv=$(`<tr></tr>`)
          var productname=$(`<td>${data[i].name}</td>`)
          var category=$(`<td>${data[i].type}</td>`)
          var subcategory=$(`<td>${data[i].subtype}</td>`)
          var cost=$(`<td>${data[i].price}</td>`)
          var quantity=$(`<td>${data[i].stock}</td>`)

        //   var edit=$(`<button>edit</button>`).click(function(e){
        //      console.log(e.target.parentElement.children[0].innerText)
        //       var edited=e.target.parentElement.children[0].innerText;
        //       editing(edited)
        //   })

          var del=$('<button>delete</button>').click(function(e){
            var edited=e.target.parentElement.children[0].innerText;
              $.post('/vendor/delete',{name:edited},(data)=>{
                //alert('deleted');
               // maindiv.empty();
              //  printingdetails(data);
              window.location.reload("http://localhost:4000/vendor/productdetailspage");
              })  
          })

          rowdiv.append(productname,category,subcategory,cost,quantity,del);
          maindiv.append(rowdiv);
      }
  }


//   function editing(data)
//   {
        
       
//         $.post('/vendor/updatecostanddescription',{name:data},dat=>{
//            console.log(dat.price)
//             console.log(dat.description)
//            $('#ed').val(dat.price)
//             $('#te').append(dat.description)

//         })


//   }