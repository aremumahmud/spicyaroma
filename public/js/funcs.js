function createItem(item) {
    return `<div class="menu-card">
    <div class="food-stock" style="background-image:url(${item.picture})"></div>
    <div class="about-stock">
        <div class="description">
          <p>${item.name}</p> 
           
        </div><br>
        <div class="options">
            <p class="pinky">$${item.price}</p>
           <a href='/add_payment'> <p class="buy">Buy</p></a>
           
        </div>
    </div>
</div>`
}

function createCartItem(item, qty = 1) {
    return `<div class="item" id="${item._id+'itemId'}">
    <div class="item-img" style='background-image:url(${item.picture})'></div>
    <div class="item-title">
        <div class="head2">
            <p class="description">${item.name}</p>
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
localStorage.setItem('USER_ID', id)

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