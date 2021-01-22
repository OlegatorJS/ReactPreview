import {useFrame, useThree} from "react-three-fiber";
import React, {useRef} from "react";

const CameraControls = () => {
    const {
        camera,
        gl: {domElement}
    } = useThree();

    useFrame(() => controls.current.update());
    const controls = useRef();
    camera.position.z = 0;

    return (
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={true}
            maxPolarAngle={Math.PI * 0.5}
            minPolarAngle={0}
            minDistance={100}
            maxDistance={200}
        />
    );
};

export default CameraControls;