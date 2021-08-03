"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lms = require("./lms/lms");
const prjNames = ["CONEX", "HOS"];
const App = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const prjName of prjNames) {
            yield lms.sendLMS(prjName);
        }
        setTimeout(App, 5000);
    }
    catch (e) {
        console.log(e.message);
    }
    finally {
        console.log("------------");
    }
});
App();
//# sourceMappingURL=App.js.map