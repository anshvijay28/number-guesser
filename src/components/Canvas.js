import React, { useRef, useEffect, useState } from "react";
import "../styles/Canvas.css";

const DrawingCanvas = ({ clear, setClear, submit, setSubmit, setImage }) => {
	const canvasRef = useRef(null);
	const hasPageBeenRendered = useRef({ clear: false, submit: false });
	const [isDrawing, setIsDrawing] = useState(false);

	const CANVAS_SIZE = 475;

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.strokeStyle = "black";
		ctx.lineWidth = 2;
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
	}, []);

	useEffect(() => {
		if (hasPageBeenRendered.current["submit"]) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext("2d");
			if (submit) {
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				const pixels = imageData.data;
				setImage(Array.from(pixels));
				setSubmit(false);
			}
		}
		hasPageBeenRendered.current["submit"] = true;
	}, [submit, setImage, setSubmit]);

	useEffect(() => {
		if (hasPageBeenRendered.current["clear"]) {
			if (clear) {
				const canvas = canvasRef.current;
				const ctx = canvas.getContext("2d");
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				setClear(false);
			}
		}
		hasPageBeenRendered.current["clear"] = true;
	}, [clear, setClear]);

	const startDrawing = (e) => {
		setIsDrawing(true);
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;
		ctx.beginPath();
		ctx.moveTo(x, y);
	};

	const draw = (e) => {
		if (!isDrawing) return;
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		ctx.lineWidth = 40;
		const x = e.nativeEvent.offsetX;
		const y = e.nativeEvent.offsetY;
		ctx.lineTo(x, y);
		ctx.stroke();
	};

	const endDrawing = () => {
		// const canvas = canvasRef.current;
		// const ctx = canvas.getContext("2d");
		// const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
		// const pixels = imageData.data;
		// setImage(Array.from(pixels));
		setIsDrawing(false);
	};

	return (
		<canvas
			className="canvas"
			ref={canvasRef}
			width={CANVAS_SIZE}
			height={CANVAS_SIZE}
			onMouseDown={startDrawing}
			onMouseMove={draw}
			onMouseUp={endDrawing}
			onMouseOut={endDrawing}
		/>
	);
};

export default DrawingCanvas;
