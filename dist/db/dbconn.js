"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDBConn = exports.getApiInfoQuery = void 0;
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
const getApiInfoQuery = (prjName) => {
    switch (prjName) {
        case "CONEX":
            return "Select * From CONEX_MASTER.dbo.PowerBIApi (NOLOCK)";
        case "HOS":
            return "Select * From HOS_MASTER.dbo.PowerBIApi (NOLOCK)";
        default:
            return "";
    }
};
exports.getApiInfoQuery = getApiInfoQuery;
const getDBConn = (prjName) => {
    switch (prjName) {
        case "CONEX":
            return new DBConn("183.111.185.85", 2345, "ElumiDev", "#2Lumi$2%7", "CONEX");
        case "HOS":
            return new DBConn("db.hiteco.co.kr", 2345, "one_user", "one123*$", "EIP_ONE");
    }
};
exports.getDBConn = getDBConn;
//# sourceMappingURL=dbconn.js.map