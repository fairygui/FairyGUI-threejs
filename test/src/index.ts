import * as THREE from "three";
import * as fgui from "../../build/FairyGUI";

export class Threescene {
    private scene: THREE.Scene
    private renderer: THREE.WebGLRenderer;

    private _mainMenu: fgui.GComponent;

    constructor() {
        this.init();
    }

    private init() {
        this.renderer = new THREE.WebGLRenderer();//{ antialias: true }
        this.renderer.setClearColor(0X222222);
        this.renderer.sortObjects = false;
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.localClippingEnabled = true;
        document.body.appendChild(this.renderer.domElement);
        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight)
        }, false);

        this.scene = new THREE.Scene();

        fgui.Stage.init(this.renderer);
        fgui.Stage.scene = this.scene;

        fgui.UIContentScaler.scaleWithScreenSize(1136, 640, fgui.ScreenMatchMode.MatchWidthOrHeight);

        // let listener: THREE.AudioListener = new THREE.AudioListener();
        // fgui.Stage.camera.add(listener);
        // fgui.Stage.audioListener = listener;

        fgui.UIPackage.loadPackage("assets/UI/Package1").then(this.start.bind(this));

        this.animate();
    }

    private start() {
        this._mainMenu = fgui.UIPackage.createObject("Package1", "Main").asCom;
        this._mainMenu.makeFullScreen();
        fgui.GRoot.inst.addChild(this._mainMenu);
    }

    private render() {
        fgui.Stage.update();
        this.renderer.render(this.scene, fgui.Stage.camera);
    }

    private animate = () => {
        requestAnimationFrame(this.animate)
        this.render()
    }
}

new Threescene();