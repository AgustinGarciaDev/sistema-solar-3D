import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene();
			const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
			const renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );

			const geometry = new THREE.TorusGeometry(0.5,2,10,4);
			const material = new THREE.MeshBasicMaterial( { color: "#10faf4" , wireframe:true} );
			const torus = new THREE.Mesh( geometry, material );
			scene.add( torus );

			camera.position.z = 5;

			 const gridHelper = new THREE.GridHelper(200,50)
			scene.add(gridHelper) 
            const  controls = new OrbitControls(camera, renderer.domElement)
			
			function addStart() {
				
				const geometry = new THREE.SphereGeometry(0.25, 24, 24);
				const material = new THREE.MeshBasicMaterial({ color: "#FFFFFF" });
				const star = new THREE.Mesh(geometry, material);

				const [x, y, z] = Array(3)
					.fill()
					.map(() => THREE.MathUtils.randFloatSpread(150));

				star.position.set(x, y, z);
				scene.add(star);

			};
			Array(200).fill().forEach(addStart)
			
			const spaceTexture = new THREE.TextureLoader().load('space-two.jpg')
			scene.background = spaceTexture

			const marteTexture = new THREE.TextureLoader().load('moon.jpg')

			const marte = new THREE.Mesh(
				new THREE.SphereGeometry(3, 32, 32),
				new THREE.MeshBasicMaterial({
					map: marteTexture ,
					
				})
			)

			scene.add(marte)
			marte.position.z = 20;
			marte.position.setX(-5);

			const animate = function () {
				requestAnimationFrame( animate );

				torus.rotation.x += 0.01;
                torus.rotation.y += 0.02;
                torus.rotation.y += 0.01;
  				marte.rotation.x += 0.005;

			/* 	controls.update() */

				renderer.render(scene, camera);
					
			};
			animate();

		