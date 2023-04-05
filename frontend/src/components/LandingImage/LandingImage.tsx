import { OrbitControls, PresentationControls, Stage, useGLTF } from '@react-three/drei'
import React, { ForwardRefExoticComponent, RefAttributes, RefObject, useEffect, useRef, useState } from 'react'
import { Canvas, Props } from 'react-three-fiber';
import './LandingImage.css';
import * as BABYLON from 'babylonjs';
import THREE from 'three';

export const LandingImage = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);


    const [rotation, setRotation] = useState(0);

    const Model = (props: any) => {
        const { scene } = useGLTF('./world.glb');
        return <primitive object={scene} />
    }

    useEffect(() => {
        setInterval(rotate, 10);
    }, [])

    const rotate = () => {
        setRotation((rotation) => rotation + 0.0005);
    }
    <OrbitControls enableZoom={false} />
    return (
        <div className='canvas-3d'>
            <Canvas
                ref={canvasRef}
                dpr={[1, 2]}
                camera={{ position: [0, 2, 5], fov: 45, near: 100, far: 100 }}
                style={{ position: "absolute", width: "100%", height: "90%", left: 0, right: 0, top: "3rem" }}
            >
                <color attach="background" args={["#fff"]} />
                <PresentationControls speed={1.5} rotation={[0, rotation, 0]} polar={[0, Math.PI / 4]} >
                    <Stage environment={"dawn"}>
                        <Model scale={0.2} />
                    </Stage>
                </PresentationControls>
            </Canvas >
        </div >
    )
}


// const createScene = () => {
//     const canvas = canvasRef.current;
//     let engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
//     let scene = new BABYLON.Scene(engine);
//     let light0 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 2, 8), scene);
//     let camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 20, new BABYLON.Vector3(0, 0, 0), scene);
//     camera.attachControl(canvas, true);
//     let sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 4, segments: 8 }, scene);
//     sphere.material = new BABYLON.StandardMaterial("mat", scene);
//     sphere.material.wireframe = true;
//     let particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene);
//     particleSystem.particleTexture = new BABYLON.Texture("textures/flare.png", scene);
//     particleSystem.emitter = BABYLON.Vector3.Zero();
//     particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
//     particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
//     particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
//     particleSystem.minSize = 0.1;
//     particleSystem.maxSize = 0.5;
//     particleSystem.minLifeTime = 0.3;
//     particleSystem.maxLifeTime = 1.5;
//     particleSystem.emitRate = 1000;
//     particleSystem.createSphereEmitter(2);
//     particleSystem.minEmitPower = 1;
//     particleSystem.maxEmitPower = 3;
//     particleSystem.updateSpeed = 0.005;
//     particleSystem.start();
//     return scene;
// }