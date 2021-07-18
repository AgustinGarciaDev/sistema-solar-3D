import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			const geometry = new THREE.TorusGeometry(0.5,2,4,4);
			const material = new THREE.MeshBasicMaterial( { color: "#10faf4" , wireframe:true} );
			const torus = new THREE.Mesh( geometry, material );
			scene.add( torus );

			camera.position.z = 5;
            
            const  constrols = new OrbitControls(camera, renderer.domElement)

			const animate = function () {
				requestAnimationFrame( animate );

				torus.rotation.x += 0.01;
                torus.rotation.y += 0.01;
                torus.rotation.y += 0.01;

				renderer.render( scene, camera );
			};

			animate();