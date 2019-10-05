/**
 * 
 * @param {Element} targetNode - document.querySelector('body') or document.getElementById('app)
 * 
 * @param {Function} outputFn - Use arrrow unction. eg () => myFunction()
 */

const ChangeObserver = (targetNode, outputFn) => {

	const config = {
		attributes: true,
	}
	const callback = (mutationsList) => {
		for (let mutation of mutationsList) {
			if (mutation.type === 'attributes') {
				outputFn()
			}
		}
	}

	const observer = new MutationObserver(callback)
	observer.observe(targetNode, config)
}

export default ChangeObserver
