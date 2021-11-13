import Scene from "./Scene";

class SceneManager {
  currentScene: Scene;

  constructor(initialScene: Scene) {
    this.currentScene = initialScene;
  }

  getCurrentScene(): Scene {
    return this.currentScene;
  }

  changeScene(scene: Scene): void {
    this.currentScene = scene;
  }
}

export default SceneManager;