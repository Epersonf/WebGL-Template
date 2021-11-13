import "Style/index.css";
import Main from "./engine/Main";

window.onload = () => {
  const main: Main = new Main();
  main.draw();
};