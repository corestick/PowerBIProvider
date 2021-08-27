"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Project = require("./db/config");
const App_1 = require("./App");
for (const project of Project.projects) {
    App_1.App(project);
}
//# sourceMappingURL=index.js.map