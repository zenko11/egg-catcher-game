
// importation de la classe Game.js
import Game from './game.js';


// mise en place de l'action des clics sur les boutons + les gestionnaires du clavier pour contrôler Greedy
const init = () => {
   const canvas = document.getElementById("playfield");
   const score = document.getElementById("score");
   const game = new Game(canvas,score);
   const start = document.getElementById("stopAndStartGame");
   
   start.addEventListener("click", () => game.startAndStop()  );

   window.addEventListener('keydown', game.keyDownActionHandler.bind(game));
   window.addEventListener('keyup', game.keyUpActionHandler.bind(game));

}

init();


//
console.log('le bundle a été généré');
