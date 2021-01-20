import React, {Suspense} from "react";
import {Canvas, extend} from "react-three-fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import "./App.css";
import Shape from "./components/Shape";
import Loading from "./components/Loading";
import CameraControls from "./components/CameraControls";
import Portrait from "./components/Portrait";

extend({OrbitControls});

const App = () => {
    return (
        <div className="App">
            <Canvas>
                <CameraControls/>
                <ambientLight intensity={0.5}/>
                <spotLight intensity={0.8} position={[300, 300, 400]}/>
                <Suspense fallback={<Loading/>}>
                    <Shape/>
                    <Portrait/>
                </Suspense>
            </Canvas>
        </div>
    );
}
export default App;
