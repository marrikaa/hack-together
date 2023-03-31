import { PresentationControls, Stage, useGLTF } from '@react-three/drei'
import React, { ForwardRefExoticComponent, RefAttributes, RefObject, useRef } from 'react'
import { Canvas, Props } from 'react-three-fiber';
import './LandingImage.css';
import * as BABYLON from 'babylonjs';

export const LandingImage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const createScene = () => {
        const canvas = canvasRef.current;
        let engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
        let scene = new BABYLON.Scene(engine);
        let light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 2, 8), scene);
        let camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 20, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);
        let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 4, segments: 8 }, scene);
        sphere.material = new BABYLON.StandardMaterial("mat", scene);
        sphere.material.wireframe = true;
        let particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
        particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
        particleSystem.emitter = BABYLON.Vector3.Zero();
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
        particleSystem.minSize = 0.1;
        particleSystem.maxSize = 0.5;
        particleSystem.minLifeTime = 0.3;
        particleSystem.maxLifeTime = 1.5;
        particleSystem.emitRate = 1000;
        particleSystem.createSphereEmitter(2);
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;
        particleSystem.updateSpeed = 0.005;
        particleSystem.start();
        return scene;
    }

    const Model = (props: any) => {
        const { scene } = useGLTF('./world.glb');
        return <primitive object={scene} />
    }

    return (
        <div className='canvas-3d'>
            < Canvas ref={canvasRef} dpr={[1, 2]} shadows camera={{ fov: 45 }
            } style={{ 'position': 'absolute', width: '80%', height: '80%' }} >
                <color attach="background" args={["#ffffff"]} />
                <PresentationControls speed={1.5} global zoom={1} polar={[-0.1, Math.PI / 4]} >
                    <Stage environment={undefined}>
                        <Model scale={1} />
                    </Stage>
                </PresentationControls>
            </Canvas >
        </div >
    )
}
