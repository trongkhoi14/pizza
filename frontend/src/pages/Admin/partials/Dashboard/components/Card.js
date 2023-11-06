export default function Card({ title, children, className = "w-full" }) {
	return (
		<div className={"p-4 " + className}>
			<div className="shadow-lg rounded-md bg-white border border-slate-200 h-full flex flex-col">
				{title && (
					<div className="p-4 border-b border-slate-100">
						<h2 className="font-semibold text-slate-800 text-lg">{title}</h2>
					</div>
				)}
				<div className="p-4 h-full">{children}</div>
			</div>
		</div>
	);
}
