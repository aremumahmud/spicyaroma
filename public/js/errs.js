setTimeout(() => {
    if (document.getElementById('page').value == 'cart') {
        document.getElementById('cart-no').click()
        document.getElementById('errmsg').innerHTML = document.getElementById('errorMsg').value
    }
}, 200);