import React, {useRef} from "react";
import {useFrame, useLoader, useThree} from "react-three-fiber";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import portraitObj from "../../assets/582706_rendering.obj";
import * as THREE from "three";

const Portrait = () => {
    const group = useRef(null);
    const portrait = useLoader(OBJLoader, portraitObj);
    const {camera} = useThree();
    camera.position.z = 120;
    camera.near = 100;
    camera.aspect = window.innerWidth / window.innerHeight;
    console.log(camera)

    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -0.1,
        color: "#fff"
    });

    return (
        <group ref={group} dispose={null}>
            <mesh geometry={portrait.children[0].geometry} material={material} ref={group}/>
        </group>
    )
}

export default Portrait;