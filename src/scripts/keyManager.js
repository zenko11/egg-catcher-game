/*
 * Stores the state of the directional keys.
 * The left, right, up, and down accessors return whether
 * each key is currently pressed.
 * The pressed/released methods update these states.
 */
export default class KeyManager {
   #left;
   #right;
   #up; 
   #down;

   constructor() {
      this.#left = false;
      this.#right = false;
      this.#up = false;
      this.#down = false;
   }
   /* accessor for the left key, true when pressed  */
   get left() {
      return this.#left;
   }
   /* setter for left key */
   set left(value) {
      this.#left = value;
   }
   /* stores that left key is pressed */
   leftPressed() {
      this.#left = true;
   }
   /* stores that left key is no more pressed */
   leftReleased() {
      this.#left = false;
   }

   get right() {
      return this.#right;
   }
   set right(value) {
      this.#right = value;
   }
   rightPressed() {
      this.#right = true;
   }
   rightReleased() {
      this.#right = false;
   }
   
   get up() {
      return this.#up;
   }
   set up(value) {
      this.#up = value;
   }
   upPressed() {
      this.#up = true;
   }
   upReleased() {
      this.#up = false;
   }

   get down() {
      return this.#down;
   }
   set down(value) {
      this.#down = value;
   }
   downPressed() {
      this.#down = true;
   }
   downReleased() {
      this.#down = false;
   }

   oneKeyPressed() {
      return this.#left || this.#right || this.#up || this.#down;
   }
   noKeyPressed() {
      return ! this.oneKeyPressed();
   }
}