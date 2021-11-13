class Scene {
  constructor(gl: WebGL2RenderingContext) {
    this.init(gl);    
  }

  init(gl: WebGL2RenderingContext) {
    console.log("init");
  }
  
  draw(gl: WebGL2RenderingContext) {
    console.log("draw");
  }
}

export default Scene;