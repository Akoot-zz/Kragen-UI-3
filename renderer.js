const app = require('electron').remote.app;

document.title = app.getName() + ' - ' + app.getVersion();

module.exports = {

	get app() {
		return app;
	}

};