import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

/* ===== Three.js 基础 ===== */
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 40, 140);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x02020a);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;

/* 光 */
scene.add(new THREE.AmbientLight(0xffffff, 0.6));
const light = new THREE.DirectionalLight(0xffffff, 0.6);
light.position.set(1, 1, 1);
scene.add(light);

/* ===== 心形粒子 ===== */
const heartCount = 4500;

function heartXY(t) {
  return [
    16 * Math.pow(Math.sin(t), 3),
    13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
  ];
}

const geometry = new THREE.BufferGeometry();
const positions = new Float32Array(heartCount * 3);
const colors = new Float32Array(heartCount * 3);

for (let i = 0; i < heartCount; i++) {
  const t = Math.random() * Math.PI * 2;
  const r = 0.6 + Math.random() * 1.6;
  const [hx, hy] = heartXY(t);

  const idx = i * 3;
  positions[idx] = hx * r * 1.6;
  positions[idx + 1] = hy * r * 1.4;
  positions[idx + 2] = (Math.random() - 0.5) * 10;

  const c = new THREE.Color();
  c.setHSL(0.95 - Math.random() * 0.1, 0.8, 0.6);
  colors[idx] = c.r;
  colors[idx + 1] = c.g;
  colors[idx + 2] = c.b;
}

geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

const material = new THREE.PointsMaterial({
  size: 2.6,
  vertexColors: true,
  transparent: true,
  opacity: 0.95,
  depthWrite: false,
  blending: THREE.AdditiveBlending
});

const heart = new THREE.Points(geometry, material);
heart.rotation.x = -0.08;
scene.add(heart);

/* ===== 动画 ===== */
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  heart.rotation.y += 0.001;
  heart.rotation.x += 0.0004;

  controls.update();
  renderer.render(scene, camera);
}
animate();

/* 自适应 */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

/* ===== 表白交互 ===== */
const no = document.getElementById('no');
const yes = document.getElementById('yes');

no.addEventListener('mouseover', () => {
  const x = (Math.random() - 0.5) * 300;
  const y = (Math.random() - 0.5) * 200;
  no.style.transform = `translate(${x}px, ${y}px)`;
});

yes.addEventListener('click', () => {
  alert('那我就当你答应了 ❤️');
});
