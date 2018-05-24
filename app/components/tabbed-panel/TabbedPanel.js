if(typeof window.matchMedia == 'function') {
	var TabbedPanel = function(container) {
		this.container = container;
		this.keys = { left: 37, right: 39, up: 38, down: 40 };
		this.cssHide = 'js-hidden';
		this.tabs = container.find('.govuk-tabbed-panel__tab');
		this.panels = container.find('.govuk-tabbed-panel__content');
		this.setupResponsiveChecks();
	};

	TabbedPanel.prototype.setupResponsiveChecks = function() {
		this.mql = window.matchMedia('(min-width: 40.0625em)');
		this.mql.addListener($.proxy(this, 'checkMode'));
		this.checkMode(this.mql);
	};

	TabbedPanel.prototype.checkMode = function(mql) {
		if(this.mql.matches) {
			this.enableBigMode();
		} else {
			this.enableSmallMode();
		}
	};

	TabbedPanel.prototype.enableSmallMode = function() {
		if(this.events) {
			this.container.off('click', '[role=tab]', this.events.onTabClick);
			this.container.off('keydown', '[role=tab]', this.events.onTabKeydown);
			$(window).off('hashchange', this.events.onHashChange);
		}
		this.teardownHtml();
		this.events = null;
	};

	TabbedPanel.prototype.enableBigMode = function() {
		this.events = {
			onTabClick: $.proxy(this, 'onTabClick'),
			onTabKeydown: $.proxy(this, 'onTabKeydown'),
			onHashChange: $.proxy(this, 'onHashChange')
		};
		this.container.on('click', '[role=tab]', this.events.onTabClick);
		this.container.on('keydown', '[role=tab]', this.events.onTabKeydown);
		$(window).on('hashchange', this.events.onHashChange);
		this.setupHtml();
	};

	TabbedPanel.prototype.onHashChange = function (e) {
		var hash = window.location.hash;
		if(!this.hasTab(hash)) {
			return;
		}
		if(this.changingHash) {
			this.changingHash = false;
			return;
		}
		var tab = this.getTab(window.location.hash);
		var currentTab = this.getCurrentTab();
		if(tab.length) {
			this.hideTab(currentTab);
			this.showTab(tab);
			tab.focus();
		} else {
			var firstTab = this.tabs.first();
			this.hideTab(currentTab);
			this.showTab(firstTab);
			firstTab.focus();
		}
	};

	TabbedPanel.prototype.hasTab = function(hash) {
		return this.container.find(hash).length;
	};

	TabbedPanel.prototype.hideTab = function (tab) {
		this.unhighlightTab(tab);
		this.hidePanel(tab);
	};

	TabbedPanel.prototype.showTab = function (tab) {
		this.highlightTab(tab);
		this.showPanel(tab);
	};

	TabbedPanel.prototype.getTab = function(hash) {
		return this.tabs.filter('a[href="' + hash +'"]');
	};

	TabbedPanel.prototype.setupHtml = function() {
		this.container.find('.govuk-tabbed-panel__list').attr('role', 'tablist');
		this.container.find('.govuk-tabbed-panel__list-item').attr('role', 'presentation');
		this.tabs.attr('role', 'tab');
		this.panels.attr('role', 'tabpanel');
		this.tabs.each($.proxy(function(i, tab) {
			var panelId = this.getHref($(tab)).slice(1);
			tab.id = 'tab_' + panelId;
			$(tab).attr('aria-controls', panelId);
		}, this));
		this.panels.each($.proxy(function(i, panel) {
			$(panel).attr('aria-labelledby', this.tabs[i].id);
		}, this));

		// setup state
		this.tabs.attr('tabindex', '-1');
		this.panels.addClass(this.cssHide);

		// if there's a tab that matches the hash
		var tab = this.getTab(window.location.hash);
		if(tab.length) {
			this.highlightTab(tab);
			this.showPanel(tab);
		} else {
			// or show the first
			var firstTab = this.tabs.first();
			this.highlightTab(firstTab);
			this.showPanel(firstTab);
		}
	};

	TabbedPanel.prototype.teardownHtml = function() {
		this.container.find('.govuk-tabbed-panel__list').removeAttr('role');
		this.container.find('.govuk-tabbed-panel__list-item').removeAttr('role');
		this.tabs.removeAttr('role');
		this.panels.removeAttr('role');
		this.tabs.each($.proxy(function(i, tab) {
			tab.id = '';
			$(tab).removeAttr('aria-controls');
		}, this));
		this.panels.each($.proxy(function(i, panel) {
			$(panel).removeAttr('aria-labelledby');
		}, this));
		this.tabs.removeAttr('tabindex');
		this.tabs.removeAttr('aria-selected');
		this.panels.removeClass(this.cssHide);
	};

	TabbedPanel.prototype.onTabClick = function(e) {
		e.preventDefault();
		var newTab = $(e.target);
		var currentTab = this.getCurrentTab();
		this.hideTab(currentTab);
		this.showTab(newTab);
		this.createHistoryEntry(newTab);
	};

	TabbedPanel.prototype.createHistoryEntry = function(tab) {
		var panel = this.getPanel(tab)[0];
		var id = panel.id;
		panel.id = '';
		this.changingHash = true;
		window.location.hash = this.getHref(tab).slice(1);
		panel.id = id;
	};

	TabbedPanel.prototype.onTabKeydown = function(e) {
		switch(e.keyCode) {
			case this.keys.left:
			case this.keys.up:
				this.activatePreviousTab();
				e.preventDefault();
				break;
			case this.keys.right:
			case this.keys.down:
				this.activateNextTab();
				e.preventDefault();
				break;
		}
	};

	TabbedPanel.prototype.activateNextTab = function() {
		var currentTab = this.getCurrentTab();
		var nextTab = currentTab.parent().next().find('[role=tab]');
		if(nextTab[0]) {
			this.hideTab(currentTab);
			this.showTab(nextTab);
			nextTab.focus();
			this.createHistoryEntry(nextTab);
		}
	};

	TabbedPanel.prototype.activatePreviousTab = function() {
		var currentTab = this.getCurrentTab();
		var previousTab = currentTab.parent().prev().find('[role=tab]');
		if(previousTab[0]) {
			this.hideTab(currentTab);
			this.showTab(previousTab);
			previousTab.focus();
			this.createHistoryEntry(previousTab);
		}
	};

	TabbedPanel.prototype.getPanel = function(tab) {
		return $(this.getHref(tab));
	};

	TabbedPanel.prototype.showPanel = function(tab) {
		$(this.getHref(tab)).removeClass(this.cssHide);
	};

	TabbedPanel.prototype.hidePanel = function(tab) {
		$(this.getHref(tab)).addClass(this.cssHide);
	};

	TabbedPanel.prototype.unhighlightTab = function(tab) {
		tab.attr('aria-selected', 'false');
		tab.attr('tabindex', '-1');
	};

	TabbedPanel.prototype.highlightTab = function(tab) {
		tab.attr('aria-selected', 'true');
		tab.attr('tabindex', '0');
	};

	TabbedPanel.prototype.getCurrentTab = function() {
		return this.container.find('[role=tab][aria-selected=true]');
	};

	// this is because IE doesn't always return the actual value but a relative full path
	// should be a utility function most prob
	// http://labs.thesedays.com/blog/2010/01/08/getting-the-href-value-with-jquery-in-ie/
	TabbedPanel.prototype.getHref = function(tab) {
		var href = tab.attr('href');
		return href.slice(href.indexOf('#'), href.length);
	};
}
