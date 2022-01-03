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
    let shipValidator
    let validator
    for (i in ship) {
        shipValidator = true
        while (shipValidator) {
            validator = [] // variable para verificar que todos los espacios en donde se hará el render de los ships esten vacios
            positionX = Math.floor(Math.random() * 10) // posición donde se ubicará el ship en el eje X 
            positionY = Math.floor(Math.random() * 10) // posición donde se ubicará el ship en el eje Y
            // comprobar que el math.random mantenga el rango entre 0 y 8
            while (positionX > 8) {
                positionX = Math.floor(Math.random() * 10)
            }
            while (positionY > 8) {
                positionY = Math.floor(Math.random() * 10)
            }
            assignBoolean = Math.floor(Math.random() * 10) // asignar randomly si el barco va vertical o horizontal
            if (assignBoolean > 4){
                direction = true // horizontal
            } else {
                direction = false // vertical
            }
            // console.log(`x = ${positionX}. y = ${positionY}, dirección = ${direction}, ship = ${ship[i].length}`)

            // dirección en la que se ubicará el ship, se chequea primero si será horizontal o vertical
            if (direction) {
                // se verifica si el ship encaja en el matrix comparando su tamaño con la ubicación
                if (positionX > ship[i].length - 1){
                    // se inicia un loop donde se verifica cada ubicación donde se ubicará el ship, haciendo un push en validator
                    for (let j = 0; j < ship[i].length; j++) {
                        if (matrix[positionY][positionX-j] == 0) {
                            validator.push(true)
                        }
                    }
                    // console.log(`x = ${positionX}. y = ${positionY}, dirección = horizontal, ship = ${ship[i].length}, validación = ${validator.every(validation)}`)
                    //  se validará si el tamaño del barco coincide con todos push que se hicieron a validator
                    if (validator.length == ship[i].length){
                        // se validará si todos los elementos del array son true con la función validation
                        if (validator.every(validation)){
                            // se posiciona el ship y se cambia la variable shipValidator a false para que se salga del loop while
                            // cada vez que el loop no entra en todos los ifs, se repite hasta encontrar una posición correcta para el ship.
                            for (let j = 0; j < ship[i].length; j++) {
                                matrix[positionY][positionX-j] = 1
                            }
                            shipValidator = false
                        }
                    }
                }
            } else {
                // vertical
                if (positionY > ship[i].length - 1){
                    for (let j = 0; j < ship[i].length; j++) {
                        if (matrix[positionY-j][positionX] == 0) {
                            validator.push(true)
                        }
                    }
                    // console.log(`x = ${positionX}. y = ${positionY}, dirección = vertical, ship = ${ship[i].length}, validación = ${validator.every(validation)}`)
                    if (validator.length == ship[i].length){
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
    }
    // se retorna la matrix con todos los ships en sus respectivas posiciones
    return matrix
}

const attack = (x, y, object) => {
    if (gameMatrix[y][x] == 1){
        object.classList.add("table-danger")
    } else {
        object.classList.add("table-dark")
    }
}

$( "td" ).click(function(event) {
    let spotClick = event.currentTarget.id
    let coordsX
    let coordsY
    for (y in spotMatrix) {
        for (x in spotMatrix[y]){
            if (spotMatrix[y][x] == spotClick){
                coordsX = x
                coordsY = y
            }
        }
    }
    // console.log(event.currentTarget)
    attack(coordsX, coordsY, event.currentTarget)
    // console.log(`[${coordsY}][${coordsX}]`)
})

$( "#fire" ).click(function() {

    console.log(`[${$("form")[0][0].value}][${$("form")[0][1].value}]`)
    let coordsX = $("form")[0][0].value.toLowerCase()
    switch (coordsX) {
        case 'a':
            coordsX = 0
            break;
        case 'b':
            coordsX = 1
            break;
        case 'c':
            coordsX = 2
            break;
        case 'd':
            coordsX = 3
            break;
        case 'e':
            coordsX = 4
            break;
        case 'f':
            coordsX = 5
            break;
        case 'g':
            coordsX = 6
            break;
        case 'h':
            coordsX = 7
            break;
        case 'i':
            coordsX = 8
            break;
        default:
            alert('X coord has to be a letter from A to I...')
    }
    let coordsY = $("form")[0][1].value - 1
        if((coordsY < 0) || (coordsY > 8)){
            alert('Y coord has to be a number from 1 to 9')
        }
    let locateID = spotMatrix[coordsY][coordsX]
    console.log(locateID)
    if (gameMatrix[coordsY][coordsX] == 1){
        $( `#${locateID}`).addClass("table-danger")
    } else if (gameMatrix[coordsY][coordsX] == 0) {
        $( `#${locateID}`).addClass("table-dark")
    }
    $("form")[0][0].value = ''
    $("form")[0][1].value = ''
}) 

$( "#show" ).click(function() {
    for (i in gameMatrix) {
        for (j in gameMatrix) {
            if (gameMatrix[i][j] == 1){
                $( `#${spotMatrix[i][j]}`).toggleClass("orange-borders")
            }
            
        }
    }
})

renderMatrix(gameMatrix, ships)