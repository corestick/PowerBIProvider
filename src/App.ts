import provider = require("./lms/powerbiProvider");

export const App = async (project: any) => {
	try {
		await provider.sendLMS(project);

		setTimeout(App, 10000, project);
	} catch (e: any) {
		console.log(e.message);
	} finally {
		console.log("------------");
	}
};
