import swal from 'sweetalert';
import * as three from 'three';
import * as compatibilityCheck from '../../../js/compatibilityCheck.js';

const main = () => {
	// 创建场景
	const scene = new three.Scene();

	// 创建一个立方体
	const geometry = new three.BoxGeometry();
	const material = new three.MeshBasicMaterial({ color: 0x00ff00 });
	const cube = new three.Mesh(geometry, material);

	// 将立方体添加到场景
	scene.add(cube);

	// 创建透视相机
	const camera = new three.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 5;

	// 创建渲染器
	const renderer = new three.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById('map').appendChild(renderer.domElement);

	// 渲染场景
	function animate() {
		requestAnimationFrame(animate);

		// 使立方体旋转起来
		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		renderer.render(scene, camera);
	}

	// 调用 animate 函数
	animate();
};

export default () => {
	//
};
