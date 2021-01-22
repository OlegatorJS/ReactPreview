import React, {Suspense, useEffect, useState} from "react";
import {Canvas, extend} from "react-three-fiber";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import "./App.css";
import Shape from "./components/Shape";
import Loading from "./components/Loading";
import CameraControls from "./components/CameraControls";
import Portrait from "./components/Portrait";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import archive from "./assets/model.zip";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import Loader from "react-loader-spinner";

extend({OrbitControls});

const App = () => {
    const [testObj, setTestObj] = useState("");
    const [testPortrait, setTestPortrait] = useState("");
    useEffect(()=>{
        new JSZip.external.Promise(function (resolve, reject) {
            JSZipUtils.getBinaryContent(archive, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }).then(function (data) {
            return JSZip.loadAsync(data);
        }).then(function (zip) {
            Object.keys(zip.files).forEach(function (filename) {
                zip.files[filename].async('string').then(function (fileData) {
                    if (fileData.length) {
                        setTestObj(fileData);
                    }
                })
            })
        });
    },[])

    useEffect(() => {
        testObj.length &&
        setTestPortrait(new OBJLoader().parse(testObj));
    }, [testObj]);
    return (
        <div className="App">
            {testPortrait && testPortrait.children[0]
                ?
                <Canvas>
                    <CameraControls/>
                    <ambientLight intensity={0.5}/>
                    <spotLight intensity={0.8} position={[300, 300, 400]}/>
                    <Suspense fallback={<Loading/>}>
                        <Shape/>
                        <Portrait object={testPortrait}/>
                    </Suspense>
                </Canvas>
                : <Loader
                    type="Rings"
                    color="#FFF"
                    height={200}
                    width={200}
                />}
        </div>
    );
}
export default App;
