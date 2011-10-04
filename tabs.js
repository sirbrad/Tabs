(function tabs(global) {

	var doc = global.document,	
		 container = getEl('tabs'), 
		 ul = getEl('tabs-nav'), 
		 tabs = getTag({ tag: 'div', context: container }), 
		 anchors = getTag({ tag: 'a', context: ul }), 
		 tabsLength = tabs.length, 
		 anchorsLength = anchors.length,
		 poll;
	
	/**
	 * Following method is short hand for document.getElementById
	 * This can help improve performance by not having to keep looking up scope chain for either 'document' or 'getElementById'
	 * 
	 * @param id { String } the identifier for the element we want to access.
	 * @return { Element | Undefined } either the element we require or undefined if it's not found
	 */
	function getEl(id) {
		return doc.getElementById(id);
	}
	
	/**
	 * Following method is short hand for document.getElementsByTagName
	 * This can help improve performance by not having to keep looking up scope chain for either 'document' or 'getElementsByTagName'
	 * Also allows us to return the first found element if we so choose.
	 * 
	 * @param options { Object } object literal of options
	 *	@param tag { String } the HTML tag to search for (e.g. 'div')
	 *	@param context { Element/Node } an element to anchor the search by (defaults to window.document)
	 *	@param first { Boolean } determines if we return the first element or the entire HTMLCollection
	 * @return { Element | HTMLCollection/Array | Undefined } either the element(s) we require or undefined if it's not found
	 */
	function getTag(options) {
		var tag = options.tag || '*', 
			 context = options.context || this.doc, 
			 returnFirstFound = options.first || false;
		
		return (returnFirstFound) 
			? context.getElementsByTagName(tag)[0] 
			: context.getElementsByTagName(tag);
	}
		
	// A function to apply the relavent attributes to display a tab
	function showTab(elem) {
		elem.className = 'active';
		container.style.height = elem.clientHeight + 'px';
	}
	
	// Fallback code if CSS3 Transitions aren't supported
	function jQueryFallback() {
		
		jQuery(container).fadeIn(600);
		
		jQuery(anchors).bind('click', function(e) {
		
			var href = this.href.split('#')[1]; // tab1/tab2 etc
				 tabsLength = tabs.length;
			
			for (var i = 0; i <= tabsLength-1; i++) {
				var currentTab = tabs[i],
					 anchorsLength = anchors[i];
					 
				// Remove any classes from tab element
				currentTab.className = 'hide';
				anchorsLength.className = '';
				
				if (href === currentTab.id) {
					showTab(currentTab);
				}
				
				this.className = 'highlight';
			}
			
			e.preventDefault();
			
		});
		
	}
	
	// Hash Change Handler
	function hashChanged() {
		var tabsLength = tabs.length;
		
		while (tabsLength--) {
			hashTab = tabs[tabsLength];
		
			if (hashTab.id === window.location.hash.split('#')[1]) {
				showTab(hashTab);
				anchors[tabsLength].className = 'highlight';
			} else {
				anchors[tabsLength].className = '';
				tabs[tabsLength].className = 'hide';
			}
			
		}
	}
			
	// Prevent window from scrolling down to anchored position
	if (window.location.hash) {
		window.scrollTo(0, 0);
	}
		
	// Check for CSS3 support then fallback to jQuery
	if (!Modernizr.cssanimations) {
		jQueryFallback();
	} else {
		container.className = 'loaded';
	}
	
	// Set-up event listener for hash change event so we can change tabs if user manually changes hash via location bar
	if ('onhashchange' in window) {
		// Should really use DOM Level 1 event listeners (addEventListener) and IE event listener model (attachEvent)
		// But opted for quick and easy DOM 0 style listener...
		global.onhashchange = hashChanged;
	} 
	// IE7 doesn't support the hashchange event so we fall back to standard polling technique
	else {
		poll = global.setInterval(hashChanged, 500);
		
		// Clean-up objects as IE7 has hideous performance
		global.onunload = function() {
			window.clearInterval(poll);
		}
	}
		
	// Check to see if the url has a hash in it when the page loads initially
	if (window.location.hash) {
		hashChanged();			
	} else {
	
		// Set the container to the height of the first tab
		container.style.height = tabs[0].clientHeight + 'px';
		anchors[0].className = 'highlight';
		
		while (tabsLength--) {
			// Hidw all elements except the first one
			if (tabsLength) {
				tabs[tabsLength].className = 'hide';
				tabs[tabsLength].style.position = 'absolute';
			}
		}
		
	}
		
})(this) // We pass in 'this' and reference it as 'global' object (in the browser world the global object is the Window object)