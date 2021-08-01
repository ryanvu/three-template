import "./style.css";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import * as THREE from "three";

const app = document.querySelector("#app");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
app.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.PointLight(0x00ff00, 1.0);
light.position.set(10, 10, 5);
const lightHelper = new THREE.PointLightHelper(light, 1.0);

const geometry = new THREE.BoxGeometry(5, 5, 5);
const material = new THREE.MeshStandardMaterial({
  color: 0x808080,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube, light, lightHelper);

const gui = new GUI();
const cubeFolder = gui.addFolder("Cube");
cubeFolder.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolder.add(cube.rotation, "z", 0, Math.PI * 2);
cubeFolder.open();

camera.position.set(0, 0, 15);

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
