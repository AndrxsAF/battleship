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

// validation function, used to verify every element of the array //

const validation = (boolean) => boolean == true

// attack function, changes the status of the game and also modifies cells class //

const attack = (x, y) => {
    let id = (String.fromCharCode(97 + Number(x))) + (Number(y) + 1)
    if (gameMatrix[y][x] == 0) {
        $(`#${id}`).addClass("table-dark")
        gameMatrix[y][x] = 3
    } else if (gameMatrix[y][x] == 1){
        $(`#${id}`).addClass("table-danger")
        gameMatrix[y][x] = 2
    }
}

// render game matrix function //

const renderMatrix = (matrix, ship) => {
    let positionX, assignBoolean, direction, positionY, shipValidator, validator
    for (i in ship) {
        shipValidator = true
        while (shipValidator) {
            validator = []
            do {
                positionX = Math.floor(Math.random() * 10)
            } while (positionX > 8)
            do {
                positionY = Math.floor(Math.random() * 10)
            } while (positionY > 8)
            assignBoolean = Math.floor(Math.random() * 10)
            assignBoolean > 4 ? direction = true : direction = false 
            if (direction) {
                if (positionX > ship[i].length - 1){
                    for (let j = 0; j < ship[i].length; j++) {
                        matrix[positionY][positionX-j] == 0 ? validator.push(true) : validator.push(false)
                    }
                    if (validator.every(validation)){
                        for (let j = 0; j < ship[i].length; j++) {
                            matrix[positionY][positionX-j] = 1
                        }
                        shipValidator = false
                    }
                }
            } else {
                if (positionY > ship[i].length - 1){
                    for (let j = 0; j < ship[i].length; j++) {
                        matrix[positionY-j][positionX] == 0 ? validator.push(true) : validator.push(false)
                    }
                    if (validator.every(validation)){
                        for (let j = 0; j < ship[i].length; j++) {
                            matrix[positionY-j][positionX] = 1
                        }
                        shipValidator = false
                    }
                }
            }
        }
    }
    return matrix
}

// fire a cell function with click listener //

$( "td" ).click(function(event) {
    let id = event.currentTarget.id.split('')
    attack(id[0].charCodeAt(0) - 97, Number(id[1]) - 1)
})

// fire a cell function with keyboard listener //

$( "#fire" ).click(function() {
    let coordsX = $("form")[0][0].value.toLowerCase().charCodeAt(0) - 97
    if (coordsX > 8) { alert('X coord has to be a letter from A to I...') }
    let coordsY = $("form")[0][1].value - 1
    if((coordsY < 0) || (coordsY > 8)) { alert('Y coord has to be a number from 1 to 9') }
    if((coordsY >= 0) && (coordsY < 9) && (coordsX < 9) && (coordsX >= 0)){ attack(coordsX, coordsY) }
    $("form")[0][0].value = ''
    $("form")[0][1].value = ''
}) 

// show ships function //

$( "#show" ).click(function() {
    for (i in gameMatrix) {
        for (j in gameMatrix) {
            if (gameMatrix[i][j] == 1 || gameMatrix[i][j] == 2){
                $(`#${(String.fromCharCode(97 + Number(j)))}${Number(i)+1}`).toggleClass("orange-borders")
            }
        }
    }
})

// initialize game //

renderMatrix(gameMatrix, ships)