import {useFrame, useThree} from "react-three-fiber";
import React, {useRef} from "react";

const CameraControls = () => {
    const {
        camera,
        gl: {domElement}
    } = useThree();
    useFrame(() => controls.current.update());
    const controls = useRef();
    camera.position.z = 10;

    return (
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={true}
            maxAzimuthAngle={Math.PI}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Math.PI}
            minPolarAngle={0}
        />
    );
};

export default CameraControls;