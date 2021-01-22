import React, {useRef} from "react";
import {useThree} from "react-three-fiber";
import * as THREE from "three";

const Portrait = ({object, updateData}) => {

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
             <mesh geometry={object.children[0].geometry} material={material} ref={group}/>
        </group>
    )
}

export default Portrait;