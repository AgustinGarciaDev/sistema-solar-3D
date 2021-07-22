import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import DragControls from "drag-controls";
DragControls.install({ THREE: THREE });
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 5;

/* 	 const gridHelper = new THREE.GridHelper(200,50)
			scene.add(gridHelper)  */

var objects = [];
const controls = new OrbitControls(camera, renderer.domElement);

function addStart() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(150));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStart);

const spaceTexture = new THREE.TextureLoader().load("assets/space-three.jpg");
scene.background = spaceTexture;

const marteTexture = new THREE.TextureLoader().load("/assets/marte.jpg");

const marte = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: marteTexture,
  })
);

scene.add(marte);
marte.position.z = 20;
marte.position.setX(-5);
objects.push(marte);

const moonTexture = new THREE.TextureLoader().load("./assets/moon.jpg");
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({
    map: moonTexture,
  })
);

scene.add(moon);
moon.position.z = 30;
moon.position.setX(-5);
objects.push(moon);

const tierraTexture = new THREE.TextureLoader().load("./assets/tierra.jpg");

const tierra = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: tierraTexture,
  })
);

scene.add(tierra);
tierra.position.z = 10;
tierra.position.setX(-5);
objects.push(tierra);

const sunTexture = new THREE.TextureLoader().load("./assets/sun.jpg");

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(10, 62, 62),
  new THREE.MeshBasicMaterial({
    map: sunTexture,
  })
);

scene.add(sun);
sun.position.z = -5;
sun.position.setX(-5);
objects.push(sun);

const jupiterTexture = new THREE.TextureLoader().load("./assets/jupiter.jpg");

const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: jupiterTexture,
  })
);

scene.add(jupiter);
jupiter.position.z = -20;
jupiter.position.setX(-5);
objects.push(jupiter);

const neptuneTexture = new THREE.TextureLoader().load("./assets/neptune.jpg");

const neptune = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: neptuneTexture,
  })
);

scene.add(neptune);
neptune.position.z = -30;
neptune.position.setX(-5);
objects.push(neptune);

const uranusTexture = new THREE.TextureLoader().load("./assets/uranus.jpg");

const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: uranusTexture,
  })
);

scene.add(uranus);
uranus.position.z = -40;
uranus.position.setX(-5);
objects.push(uranus);

const venusTexture = new THREE.TextureLoader().load("./assets/venus.jpg");

const venus = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: venusTexture,
  })
);

scene.add(venus);
venus.position.z = -40;
venus.position.setX(-5);
objects.push(venus);
const mercuryTexture = new THREE.TextureLoader().load("./assets/mercury.jpg");

const mercury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshBasicMaterial({
    map: mercuryTexture,
  })
);

scene.add(mercury);
mercury.position.z = -50;
mercury.position.setX(-5);
mercury.userData.draggable = true;
mercury.userData.name = "MERCURY";
objects.push(mercury);

const animate = function () {
  requestAnimationFrame(animate);
  dragObject();
  marte.rotation.x += 0.005;
  moon.rotation.x += 0.005;
  tierra.rotation.x += 0.005;
  jupiter.rotation.x += 0.005;
  neptune.rotation.x += 0.005;
  sun.rotation.x += 0.005;
  mercury.rotation.x += 0.005;

  renderer.render(scene, camera);
};
animate();

const raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2();
const moveMouse = new THREE.Vector2();

var draggable = new THREE.Object3D();

window.addEventListener("click", (e) => {
  if (draggable) {
    return;
  }
  clickMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  clickMouse.y = (e.clientY / window.innerWidth) * 2 + 1;
  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children);

  console.log(found);

  if (found.length > 0 && found[0].object.userData.draggable) {
    /* console.log('entro') */
    draggable = found[0].object;
    console.log(`found draggable ${draggable.userData.name}`);
  }
});

window.addEventListener("movemouse", (e) => {
  moveMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  moveMouse.y = (e.clientY / window.innerWidth) * 2 + 1;
});

function dragObject() {
  if (draggable != null) {
    raycaster.setFromCamera(moveMouse, camera);
    const found = raycaster.intersectObjects(moveMouse);
    if (found.length > 0) {
      console.log(found);
      console.log("hola");
      for (let i = 0; i < found.length; i++) {
        console.log("hola");
        let target = found[i].point;
        draggable.position.x = target.x;
        draggable.position.z = target.z;
      }
    }
  }
}

var dragControls = new DragControls(objects, camera, renderer.domElement);
