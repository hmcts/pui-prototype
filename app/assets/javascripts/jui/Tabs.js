function Tabs(container) {
	this.container = container;
	this.keys = { left: 37, right: 39 };
	this.cssActive = "active";
	this.cssHide = "hidden";
	this.tabs = container.find("> ul a");
	this.panels = container.find(".tabs__panel");

	// events
	this.tabs.on("click", $.proxy(this, 'onTabClick'));
	this.tabs.on('keydown', $.proxy(this, 'onTabKeydown'));
	$(window).on('hashchange', $.proxy(this, 'onHashChange'));

	this.setupHtml();

	// setup state
	this.tabs.attr('tabindex', '-1');
	this.panels.addClass("hidden");

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

Tabs.prototype.onHashChange = function (e) {
	var tab = this.getTab(window.location.hash);
	var currentTab = this.getCurrentTab();
	if(tab.length) {
		this.hideTab(currentTab);
		this.showTab(tab);
	} else {
		var firstTab = this.tabs.first();
		this.hideTab(currentTab);
		this.showTab(firstTab);
	}
};

Tabs.prototype.hideTab = function (tab) {
	this.unhighlightTab(tab);
	this.hidePanel(tab);
};

Tabs.prototype.showTab = function (tab) {
	this.highlightTab(tab);
	this.showPanel(tab);
};

Tabs.prototype.getTab = function(hash) {
	return this.tabs.filter('a[href="' + hash +'"]');
};

Tabs.prototype.setupHtml = function() {
	this.container.find('> ul').attr('role', 'tablist');
	this.container.find('> ul li').attr('role', 'presentation');
	this.tabs.attr('role', 'tab');
	this.panels.attr('role', 'tabpanel');
};

Tabs.prototype.onTabClick = function(e) {
	e.preventDefault();
	var newTab = $(e.target);
	var currentTab = this.getCurrentTab();
	this.hideTab(currentTab);
	this.showTab(newTab);
	this.createHistoryEntry(newTab);
};

Tabs.prototype.createHistoryEntry = function(tab) {
	var panel = this.getPanel(tab)[0];
	var id = panel.id;
	panel.id = "";
	history.pushState(this.getHref(tab), null, this.getHref(tab));
	panel.id = id;
};

Tabs.prototype.onTabKeydown = function(e) {
	switch(e.keyCode) {
		case this.keys.left:
			this.activatePreviousTab();
			break;
		case this.keys.right:
			this.activateNextTab();
			break;
	}
};

Tabs.prototype.activateNextTab = function() {
	var currentTab = this.getCurrentTab();
	var nextTab = currentTab.parent().next().find('[role=tab]');
	if(nextTab[0]) {
		this.hideTab(currentTab);
		this.showTab(nextTab);
		nextTab.focus();
		this.createHistoryEntry(nextTab);
	}
};

Tabs.prototype.activatePreviousTab = function() {
	var currentTab = this.getCurrentTab();
	var previousTab = currentTab.parent().prev().find('[role=tab]');
	if(previousTab[0]) {
		this.hideTab(currentTab);
		this.showTab(previousTab);
		previousTab.focus();
		this.createHistoryEntry(previousTab);
		previousTab.focus();
	}
};

Tabs.prototype.getPanel = function(tab) {
	return $(this.getHref(tab));
};

Tabs.prototype.showPanel = function(tab) {
	$(this.getHref(tab)).removeClass(this.cssHide);
};

Tabs.prototype.hidePanel = function(tab) {
	$(this.getHref(tab)).addClass(this.cssHide);
};

Tabs.prototype.unhighlightTab = function(tab) {
	tab.attr('aria-selected', 'false');
	tab.attr('tabindex', '-1');
};

Tabs.prototype.highlightTab = function(tab) {
	tab.attr('aria-selected', 'true');
	tab.attr('tabindex', '0');
};

Tabs.prototype.getCurrentTab = function() {
	return this.container.find("[role=tab][aria-selected=true]");
};

// this is because IE doesn't always return the actual value but a relative full path
// http://labs.thesedays.com/blog/2010/01/08/getting-the-href-value-with-jquery-in-ie/
Tabs.prototype.getHref = function(tab) {
	var href = tab.attr("href");
	return href.slice(href.indexOf("#"), href.length);
};