import Scene from "../../engine/Scene";
import Shader from "../../engine/shader/Shader";

import vertShaderSrc from "../assets/shaders/simple.vert";
import fragShaderSrc from "../assets/shaders/simple.frag";

class SceneTest extends Scene {
  coords: number[];
  colors: number[];
  vertShd: WebGLShader;
  fragShd: WebGLShader;
  program: WebGLProgram;
  vaoLoc: WebGLVertexArrayObject;

  constructor(gl: WebGL2RenderingContext) {
    super(gl);
    this.coords = [];
    this.colors = [];

    this.vertShd = null;
    this.fragShd = null;
    this.program = null;

    this.vaoLoc = -1;

    this.init(gl);
  }

  init(gl: WebGL2RenderingContext) {
    this.createShaderProgram(gl);
    this.createVAO(gl);
  }

  createShaderProgram(gl: WebGL2RenderingContext) {
    this.vertShd = Shader.createShader(gl, gl.VERTEX_SHADER, vertShaderSrc);
    this.fragShd = Shader.createShader(gl, gl.FRAGMENT_SHADER, fragShaderSrc);
    this.program = Shader.createProgram(gl, this.vertShd, this.fragShd);
  }

  createVAO(gl: WebGL2RenderingContext) {
    this.coords = [
      0.0, 0.0, 0.0, 1.0,
      -1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0
    ];

    this.colors = [
      0.0, 0.0, 1.0, 1.0,
      1.0, 0.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 1.0
    ];

    const coordsAttributeLocation = gl.getAttribLocation(this.program, "position");
    const coordsBuffer = Shader.createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(this.coords));

    const colorsAttributeLocation = gl.getAttribLocation(this.program, "color");
    const colorsBuffer = Shader.createBuffer(gl, gl.ARRAY_BUFFER, new Float32Array(this.colors));

    this.vaoLoc = Shader.createVAO(gl, coordsAttributeLocation, coordsBuffer, colorsAttributeLocation, colorsBuffer);
  }

  draw(gl: WebGL2RenderingContext) {
    gl.useProgram(this.program);
    gl.bindVertexArray(this.vaoLoc);

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}

export default SceneTest;