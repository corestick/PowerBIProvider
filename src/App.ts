import lms = require("./lms/lms");

const prjNames = ["CONEX", "HOS"];

const App = async () => {
	try {
		for (const prjName of prjNames) {
			await lms.sendLMS(prjName);
		}

		setTimeout(App, 5000);
	} catch (e) {
		console.log(e.message);
	} finally {
		console.log("------------");
	}
};

App();
