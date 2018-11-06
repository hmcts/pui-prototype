
/*
	new FilterMenuButton({
		mq: '(min-width: 40.0625em)', // this is big screens
		toggleButton: {
			container: $('.hmcts-filter-menu'),
			showText: 'Show filter',
			hideText: 'Hide filter',
			classes: 'hmcts-button--secondary'
		},
		closeButton: {
			container: $('.hmcts-filter__header-action'),
			text: 'Close'
		},
		filter: {
			container: $('.hmcts-filter')
		}
	});
*/

function FilterMenuButton(options) {
	this.options = options;
	this.container = this.options.toggleButton.container;
	this.createToggleButton();
	this.setupResponsiveChecks();
	this.options.filter.container.attr('tabindex', '-1');
}

FilterMenuButton.prototype.setupResponsiveChecks = function() {
	this.mq = window.matchMedia(this.options.mq);
	this.mq.addListener($.proxy(this, 'checkMode'));
	this.checkMode(this.mq);
};

FilterMenuButton.prototype.createToggleButton = function() {
	this.menuButton = $('<button class="govuk-button '+this.options.toggleButton.classes+'" type="button" aria-haspopup="true" aria-expanded="false">'+this.options.toggleButton.showText+'</button>');
	this.menuButton.on('click', $.proxy(this, 'onMenuButtonClick'));
	this.options.toggleButton.container.append(this.menuButton);
};

FilterMenuButton.prototype.checkMode = function(mq) {
	if(mq.matches) {
		this.enableBigMode();
	} else {
		this.enableSmallMode();
	}
};

FilterMenuButton.prototype.enableBigMode = function() {
	this.showMenu();
	this.removeCloseButton();
};

FilterMenuButton.prototype.enableSmallMode = function() {
	this.hideMenu();
	this.addCloseButton();
};

FilterMenuButton.prototype.addCloseButton = function() {
	if(this.options.closeButton) {
		this.closeButton = $('<button class="hmcts-filter__close" type="button">'+this.options.closeButton.text+'</button>');
		this.closeButton.on('click', $.proxy(this, 'onCloseClick'));
		this.options.closeButton.container.append(this.closeButton);
	}
};

FilterMenuButton.prototype.onCloseClick = function() {
	this.hideMenu();
	this.menuButton.focus();
};

FilterMenuButton.prototype.removeCloseButton = function() {
	if(this.closeButton) {
		this.closeButton.remove();
		this.closeButton = null;
	}
};

FilterMenuButton.prototype.hideMenu = function() {
	this.menuButton.attr('aria-expanded', 'false');
	this.options.filter.container.hide();
	this.menuButton.text(this.options.toggleButton.showText);
};

FilterMenuButton.prototype.showMenu = function() {
	this.menuButton.attr('aria-expanded', 'true');
	this.options.filter.container.show();
	this.menuButton.text(this.options.toggleButton.hideText);
};

FilterMenuButton.prototype.onMenuButtonClick = function() {
	this.toggle();
};

FilterMenuButton.prototype.toggle = function() {
	if(this.menuButton.attr('aria-expanded') == 'false') {
		this.showMenu();
		this.options.filter.container.focus();
	} else {
		this.hideMenu();
	}
};