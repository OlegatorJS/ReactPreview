import React, {useRef} from "react";
import * as THREE from "three";
import {useLoader} from "react-three-fiber";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import rectangle from '../../assets/r69-portrait.obj';

const Shape = ({object, size}) => {
    let coordinatesList = [];
    const group = useRef();
    if (!object)
        return false;
    //const points = useLoader(OBJLoader, rectangle);

    const coordinates = object.children[0].geometry.attributes.position.array;

    for (let i = 0; i < coordinates.length; i = i + 3) {
        coordinatesList.push(new THREE.Vector3(coordinates[i], coordinates[i + 1], coordinates[i + 2]));
    }
    const extrudeSettings = {
        curveSegments: 10,
        steps: 20,
        amount: size ? size.amount : 50,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
    };
    const material = new THREE.MeshPhysicalMaterial({
        transparent: true,
        side: THREE.FrontSide,
        opacity: 0.08,
        polygonOffset: true,
        polygonOffsetFactor: -0.1,
        color: "#fff"
    });

    const geomShape = new THREE.ExtrudeBufferGeometry(new THREE.Shape(coordinatesList), extrudeSettings);
    return (
        <mesh ref={group} geometry={geomShape} material={material} position={[0, 0, size ? size.position : -25]}/>
    )
}

export default Shape;