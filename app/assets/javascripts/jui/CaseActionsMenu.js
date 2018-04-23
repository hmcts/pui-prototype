function CaseActionsMenu(container) {
	this.container = container;
  this.toggle    = container.find('.jui-caseactionsmenu__toggle');
	this.menu      = container.find('.jui-caseactionsmenu__list');
	this.toggle.on('click', $.proxy(this, 'onToggleClick'));
}


CaseActionsMenu.prototype.hideNav = function() {
	this.toggle.attr('aria-expanded', 'false');
	this.menu.addClass('js-hidden');
};


CaseActionsMenu.prototype.showNav = function() {
	this.toggle.attr('aria-expanded', 'true');
	this.menu.removeClass('js-hidden');
};


CaseActionsMenu.prototype.onToggleClick = function() {
	
	if(this.toggle.attr('aria-expanded') == 'false') {
		this.showNav();
	} else {
		this.hideNav();
	}

};