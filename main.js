import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const clock = new THREE.Clock();

var planes = [];

const OBJECT_SIZE = 0.1;
const SCENE_SIZE = 10;

for (var i = 0; i < 1000; i++) {
    const plane = new THREE.PlaneGeometry(OBJECT_SIZE, OBJECT_SIZE);
    const material = new THREE.MeshBasicMaterial();
    material.side = THREE.DoubleSide;
    material.color = new THREE.Color(`hsl(${Math.random() * 360}, 100%, 50%)`);
    const mesh = new THREE.Mesh(plane, material);
    mesh.rotateX(Math.random() * Math.PI);
    mesh.rotateY(Math.random() * Math.PI);
    mesh.rotateZ(Math.random() * Math.PI);
    planes.push(mesh);
    const group = new THREE.Group();
    group.position.set(
        (Math.random() - 0.5) * SCENE_SIZE * 2,
        (Math.random() - 0.5) * SCENE_SIZE * 2,
        (Math.random() - 0.5) * SCENE_SIZE * 2
    );
    group.add(mesh);
    scene.add(group);
}

function animate() {
    requestAnimationFrame(animate);
    const timeDelta = clock.getDelta();

    for (const plane of planes) {
        plane.rotateY(timeDelta * 2);
        const parent = plane.parent;
        parent.position.y += timeDelta * 0.2;
        if (parent.position.y > SCENE_SIZE) {
            parent.position.y -= 2 * SCENE_SIZE;
        }
    }

    renderer.render(scene, camera);
}

animate();
