import React, {Suspense, useRef, useState} from "react";
import {
    Canvas,
    useLoader,
    useFrame,
    extend,
    useThree
} from "react-three-fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import "./App.css";
import threeDs from './assets/582706_rendering.obj';
import testAsc from './assets/416989.asc';
import custom from './assets/custom.pcd';
import {FileLoader} from "three";
import {TDSLoader} from "three/examples/jsm/loaders/TDSLoader";
import CustomModel from "./components/customModel";
import ThreePointVis from "./components/ThreePointVis";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";

extend({OrbitControls});
let test = [];

function Loading() {
    return (
        <mesh visible position={[0, 0, 0]} rotation={[0, 0, 0]}>
            <sphereGeometry attach="geometry" args={[1, 16, 16]}/>
            <meshStandardMaterial
                attach="material"
                color="white"
                transparent
                opacity={0.6}
                roughness={1}
                metalness={0}
            />
        </mesh>
    );
}

function Scene() {
    const group = useRef(null);
    const texture = useRef([]);

    const points = useLoader(OBJLoader, threeDs)
    const loader = new FileLoader();
    const newArray = [];

    console.log(points)
    return (
        <mesh position={[0, 0, 1]} rotation={[0, 0, 0]} ref={group}>
            <primitive object={points} ref={group}/>
            {/*<bufferGeometry>*/}
            {/*    <bufferAttribute*/}
            {/*        attachObject={['attributes', 'position']}*/}
            {/*        // count={vertices.length / 3}*/}
            {/*        // array={vertices}*/}
            {/*        itemSize={3} />*/}
            {/*</bufferGeometry>*/}
        </mesh>
    )
}

const CameraControls = () => {
    // Get a reference to the Three.js Camera, and the canvas html element.
    // We need these to setup the OrbitControls class.
    // https://threejs.org/docs/#examples/en/controls/OrbitControls

    const {
        camera,
        gl: {domElement}
    } = useThree();

    // Ref to the controls, so that we can update them on every frame using useFrame
    const controls = useRef();
    useFrame(() => controls.current.update());
    return (
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={true}
            maxAzimuthAngle={Math.PI}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Math.PI}
            minPolarAngle={0}
        />
    );
};

export default function App() {
    return (
        // <div className="App">
        //     <div className="vis-container">
        //         <Suspense fallback={<Loading/>}>
        //             <ThreePointVis data={data}/>
        //         </Suspense>
        //     </div>
        // </div>
        <div className="App">
        <Canvas>
            <CameraControls/>
            <ambientLight intensity={0.5} />
            <spotLight intensity={0.8} position={[300, 300, 400]} />
            <Suspense fallback={<Loading/>}>
                <Scene/>
            </Suspense>
        </Canvas>
        </div>
        // <CustomModel/>
    );
}
