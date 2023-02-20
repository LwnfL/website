import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

/**
 * Base Setup
 */

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.fog = new THREE.Fog(0xFFFFFF,.1,30)

//REMOVE

//Axes helper
const axesHelper = new THREE.AxesHelper() //x(red),y(green),z(blue)
scene.add(axesHelper)

/**
 * Textures
 */

/**
 * Fonts
 */

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
const donutgroup = new THREE.Group()  

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
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
        // textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x-parameters.bevelSize) * .5,
        //     -(textGeometry.boundingBox.max.y-parameters.bevelSize) * .5,
        //     -textGeometry.boundingBox.max.z-parameters.bevelThickness * 0.5
        // )        

        textGeometry.center() //much simpler way than commented code above
        console.log(textGeometry.boundingBox)        
        const material = new THREE.MeshNormalMaterial()
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

/**
 * Object
 */
             
        const donutGeometry = new THREE.TorusGeometry(.3,.2,20,45)
        
        for (let i=1; i<2000; i++)
        {
            const donut = new THREE.Mesh(donutGeometry,material)
            
            const radius = Math.random() * (30 - 10) + 10
            const theta = Math.random()*2*Math.PI
            const phi = Math.random()*2*Math.PI //find the bounds for these
            donut.position.x = Math.cos(phi)*Math.sin(theta)*radius
            donut.position.y = Math.cos(theta)*radius
            donut.position.z = Math.sin(phi)*Math.sin(theta)*radius

            donut.rotation.x = Math.random()*Math.PI
            donut.rotation.y = Math.random()*Math.PI
            
            const scale = Math.random()
            donut.scale.set(scale,scale,scale)
            
            donutgroup.add(donut)
        
        }
        scene.add(donutgroup)
    }
)





// const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16 );
// const material = new THREE.MeshNormalMaterial()
// material.side = THREE.DoubleSide
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
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
    donutgroup.rotation.x=elapsedTime*-.05     //consistent spinning across devices
    donutgroup.rotation.z=elapsedTime*.07


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()