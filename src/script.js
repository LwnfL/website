import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base Setup
 */

// Debug

// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Axes helper
// const axesHelper = new THREE.AxesHelper() //x(red),y(green),z(blue)
// scene.add(axesHelper)

/**
 * Textures
 */

/**
 * Fonts
 */

class Drop {
    constructor(x,y,z){
      this.x = x;
      this.y = y;
      this.z = z;

      this.xrot=Math.random()*-0.5;
      this.yrot=Math.random()*0.7;
      

      this.yspeed=2+5*Math.random();
      const geometry = new THREE.TorusGeometry(.3,.2,20,45)
      const material = new THREE.MeshNormalMaterial()
      this.mesh = new THREE.Mesh(geometry,material)
      this.mesh.position.x = this.x
      this.mesh.position.y = this.y
      this.mesh.position.z = this.z
      scene.add(this.mesh)
    }

    updatePhysics(){
      this.y-=this.yspeed*0.1
    //   donutgroup.rotation.x=elapsedTime*-.05 
      if (this.y < -5) {
        this.y=20+Math.random()*10
      }
    }

    updateRot(time){
        this.mesh.rotation.x=time*this.xrot
        this.mesh.rotation.y=time*this.yrot
        }
    
    updateMesh(){
        this.mesh.position.y=this.y
    }
  }

const parameters = {
    size: 0.5, 
    height: 0.2, //depth of font
    curveSegments: 5, //lower = easier for computer
    bevelThickness:.03,
    bevelSize: .02,
    bevelOffset: 0,
    bevelSegments:3 //lower = easier for computer
}

const fontLoader = new FontLoader()
// const donutgroup = new THREE.Group()  

const drops = []
        for(let i = 0; i < 500; i++){
            const radius = Math.cbrt(Math.random()) * (8) + 8 
            /*(4) is how spread-out you want them to be, +5 is the minimum distance from axis*/
            const theta = Math.random()*2*Math.PI
            const phi = Math.acos(2.0*Math.random()-1)
            drops.push(new Drop(Math.cos(theta)*Math.sin(phi)*radius,Math.sin(phi)*Math.sin(theta)*radius,Math.cos(phi)*radius))
        }     

fontLoader.load(
    'https://lwnfl.github.io/website/fonts/helvetiker_regular.typeface.json',
    (font) => 
    {
        const textGeometry = new TextGeometry(
            'Samantha Wang',
            {
                font : font,
                size: parameters.size, 
                height: parameters.height, 
                curveSegments: parameters.curveSegments, 
                bevelEnabled: true,
                bevelThickness:parameters.bevelThickness,
                bevelSize: parameters.bevelSize,
                bevelOffset: parameters.bevelOffset,
                bevelSegments:parameters.bevelSegments 
            }
        )      

        textGeometry.center() //much simpler way than commented code above
        console.log(textGeometry.boundingBox)        
        const material = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1,1000)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    drops.forEach((drop)=>{
        // console.log(e)
        drop.updatePhysics()
        drop.updateRot(elapsedTime)
        drop.updateMesh()
    })
 

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()