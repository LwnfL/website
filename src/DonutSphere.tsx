import * as THREE from 'three';

export default class DonutSphere {
    private scene: THREE.Scene;
    private donutgroup: THREE.Group;
    private donutGeometry: THREE.TorusGeometry;

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        this.donutgroup = new THREE.Group()
        this.donutGeometry = new THREE.TorusGeometry(.3,.2,20,45)

    }
    createDonutSphere() {
        const material = new THREE.MeshNormalMaterial()

        for (let i=1; i<1000; i++)
        {
            const donut = new THREE.Mesh(this.donutGeometry,material)
            
            const radius = Math.cbrt(Math.random()) * (4) + 5 
            /*(4) is how spread-out you want them to be, +5 is the minimum distance from axis*/
            const theta = Math.random()*2*Math.PI
            const phi = Math.acos(2.0*Math.random()-1) //find the bounds for these
            donut.position.x = Math.cos(theta)*Math.sin(phi)*radius
            donut.position.z = Math.cos(phi)*radius
            donut.position.y = Math.sin(phi)*Math.sin(theta)*radius

            donut.rotation.x = Math.random()*Math.PI
            donut.rotation.y = Math.random()*Math.PI
            
            const scale = Math.random()
            donut.scale.set(scale,scale,scale)
            
            this.donutgroup.add(donut)
        
        }
        this.scene.add(this.donutgroup)
    }
}