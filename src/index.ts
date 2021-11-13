import SceneTest from "src/scenes/SceneTest";
import "index.css";
import Main from "./engine/Main";
import Scene from "engine/Scene";

window.onload = () => {
  const main: Main<Scene> = new Main(SceneTest, 500, 500);
  main.draw();
};