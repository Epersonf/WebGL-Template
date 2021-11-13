import Scene from "./Scene";

class Main {
  gl: WebGL2RenderingContext;
  currentScene: Scene;
  constructor() {
    const canvas: HTMLCanvasElement = document.querySelector("#glcanvas");

    this.gl = canvas.getContext("webgl2");
    this.currentScene = new Scene(this.gl);
  }
  
  draw(): void {
    const devicePixelRatio: number = window.devicePixelRatio || 1;
    this.gl.canvas.width = 1024 * devicePixelRatio;
    this.gl.canvas.height = 768 * devicePixelRatio;

    this.gl.clearColor(0.0, 0.0, 0.0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    this.currentScene.draw(this.gl);

    requestAnimationFrame(this.draw.bind(this));
  }
}

export default Main;