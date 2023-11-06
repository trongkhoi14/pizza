import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { useEffect, useRef } from 'react';

export default function InputCounter({ small=false, name, label = null, value = 1, min = 1, max, onChange }) {
	const increaseBtnRef = useRef(null);
	const decreaseBtnRef = useRef(null);

	const handleValueChange = (e) => {
		onChange(e.target.value);
	};

	const handleIncrement = () => {
		onChange(value + 1);
	};

	const handleDecrement = () => {
		if(value -  1 < min) return;
		onChange(value - 1);
	};

	useEffect(() => {
		decreaseBtnRef.current.disabled = min && value <= min;
		increaseBtnRef.current.disabled = max && value >= max;
	}, [value]);

	return (
		<div className="">
			{label ? (
				<label className="w-full text-gray-700 text-sm font-semibold">{label}</label>
			) : null}

			<div className={(small ? "max-w-[7rem]" : "max-w-[9rem]") + " flex relative bg-transparent"}>
				<button
					ref={decreaseBtnRef}
					className="p-3 bg-slate-200 text-black cursor-pointer rounded-l-full hover:bg-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 "
					onClick={handleDecrement}
				>
					<AiOutlineMinus className="text-base" />
				</button>
				<input
					readOnly
					type="number"
					className="w-[1%] flex-1 outline-none focus:outline-none text-center bg-slate-200 text-lg focus:ring-2 focus:ring-dark-teal relative"
					name={name}
					value={value}
					onChange={handleValueChange}
					onInput={(e) => e.preventDefault()}
				></input>
				<button
					ref={increaseBtnRef}
					className="p-3 bg-slate-200 text-black cursor-pointer rounded-r-full hover:bg-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100"
					onClick={handleIncrement}
				>
					<AiOutlinePlus className="text-base" />
				</button>
			</div>
		</div>
	);
}
