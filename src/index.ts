const Project = require("./db/config");
import { App } from "./App";

for (const project of Project.projects) {
	App(project);
}
