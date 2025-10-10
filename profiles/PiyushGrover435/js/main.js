// Small pointer parallax for the profile card
(() => {
	const card = document.querySelector('.profile-card');
	if (!card) return;

	let rx = 0, ry = 0, tx = 0, ty = 0;
	const damp = 0.08;

	function onMove(e) {
		const rect = card.getBoundingClientRect();
		const cx = rect.left + rect.width / 2;
		const cy = rect.top + rect.height / 2;
		const x = (e.clientX || (e.touches && e.touches[0].clientX)) - cx;
		const y = (e.clientY || (e.touches && e.touches[0].clientY)) - cy;
		ry = (x / rect.width) * 10;
		rx = -(y / rect.height) * 10;
		tx = (x / rect.width) * 6;
		ty = (y / rect.height) * 6;
	}

	function animate() {
		const current = card.style.transform || '';
		const curRx = parseFloat(card.dataset.rx || '0');
		const curRy = parseFloat(card.dataset.ry || '0');
		const nRx = curRx + (rx - curRx) * damp;
		const nRy = curRy + (ry - curRy) * damp;
		card.style.transform = `rotateX(${nRx}deg) rotateY(${nRy}deg) translateZ(0px)`;
		card.dataset.rx = nRx; card.dataset.ry = nRy;
		requestAnimationFrame(animate);
	}

	card.addEventListener('pointermove', onMove);
	card.addEventListener('pointerleave', () => { rx = ry = 0; });
	requestAnimationFrame(animate);
})();
