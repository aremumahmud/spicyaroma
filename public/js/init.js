let result = []
let funcs = []
let menus = []
let cart = {}
let orders = []
let array = JSON.parse(document.getElementById('products').innerHTML)

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