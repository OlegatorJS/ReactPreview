import React, {useEffect} from "react";
import * as THREE from 'three';

import Stats from 'three/examples/jsm/libs/stats.module.js';

import {TrackballControls} from 'three/examples/jsm/controls/TrackballControls.js';
import {PCDLoader} from 'three/examples/jsm/loaders/PCDLoader.js';

import custom from "../assets/416989.asc";
import {FileLoader} from "three";

const CustomModel = () => {

    let container, stats;
    let camera, controls, scene, renderer;
    useEffect(() => {
        init();
        animate();
    })


    function init() {

        scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.01, 40);
        camera.position.x = 0.4;
        camera.position.z = -2;
        camera.up.set(0, 0, 1);

        scene.add(camera);

        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        const loader = new PCDLoader();
        loader.load(custom, function (points) {
            console.log("POINTS:", points)
            scene.add(points);
            const center = points.geometry.boundingSphere.center;
            controls.target.set(center.x, center.y, center.z);
            controls.update();

        });

        container = document.createElement('div');
        document.body.appendChild(container);
        container.appendChild(renderer.domElement);

        controls = new TrackballControls(camera, renderer.domElement);

        controls.rotateSpeed = 2.0;
        controls.zoomSpeed = 0.3;
        controls.panSpeed = 0.2;

        controls.staticMoving = true;

        controls.minDistance = 0.3;
        controls.maxDistance = 0.3 * 100;

        stats = new Stats();
        container.appendChild(stats.dom);

    }

    function animate() {

        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
        stats.update();

    }

    return (
        <div id="info">
            <a href="https://threejs.org" target="_blank" rel="noopener">three.js</a>
            <a href="http://pointclouds.org/documentation/tutorials/pcd_file_format.php#pcd-file-format" target="_blank"
               rel="noopener">PCD File format</a>
            <div>PCD loader test by <a href="http://filipecaixeta.com.br" target="_blank" rel="noopener">Filipe
                Caixeta</a></div>
            <div>+/-: Increase/Decrease point size</div>
            <div>c: Change color</div>
        </div>
    )

}
export default CustomModel;
