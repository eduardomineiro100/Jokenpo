let playerScore = parseInt(localStorage.getItem('playerScore')) || 0;
let computerScore = parseInt(localStorage.getItem('computerScore')) || 0;

// Carregando sons
const winSound = new Audio('sounds/win.mp3');
const loseSound = new Audio('sounds/lose.mp3');
const drawSound = new Audio('sounds/draw.mp3');
const clickSound = new Audio('sounds/click.mp3');

updateScore();

// Adiciona som ao clicar nos botões
document.querySelectorAll('.choices button').forEach(button => {
    button.addEventListener('click', () => {
        clickSound.play();
    });
});

function play(playerChoice) {
    const choices = ['pedra', 'papel', 'tesoura'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    document.getElementById('player-choice').innerText = `Sua escolha: ${emoji(playerChoice)}`;
    document.getElementById('computer-choice').innerText = `Computador: ${emoji(computerChoice)}`;

    const result = determineWinner(playerChoice, computerChoice);

    if (result === 'win') {
        playerScore++;
        document.getElementById('winner').innerText = '🎉 Você venceu!';
        winSound.play();
    } else if (result === 'lose') {
        computerScore++;
        document.getElementById('winner').innerText = '😢 Você perdeu!';
        loseSound.play();
    } else {
        document.getElementById('winner').innerText = '🤝 Empate!';
        drawSound.play();
    }

    updateScore();
    saveScore();
}

function determineWinner(player, computer) {
    if (player === computer) return 'draw';
    if (
        (player === 'pedra' && computer === 'tesoura') ||
        (player === 'papel' && computer === 'pedra') ||
        (player === 'tesoura' && computer === 'papel')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

function updateScore() {
    document.getElementById('player-score').innerText = playerScore;
    document.getElementById('computer-score').innerText = computerScore;
}

function saveScore() {
    localStorage.setItem('playerScore', playerScore);
    localStorage.setItem('computerScore', computerScore);
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    saveScore();
    updateScore();
    document.getElementById('player-choice').innerText = 'Sua escolha: ❓';
    document.getElementById('computer-choice').innerText = 'Computador: ❓';
    document.getElementById('winner').innerText = 'Faça sua jogada!';
}

function emoji(choice) {
    switch (choice) {
        case 'pedra': return '🪨';
        case 'papel': return '📄';
        case 'tesoura': return '✂️';
        default: return '';
    }
}
