const sithTitles=[
    {
        name:"The Scarred"
    },
    {
        name:"The Malevolant"
    },
    {
        name:"The Cowardly"
    },
    {
        name:"The Indomitable"
    },
    {
        name:"The Mighty"
    },
    {
        name:"The Gungan Hunter"
    }
]

const jediTitles=[
    {
        name:"The Holy"
    },
    {
        name:"The Undaunted"
    },
    {
        name:"The Mighty"
    },
    {
        name:"The Frail"
    },
    {
        name:"The Blind"
    },
    {
        name:"The Gungan Hunter"
    }
]

function randomArr(array){
    return array[Math.floor(Math.random()*array.length)]
}
var theme = new Audio('sounds/theme.mp3');

// an object to store all the game information. anything player related keeps the same index for their information.
const gamestate={
    playerNames:["player-One","player-Two"],
    playerSymbols:['img/x.jpeg','img/0.png'],
    scores:[0,0],
    currentTurn: 0,
    board: ["","","","","","","","",""],
    roundCount:1,
    //gamesquare IDs will be used to find these. it also stores the starting index for the win condition.
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

// fills in the board array for win conditions later
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

$(document).ready(function(){
    $('#destiny').on('click',starwarsScroller)
    $('.gameSquare').on('click',function(e){
        const gameSquare = gamestate[e.target.id]; //uses the ID as the object key
        // console.log(`ID: `, e.target.id, "gameSquare:", gameSquare);
        let turn = gamestate.currentTurn
        if(gameSquare[0]===''){ //checks of the square clicked is empty
            $(e.target).html(`<img src="${gamestate.playerSymbols[turn]}"></img>`)//fills in the image 
            gameSquare[0] = gamestate.playerNames[turn]// fills the array to indicate the spot is used
            buildBoard(); //updates board array
            // console.log(gamestate.board);
            checkWin(gameSquare[0], gameSquare[1]); // feeds in the array value and index to be checked for win condition
            roundCount(); //checks for tie condition and increments turn count
            if(turn===0){ //swaps player turn
                gamestate.currentTurn=1;
            }else{
                gamestate.currentTurn=0;
            }
        }else{
            console.log('already taken') // to be replaced with a fail noise
        }
        updateScreenInfo();   // updates the screen information
    })
    $('#reset').on('click', resetGame)
});

function starwarsScroller(){
    if($('#JediInput').val()!==""&& $('#SithInput').val()!==""){    
    theme.play();
    gamestate.playerNames[0] = `Jedi Knight ${$('#JediInput').val()} ${randomArr(jediTitles).name}`;
    gamestate.playerNames[1] = `Darth ${$('#SithInput').val()} ${randomArr(sithTitles).name}`;
    $('#jediName').html(gamestate.playerNames[0]);
    $('#sithName').html(gamestate.playerNames[1]);
    startGame();
    $('#getNames').addClass('hidden');
    $('#scrollingText').removeClass('hidden');
    setTimeout(fromScroller,30000);
    }else{
        alert('Must enter names')
    }
};
function startGame(){
    gamestate.currentTurn= Math.floor(Math.random()*2); // chooes who gets to go first
    gamestate.board = buildBoard();
    updateScreenInfo();
};
function updateScreenInfo(){
    $('#playerOneName').html(`${gamestate.playerNames[0]}`);
    $('#playerTwoName').html(`${gamestate.playerNames[1]}`);
    $('#playerOneScore').html(`Score: ${gamestate.scores[0]}`);
    $('#playerTwoScore').html(`Score: ${gamestate.scores[1]}`);
    $('#currentTurn').html(`Round ${gamestate.roundCount}: ${gamestate.playerNames[gamestate.currentTurn]}'s attack`)

};

function roundCount(){
    gamestate.roundCount++
    if (gamestate.roundCount === 10 ){
        tie();
    };
};

function tie(){
    console.log('its a tie')
};

function checkWin(player,index){
    check(player,index,3);
    checkHori(player,index);
    check(player,index,4);
    check(player,index,2);
};

function validate(checkIndex,win,square,player){
    return checkIndex <9 && checkIndex>=0&& win<2 && square===player
};

function check(player,index,increment){
    let win = 0;
    let checkIndex = index+increment;
    const board = gamestate.board
    if(validate(checkIndex,win,board[checkIndex],player)){
        win++
        checkIndex+=increment
        if (validate(checkIndex,win,board[checkIndex],player)){
            win++;
        };
    };
    checkIndex = index-increment;
    if(validate(checkIndex,win,board[checkIndex],player)){
        win++
        checkIndex-=increment
        if (validate(checkIndex,win,board[checkIndex],player)){
            win++;
        };
    };
    if(win>=2){
        gameOver();
    };
};

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
    if(gamestate.currentTurn === 0){
        $('#winQuote').html(`<p>${gamestate.playerNames[gamestate.currentTurn]} Wins!</p>`);
        $('#vicImg').attr('src','img/victoryYouSay.jpeg')
        let sound= new Audio('sounds/yoda.mp3');
        sound.play();
    }else{
        $('#winQuote').html(`<p>${gamestate.playerNames[gamestate.currentTurn]} Wins!</p>`);
        $('#vicImg').attr('src','img/unlimitedPower.jpeg')
        let sound= new Audio('sounds/unlimited-power_mB9IhRp.mp3');
        sound.play();
    }
    gamestate.scores[gamestate.currentTurn]++  
    $('#gameBox').addClass('hidden');
    $('#gameOver').removeClass('hidden')
//random end of game response here
}

function resetGame(){
    console.log('play again')
    gamestate.roundCount=1
    gamestate.topLeft= ["",0]
    gamestate.topCen= ["",1]
    gamestate.topRight= ["",2]
    gamestate.midLeft= ["",3]
    gamestate.midCen= ["",4]
    gamestate.midRight= ["",5]
    gamestate.bottomLeft= ["",6]
    gamestate.bottomCen= ["",7]
    gamestate.bottomRight= ["",8]
    buildBoard();
    updateScreenInfo();
    $('.gameSquare').className='gameSquare';
    $('.gameSquare').html('');
    $('#gameBox').removeClass('hidden');
    $('#gameOver').addClass('hidden')
}

function fromScroller(){
    theme.pause();
    $('#scrollingText').addClass('hidden');
    game();
}
function game(){

    $('#gameBox').removeClass('hidden');
}