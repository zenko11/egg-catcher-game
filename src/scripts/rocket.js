import Mobile from "./mobile";
import rocketPng from "./assets/images/rocket.png";

/**represents a rocket that moves horizontally through the canvas
 * @extends Mobile
  */
export default class Rocket extends Mobile{
    /**Create a rocket from the left side
     * @param {number} y initial position 
     */
    constructor(y){
        
    
        super(0,y,6,0,rocketPng);
        
    }
    /**Verifies if the rocket touched or passed the right side of the canvas
     * @param {HTMLCanvasElement} canvas
     * @returns {boolean} 
     */
    touchedSide(canvas){
        return this.x>=canvas.width;        
    }
}