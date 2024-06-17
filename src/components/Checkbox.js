function Checkbox({ checked, setChecked }) {
	return (
		<div className="flex items-center">
			<input
				id="checked-checkbox"
				type="checkbox"
				value=""
				className="font-bold w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                onClick={() => setChecked(!checked)}
			/>
			<label className="ms-2 text-xl font-medium text-gray-900 dark:text-gray-300">
				Show percentages
			</label>
		</div>
	);
}

export default Checkbox;
