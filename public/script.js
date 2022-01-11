import * as THREE from "/build/three.module.js";
import gsap from "/gsap/all.js";

// canvas
const canvas = document.querySelector(".earth-webgl");

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// textures
const textureLoader = new THREE.TextureLoader();
const mapTexture = textureLoader.load("./texture/earth/8k_earth_nightmap.jpeg");
const cloudAlpha = textureLoader.load("./texture/earth/2k_earth_clouds.jpeg");
const starsTexture = textureLoader.load(
  "./texture/stars/8k_stars_milky_way.jpeg"
);

// scene
const scene = new THREE.Scene();

// earth
const earthGeometry = new THREE.SphereBufferGeometry(1, 100, 100);
const earthMaterial = new THREE.MeshPhongMaterial({
  map: mapTexture,
});
const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);

// cloud
let cloudGeometry = new THREE.SphereGeometry(1.01, 100, 100);
let cloudMaterial = new THREE.MeshPhongMaterial({
  alphaMap: cloudAlpha,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.3,
});
let cloudMesh = new THREE.Mesh(cloudGeometry, cloudMaterial);

// earth group
const earthGroup = new THREE.Group();
earthGroup.add(earthMesh, cloudMesh);
earthGroup.rotation.y = 1.5;
earthGroup.rotation.z = 1;
earthGroup.position.x = 1;
earthGroup.position.y = 0.25;

scene.add(earthGroup);

// stars
let starsGeometry = new THREE.SphereGeometry(30, 32, 32);
let starsMaterial = new THREE.MeshPhongMaterial({
  alphaMap: starsTexture,
  side: THREE.DoubleSide,
  transparent: true,
});
let starsMesh = new THREE.Mesh(starsGeometry, starsMaterial);
scene.add(starsMesh);

// light
const ambientLight = new THREE.AmbientLight("white", 2);
scene.add(ambientLight);

// camera
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100
);

scene.add(camera);

// media query
const mediaQuery = window.matchMedia("(max-width: 45em)");

let initX;
let initY;

const handleMediaQuery = (e) => {
  if (e.matches) {
    camera.position.set(1, 1.3, 1);
  } else {
    camera.position.set(0, 0, 1);
  }
  // mouse move event
  initX = camera.position.x;
  initY = camera.position.y;
  document.addEventListener("mousemove", (e) => {
    const offsetX = e.clientX / sizes.width - 0.5;
    const offsetY = e.clientY / sizes.height - 0.5;
    const deltaX = initX - offsetX / 50;
    const deltaY = initY + offsetY / 50;

    gsap.to(camera.position, { duration: 2, x: deltaX });
    gsap.to(camera.position, { duration: 2, y: deltaY });
  });
};

handleMediaQuery(mediaQuery);

// control
// const control = new OrbitControls(camera, canvas);
// control.enableDamping = true;

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

// resize event
window.addEventListener("resize", () => {
  handleMediaQuery(mediaQuery);
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

// animations
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  cloudMesh.rotation.y = elapsedTime * 0.02;
  earthMesh.rotation.y = elapsedTime * 0.01;
  starsMesh.rotation.y = -elapsedTime * 0.005;

  // directionalLight.position.x = Math.cos(elapsedTime*0.1) * 3;
  // directionalLight.position.z = Math.sin(elapsedTime*0.1) * 3;
  // directionalLight.lookAt(sphere);

  // update control
  // control.update();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
