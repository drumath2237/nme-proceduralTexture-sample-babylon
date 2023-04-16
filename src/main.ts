import {
  Engine,
  Scene,
  MeshBuilder,
  Effect,
  CustomProceduralTexture,
  Layer,
} from '@babylonjs/core';
import './style.scss';

import backgroundShader from '../assets/customShader.frag?raw';

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

  MeshBuilder.CreateBox('box', { size: 0.3 }, scene);

  let time = 0;

  Effect.ShadersStore['BackgroundPixelShader'] = backgroundShader;
  const backgroundProceduralTexture = new CustomProceduralTexture(
    'background procedural texture',
    'Background',
    { width: engine.getRenderWidth(), height: engine.getRenderHeight() },
    scene
  );
  backgroundProceduralTexture.setFloat('u_TimeScaleFactor', 18.0);
  const backgroundLayer = new Layer('background layer', null, scene, true);
  backgroundLayer.texture = backgroundProceduralTexture;

  scene.registerBeforeRender(() => {
    time += engine.getDeltaTime() / 1000;
    backgroundProceduralTexture.setFloat('u_Time', time);
  });

  engine.runRenderLoop(() => {
    scene.render();
  });
};

main();
