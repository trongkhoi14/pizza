import React from "react";

export default function Widget({ title, children }) {
	return (
		<div className="py-2">
			<div className="pb-3 text-xl border-b-2 border-b-slate-300 font-semibold">{title}</div>
			<div className="mt-3">{children}</div>
		</div>
	);
}
