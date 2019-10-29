$(() => {
    $.get('/user/getwishlist', (data) => {
        printing(data)
    })
})

function printing(list) {
    table = $('#cart-table')
    table.empty()
    let subtotal = 0;
    for (let i = 0; i < list.length; i++) {
        const total_cost = (list[i].price * list[i].quantity)
        subtotal += total_cost;
        row = $(`<tr></tr>`)
        col_desc = $(`<td></td>`)
        div_desc = $(`<div></div>`)
        img_span = $(`<span><img src="/uploads/${list[i].image}" style="width:200px;" height="200px;"></span>`)
        desc_Span = $(`<span style="position:relative;bottom:50px;">${list[i].productname}</span>`)
        div_desc.append(img_span, desc_Span)
        col_desc.append(div_desc)
        col_price = $(`<td>₹${list[i].price}</td>`)
        col_quantity = $(`<td><input type="number" value="${list[i].quantity}" readonly style="width: 40px;"></td>`)
        col_total = $(`<td><div><span>${total_cost}</span></div></td>`)
        col_addtocart = $(`<td><p id="prod" style='display:none'>${list[i].productid}</p></td>`)
        button_addtocart = $(`<button class="cart btn btn-primary">Add to cart</button>`)
        button_addtocart.unbind('click').bind('click', function (e) {
            console.log('wok')
            var id = e.target.parentElement.children[0].innerText
            console.log(id)
            $.post('/user/wishtocart', { id }, (data) => {
                // console.log(data)
                printing(data)
            })
        })
        col_addtocart.append(button_addtocart)


        col_delete = $(`<td><p id="prod-id" style='display:none'>${list[i].productid}</p></td>`)

        button = $(`<button class="deleta btn btn-primary">Delete</button>`)
        button.unbind('click').bind('click', function (e) {
            console.log('wok')
            console.log(e.target.parentElement.children[0].innerText)
            var id = e.target.parentElement.children[0].innerText
            $.post('/user/deletefromwishlist', { id }, (data) => {
                //    console.log(data)
                printing(data)
            })
        })
        col_delete.append(button)
        row.append(col_desc, col_price, col_quantity, col_total, col_addtocart, col_delete)
        table.append(row)
    }

    ($('#subtot').html(subtotal))
}