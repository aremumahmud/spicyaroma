let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]

let result = []



function take1(array) {
    let count = 0
    let temp = []
    while (count < 4) {
        console.log(count)
        temp.push(array.shift())
        count++

    }
    result.push(temp)

}

while (array.length != 0) {
    take1(array)
}