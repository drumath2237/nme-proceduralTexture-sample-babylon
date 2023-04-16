import { Engine, Scene, MeshBuilder } from '@babylonjs/core';
import './style.scss';

const main = () => {
  const renderCanvas = document.getElementById(
    'renderCanvas'
  ) as HTMLCanvasElement;
  if (!renderCanvas) {
    return;
  }

  renderCanvas.width = document.firstElementChild?.clientWidth ?? 0;
  renderCanvas.height = document.firstElementChild?.clientHeight ?? 0;

  const engine = new Engine(renderCanvas, true);
  const scene = new Scene(engine);

  scene.createDefaultCameraOrLight(true, true, true);

  MeshBuilder.CreateBox('box', { size: 0.5 }, scene);

  engine.runRenderLoop(() => {
    scene.render();
  });
};

main();
