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
exports.sendLMS = void 0;
const axios_1 = require("axios");
let sql = require("mssql");
let dbConfig = require("../db/dbconn");
const sendLMS = (prjName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield sql.close();
        let pool = yield sql.connect(dbConfig.getDBConn(prjName));
        let result = yield pool
            .request()
            .query(dbConfig.getApiInfoQuery(prjName));
        const proms = new Array();
        for (const record of result.recordset) {
            const prom = new Promise((resolve, reject) => {
                resolve(postPowerBIApi(pool, record));
            });
            proms.push(prom);
        }
        yield Promise.all(proms).then((values) => { });
    }
    catch (e) {
        console.log(e);
        yield sql.close();
    }
});
exports.sendLMS = sendLMS;
const postPowerBIApi = (pool, record) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("start", record.MasterSite, record.ProcedureName);
        let data = yield getRowData(pool, record);
        yield axios_1.default.post(record.PowerBIApiUrl, data, {
            headers: { "Content-Type": "application/json" },
        });
        console.log("end", record.MasterSite, record.ProcedureName);
    }
    catch (error) { }
});
const getRowData = (pool, record) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield pool
            .request()
            .input("MasterSite", sql.VarChar(10), record.MasterSite)
            .input("SiteGroup", sql.VarChar(10), record.SiteGroup)
            .execute(record.ProcedureName);
        return res.recordset;
    }
    catch (e) {
        console.log(e);
        return e;
    }
});
//# sourceMappingURL=lms.js.map