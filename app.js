document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', fill);
    });
});

document.querySelector('button').addEventListener('click', () => {
    location.reload()
})

const h2Header = document.querySelector('.sub-title')

class Turn {
    gameOn = true;
    gameTurn = 0
    eachGameInput = {
        'X':0,
        'O':0,
    }
    winAudio = new Audio('audios/win-audio.wav')
    click = new Audio('audios/click.wav')
    changeTurn(turn){
        this.gameTurn = turn
        h2Header.innerHTML = turn == 0 ? 'X תור של' : 'O תור של'
    }
    win(symbol){
        this.gameOn = false
        h2Header.innerHTML = `ניצח ${symbol}`
        this.winAudio.play()
    }
}
const turnClass = new Turn()

function fill(event){
    const target = event.target
    if(turnClass.gameOn){
        if(target.innerHTML == ''){
            turnClass.click.play()
            switch(turnClass.gameTurn){
                case 0:
                    target.innerHTML = 'X'
                    turnClass.eachGameInput['X'] ++
                    if (turnClass.eachGameInput['X'] >= 3) {
                        didWon = checkForWin('X')
                        if(didWon && didWon != '0') return turnClass.win('X')
                        if(didWon == '0') return
                    }
                    turnClass.changeTurn(1)
                    break;
                case 1:
                    target.innerHTML = 'O'
                    turnClass.eachGameInput['O'] ++
                    if (turnClass.eachGameInput['O'] >= 3){
                        didWon = checkForWin('O')
                        if(didWon && didWon != '0') return turnClass.win('O')
                        if(didWon == '0') return
                    }
                        turnClass.changeTurn(0)
            }
        }else{
            const errorMessageElement = document.querySelector('.error')
            if(errorMessageElement){
                errorMessageElement.innerHTML = 'המשבצת תפוסה'
                errorMessageElement.style.display = 'inline-block'
                setTimeout(() => {
                    errorMessageElement.innerHTML = ''
                }, 3000)
            }
        }
    }else{
        const errorMessageElement = document.querySelector('.error')
        if(errorMessageElement){
            errorMessageElement.innerHTML = 'המשחק נגמר כבר'
            errorMessageElement.style.display = 'inline-block'
            setTimeout(() => {
                errorMessageElement.innerHTML = ''
            }, 3000)
        }
    }
}

function checkForWin(symbol){
    const tdList = Array.from(document.querySelectorAll('td'));
    const table = [
        [tdList[0].innerHTML, tdList[1].innerHTML, tdList[2].innerHTML],
        [tdList[3].innerHTML, tdList[4].innerHTML, tdList[5].innerHTML],
        [tdList[6].innerHTML, tdList[7].innerHTML, tdList[8].innerHTML],
    ]
    for(let i = 0; i < 3; i++){
        if(table[i].every(td => td == symbol)) return true
    }
    for(let i = 0; i < 3; i++){
        if(table[0][i] == symbol && table[1][i] == symbol && table[2][i] == symbol){
            return true
        }
    }
    if (table[0][0] == symbol && table[1][1] == symbol && table[2][2] == symbol) {
        return true;
    }
    if (table[0][2] == symbol && table[1][1] == symbol && table[2][0] == symbol) {
        return true;
    }
    if(tdList.every(td => td.innerHTML != '')){
        turnClass.gameOn = false
        h2Header.innerHTML = 'תיקו'
        return '0'
    }
}