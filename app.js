/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gameOn, lastRoll, target;

initialize();









//Event Listeners
document.querySelector('.btn-roll').addEventListener('click', roll);

document.querySelector('.btn-hold').addEventListener('click', function() {
    
    if (gameOn && (roundScore !== 0)) {
        document.getElementById(`current-${activePlayer}`).textContent = 0;
        scores[activePlayer] += roundScore;
        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        if (scores[activePlayer] >= target) { 
         gameOn = false;
         document.getElementById(`name-${activePlayer}`).textContent = 'WINNER';

         document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
         document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
        }

        else nextPlayer();
        
        roundScore = 0;
        
    
    }
});

document.querySelector('.btn-new').addEventListener('click', initialize);

document.getElementById('target-score').addEventListener('input', function () {
    target = document.getElementById('target-score').value;
})


// FUNCTIONS
function nextPlayer() {
    document.getElementById('current-' + activePlayer).textContent = '0';
    roundScore = 0;
    lastRoll = 0;
    

    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');

}

function initialize() {
    gameOn = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    lastRoll = 0;
    target = 100;
    document.getElementById('target-score').value = '100';
    document.getElementById(`name-0`).textContent = 'Player 1';
    document.getElementById(`name-1`).textContent = 'Player 2';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.add('active');
}

function roll() {
    if (gameOn) {
    var dice1 = Math.floor(Math.random()*6)+1;
    var dice2 = Math.floor(Math.random()*6)+1;
    var diceDOM1 = document.querySelector('.dice1');
    var diceDOM2 = document.querySelector('.dice2');
    diceDOM1.src = `dice-${dice1}.png`;

    diceDOM2.src = `dice-${dice2}.png`;


    if ((dice1 === 6) && (lastRoll === 6)) { 
        scores[activePlayer] = 0;
        roundScore = 0;
        document.getElementById(`current-${activePlayer}`).textContent = '0';
        document.getElementById(`score-${activePlayer}`).textContent = '0';
        nextPlayer();
    }

    else {
        lastRoll = dice1;

    if ((dice1 !== 1) && (dice2 !== 1)){
        roundScore += (dice1 + dice2);
        document.getElementById(`current-${activePlayer}`).textContent = roundScore;
    }
    else {
        nextPlayer();
    }
    }
    
}

    
}