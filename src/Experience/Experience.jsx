import Sizes from './Utils/Sizes';
export default class Experience {

    constructor(canvas) {

        // Gloval access
        window.experience = this;

        // Options
        this.canvas = canvas;
        console.log('hello',this.canvas)

        // Setup Sizes
        this.sizes = new Sizes();

        this.sizes.on('resize', () => {
            this.resize()
        });

    }
    resize() {
        console.log('i heard resize');
    }

    // Currently at 1:05:45 of Lesson 26
}