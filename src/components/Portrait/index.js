import React, {useRef} from "react";
import {useThree} from "react-three-fiber";
import * as THREE from "three";

const Portrait = ({object, size}) => {

    const group = useRef(null);

    const {camera} = useThree();
    camera.position.z = 120;
    camera.near = 50;
    camera.aspect = window.innerWidth / window.innerHeight;

    const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        polygonOffset: true,
        polygonOffsetFactor: -0.1,
        color: "#fff"
    });

    return (
        <group ref={group} dispose={null}>
             <mesh geometry={object.children[0].geometry} material={material} ref={group} scale={ size ? [size.x, size.y, size.z] : [1, 1, 1]}/>
        </group>
    )
}

export default Portrait;