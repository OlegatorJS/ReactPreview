import React, {Suspense, useEffect, useState} from "react";
import {Canvas, extend, useLoader} from "react-three-fiber";
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
import rectangleSmall from "./assets/r69-portrait.obj";
import rectangleMedium from "./assets/r129-portrait.obj";
import rectangleLarge from "./assets/r199-portrait.obj";
import diamondSmall from "./assets/d99.obj";
import diamondMedium from "./assets/d149.obj";
import diamondLarge from "./assets/d249.obj";

extend({OrbitControls});

const App = () => {
    const [testObj, setTestObj] = useState("");
    const [testPortrait, setTestPortrait] = useState("");
    const [shape, setShape] = useState("Rectangle Small +");
    const [size, setSize] = useState({
        amount: 50,
        x: 1,
        y: 1,
        z: 1,
        position: -25
    });
    useEffect(() => {
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
    }, []);

    useEffect(() => {
        testObj.length &&
        setTestPortrait(new OBJLoader().parse(testObj));
        new OBJLoader().load(rectangleSmall, object => setShape(object));
    }, [testObj]);

    const handleSelectShape = value => {
        switch (value) {
            case "small+" :
                new OBJLoader().load(rectangleSmall, object => {
                    setShape(object);
                    setSize({
                        amount: 50,
                        x: 1,
                        y: 1,
                        z: 1,
                        position: -25
                    })
                });
                break;
            case "medium" :
                new OBJLoader().load(rectangleMedium, object => {
                    setShape(object);
                    setSize({
                        amount: 60,
                        x: 1.4,
                        y: 1.4,
                        z: 1.4,
                        position: -30
                    })
                });
                break;
            case "large" :
                new OBJLoader().load(rectangleLarge, object => {
                    setShape(object);
                    setSize({
                        amount: 70,
                        x: 1.7,
                        y: 1.7,
                        z: 1.7,
                        position: -35
                    })
                });
                break;
            case "dsmall+" :
                new OBJLoader().load(diamondSmall, object => {
                    setShape(object);
                    setSize({
                        amount: 50,
                        x: 0.8,
                        y: 0.8,
                        z: 0.8,
                        position: -25
                    })
                });
                break;
            case "dmedium" :
                new OBJLoader().load(diamondMedium, object => {
                    setShape(object);
                    setSize({
                        amount: 60,
                        x: 1.1,
                        y: 1.1,
                        z: 1.1,
                        position: -30
                    })
                });
                break;
            case "dlarge" :
                new OBJLoader().load(diamondLarge, object => {
                    setShape(object);
                    setSize({
                        amount: 70,
                        x: 1.35,
                        y: 1.35,
                        z: 1.35,
                        position: -35
                    })
                });
                break;
        }
    };

    return (
        <div className="App">
            <div className="select-wrapper">
                <select onChange={event => handleSelectShape(event.target.value)}>
                    <option value="small+">Rectangle Small+</option>
                    <option value="medium">Rectangle Medium</option>
                    <option value="large">Rectangle Large</option>
                    <option value="dsmall+">Diamond Small+</option>
                    <option value="dmedium">Diamond Medium</option>
                    <option value="dlarge">Diamond Large</option>
                </select>
            </div>
            {testPortrait && testPortrait.children[0]
                ?
                <div className="preview-wrapper">
                    <Canvas>
                        <CameraControls/>
                        <ambientLight intensity={0.5}/>
                        <spotLight intensity={0.8} position={[300, 300, 400]}/>
                        <Suspense fallback={<Loading/>}>
                            <Shape object={shape} size={size}/>
                            <Portrait object={testPortrait} size={size}/>
                        </Suspense>
                    </Canvas>
                </div>
                :
                <div className="preview-wrapper">
                    <Loader
                        type="Rings"
                        color="#FFF"
                        height={200}
                        width={200}
                    />
                </div>
            }
        </div>
    );
}
export default App;
