import "../styles/App.css";
import DrawingCanvas from "./Canvas.js";
import Checkbox from "./Checkbox.js";
import githubLogo from "../pictures/github_logo.png";
import Modal from "./Modal.js";
import { useEffect, useState } from "react";
import forwardPass from "../scripts/forwardPass.js";

function App() {
	const [visible, setVisible] = useState(false);
	const [showPercentage, setShowPercentage] = useState(false);
	const [clear, setClear] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [result, setResult] = useState("");
	const [image, setImage] = useState([]);
	const buttonClassName =
		"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
	const titleClassName =
		"app-name title mb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white";

	const handleSubmit = () => {
		setSubmit(true);
	};
	const handleClear = () => {
		setClear(true);
		setResult("");
	}
	
	useEffect(() => {
		if (image.length > 0) {
			let nnOutput = forwardPass(image); 
			console.log(nnOutput);
			const prediction = nnOutput.indexOf(Math.max(...nnOutput));
			if (showPercentage) {
				const percentage = Math.round((nnOutput[prediction] + Number.EPSILON) * 100);
				setResult(`You drew: ${prediction} (${percentage}%)`)
			} else {
				setResult(`You drew: ${prediction}`);
			}
		}
	}, [image, showPercentage])

	return (
		<div className="screen bg-zinc-600 h-screen">
			<div className={titleClassName}>Number Guesser</div>
			<div className="canvas-wrapper border-solid border-2 border-sky-500">
				<DrawingCanvas
					clear={clear}
					setClear={setClear}
					submit={submit}
					setSubmit={setSubmit}
					setImage={setImage}
				/>
			</div>
			<div className="options-container">
				<button
					className={buttonClassName}
					onClick={() => setVisible(!visible)}
				>
					Info
				</button>
				<button className={buttonClassName} onClick={handleSubmit}>
					Submit
				</button>
				<button className={buttonClassName} onClick={handleClear}>
					Clear
				</button>
				<Checkbox
					checked={showPercentage}
					setChecked={() => setShowPercentage(!showPercentage)}
				/>
			</div>
			<div className="result text-white font-bold py-2 px-4 text-4xl">{result}</div>
			<a href="https://github.com/anshvijay28" target="_blank" rel="noreferrer">
				<img
					src={githubLogo}
					alt="github logo"
					className="fixed bottom-2 right-3"
				/>
			</a>
			<Modal showModal={visible} setShowModal={setVisible} />
		</div>
	);
}

export default App;
