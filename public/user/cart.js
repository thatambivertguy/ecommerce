$(()=>{
 $.get('/user/getallfromcart',(data)=>{
      printing(data)
 })
})

function printing(list){
    table=$('#cart-table')
    table.empty()
let subtotal=0;
for(let i=0;i<list.length;i++){
const total_cost=(list[i].price*list[i].quantity)
subtotal+=total_cost;
row=$(`<tr></tr>`)
col_desc=$(`<td></td>`)
div_desc=$(`<div></div>`)
img_span=$(`<span><img src="/uploads/${list[i].image}" style="width:200px;" height="200px;"></span>`)
desc_Span=$(`<span style="position:relative;bottom:50px;">${list[i].productname}</span>`)
div_desc.append(img_span,desc_Span)
col_desc.append(div_desc)
col_price=$(`<td>₹${list[i].price}</td>`)
col_quantity=$(`<td><input type="number" value="${list[i].quantity}" readonly style="width: 40px;"></td>`)
col_total=$(`<td><div><span>${total_cost}</span></div></td>`)
row.append(col_desc,col_price,col_quantity,col_total)
table.append(row)
}
($('#subtot').html(subtotal))
}