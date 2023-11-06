export default function Select({ name, label, options, value, onChange, className = "" }) {
	const handleSelectionChange = (e) => {
		onChange(e.target.value);
	};
	return (
		<div className={className}>
			{label && (
				<label className="block mb-1 text-sm font-medium text-gray-700 shrink-0">{label}</label>
			)}

			<select
				name={name}
				value={value}
				onChange={handleSelectionChange}
				className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block py-2 px-2.5 w-full"
			>
				{options.map((item, index) => (
					<option className="uppercase" key={index} value={index}>
						{item.title}
					</option>
				))}
			</select>
		</div>
	);
}
