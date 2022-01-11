import * as THREE from "/build/three.module.js";
import gsap from "/gsap/all.js";

const tabList = document.querySelector("[role='tablist']");
const tabs = document.querySelectorAll("[role='tab']");

// canvas
const canvas = document.querySelector(".destination-webgl");

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// textures
const textureLoader = new THREE.TextureLoader();
const starsTexture = textureLoader.load(
  "./texture/stars/8k_stars_milky_way.jpeg"
);
const moonTexture = textureLoader.load("./texture/moon/moonmap4k.jpg");
const moonBump = textureLoader.load("./texture/moon/moonbump4k.jpg");
const marsTexture = textureLoader.load("./texture/mars/5672_marsmap6k_v2.jpg");
const marsBump = textureLoader.load("./texture/mars/5672_marsbump6k.jpg");
const europaTexture = textureLoader.load("./texture/europa/Europa.jpeg");
const europaBump = textureLoader.load("./texture/europa/surface-bump.jpg");
const titanTexture = textureLoader.load("./texture/titan/Titantexture.png");

// scene
const scene = new THREE.Scene();

// stars
let starsGeometry = new THREE.SphereGeometry(30, 32, 32);
let starsMaterial = new THREE.MeshPhongMaterial({
  alphaMap: starsTexture,
  side: THREE.DoubleSide,
  transparent: true,
});
let starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);
scene.add(starsMesh);

// moon
let moonGeometry = new THREE.SphereGeometry(1, 32, 32);
let moonMaterial = new THREE.MeshPhongMaterial({
  map: moonTexture,
  bumpMap: moonBump,
  transparent: true,
  opacity: 0.2,
});
moonMaterial.bumpScale = 0.01;
let moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
moonMesh.scale.set(
  0.002 * sizes.height,
  0.002 * sizes.height,
  0.002 * sizes.height
);
scene.add(moonMesh);

// mars
let marsGeometry = new THREE.SphereGeometry(1, 32, 32);
let marsMaterial = new THREE.MeshPhongMaterial({
  map: marsTexture,
  bumpMap: marsBump,
  transparent: true,
  opacity: 0.2,
});
marsMaterial.bumpScale = 0.1;
let marsMesh = new THREE.Mesh(marsGeometry, marsMaterial);
marsMesh.scale.set(
  0.002 * sizes.height,
  0.002 * sizes.height,
  0.002 * sizes.height
);

// europa
let europaGeometry = new THREE.SphereGeometry(1, 32, 32);
let europaMaterial = new THREE.MeshPhongMaterial({
  map: europaTexture,
  bumpMap: europaBump,
  transparent: true,
  opacity: 0.2,
});
europaMaterial.bumpScale = 0.01;
let europaMesh = new THREE.Mesh(europaGeometry, europaMaterial);
europaMesh.scale.set(
  0.002 * sizes.height,
  0.002 * sizes.height,
  0.002 * sizes.height
);

// europa
let titanGeometry = new THREE.SphereGeometry(1, 32, 32);
let titanMaterial = new THREE.MeshPhongMaterial({
  map: titanTexture,
  transparent: true,
  opacity: 0.2,
});
let titanMesh = new THREE.Mesh(titanGeometry, titanMaterial);
titanMesh.scale.set(
  0.002 * sizes.height,
  0.002 * sizes.height,
  0.002 * sizes.height
);

// light
const ambientLight = new THREE.AmbientLight("white", 0.2);
const directionalLight = new THREE.DirectionalLight("white", 1);
directionalLight.position.y = 7;
directionalLight.position.x = -7;
scene.add(ambientLight, directionalLight);

// camera
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 5;
scene.add(camera);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

// resize event
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  moonMesh.scale.set(
    0.002 * sizes.height,
    0.002 * sizes.height,
    0.002 * sizes.height
  );

  marsMesh.scale.set(
    0.002 * sizes.height,
    0.002 * sizes.height,
    0.002 * sizes.height
  );

  europaMesh.scale.set(
    0.002 * sizes.height,
    0.002 * sizes.height,
    0.002 * sizes.height
  );

  titanMesh.scale.set(
    0.002 * sizes.height,
    0.002 * sizes.height,
    0.002 * sizes.height
  );

  renderer.setSize(sizes.width, sizes.height);
});

// selecte event
const changeTabPanel = (e) => {
  const selectedTab = e.target.innerText;
  scene.remove(moonMesh);
  scene.remove(marsMesh);
  scene.remove(europaMesh);
  scene.remove(titanMesh);
  switch (selectedTab) {
    case "MOON":
      scene.add(moonMesh);
      break;
    case "MARS":
      scene.add(marsMesh);
      break;
    case "EUROPA":
      scene.add(europaMesh);
      break;
    case "TITAN":
      scene.add(titanMesh);
      break;
  }
};

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

// animations
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  starsMesh.rotation.y = -elapsedTime * 0.01;
  moonMesh.rotation.y = -elapsedTime * 0.05;
  marsMesh.rotation.y = -elapsedTime * 0.05;
  europaMesh.rotation.y = -elapsedTime * 0.05;
  titanMesh.rotation.y = -elapsedTime * 0.05;

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
