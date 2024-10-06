let spaceship = document.getElementById('spaceship');
let gameArea = document.getElementById('game-area');
let scoreDisplay = document.getElementById('score');
let gameOverDisplay = document.getElementById('game-over');
let finalScoreDisplay = document.getElementById('final-score');
let restartButton = document.getElementById('restart-button');
let score = 0;
let wave = 0;
let aliens = [];
let isGameOver = false;

function spawnAliens() {
    let alienCount = 5 + wave; // Increase number of aliens with each wave
    for (let i = 0; i < alienCount; i++) {
        let alien = document.createElement('div');
        alien.className = 'alien';
        alien.style.left = (Math.random() * (gameArea.offsetWidth - 40)) + 'px';
        alien.style.top = '0px';
        gameArea.appendChild(alien);
        aliens.push(alien);
        dropAlien(alien);
    }
}

function dropAlien(alien) {
    let alienInterval = setInterval(() => {
        if (isGameOver) return clearInterval(alienInterval); // Stop if game is over
        let alienTop = parseInt(alien.style.top) || 0;
        alien.style.top = (alienTop + 2) + 'px'; // Move the alien down

        // Check if the alien hits the ground
        if (alienTop > gameArea.offsetHeight - 40) {
            clearInterval(alienInterval);
            showGameOver();
        }
    }, 100);
}

// Player movement and shooting
let spaceshipPosition = gameArea.offsetWidth / 2 - 25;

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && spaceshipPosition > 0) {
        spaceshipPosition -= 20;
        spaceship.style.left = spaceshipPosition + 'px';
    } else if (event.key === 'ArrowRight' && spaceshipPosition < gameArea.offsetWidth - 50) {
        spaceshipPosition += 20;
        spaceship.style.left = spaceshipPosition + 'px';
    } else if (event.key === ' ') {
        shootProjectile();
    }
});

// Shooting projectiles
function shootProjectile() {
    let projectile = document.createElement('div');
    projectile.className = 'projectile';
    projectile.style.left = (spaceshipPosition + 22.5) + 'px'; // Center the projectile
    projectile.style.bottom = '50px'; // Position above the spaceship
    gameArea.appendChild(projectile);

    let projectileInterval = setInterval(() => {
        let projectileTop = parseInt(projectile.style.bottom) || 0;
        projectile.style.bottom = (projectileTop + 5) + 'px'; // Move up

        // Check if it goes off the screen
        if (projectileTop > gameArea.offsetHeight) {
            clearInterval(projectileInterval);
            projectile.remove(); // Remove projectile
        }

        // Check for collision with aliens
        aliens.forEach((alien, index) => {
            let alienTop = parseInt(alien.style.top);
            if (
                projectileTop + 20 >= alienTop &&
                parseInt(projectile.style.left) + 5 >= parseInt(alien.style.left) &&
                parseInt(projectile.style.left) <= parseInt(alien.style.left) + 40
            ) {
                clearInterval(projectileInterval);
                projectile.remove(); // Remove projectile
                alien.remove(); // Remove alien
                score++;
                scoreDisplay.textContent = 'Score: ' + score; // Update score
                aliens.splice(index, 1); // Remove alien from the array
                checkWaveCompletion(); // Check if all aliens are defeated
            }
        });
    }, 100);
}

// Check if all aliens are defeated for the current wave
function checkWaveCompletion() {
    if (aliens.length === 0) {
        wave++;
        setTimeout(() => {
            spawnAliens(); // Spawn next wave
        }, 1000);
    }
}

// Show game over
function showGameOver() {
    isGameOver = true;
    finalScoreDisplay.textContent = 'Final Score: ' + score;
    gameOverDisplay.style.display = 'block';
}

// Restart the game
restartButton.addEventListener('click', () => {
    document.querySelectorAll('.alien, .projectile').forEach(el => el.remove()); // Remove all aliens and projectiles
    score = 0;
    wave = 0;
    scoreDisplay.textContent = 'Score: 0';
    gameOverDisplay.style.display = 'none';
    aliens = [];
    isGameOver = false;
    spawnAliens(); // Restart the game
});

// Start the first wave
spawnAliens();
