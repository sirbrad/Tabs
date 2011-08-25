(function tabs() {
	var container = document.getElementById('tabs'),
		tabs = container.getElementsByTagName('div'),
		ul = document.getElementById('tabs-nav'),
		anc = ul.getElementsByTagName('a'),
		len = tabs.length,
		curLen = anc.length;
		
		// A function to apply the relavent attributes to display a tab
		function showTab(elem) {
			elem.className = 'active';
			elem.style.position = 'absolute'; 
			container.style.height = elem.clientHeight + 'px';
		}
			
			// Trying to prevent default
			if (window.location.hash) {
				window.scrollTo(0, 0);
			}
		
		// Check for css3 support then fallback to jQuery
		if (!Modernizr.cssanimations) {
			jQuery(container).fadeIn(600);
		} else {
			container.style.display = 'block';
			container.className = 'loaded';
		}
		
		// Check to see if the url has a hash in it
		if (window.location.hash) {
			var len = tabs.length;
			
			while (len--) {
				hashTab = tabs[len];
				
				if (hashTab.id === window.location.hash.split('#')[1]) {
					showTab(hashTab);
					anc[len].className = 'highlight';
				} else {
					tabs[len].className = 'hide';
					tabs[len].style.position = 'absolute';
				}
			}
			
		} else {
			// Set the container to the height of the first tab
			container.style.height = tabs[0].clientHeight + 'px';
			anc[0].className = 'highlight';
			
			while (len--) {
				
				// This is hiding all elements expect the first one
				if(len) {
					tabs[len].className = 'hide';
					tabs[len].style.position = 'absolute';
				}
			}
		}
		
		jQuery(anc).bind('click', function(e) {
			var href = this.href.split('#')[1], // tab1/tab2 etc
				len = tabs.length;
			
			for (var i = 0; i <= len-1; i++) {
				var currentTab = tabs[i],
					 curLen = anc[i];
					 
					// Remove any classes from tab element
					currentTab.className = 'hide';
					curLen.className = '';
					
					if (href === currentTab.id) {
						showTab(currentTab);
					}
				
				this.className = 'highlight';
			}
			
			e.preventDefault();
		});
})()