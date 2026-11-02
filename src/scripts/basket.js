import basketImgSrc from "./assets/images/basket.png";
import Mobile from "./mobile";
/**
 * Represents the player-controlled basket
 * @extends Mobile
 */
export default class Basket extends Mobile {

    
    pixels;
    /**
    * Creates a Basket instance at specified coordinate.
    * @param {number} x - Initial horizontal position
    * @param {number} y - Initial vertical position
    */
    constructor(x,y) {
        super(x,y,0,0,basketImgSrc);
        
        this.pixels = 10;
    }
    /** Sets horizontal displacement to move left */
    moveLeft() {              
        this.deltaX =  - this.pixels;  
    }
    /** Sets horizontal displacement to move right */
    moveRight() {
        this.deltaX =  + this.pixels;  
    }
    /** Sets vertical displacement to move down */
    moveDown(){
        this.deltaY = + this.pixels
    }
    /** Sets vertical displacement to move up */
    moveUp(){
        this.deltaY = - this.pixels
    }
    /** Resets movement vectors to zero */
    stopMoving() {
        this.deltaX = 0;
        this.deltaY = 0;
    }
    /**
    * Moves the basket while clamping its position strictly within the canvas bounds
    * @param {HTMLCanvasElement} box - The canvas representing the game area
    */
    move(box) {             
        this.x = Math.max(0, Math.min(box.width - this.width, this.x + this.deltaX));
        this.y = Math.max(0, Math.min(box.height - this.height, this.y + this.deltaY));
    }

    /**
    * Evaluates active key bindings and updates movement vectors accordingly
    * @param {KeyManager} keyManager - The input key listener instance
    */
    handleMoveKeys(keyManager) {
    this.stopMoving();    
    if (keyManager.left)  
        this.moveLeft();
    if (keyManager.right) 
        this.moveRight();
    if(keyManager.down)
      this.moveDown();
    if (keyManager.up)
      this.moveUp();
  }

}