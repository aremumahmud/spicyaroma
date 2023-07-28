function createItem(item) {
    return `<div class="menu-card">
    <div class="food-stock" style="background-image:url(data:image/jpeg;base64,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)"></div>
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