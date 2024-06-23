import { map, matrix, multiply, add } from "mathjs";
import weights from "./model_weights.json";
import bias from "./bias.json";

const sigmoid = (num) => 1 / (1 + Math.exp(-1 * num));

function softmax(u3) {
	let softmaxed = new Array(10).fill(0);
	let total = 0;
	let max = u3[0][0];

	for (let i = 1; i < 10; i++) max = Math.max(max, u3[i][0]);
	for (let i = 0; i < 10; i++) total += Math.exp(u3[i][0] - max);
	for (let i = 0; i < 10; i++) softmaxed[i] = Math.exp(u3[i][0] - max) / total;

	return softmaxed;
}

// used for testing
function convertToImg(inp) {
	let img = new Array(28).fill(0).map(() => new Array(28).fill(0));
	for (let i = 0; i < 28; i++) {
		for (let j = 0; j < 28; j++) {
			img[i][j] = inp[i * 28 + j];
		}
	}
	return img;
}

function convertToInputMatrix(inp) {
	let targetMatrix = new Array(784).fill(0).map(() => new Array(1).fill(0));

	for (let i = 0; i < inp.length; i++) {
		targetMatrix[i][0] = inp[i];
	}
	return targetMatrix;
}

const W1 = matrix(weights.h1);
const W2 = matrix(weights.h2);
const W3 = matrix(weights.o);

const B1 = matrix(bias.h1);
const B2 = matrix(bias.h2);
const B3 = matrix(bias.o);

function forwardPass(image) {
	const originalSize = Math.sqrt(image.length);
	const targetSize = 28;
	const blockSize = Math.floor(originalSize / targetSize);

	let originalMatrix = [];
	let pooledVals = [];

	for (let i = 0; i < originalSize; i++) {
		originalMatrix.push(image.slice(i * originalSize, (i + 1) * originalSize));
	}

	for (let i = 0; i < targetSize; i++) {
		for (let j = 0; j < targetSize; j++) {
			let sum = 0;
			for (let k = 0; k < blockSize; k++) {
				for (let l = 0; l < blockSize; l++) {
					sum += originalMatrix[i * blockSize + k][j * blockSize + l];
				}
			}
			let average = sum / (blockSize * blockSize);
			let normalizeAvg = (average / 255) * 0.99 + 0.01;
			pooledVals.push(Math.round((normalizeAvg + Number.EPSILON) * 100) / 100);
		}
	}

	let input = convertToInputMatrix(pooledVals);
	let u1 = add(multiply(W1, input), B1);
	let o1 = map(u1, sigmoid);
	let u2 = add(multiply(W2, o1), B2);
	let o2 = map(u2, sigmoid);
	let u3 = add(multiply(W3, o2), B3);
	let o3 = softmax(u3.valueOf());

	return o3;
}

export default forwardPass;
