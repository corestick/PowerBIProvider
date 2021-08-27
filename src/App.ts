import lms = require("./lms/powerbiProvider");

const prjNames = ["CONEX", "HOS"];

const App = async (prjName: string) => {
	try {
		await lms.sendLMS(prjName);

		setTimeout(App, 10000, prjName);
	} catch (e) {
		console.log(e.message);
	} finally {
		console.log("------------");
	}
};

for (const prjName of prjNames) {
	App(prjName);
}
