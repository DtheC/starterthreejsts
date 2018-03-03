import * as THREE from 'three';
import './default.scss'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var element = document.createElement('div');

// Lodash, now imported by this script
element.innerHTML = 'fdasfs';   
element.classList.add('red');
document.body.appendChild(element);