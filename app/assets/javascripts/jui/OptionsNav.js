function OptionsNav(container) {
	this.container = container;
  this.toggle    = container.find('.jui-optionsnav__toggle');
	this.menu      = container.find('.jui-optionsnav__list');
	this.toggle.on('click', $.proxy(this, 'onToggleClick'));
}


OptionsNav.prototype.hideNav = function() {
	this.toggle.attr('aria-expanded', 'false');
	this.menu.attr('aria-hidden', 'true');
};


OptionsNav.prototype.showNav = function() {
	this.toggle.attr('aria-expanded', 'true');
	this.menu.attr('aria-hidden', 'false');
};


OptionsNav.prototype.onToggleClick = function() {

	if(this.toggle.attr('aria-expanded') == 'false') {
		this.showNav();
	} else {
		this.hideNav();
	}

};