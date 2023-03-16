fetch('/cacheCart/' + id).then(res => {
    return res.json()
}).then(res2 => {
    console.log(res2)
    if (res2.status == 'not found') return
    if (res2.cart.length == 0) return
    cart = res2.cart
    if (Object.keys(cart).length == 0) return
    let keys = Object.keys(cart)
    console.log(keys)
    let total = 0
    document.getElementById('cart-display').classList.remove('centereds')
    document.getElementById('empty-cart').style.display = 'none'
    keys.forEach(item => {

        document.getElementById('cart-display').innerHTML += createCartItem(cart[item].item, cart[item].quantity)
        total += cart[item].quantity
    })
    document.getElementById('cart').innerHTML = total
    document.getElementById('cart1').innerHTML = total
    document.getElementById('button_sub').disabled = false
    document.getElementById('button_sub').style.cursor = 'pointer'
})



result.forEach(result => {
    let menu = ''
    for (let i = 0; i <= result.length; i++) {
        if (result[i] == undefined) {
            break
        } else {
            menu += createItem(result[i])
            funcs.push(result[i])
        }

    }
    menus.push('<div class="menu"> ' + menu + '</div>')
})

let menuDisplay = menus.join('')
document.getElementById('productsMenu').innerHTML = menuDisplay
    //console.log('menu', menus)
funcs.forEach(item => {
    document.getElementById(item._id).onclick = function() {
        if (!confirm('add this item to cart?')) return
        document.getElementById('cart-display').classList.remove('centereds')
        if (!cart[item._id]) { document.getElementById('cart-display').innerHTML += createCartItem(item) }
        document.getElementById('empty-cart').style.display = 'none'
        document.getElementById('cart').innerHTML = Number(document.getElementById('cart').innerHTML) + 1
        document.getElementById('cart1').innerHTML = Number(document.getElementById('cart').innerHTML) + 1
        if (cart[item._id]) {
            cacheCart(cart)
            document.getElementById('button_sub').disabled = false
            document.getElementById('button_sub').style.cursor = 'pointer'
            document.getElementById(item._id + 'amount').innerHTML = Number(document.getElementById(item._id + 'amount').innerHTML) + 1
            return cart[item._id].quantity += 1
        }
        cart[item._id] = {
            quantity: 1,
            item
        }
        cacheCart(cart)
        document.getElementById('button_sub').disabled = false
        document.getElementById('button_sub').style.cursor = 'pointer'

    }


})

document.getElementById('cart-no').onclick = function(e) {

    console.log(e.target)

    let totalCartPrice = calculateCart(cart)
    document.getElementById('total-price').innerHTML = totalCartPrice
    document.getElementById('total-price2').value = totalCartPrice
    document.getElementById('container').style.filter = 'blur(13px)'
    document.getElementById('shopping-cart').style.display = 'flex'
    document.getElementById('modal').style.display = 'flex'
    let ids = Object.keys(cart)
    ids.forEach(id => {
        document.getElementById(id + 'close').onclick = function() {
            if (!confirm('wanna delete this from your cart!'))
                return
            delete cart[id]
            cacheCart(cart)
            document.getElementById(id + 'itemId').style.display = 'none'
            let totalCartPrice = calculateCart(cart)
            document.getElementById('total-price').innerHTML = totalCartPrice
            document.getElementById('total-price2').value = totalCartPrice
        }
        document.getElementById(id + 'incre').onclick = function() {
            cart[id].quantity = Number(document.getElementById(id + 'amount').innerHTML) + 1
            document.getElementById(id + 'amount').innerHTML = Number(document.getElementById(id + 'amount').innerHTML) + 1
            let totalCartPrice = calculateCart(cart)
            cacheCart(cart)
            document.getElementById('total-price').innerHTML = totalCartPrice
            document.getElementById('total-price2').value = totalCartPrice
        }

        document.getElementById(id + 'decre').onclick = function() {
            if (Number(document.getElementById(id + 'amount').innerHTML) == 1) return
            cart[id].quantity = Number(document.getElementById(id + 'amount').innerHTML) - 1
            document.getElementById(id + 'amount').innerHTML = Number(document.getElementById(id + 'amount').innerHTML) - 1
            let totalCartPrice = calculateCart(cart)
            cacheCart(cart)
            document.getElementById('total-price').innerHTML = totalCartPrice
            document.getElementById('total-price2').value = totalCartPrice
        }
    })
}


document.getElementById('cart1-no').onclick = function(e) {

    console.log(e.target)

    let totalCartPrice = calculateCart(cart)
    document.getElementById('total-price').innerHTML = totalCartPrice
    document.getElementById('total-price2').value = totalCartPrice
    document.getElementById('container').style.filter = 'blur(13px)'
    document.getElementById('shopping-cart').style.display = 'flex'
    document.getElementById('modal').style.display = 'flex'
    let ids = Object.keys(cart)
    ids.forEach(id => {
        document.getElementById(id + 'close').onclick = function() {
            if (!confirm('wanna delete this from your cart!'))
                return
            delete cart[id]
            cacheCart(cart)
            document.getElementById(id + 'itemId').style.display = 'none'
            let totalCartPrice = calculateCart(cart)
            document.getElementById('total-price').innerHTML = totalCartPrice
            document.getElementById('total-price2').value = totalCartPrice
        }
        document.getElementById(id + 'incre').onclick = function() {
            cart[id].quantity = Number(document.getElementById(id + 'amount').innerHTML) + 1
            document.getElementById(id + 'amount').innerHTML = Number(document.getElementById(id + 'amount').innerHTML) + 1
            let totalCartPrice = calculateCart(cart)
            cacheCart(cart)
            document.getElementById('total-price').innerHTML = totalCartPrice
            document.getElementById('total-price2').value = totalCartPrice
        }

        document.getElementById(id + 'decre').onclick = function() {
            if (Number(document.getElementById(id + 'amount').innerHTML) == 1) return
            cart[id].quantity = Number(document.getElementById(id + 'amount').innerHTML) - 1
            document.getElementById(id + 'amount').innerHTML = Number(document.getElementById(id + 'amount').innerHTML) - 1
            let totalCartPrice = calculateCart(cart)
            cacheCart(cart)
            document.getElementById('total-price').innerHTML = totalCartPrice
            document.getElementById('total-price2').value = totalCartPrice
        }
    })
}

document.getElementById('back').onclick = function() {
    document.getElementById('container').style.filter = 'none'
    document.getElementById('shopping-cart').style.display = 'none'
    document.getElementById('modal').style.display = 'none'
}
document.getElementById('back4').onclick = function() {
    document.getElementById('container').style.filter = 'none'
    document.getElementById('shopping-cart').style.display = 'none'
    document.getElementById('modal').style.display = 'none'
}
document.getElementById('back1').onclick = function() {
    document.getElementById('container').style.filter = 'none'
    document.getElementById('order-box').style.display = 'none'
    document.getElementById('modal').style.display = 'none'
}
document.getElementById('back3').onclick = function() {
    document.getElementById('container').style.filter = 'none'
    document.getElementById('order-box').style.display = 'none'
    document.getElementById('modal').style.display = 'none'
}



document.getElementById('paystack').onclick = function(e) {
    e.target.classList.add('picked')
    document.getElementById('check1').checked = true
    document.getElementById('check2').checked = false
    document.getElementById('paypal').classList.remove('picked')

}
document.getElementById('paypal').onclick = function(e) {
    e.target.classList.add('picked')
    document.getElementById('check1').checked = false
    document.getElementById('check2').checked = true
    document.getElementById('paystack').classList.remove('picked')
}

document.getElementById('check1').onchange = function(e) {
    if (e.target.checked) {
        document.getElementById('check2').checked = false
        document.getElementById('paypal').classList.remove('picked')
        return document.getElementById('paystack').classList.add('picked')

    }
    // 

}
document.getElementById('check2').onchange = function(e) {
    if (e.target.checked) {
        document.getElementById('check1').checked = false
        document.getElementById('paystack').classList.remove('picked')
        return document.getElementById('paypal').classList.add('picked')

    }
    // document.getElementById('paypal').classList.remove('picked')
}

document.getElementById('submitin').onsubmit = function(e) {
    e.preventDefault()
    let name = prompt('please enter your full name', 'eg john doe')
    if (name == '') {
        return alert('please provide a name')
    }
    document.getElementById('full_name').value = name
    document.getElementById('cart-ting').value = JSON.stringify(itemify(cart))
    e.target.submit()
}