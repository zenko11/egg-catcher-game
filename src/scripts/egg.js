
import Mobile from "./mobile";
import blueEgg from "./assets/images/blue-egg.png";
import greenEgg from "./assets/images/green-egg.png";
import yellowEgg from "./assets/images/yellow-egg.png";
/**
 * Represents an egg falling vertically from the top of the canvas with a random color
 * @extends Mobile
 */
export default class Egg extends Mobile{
    /**
     * Creates an egg instance with a randomized color 
     * @param {number} x - Initial horizontal position
     */
    constructor(x){
        const eggTypes = [blueEgg,greenEgg,yellowEgg];
        const randomImage = eggTypes[Math.floor(Math.random() * eggTypes.length)];
        super(x,0,0,4,randomImage);
    }
    /**
     * Verifies if the egg reached or passed the bottom floor of the canvas
     * @param {HTMLCanvasElement} canvas - The game canvas
     * @returns {boolean} True if the egg reached the floor
     */
    touchedFloor(canvas){
        return this.y>=canvas.height;        
    }
    

}
