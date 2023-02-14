const Input = ({ label, placeholder, value, setValue, inputType }) => {
	return (
		<div className="inputForm">
			<label>{label}</label>
			<input
				type={inputType}
				value={value}
				placeholder={placeholder}
				onChange={(event) => {
					setValue(event.target.value);
				}}
			/>
		</div>
	);
};

export default Input;
