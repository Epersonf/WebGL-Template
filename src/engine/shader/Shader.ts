export default class Shader {
  static createShader(gl: WebGL2RenderingContext, type: number, source: string): WebGLShader {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      console.log("Could not compile WebGL program:" + info);
    }

    return shader;
  }

  static createProgram(gl: WebGL2RenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram {
    const program = gl.createProgram();

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      console.log("Could not compile WebGL program:" + info);
    }

    return program;
  }

  static isArrayBuffer(value: Float32Array): boolean {
    return value && value.buffer instanceof ArrayBuffer && value.byteLength !== undefined;
  }

  static createBuffer(gl: WebGL2RenderingContext, type: number, data: Float32Array): WebGLBuffer {

    if (!Shader.isArrayBuffer(data)) {
      console.warn("Data is not an instance of BufferSource");
      return null;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(type, buffer);
    gl.bufferData(type, data, gl.STATIC_DRAW);

    return buffer;
  }

  static createVAO(gl: WebGL2RenderingContext,
    posAttribLoc: number, posBuffer: WebGLBuffer,
    colorAttribLoc: number = null, colorBuffer: WebGLBuffer = null,
    normAttribLoc: number = null, normBuffer: WebGLBuffer = null
  ): WebGLVertexArrayObject {

    const vao = gl.createVertexArray();

    gl.bindVertexArray(vao);

    if (posAttribLoc != null && posAttribLoc != undefined) {
      gl.enableVertexAttribArray(posAttribLoc);
      const size = 4;
      const type = gl.FLOAT;
      gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
      gl.vertexAttribPointer(posAttribLoc, size, type, false, 0, 0);
    }

    if (colorAttribLoc != null && colorAttribLoc != undefined) {
      gl.enableVertexAttribArray(colorAttribLoc);
      const size = 4;
      const type = gl.FLOAT;
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.vertexAttribPointer(colorAttribLoc, size, type, false, 0, 0);
    }

    if (normAttribLoc != null && normAttribLoc != undefined) {
      gl.enableVertexAttribArray(normAttribLoc);
      const size = 4;
      const type = gl.FLOAT;
      gl.bindBuffer(gl.ARRAY_BUFFER, normBuffer);
      gl.vertexAttribPointer(normAttribLoc, size, type, false, 0, 0);
    }

    return vao;
  }
}
