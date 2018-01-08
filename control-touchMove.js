  /**********************
   *    @touchMoveControl
   */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.touchMoveControl = global.touchMoveControl || {})));
}(this, function (exports) { 'use strict';


	function touchMoveControl(payload) {
		var currentListeners = []
		var nextListeners = currentListeners

	// ....................... ensureCanMutateNextListeners
		function ensureCanMutateNextListeners() {
				if (nextListeners === currentListeners) {
					nextListeners = currentListeners.slice()
				}
		}			

		function pauseEvent(e){
						if(e.stopPropagation) e.stopPropagation();
						if(e.preventDefault) e.preventDefault();
						e.cancelBubble=true;
						e.returnValue=false;
						return false;
				}			

		function controlAction(svg) {
		var e = d3.event
				pauseEvent(e)
				
				var listeners = currentListeners = nextListeners
				for (var i = 0; i < listeners.length; i++) {
					listeners[i](e)
				}									
		}

		// ....................... controlApi
		function controlApi() {}
		
		// ....................... start
		controlApi.start = function start(svg) {
					svg.on('touchmove', 	function() {controlAction(this)})
					return controlApi
		}
		// ....................... subscribe
		controlApi.subscribe = function subscribe (listener) {
			if (typeof listener !== 'function') {
				throw new Error('Expected listener to be a function.')
			}
			var isSubscribed = true
			ensureCanMutateNextListeners()
			nextListeners.push(listener)
			return function unsubscribe() {
				if (!isSubscribed) {
					return
				}

				isSubscribed = false

				ensureCanMutateNextListeners()
				var index = nextListeners.indexOf(listener)
				nextListeners.splice(index, 1)
			}
		}
		
		return controlApi
	}



exports.touchMoveControl = touchMoveControl


}));		
