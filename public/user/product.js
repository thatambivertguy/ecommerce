
$(function () {

        $('#searchbtn').click(function () {

        searchinput = $('#searchinput');
        term = searchinput.val();
        // $.get( "test.cgi", { name: "John", time: "2pm" } )
        // .done(function( data ) {
        //   alert( "Data Loaded: " + data );
        // });
        $.post('/user/search', { term: term }, (data) => {
            printingproducts(data);
        })
        
    })

    $.get('/user/getallproducts', (data) => {
        printingproducts(data);
    })

    $('#apply').click(function () {
        var price = $('#myRange').val();
        var type = "";
        var subtype = "";
        $("input[name='type']:checked").each(function () {
            var idVal = $(this).attr("id");
            type = $("label[for='" + idVal + "']").text()
        });
        $("input[name='sub-type']:checked").each(function () {
            var idVal = $(this).attr("id");
            subtype = $("label[for='" + idVal + "']").text()
        });
        $.post('/user/filterprod', { type, subtype, price }, (data) => {
            printingproducts(data)
        })
    });

})


function printingproducts(data) {
    mydiv = $('#myproducts');
    mydiv.empty();
    for (let i = 0; i < data.length; i++) {
        carddiv = $(`<div class="card"></div>`);
        image = $(`<img src="/uploads/${data[i].image}" alt="${data[i].name}" height="170px"   style="width:100% ">`);
        names = $(`<h5>${data[i].name}</h5>`);
        price = $(`<p class="price">${data[i].price}</p>`)
        description = $(`<p style="overflow: auto;display:none">${data[i].description}</p>`)
        dffdsf = $(`<p class="unique"style='display:none'>${data[i].id}</p>`)
        df = $(`<p id="vendor" style='display:none'>${data[i].vendor}</p>`)
        imgs = $(`<p id="image-add" style='display:none'>${data[i].image}</p>`)
        addtocart = $(`<button class="addtocart">add to cart</button>`);
        wishlist = $(`<button class="wishlist">wish list</button>`);
        para = $(`<p></p>`);
        para.append(addtocart, wishlist);
        carddiv.append(image, names, price, description, para, dffdsf, df, imgs);
        mydiv.append(carddiv);
    }


    $('.addtocart').unbind('click').bind('click', function (e) {
        console.log("dfds")
        var targetdiv = ($(this).parent().parent())[0]
        var productname = targetdiv.innerText.split("\n")[0]
        var price = targetdiv.innerText.split("\n")[2]
        var productid = e.target.parentElement.parentElement.children[5].innerText
        var vendor = e.target.parentElement.parentElement.children[6].innerText
        var imageat = e.target.parentElement.parentElement.children[7].innerText
        $.post('/user/addtocart', { productname, productid, price, vendor, imageat }, (data) => {
            console.log(data)
            alert("PRODUCT ADDED TO CART")
        })
    });
    $('.wishlist').unbind('click').bind('click', function (e) {
        console.log('working')
        var targetdiv = ($(this).parent().parent())[0]
        var productname = targetdiv.innerText.split("\n")[0]
        var price = targetdiv.innerText.split("\n")[2]
        var productid = e.target.parentElement.parentElement.children[5].innerText
        var vendor = e.target.parentElement.parentElement.children[6].innerText
        var imageat = e.target.parentElement.parentElement.children[7].innerText
        $.post('/user/addtowishlist', { productname, productid, price, vendor, imageat }, (data) => {
            console.log(data)
            alert("PRODUCT ADDED TO WISHLIST")
        })
    });
}



