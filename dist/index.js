"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./db/config");
const App_1 = require("./App");
for (const project of config_1.Project.projects) {
    App_1.App(project);
}
//# sourceMappingURL=index.js.map