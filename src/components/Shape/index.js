import React, {useRef} from "react";
import * as THREE from "three";
import {useLoader, useUpdate, } from "react-three-fiber";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import rectangle from '../../assets/r199-landscape.obj';
import {TextureLoader} from "three";

const Shape = () => {
    let coordinatesList = [];
    const group = useRef();

    const points = useLoader(OBJLoader, rectangle);

    const lines = useUpdate((geo) => geo.fromEdgesGeometry(new THREE.EdgesGeometry(points.children[0].geometry)), []);
    const coordinates = points.children[0].geometry.attributes.position.array;
    for (let i = 0; i < coordinates.length; i = i + 3) {
        coordinatesList.push(new THREE.Vector3(coordinates[i], coordinates[i + 1], coordinates[i + 2]));
    }

    console.log(points.children[0].geometry.attributes.position.array);
    console.log(coordinatesList);

    const extrudeSettings = {
        curveSegments: 10,
        steps: 20,
        amount: 30,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 1
    };
    const material = new THREE.MeshBasicMaterial({
        transparent: true,
        side: THREE.FrontSide,
        opacity: 0.05,
        polygonOffset: true,
        polygonOffsetFactor: -0.1,
        color: "#fff"
    });

    const geomShape = new THREE.ExtrudeBufferGeometry(new THREE.Shape(coordinatesList), extrudeSettings);
    return (
        <group ref={group} dispose={null}>
            <mesh geometry={geomShape} material={material} position={[0, 0, -15]}/>
        </group>
    )
}

export default Shape;