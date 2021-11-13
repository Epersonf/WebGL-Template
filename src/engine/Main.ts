import SceneManager from "./SceneManager";
import Scene from "./Scene";

class Main<T extends Scene> {
  static singleton: Main<Scene>;
  width: number;
  height: number;
  gl: WebGL2RenderingContext;
  private sceneManager: SceneManager;

  constructor(scene: (new (gl: WebGL2RenderingContext) => T), width: number, height: number) {
    Main.singleton = this;

    this.width = width;
    this.height = height;

    const canvas: HTMLCanvasElement = document.querySelector("#glcanvas");

    this.gl = canvas.getContext("webgl2");
    this.sceneManager = new SceneManager(new scene(this.gl));
  }
  
  draw(): void {
    const devicePixelRatio: number = window.devicePixelRatio || 1;
    this.gl.canvas.width = this.width * devicePixelRatio;
    this.gl.canvas.height = this.height * devicePixelRatio;

    this.gl.clearColor(0.0, 0.0, 0.0, 1);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);

    this.sceneManager.getCurrentScene().draw(this.gl);

    requestAnimationFrame(this.draw.bind(this));
  }
}

export default Main;