import React, {Suspense, useRef} from "react";
import {
    Canvas,
    useLoader,
    useFrame,
    extend,
    useThree
} from "react-three-fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import "./App.css";
import threeDs from './components/assets/r69-portrait.obj';
import testTexture from "./components/assets/texture.jpg";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import {TextureLoader} from "three";
import portrait from "./components/assets/582706_rendering.obj"

extend({OrbitControls});

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
    const group2 = useRef(null);
    const texture = useLoader(TextureLoader, testTexture);

    const points = useLoader(OBJLoader, threeDs);
    const newArray = useLoader(OBJLoader, portrait);

    console.log(points)
    return (
            <lineSegments position={[0, 0, 0]} rotation={[0, 0, 0]} ref={group}>
                {/*<primitive object={points} ref={group}/>*/}
                <bufferGeometry>
                    <bufferAttribute
                        attachObject={['attributes', 'position']}
                        count={points.children[0].geometry.attributes.position.count}
                        array={points.children[0].geometry.attributes.position.array}
                        itemSize={3}/>
                </bufferGeometry>
            </lineSegments>
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
    camera.position.z = 10;
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
    const newArray = useLoader(OBJLoader, portrait);
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
                <ambientLight intensity={0.5}/>
                <spotLight intensity={0.8} position={[300, 300, 400]}/>
                <Suspense fallback={<Loading/>}>
                    <Scene/>

                </Suspense>
                <Suspense fallback={<Loading/>}>
                <primitive object={newArray}/>
                </Suspense>
            </Canvas>
        </div>
        // <CustomModel/>
    );
}
