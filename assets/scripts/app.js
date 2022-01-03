let spotMatrix = [
    ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1", "i1"],
    ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2", "i2"],
    ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3", "i3"],
    ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4", "i4"],
    ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5", "i5"],
    ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6", "i6"],
    ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7", "i7"],
    ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8", "i8"],
    ["a9", "b9", "c9", "d9", "e9", "f9", "g9", "h9", "i9"]
]

let gameMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0]
]

let ships = [
    [12, 22],
    [13, 23, 33],
    [113, 123, 133],
    [14, 24, 34, 44],
    [15, 25, 35, 45, 55]
]

const validation = (boolean) => boolean == true

const renderMatrix = (matrix, ship) => {
    let positionX
    let assignBoolean
    let direction
    let positionY
    let shipSize
    let shipValidator
    let validator
    for (i in ship) {
        shipValidator = true
        while (shipValidator) {
            validator = []
            shipSize = ship[i].length
            positionX = Math.floor(Math.random() * 10)
            positionY = Math.floor(Math.random() * 10)
            while (positionX > 8) {
                positionX = Math.floor(Math.random() * 10)
            }
            while (positionY > 8) {
                positionY = Math.floor(Math.random() * 10)
            }
            assignBoolean = Math.floor(Math.random() * 10) // asignar random si el barco va vertical o horizontal
            if (assignBoolean > 4){
                direction = true // horizontal
            } else {
                direction = false // vertical
            }
            console.log(`x = ${positionX}. y = ${positionY}, dirección = ${direction}, ship = ${ship[i].length}`)
            if (direction) {
                if (positionX > ship[i].length - 1){
                    for (let j = 0; j < ship[i].length; j++) {
                        if (matrix[positionY][positionX-j] == 0) {
                            validator.push(true)
                        }
                    }
                    console.log(`x = ${positionX}. y = ${positionY}, dirección = horizontal, ship = ${ship[i].length}, validación = ${validator.every(validation)}`)
                    if (validator.length == ship[i].length){
                        if (validator.every(validation)){
                            for (let j = 0; j < ship[i].length; j++) {
                                matrix[positionY][positionX-j] = ship[i][j]
                            }
                            shipValidator = false
                        }
                    }
                }
            } else {
                if (positionY > ship[i].length - 1){
                    for (let j = 0; j < ship[i].length; j++) {
                        if (matrix[positionY-j][positionX] == 0) {
                            validator.push(true)
                        }
                    }
                    console.log(`x = ${positionX}. y = ${positionY}, dirección = vertical, ship = ${ship[i].length}, validación = ${validator.every(validation)}`)
                    if (validator.length == ship[i].length){
                        if (validator.every(validation)){
                            for (let j = 0; j < ship[i].length; j++) {
                                matrix[positionY-j][positionX] = ship[i][j]
                            }
                            shipValidator = false
                        }
                    }
                    
                }
            }
        }
    }
    return matrix
}