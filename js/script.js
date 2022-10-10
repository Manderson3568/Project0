const gamestate={
    playerNames:["player-One","player-Two"],
    playerSymbols:['img/x.jpeg','img/0.png'],
    currentTurn: 0,
    board: ["","","","","","","","",""],
    roundCount:1,
    topLeft: ["",0],
    topCen: ["",1],
    topRight: ["",2],
    midLeft: ["",3],
    midCen: ["",4],
    midRight: ["",5],
    bottomLeft: ["",6],
    bottomCen: ["",7],
    bottomRight: ["",8],
}

function buildBoard(){
    let board = gamestate.board;
    board[0]= gamestate.topLeft[0];
    board[1]= gamestate.topCen[0];
    board[2]= gamestate.topRight[0];
    board[3]= gamestate.midLeft[0];
    board[4]= gamestate.midCen[0];
    board[5]= gamestate.midRight[0];
    board[6]= gamestate.bottomLeft[0];
    board[7]= gamestate.bottomCen[0];
    board[8]= gamestate.bottomRight[0];
    return board
}

function coinFlip(){
    return Math.floor(Math.random()*2);
}

function startGame(){
    currentTurn=coinFlip();
    gamestate.board = buildBoard();
}

$(document).ready(function(){

    $('.gameSquare').on('click',function(e){
        const gameSquare = gamestate[e.target.id];
        $(e.target).html(`<img src="${gamestate.playerSymbols[gamestate.currentTurn]}"></img>`)
        if(gameSquare[0]===''){
            gameSquare[0] = gamestate.playerNames[gamestate.currentTurn]
            buildBoard();
            console.log(gamestate.board);
            checkWin(gameSquare[0], gameSquare[1]);
            roundCount();
            if(gamestate.currentTurn===0){
                gamestate.currentTurn=1;
            }else{
                gamestate.currentTurn=0;
            }
        }else{
            console.log('already taken')
        }   
    })
    $('#start').on('click', function(){
        gamestate.currentTurn = coinFlip();
        gamestate.playerNames[0]=$('#playerOneName').val();
        gamestate.playerNames[1]=$('#playerTwoName').val();
        gamestate.playerSymbols[0]=$('#playerOnePic').val();
        gamestate.playerSymbols[1]=$('#playerTwoPic').val();
        console.log(gamestate.playerNames,gamestate.playerSymbols)     
    })
});

function roundCount(){
    gamestate.roundCount++
    if (gamestate.roundCount === 10 ){
        tie();
    }
}

function tie(){
    console.log('its a tie')
}
function checkWin(player,index){
    checkVert(player,index);
    checkHori(player,index);
    checkPosDiag(player,index);
    checkNegDiag(player,index);
}

function checkVert(player,index){
    let win = 0;
    let checkIndex = index+3;
    const board = gamestate.board
    if(checkIndex<9 && board[checkIndex]===player){
        win++
        checkIndex+=3
        if (win<2 && checkIndex<9 && board[checkIndex]===player){
            win++;
        };
    };
    checkIndex = index-3;
    if(checkIndex>=0 && board[checkIndex]===player){
        win++
        checkIndex-=3
        if (win<2 && checkIndex>=0 && board[checkIndex]===player){
            win++;
        };
    };
    if(win>=2){
        gameOver();
    }
}
function checkPosDiag(player,index){
    let win = 0;
    let checkIndex = index+4;
    const board = gamestate.board;
    if(checkIndex<9 && board[checkIndex]===player){
        win++;
        checkIndex+=4;
        if (win<2 && checkIndex<9 && board[checkIndex]===player){
            win++;
        };
    };
    checkIndex = index-4;
    if(checkIndex>=0 && board[checkIndex]===player){
        win++
        checkIndex-=4;
        if (win<2 && checkIndex>=0 && board[checkIndex]===player){
            win++;
        };
    };
    if(win>=2){
        gameOver();
    }
}
function checkNegDiag(player,index){
    let win = 0;
    let checkIndex = index+2;
    const board = gamestate.board;
    if(checkIndex<9 && board[checkIndex]===player){
        win++;
        checkIndex+=2;
        if (win<2 && checkIndex<9 && board[checkIndex]===player){
            win++;
        };
    };
    checkIndex = index-2;
    if(checkIndex>=0 && board[checkIndex]===player){
        win++;
        checkIndex-=2;
        if (win<2 && checkIndex>=0 && board[checkIndex]===player){
            win++;
        };
    };
    if(win>=2){
        gameOver();
    }
}

function checkHori(player,index){
    let win = 0;
    const row = Math.floor(index/3)
    let checkIndex = index+1;
    let checkRow= Math.floor(checkIndex/3)
    const board = gamestate.board;
    if(checkIndex<9 && board[checkIndex]===player && row===checkRow){
        win++;
        checkIndex+=1;
        checkRow= Math.floor(checkIndex/3)
        if (win<2 && checkIndex<9 && board[checkIndex]===player && row===checkRow){
            win++;
        };
    };
    checkIndex = index-1;
    checkRow= Math.floor(checkIndex/3)
    if(checkIndex>=0 && board[checkIndex]===player && row===checkRow){
        win++
        checkIndex-=1;
        checkRow= Math.floor(checkIndex/3)
        if (win<2 && checkIndex>=0 && board[checkIndex]===player && row===checkRow){
            win++;
        };
    };
    if(win>=2){
        gameOver();
    }
}


function gameOver(){
    console.log(`${gamestate.playerNames[gamestate.currentTurn]} Wins!`)
}