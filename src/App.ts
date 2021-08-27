import { Project } from "./db/config";
import lms = require("./lms/powerbiProvider");

const App = async (project: any) => {
	try {
		await lms.sendLMS(project);

		setTimeout(App, 10000, project);
	} catch (e) {
		console.log(e.message);
	} finally {
		console.log("------------");
	}
};

for (const project of Project.projects) {
	App(project);
}
