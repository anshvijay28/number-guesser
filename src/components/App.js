import "../styles/App.css";
import DrawingCanvas from "./Canvas.js";
import Checkbox from "./Checkbox.js";
import githubLogo from "../pictures/github_logo.png";
import ResultText from "./ResultText.js";
import Modal from "./Modal.js";
import { useEffect, useState, useRef } from "react";

function App() {
	const [visible, setVisible] = useState(false);
	const [showPercentage, setShowPercentage] = useState(false);
	const [clear, setClear] = useState(false);
	const [submit, setSubmit] = useState(false);
	const [result, setResult] = useState("");
	const [image, setImage] = useState([]);
	const hasPageBeenRendered = useRef(false);
	const buttonClassName =
		"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
	const titleClassName =
		"app-name title mb-2 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white";

	// this will make canvas element's useEffect trigger
	// which will setImage. This will trigger the useEffect
	// below
	const handleSubmit = () => {
		setSubmit(true);
		setClear(true);
	};
	
	// this will submit the image to backend
	useEffect(() => {
		if (hasPageBeenRendered.current && image.length > 0) {
			// when ever setImage is called
			console.log(image);
			// some cloud function taking image as a param
			const answer = "Its an 8!"
			setResult(answer);
		}
		hasPageBeenRendered.current = true;
	}, [image])

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
				<button className={buttonClassName} onClick={() => setClear(false)}>
					Clear
				</button>
				<Checkbox
					checked={showPercentage}
					setChecked={() => setShowPercentage(true)}
				/>
			</div>
			<ResultText text={result} />
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
