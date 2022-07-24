import { OBSTACLE_HEIGHT, OBSTACLE_WIDTH, DINO_HEIGHT, DINO_WIDTH, INTERVAL_UNIT, HIGH_SCORE_LOCALSTORAGE_KEY } from './const.js';
import { getLocalStorageDataByKey } from './getLocalStorageDataByKey.js';
import { setLocalStorageDataByKey } from './setLocalStorageDataByKey.js';
import { isHighScore } from './isHighScore.js';

export const dino = document.querySelector('.dino');
dino.style.height = DINO_HEIGHT + 'px';
dino.style.width = DINO_WIDTH + 'px';

document.addEventListener('DOMContentLoaded', () => {


  const scoreDOM = document.querySelector('#score');
  let score = 0;
  const highScoreDOM = document.querySelector('#highScore');
  let highScore = getLocalStorageDataByKey(HIGH_SCORE_LOCALSTORAGE_KEY);
  if (!highScore) {
    highScore = 0;
  }
  highScoreDOM.innerHTML = highScore.toString();
  const grid = document.querySelector('.grid');
  const alert = document.getElementById('alert');
  let isJumping = false;
  const gravity = 0.9;
  let isGameOver = false;
  const control = (e) => {
    if (e.keyCode === 32) {
      if (!isJumping) {
        isJumping = true;
        jump();
      }
    }
  }
  document.addEventListener('keyup', control);
  let position = 0;
  function jump() {
    let count = 0;
    let timerUp = setInterval(() => {
      if (count === 15) {
        clearInterval(timerUp);
        // fall down
        let timerDown = setInterval(() => {
          position -= 5;
          count--;
          position = position * gravity;
          dino.style.bottom = position + 'px';
          if (count === 0) {
            clearInterval(timerDown);
            isJumping = false;
          }
        }, INTERVAL_UNIT);
      }
      // jump up
      position += 30;
      position = position * gravity;
      count++;
      dino.style.bottom = position + 'px';
    }, INTERVAL_UNIT);
  }
  function generateObstacle() {
    let randomTime = Math.random() * 4000;
    let obstaclePosition = 1000;
    const obstacle = document.createElement('div');
    obstacle.style.height = OBSTACLE_HEIGHT + 'px';
    obstacle.style.width = OBSTACLE_WIDTH + 'px';
    if (!isGameOver) obstacle.classList.add('obstacle');
    grid.appendChild(obstacle);
    obstacle.style.left = obstaclePosition + 'px';
    let timerId = setInterval(() => {
      if (!isGameOver) {
        score += 0.5;
        scoreDOM.innerHTML = Math.floor(score);
      }

      obstaclePosition -= 10;
      obstacle.style.left = obstaclePosition + 'px';
      if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
        clearInterval(timerId);
        alert.innerHTML = 'Game over';
        isHighScore(score);
        isGameOver = true;
        while (grid.firstChild) {
          grid.removeChild(grid.lastChild)
        }
      }
    }, INTERVAL_UNIT);
    if (!isGameOver) setTimeout(generateObstacle, randomTime)

  }
  generateObstacle();

});