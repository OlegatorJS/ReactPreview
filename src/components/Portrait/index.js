import React, {useRef} from "react";
import {useLoader} from "react-three-fiber";
import {OBJLoader} from "three/examples/jsm/loaders/OBJLoader";
import portraitObj from "../../assets/582706_rendering.obj";

const Portrait = () => {
    const group = useRef(null);

    const portrait = useLoader(OBJLoader, portraitObj);

    console.log(portrait)
    return (
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]} ref={group}>
            {/*<primitive object={points} ref={group}/>*/}
            <bufferGeometry>
                <bufferAttribute
                    attachObject={['attributes', 'position']}
                    count={portrait.children[0].geometry.attributes.position.count}
                    array={portrait.children[0].geometry.attributes.position.array}
                    itemSize={3}/>
            </bufferGeometry>
            {/*<pointsMaterial size={0.0001}/>*/}
        </mesh>
    )
}

export default Portrait;