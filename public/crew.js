import * as THREE from "/build/three.module.js";
import gsap from "/gsap/all.js";
import vertexShader from "./shaders/vertex.js";
import fragmentShader from "./shaders/fragment.js";

//loading page
const loading = document.querySelector("#loading");

// loading persentage
const loadingPersentage = document.querySelector("#loading-persentage");
const fadeOutDuration = 1; //in seconds

// canvas
const canvas = document.querySelector(".crew-webgl");

// sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// create loading manager for loading prograss
const loadingManager = new THREE.LoadingManager(
  // hide loading page after loaded
  () => {
    gsap.to(loading, { opacity: 0, duration: fadeOutDuration });
    setTimeout(() => {
      loading.style.display = "none";
    }, fadeOutDuration * 1000);
  },
  // loading prograss
  (itemUrl, itemsLoaded, itemsTotal) => {
    const persentage = Math.round((itemsLoaded / itemsTotal) * 100);
    loadingPersentage.innerHTML = persentage + "%";
  }
);

// textures
const textureLoader = new THREE.TextureLoader(loadingManager);
const cloudAlpha = textureLoader.load("./texture/LargeClouds.jpeg");

// scene
const scene = new THREE.Scene();

// object
const geometry = new THREE.SphereGeometry(9, 300, 300);
const material = new THREE.ShaderMaterial({
  transparent: true,
  opacity: 0.5,
  vertexShader: vertexShader,
  fragmentShader: fragmentShader,
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: cloudAlpha },
  },
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 7.5;

scene.add(mesh);

// camera
const camera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 5;

scene.add(camera);

// media query
const mediaQuery = window.matchMedia("(max-width: 45em)");

const handleMediaQuery = (e) => {
  if (e.matches) {
    geometry.parameters.radius = 5;
    mesh.position.y = 8;
  } else {
    geometry.parameters.radius = 9;
    mesh.position.y = 7.5;
  }
};

handleMediaQuery(mediaQuery);

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
  material.uniforms.uTime.value = elapsedTime;

  mesh.rotation.x = elapsedTime * 0.01;
  mesh.rotation.y = -elapsedTime * 0.01;

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();
