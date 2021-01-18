import React, {Suspense, useRef} from 'react';
import {Canvas, useFrame, useLoader, useThree} from 'react-three-fiber';
import Controls from './Controls';
import custom from "../assets/custom.asc";
import threeDs from "../assets/Cottage_FREE.3DS";
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

const ThreePointVis = ({data}) => {
    let array = [];
    const group = useRef(null);
    // const newArray = [{0: "1.0000", 1: "6", 2: "112.3710", 3: "-15918817"},{0: "1.0000", 1: "6", 2: "110.8057", 3: "-15787230"},{0: "2.0000", 1: "6", 2: "120.8186", 3: "-16512501"},{0: "2.0000", 1: "6", 2: "118.9457", 3: "-16181989"}]

    //const loader = new FileLoader();
    const points = useLoader(FileLoader, custom);
    const newArray = [];
        const basicArray = points.split('\n');
        const colors = [];

        for (let i = 0; i < basicArray.length; i++) {
            newArray.push({...basicArray[i].split(" ")})
        }

    // loader.load(custom, points => {
    //
    // });
    console.log(newArray)
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
