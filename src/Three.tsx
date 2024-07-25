import * as THREE from 'three';

import Text3D from './Text3D';
import DonutSphere from './DonutSphere';
import { contain } from 'three/src/extras/TextureUtils';

export default class Three {
    private renderer!: THREE.WebGLRenderer;
    private scene!: THREE.Scene;
    private camera!: THREE.PerspectiveCamera;
    private mesh!: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

    // private clock!: THREE.Clock;
    private text3D!: Text3D;
    private donutSphere!: DonutSphere;

    constructor (containerID: string) {
        this.initScene(containerID);
        // this.clock = new THREE.Clock();
    }

    initScene(containerID: string) {
        this.scene = new THREE.Scene();
        const sizes = { width: 800, height: 600 };
        this.camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
        this.camera.position.z = 3;
        this.scene.add(this.camera);
        
        const container = document.querySelector(containerID)!;
        
        this.renderer = new THREE.WebGLRenderer({ canvas: container});
        this.renderer.setSize(sizes.width, sizes.height);
        // document.body.appendChild(this.renderer.domElement);  // Append the renderer to the DOM
        console.log('hi',container);
        // container.appendChild(this.renderer.domElement);

        
        // const container = document.getElementById(containerID);
        // if (container) {
        //     container.appendChild(this.renderer.domElement);
        // } else {
        //     console.error(`Container with ID ${containerID} not found. Found ${container}`);
        // }

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.scene.add(this.mesh);


    
        this.text3D = new Text3D(this.scene);

        // Load the font and then create the text
        this.text3D.loadFont('fonts/helvetiker_regular.typeface.json', () => {
            this.text3D.createText('Samantha Wang');
        });

        this.donutSphere = new DonutSphere(this.scene);
        this.donutSphere.createDonutSphere();

        // // Example of updating parameters
        // setTimeout(() => {
        //     text3D.updateParameters({ size: 1, bevelThickness: 0.05 });
        //     text3D.createText('Updated Text');
        // }, 5000); // Update parameters and recreate text after 5 seconds

        // // Add necessary camera, renderer, and animate logic to see the scene
        // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // camera.position.z = 5;

        // const renderer = new THREE.WebGLRenderer();
        // renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild(renderer.domElement);




        // this.renderer.render(this.scene, this.camera);
        this.animate();
    }
    animate() {

        requestAnimationFrame(() => this.animate());
        // const elapsedTime = this.clock.getElapsedTime();
        this.mesh.rotation.x += .001;
        this.mesh.rotation.y += .001;
        this.renderer.render(this.scene, this.camera);
    }
}
