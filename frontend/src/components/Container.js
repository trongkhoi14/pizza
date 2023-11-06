import React from 'react';

export default function Container({ children, className = '' }) {
	return <div className={'max-w-screen-xl flex xl:mx-auto' + className}>{children}</div>;
}
