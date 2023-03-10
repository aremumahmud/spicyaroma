let result = []
let funcs = []
let menus = []
let cart = {}
let array = JSON.parse(document.getElementById('products').value)

function take1(array) {
    let count = 0
    let temp = []
    while (count < 4) {
        temp.push(array.shift())
        count++

    }
    result.push(temp)

}

while (array.length != 0) {
    take1(array)
}

function createItem(item) {
    return `<div class="menu-card">
    <div class="food-stock" style="background-image:url(${item.picture})"></div>
    <div class="about-stock">
        <div class="title">
            <p>${item.name}</p>
        </div>
        <div class="options">
            <p class="pinky">${item.currency+item.price}</p>
            <p class="buy" id='${item._id}'>Buy</p>
            <p class="pinky">&#10084;</p>
        </div>
    </div>
</div>`
}

function createCartItem(item, qty = 1) {
    return `<div class="item" id="${item._id+'itemId'}">
    <div class="item-img ${item.name.toLowerCase()}"></div>
    <div class="item-title">
        <div class="head2">
            <p class="title">${item.name}</p>
            <p class="subtitle">French by restaurant</p>
        </div>
    </div>
    <div class="incre-decre">
        <p id='${item._id+'decre'}'>-</p>
        <div class="amount" id='${item._id+'amount'}'>${qty}</div>
        <p id='${item._id+'incre'}'>+</p>
    </div>
    <div class="price">
        <p><sup>${item.currency}</sup>${item.price}</p>
    </div>
    <div class="close" id="${item._id+'close'}">x</div>

</div>`

}

function calculateCart(cart) {
    let keys = Object.keys(cart)
    let total = 0
    keys.forEach(key => {
        let currValue = cart[key]
            // console.log(currValue)
        let totalAmount = currValue.quantity * currValue.item.price
            // console.log(totalAmount)
        total += totalAmount
    })
    return total
}

let id = document.getElementById('_id').value

function cacheCart(cart, cb) {
    console.log(cart)
    fetch('/cacheCart/' + id, {
        method: 'post',
        body: new URLSearchParams({
            cart: JSON.stringify(cart),
            id
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'

        }
    }).then(x => {
        console.log(x)
        cb && cb(null, x)
    }).catch(e => {
        cb && cb(e, null)
        console.log(x)
    })
}


function itemify(cart) {
    let itemified = []
    let keys = Object.keys(cart)
    keys.forEach(key => {
        itemified.push(cart[key])
    })
    return itemified
}







fetch('/cacheCart/' + id).then(res => {
    return res.json()
}).then(res2 => {
    console.log(res2)
    if (res2.status == 'not found') return
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

document.getElementById('cart-no').onclick = function() {

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
    document.getElementById('cart-ting').value = itemify(cart)
    e.target.submit()
}