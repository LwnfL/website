import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'

export default class Text3D {
    private parameters: any;
    private fontLoader: FontLoader;
    private scene: THREE.Scene;
    private textMesh: THREE.Mesh | null;
    private font: any;

    constructor(scene: THREE.Scene) {
        this.parameters = {
            size: 0.5,
            depth: 0.2,
            curveSegments: 5,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 3,
        };

        this.fontLoader = new FontLoader();
        this.scene = scene;
        this.textMesh = null;
        this.font = null;
    }

    loadFont(fontPath: string, callback: () => void) {
        this.fontLoader.load(
            fontPath,
            (font) => {
                this.font = font;
                callback();
            },
            undefined,
            (error) => {
                console.error('An error occurred while loading the font:', error);
            }
        );
    }

    createText(text: string) {
        if (!this.font) {
            console.error('Font not loaded yet');
            return;
        }

        const textGeometry = new TextGeometry(
            text,
            {
                font: this.font,
                size: this.parameters.size,
                depth: this.parameters.depth,
                curveSegments: this.parameters.curveSegments,
                bevelEnabled: true,
                bevelThickness: this.parameters.bevelThickness,
                bevelSize: this.parameters.bevelSize,
                bevelOffset: this.parameters.bevelOffset,
                bevelSegments: this.parameters.bevelSegments,
            }
        );

        textGeometry.center();

        const material = new THREE.MeshNormalMaterial();
        const newTextMesh = new THREE.Mesh(textGeometry, material);

        if (this.textMesh) {
            this.scene.remove(this.textMesh);
        }

        this.textMesh = newTextMesh;
        this.scene.add(this.textMesh);
    }

    // updateParameters(newParameters: Partial<typeof this.parameters>) {
    //     this.parameters = { ...this.parameters, ...newParameters };
    //     if (this.textMesh) {
    //         this.createText((this.textMesh.geometry as TextGeometry).parameters.text);
    //     }
    // }
}

