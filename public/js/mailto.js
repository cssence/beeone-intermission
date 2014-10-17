(function (document) {
	'use strict';
	if ('querySelectorAll' in document && 'textContent' in document) {
		var swap = document.querySelectorAll('[class=\"email\"]'),
			target,
			swapItem,
			anchor,
			i;
		for (i = swap.length - 1; i >= 0; i -= 1) {
			swapItem = swap[i];
			target = swapItem.textContent;
			anchor = document.createElement('a');
			anchor.className = 'email';
			anchor.href = 'mail' + 'to:' + target;
			anchor.textContent = target;
			swapItem.parentNode.replaceChild(anchor, swapItem);
		}
	}
}(document));