import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NotFound from "./components/NotFound";

export default function ErrorPage({ debug = false }) {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		if (error.status === 404) {
			return <NotFound />;
		}
	}

	return (
		<div>
			{debug ? (
				<>
					<h2>{error.message}</h2>
					<pre>{error.stack}</pre>
				</>
			) : (
				<p>Sorry, an error occurred. It's not your fault.</p>
			)}
		</div>
	);
}
