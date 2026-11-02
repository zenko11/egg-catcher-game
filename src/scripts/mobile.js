export default class Mobile{
    x;
    y;
    deltaX;
    deltaY;
    image;
    /**
    * * Creates a Mobile instance
    * @param {number} x - initial x position 
    * @param {number} y - initial y position 
    * @param {number} deltaX - Horizontal displacement per frame
    * @param {number} deltaY - Vertical displacement per frame
    * @param {string} imageSource - image's path or URL
    */
    constructor(x,y,deltaX,deltaY,imageSource){
        this.x = x;
        this.y = y;
        this.deltaX = deltaX;
        this.deltaY = deltaY;
        this.image = this.createImage(imageSource);
    }

    /**draw this mobile , using the given drawing 2d context
     * @param {CanvasRenderingContext2D} context 
    */
  draw(context) {
    
    context.drawImage(this.image,this.x,this.y);

  }

 /**create and initialize the html image object  
  * @param {string} imageSource
  * @returns {HTMLImageElement}  
 */
  createImage(imageSource) {
	const newImg = new Image();
  	newImg.src = imageSource;
  	return newImg;
  }
  /**@returns {number} image's width */
  get width() {
    return this.image.width;
  }
  /**@returns {number} image's height */
  get height() {
    return this.image.height;
  }

  /**move the mobile object */
  move() {
    this.x += this.deltaX;
    this.y += this.deltaY;
  }

  /**test the collision with another object
   * @param {Mobile} obstacle
   *  @returns {boolean} true if a collision is detected 
   */
  collisionWith(obstacle){
    return (
      this.x < obstacle.x + obstacle.width &&
      this.x + this.width > obstacle.x &&
      this.y < obstacle.y + obstacle.height &&
      this.y + this.height > obstacle.y)
  }





}
