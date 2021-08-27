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
exports.getRowData = exports.getPoolPromise = void 0;
const sql = require("mssql");
class DBConn {
    constructor(server, port, user, password, database) {
        this.server = server;
        this.port = port;
        this.user = user;
        this.password = password;
        this.database = database;
        this.options = {
            trustedConnection: true,
            encrypt: false,
        };
    }
}
const getDBConn = (project) => {
    return new DBConn(project.server, project.port, project.user, project.password, project.database);
};
const getPoolPromise = (project) => {
    const conn = getDBConn(project);
    const poolPromise = new sql.ConnectionPool(conn)
        .connect()
        .then((pool) => {
        console.log("Connected to " + project.name);
        return pool;
    })
        .catch((err) => console.log(project.name + " Connection Failed : ", err));
    return poolPromise;
};
exports.getPoolPromise = getPoolPromise;
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
exports.getRowData = getRowData;
//# sourceMappingURL=dbconn.js.map