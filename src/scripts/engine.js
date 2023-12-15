/**
 * Constante que armazena o estado geral do jogo.
 */
const state = {
    view : {
        squares : document.querySelectorAll(".square"),
        enemy : document.querySelector(".enemy"),
        timeLeft : document.querySelector("#timeLeft"),
        score : document.querySelector("#score")
    },
    values : {
        gameVelocity: 800,
        hitPosition : 0,
        result: 0,
        currentTime: 60
    },
    actions : {
        timerId : null,
        countDownTimerId : setInterval(countDown, 1000),
    }
};

/**
 * Calcula o tempo restante da partida
 */
function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        // Reseta a posição do inimigo
        state.values.hitPosition = null;

        alert("Game Over! O seu resultado foi: "+state.values.result);
    }
}

function playSound(audioName) {
    const audio = new Audio(`src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

/**
 * Posiciona o inimigo (Ralph) em um quadrado aleatório.
 */
function randomSquare() {
    // Remove a classe "enemy" de todos os squares
    state.view.squares.forEach(square => square.classList.remove("enemy"));

    // Gera um número aleatório de 1 a 9
    const randomNumber = Math.floor(Math.random()*9);
    // Obtêm o quadrado na posição referente ao número aleatório
    const randomSquare = state.view.squares[randomNumber];
    // Adiciona a classe "enemy" ao quadrado obtido aleatóriamente
    randomSquare.classList.add("enemy");
    // Armazena a posição do inimigo
    state.values.hitPosition = randomSquare.id;
}

/**
 * Atualiza a posição do inimigo
 */
function refreshEnemyPosition() {
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

/**
 * Processa o clique do jogador e calcula o placar
 */
function addListenerHitBox() {
    state.view.squares.forEach(square => {
        square.addEventListener("click", (event) => {
            const isEnemyHit = square.id === state.values.hitPosition;
            if (isEnemyHit) {
                // Aumenta o placar do jogador
                state.values.result++;
                // Atualiza a exibição do placar do jogador
                state.view.score.textContent = state.values.result;
                // Reseta a posição do inimigo
                state.values.hitPosition = null;
                playSound("hit");
            }
        });
    });
}

function init() {
    refreshEnemyPosition();
    addListenerHitBox();
}

init();