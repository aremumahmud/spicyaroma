function createOrderItem(item) {
    let date = new Date(item.ts).toDateString()
    return `
            <div class="item ">                    
                <div class="item-title ">
                    <div class="head2 ">
                        <p class="title ">Your order :<span class='shw'>${date}</span> </p>
                        <p class="subtitle ">French by restaurant</p>
                    </div>
                </div>
                <div class="incre-decre ${item.complete?'yes':'no'}">
                   
                    <div class="amount">${item.qty}</div>
                    
                </div>
                <div class="price ">
                    <p><sup>${item.currency}</sup>${item.price}</p>
                </div>
            </div>


        `

}

function configureOrderItem(ordercomprise, ts, orderComplete) {
    let order = {}
    order.complete = orderComplete
    order.ts = ts
    order.qty = 0
    order.price = 0
    order.currency = ordercomprise[0].item.currency
    ordercomprise.forEach(item => {
            order.price += item.item.price * item.quantity
            order.qty += item.quantity
        })
        //item.price = ordercomprise.item.price * ordercomprise.quantity
        // item.name = ordercomprise.item.name
    return order
}

fetch('/cacheOrders/' + id)
    .then(res => { return res.json() })
    .then(e => {
        let orders = ''
        console.log(e)
        e.orders.forEach(order => {
            let orderTotal = configureOrderItem(order.orderComprise, order.ts, order.completed)
            orders += createOrderItem(orderTotal)
        })
        document.getElementById('order-display').classList.remove('centereds')
        document.getElementById('empty-order').style.display = 'none'
        document.getElementById('order-display').innerHTML += orders
        document.getElementById('order1').innerHTML = e.orders.length
            //console.log(orders)
    })




document.getElementById('order1-no').onclick = function() {
    document.getElementById('container').style.filter = 'blur(13px)'
    document.getElementById('order-box').style.display = 'flex'
    document.getElementById('modal').style.display = 'flex'
        //document.getElementById('order-display')
}

document.getElementById('foward').onclick = function() {
    document.getElementById('page1').style.display = 'none'
    document.getElementById('paymentpage').style.display = 'flex'
}

document.getElementById('back5').onclick = function() {
    document.getElementById('page1').style.display = 'block'
    document.getElementById('paymentpage').style.display = 'none'
}





// document.getElementById('cart1-no').onclick = function() {

//     let totalCartPrice = calculateCart(cart)
//     document.getElementById('whole-body').style.display = 'none'
//     document.getElementById('total-price').innerHTML = totalCartPrice
//     document.getElementById('total-price2').value = totalCartPrice
//     document.getElementById('shopping-cart-resp').style.display = 'flex'

//     let ids = Object.keys(cart)
//     ids.forEach(id => {
//         document.getElementById(id + 'close').onclick = function() {
//             if (!confirm('wanna delete this from your cart!'))
//                 return
//             delete cart[id]
//             cacheCart(cart)
//             document.getElementById(id + 'itemId').style.display = 'none'
//             let totalCartPrice = calculateCart(cart)
//             document.getElementById('total-price').innerHTML = totalCartPrice
//             document.getElementById('total-price2').value = totalCartPrice
//         }
//         document.getElementById(id + 'incre').onclick = function() {
//             cart[id].quantity = Number(document.getElementById(id + 'amount').innerHTML) + 1
//             document.getElementById(id + 'amount').innerHTML = Number(document.getElementById(id + 'amount').innerHTML) + 1
//             let totalCartPrice = calculateCart(cart)
//             cacheCart(cart)
//             document.getElementById('total-price').innerHTML = totalCartPrice
//             document.getElementById('total-price2').value = totalCartPrice
//         }

//         document.getElementById(id + 'decre').onclick = function() {
//             if (Number(document.getElementById(id + 'amount').innerHTML) == 1) return
//             cart[id].quantity = Number(document.getElementById(id + 'amount').innerHTML) - 1
//             document.getElementById(id + 'amount').innerHTML = Number(document.getElementById(id + 'amount').innerHTML) - 1
//             let totalCartPrice = calculateCart(cart)
//             cacheCart(cart)
//             document.getElementById('total-price').innerHTML = totalCartPrice
//             document.getElementById('total-price2').value = totalCartPrice
//         }
//     })
// }