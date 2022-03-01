import { useEffect, useState } from 'react';

export default function useMousePosition() {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const mouseMoveHandler = (event: any) => {
			let eventDoc, doc, body;

			event = event || window.event; // IE-ism

			// If pageX/Y aren't available and clientX/Y are,
			// calculate pageX/Y - logic taken from jQuery.
			// (This is to support old IE)
			if (event.pageX == null && event.clientX != null) {
				eventDoc = (event.target && event.target.ownerDocument) || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = event.clientX + ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) - ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
				event.pageY = event.clientY + ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) - ((doc && doc.clientTop) || (body && body.clientTop) || 0);
			}

			setPosition({ x: event.pageX, y: event.pageY });
		};
		document.addEventListener('mousemove', mouseMoveHandler);

		return () => {
			document.removeEventListener('mousemove', mouseMoveHandler);
		};
	}, []);

	return position;
}
