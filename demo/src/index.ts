import * as THREE from "three";
import * as fgui from "../../build/FairyGUI"

import BasicDemo from "./BasicsDemo";
import TransitionDemo from "./TransitionDemo";
import VirtualListDemo from "./VirtualListDemo";
import LoopListDemo from "./LoopListDemo";
import PullToRefreshDemo from "./PullToRefreshDemo";
import ModalWaitingDemo from "./ModalWaitingDemo";
import JoystickDemo from "./JoystickDemo";
import BagDemo from "./BagDemo";
import ListEffectDemo from "./ListEffectDemo";
import GuideDemo from "./GuideDemo";
import CooldownDemo from "./CooldownDemo";
import HitTestDemo from "./HitTestDemo";
import ChatDemo from "./ChatDemo";
import ScrollPaneDemo from "./ScrollPaneDemo";
import TreeViewDemo from "./TreeViewDemo";

export class Threescene {
    private scene: THREE.Scene
    private renderer: THREE.WebGLRenderer;

    private _closeButton: fgui.GObject;
    private _currentDemo: any;
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

        fgui.UIPackage.loadPackage("assets/UI/MainMenu").then(this.start.bind(this));

        this.animate();
    }

    private start() {
        this._mainMenu = fgui.UIPackage.createObject("MainMenu", "Main").asCom;

        this._mainMenu.getChild("n1").onClick(() => {
            this.startDemo(BasicDemo);
        }, this);
        this._mainMenu.getChild("n2").onClick(() => {
            this.startDemo(TransitionDemo);
        }, this);
        this._mainMenu.getChild("n4").onClick(() => {
            this.startDemo(VirtualListDemo);
        }, this);
        this._mainMenu.getChild("n5").onClick(() => {
            this.startDemo(LoopListDemo);
        }, this);
        this._mainMenu.getChild("n6").onClick(() => {
            this.startDemo(HitTestDemo);
        }, this);
        this._mainMenu.getChild("n7").onClick(() => {
            this.startDemo(PullToRefreshDemo);
        }, this);
        this._mainMenu.getChild("n8").onClick(() => {
            this.startDemo(ModalWaitingDemo);
        }, this);
        this._mainMenu.getChild("n9").onClick(() => {
            this.startDemo(JoystickDemo);
        }, this);
        this._mainMenu.getChild("n10").onClick(() => {
            this.startDemo(BagDemo);
        }, this);
        this._mainMenu.getChild("n11").onClick(() => {
            this.startDemo(ChatDemo);
        }, this);
        this._mainMenu.getChild("n12").onClick(() => {
            this.startDemo(ListEffectDemo);
        }, this);
        this._mainMenu.getChild("n13").onClick(() => {
            this.startDemo(ScrollPaneDemo);
        }, this);
        this._mainMenu.getChild("n14").onClick(() => {
            this.startDemo(TreeViewDemo);
        }, this);
        this._mainMenu.getChild("n15").onClick(() => {
            this.startDemo(GuideDemo);
        }, this);
        this._mainMenu.getChild("n16").onClick(() => {
            this.startDemo(CooldownDemo);
        }, this);

        this.showMainMenu();
    }

    private showMainMenu() {
        this._mainMenu.makeFullScreen();
        fgui.GRoot.inst.addChild(this._mainMenu);
    }

    private startDemo(demoClass: new () => any) {
        fgui.GRoot.inst.removeChild(this._mainMenu);

        this._currentDemo = new demoClass();
        this._closeButton = fgui.UIPackage.createObject("MainMenu", "CloseButton");
        this._closeButton.setPosition(fgui.GRoot.inst.width - this._closeButton.width - 10, fgui.GRoot.inst.height - this._closeButton.height - 10);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Right_Right);
        this._closeButton.addRelation(fgui.GRoot.inst, fgui.RelationType.Bottom_Bottom);
        this._closeButton.sortingOrder = 100000;
        this._closeButton.onClick(this.onDemoClosed, this);
        fgui.GRoot.inst.addChild(this._closeButton);
    }

    private onDemoClosed() {
        fgui.GRoot.inst.removeChildren(0, -1, true);
        if ('dispose' in this._currentDemo)
            this._currentDemo.dispose();

        this.showMainMenu();
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