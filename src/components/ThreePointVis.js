import React, {Suspense, useRef} from 'react';
import {Canvas, useFrame, useLoader, useThree} from 'react-three-fiber';
import Controls from './Controls';
import custom from './assets/417231.asc';

import {FileLoader} from "three";

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

const ThreePointVis = () => {
    const group = useRef(null);

    const points = useLoader(FileLoader, custom);
    const newArray = [];
        const basicArray = points.split('\n');
        const colors = [];

        for (let i = 0; i < basicArray.length; i++) {
            newArray.push({...basicArray[i].split(" ")})
        }

    return (
        <Canvas camera={{position: [0, 605, 113]}}>
                <Controls/>
                <axesHelper args={[600, 600, 600]}/>
                <ambientLight color="#ffffff" intensity={0.1}/>
                <hemisphereLight
                    color="#ffffff"
                    skyColor="#ffffbb"
                    groundColor="#080820"
                    intensity={1.0}
                />

                {console.log("TEST", newArray)}
                {newArray && newArray.map((item, index) => {
                    const x = +item[0];
                    const y = +item[1];
                    const z = +item[2];
                    console.log(x, y, z)
                    return (
                        <mesh
                            key={index}
                            position={[x, y, z]}
                        >
                            <octahedronBufferGeometry
                                attach="geometry"
                            />
                            <meshStandardMaterial attach="material" color={item[3]}/>
                        </mesh>
                    );
                })}

        </Canvas>

    );
};

export default ThreePointVis;
