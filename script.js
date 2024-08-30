const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)


const winningCombinations = [
    // Horizontal Wins
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    
    // Vertical Wins
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    
    // Diagonal Wins
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];

function strcor(cor) {
    return '#grid' + String(cor[0]) + String(cor[1])
}

function Grid() {
    this.enter = function(char, cor){
        if(this.getdiv(cor).innerText == ''){
            this.getdiv(cor).innerText = char
            return true
        }else {
            return false
        }
    }

    this.getdiv = (cor) => {
        var str = String(cor[0]) + String(cor[1])
        return $('#grid' + str)
    }

    this.checkwin = (char) => {
        var win = false
        for(var ind=0; ind < 8; ind++) {
            var cor1 = strcor(winningCombinations[ind][0])
            var cor2 = strcor(winningCombinations[ind][1])
            var cor3 = strcor(winningCombinations[ind][2])
            if($(cor1).innerText == char & $(cor2).innerText == char & $(cor3).innerText == char) {
                win = true
                $(cor1).classList.add('light');
                $(cor2).classList.add('light');
                $(cor3).classList.add('light');
            }

        }
        return win;
    }

    this.checkdraw = () => {
        draw = true
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                if(this.getdiv([i, j]).innerText == ''){
                    draw = false
                }
            }
        }
        return draw
    }

    this.reset = () => {
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                this.getdiv([i, j]).innerText = ''
                this.getdiv([i, j]).classList.remove('light')
            }
        }
    }
    
}

function createresetbutton() {
    $('.resetbutton').style.display = 'block'
    $('.resetbutton').onclick = () => {
        window.grid.reset()
        $('.resetbutton').style.display = 'none'
    }
}

function Player(char) {
    this.char = char;
}

window.player1 = new  Player('X')
window.player2 = new Player('O')


function switchplayer(){
    if(window.current.char == "X") {
        window.current = window.player2
        $(".message").innerHTML = 'player2 turn'
        console.log(window.current)
        if(window.grid.checkwin('X')){
            $('.message').innerText = "player1 wins!"
            createresetbutton()
        }
        if(window.grid.checkdraw()){
            $('.message').innerText = "its a draw ):"
            createresetbutton()
        }

    }else if(window.current.char == "O") {
        window.current = window.player1
        $(".message").innerHTML = 'player1 turn'
        console.log(window.current)
        if(window.grid.checkwin('O')){
            $('.message').innerText = "player2 wins!"
            createresetbutton()
        }
        if(window.grid.checkdraw()){
            $('.message').innerText = "its a draw ):"
            createresetbutton()
        }
    }

}


window.current = window.player1
window.grid = new Grid()

for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
        $("#grid" + String(i)+String(j)).onclick = ((i, j) => {
            return () => {
                if(window.grid.enter(window.current.char, [i, j])) {
                    switchplayer();
                    console.log()
                    console.log(window.grid.checkwin('O'))
                }
            };
        })(i, j);
    }
}
