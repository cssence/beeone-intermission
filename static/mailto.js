(function (document) {
	'use strict';
	if (typeof document.querySelectorAll !== 'undefined' && typeof document.textContent !== 'undefined') {
		Array.prototype.slice.call(document.querySelectorAll('[class="email"]')).forEach(function (swap) {
			var	target = swap.textContent,
				anchor = document.createElement('a');
			anchor.className = 'email';
			anchor.href = 'mail' + 'to:' + target;
			anchor.textContent = target;
			swap.parentNode.replaceChild(anchor, swap);
		});
	}
}(document));