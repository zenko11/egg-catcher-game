import Basket from "./basket";
import KeyManager from "./keyManager";
import Egg from "./egg";
import Rocket from "./rocket";
/**
* Manages the main game loop, entity spawning, collisions, score, and user inputs.
*/
export default class Game {

   canvas;
   context;
   basket;
   eggs;
   rockets;
   score;
  /** create an instance of Game
   * @param {HTMLCanvasElement} canvas - The canvas element used for rendering
   * @param {HTMLElement} score - The HTML element displaying the score 
   */
   constructor(canvas,score) {
      this.canvas = canvas;
      this.context = this.canvas.getContext("2d");
      this.basket = new Basket(this.canvas.width/2,this.canvas.height/2);
      this.eggs = [];
      this.rockets = [];
      this.score = score;
      this.keyManager = new KeyManager();
      this.raf = null;
      this.spawnEgg= null;
      this.spawnRocket = null;
      this.lives = 3
      this.animate = this.animate.bind(this);

   }
   /**
    * Starts the game loop and spawners, or stops them and clears active timerss.
    */
   startAndStop(){
    if(!this.raf){
      
      this.raf = window.requestAnimationFrame(this.animate);
      this.spawnEgg = setInterval(elt =>this.addEgg(),1000);
      this.spawnRocket=setInterval(elt =>this.addRocket(),1000);
      
    }
    else{
      window.cancelAnimationFrame(this.raf);
      this.raf = null;
      clearInterval(this.spawnEgg);
      clearInterval(this.spawnRocket);
      this.spawnEgg = null;
      this.spawnRocket = null;
    }
  }
  
   /**
    * Main animation frame loop. Clears the context, updates movements,
    * checks collisions, and redraws active game entities.
    */
   animate(){
    this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.basket.handleMoveKeys(this.keyManager);
    this.basket.move(this.canvas);
    this.basket.draw(this.context);
    
    
    this.eggs.forEach(egg=>egg.move(this.canvas))
    
    this.eggs = this.eggs.filter(egg =>{
      if(egg.collisionWith(this.basket)){     
 
         this.addScore(100);         
         return false;
      }
      
      return ((!egg.touchedFloor(this.canvas))&&(!this.rockets.some(rocket =>egg.collisionWith(rocket))));
    });
    this.eggs.forEach(egg=>egg.draw(this.context));
    this.rockets.forEach(rocket=>rocket.move(this.canvas))
    this.rockets = this.rockets.filter(rocket=>{
      if(rocket.collisionWith(this.basket)){
         
         this.addScore(-500); 
         this.removeLife();
         return false;
      }
      return (!rocket.touchedSide(this.canvas));
    });
    this.rockets.forEach(rocket=>rocket.draw(this.context));
    
    
    this.raf = window.requestAnimationFrame(this.animate);
  }
  
  /**
   * Adds or reduces points from the current score. Sets score to zero if points fall below 0.
   * @param {number} nb - The amount of points to add (positive) or subtract (negative).
   */
  addScore(nb){
   const currentScore = Number(this.score.textContent)
   this.score.textContent = Math.max(0,currentScore+nb)
  }
  /**
   * Attempts to spawn an Egg object with a 75% probability
   */
  addEgg(){
   const probability = 0.75
   if (Math.random()<=probability){
      const egg = new Egg(Math.random()*(this.canvas.width-50));
      
      this.eggs.push(egg);
   }
  }
  /**
   * Attempts to spawn a rocket object with a 50% probability
   */
  addRocket(){
   const probability = 0.5
   if (Math.random()<=probability){
      const rocket = new Rocket(Math.random()*(this.canvas.height-20));
      
      this.rockets.push(rocket);
   }
  }
  /**
   * Decrements active lives by 1 and updates UI. Triggers game over when lives reach 0.
   */
  removeLife(){
   if (this.lives>0){
      const life = document.getElementById("life-"+this.lives);
      life.style.display = 'none';
      this.lives--;
      if(this.lives===0){
         
         alert("game over\nlives : 0 \nscore : "+this.score.textContent);
         window.location.reload(); // refresh to play again
      }

   }

  }
  /**
   * Handles keydown events to set directional flags in the KeyManager.
   * @param {KeyboardEvent} event - The keyboard event object.
   */
  keyDownActionHandler=(event) =>{
     switch (event.key) {
         case "ArrowLeft":
         case "Left":
             this.keyManager.leftPressed();
             break;
         case "ArrowRight":
         case "Right":
             this.keyManager.rightPressed();
             break;
         case "ArrowDown":
         case "Down":
             this.keyManager.downPressed();
             break;
         case "ArrowUp":
         case "Up":
             this.keyManager.upPressed();
             break;
         default: return;
     }
     event.preventDefault();
  }

  /**
   * handles keyup events to clear directional flags in the KeyManager
   * @param {KeyboardEvent} event - the keyboard event object 
   *
   */
  keyUpActionHandler=(event)=> {
   switch (event.key) {
      case "ArrowLeft":
      case "Left":
         this.keyManager.leftReleased();
         break;
      case "ArrowRight":
      case "Right":
         this.keyManager.rightReleased();
         break;
      case "ArrowDown":
      case "Down":
         this.keyManager.downReleased();
         break;
      case "ArrowUp":
      case "Up":
         this.keyManager.upReleased();
         break;
      default: return;
   }
   event.preventDefault();
}


}



