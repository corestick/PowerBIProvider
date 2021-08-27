"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Project = void 0;
exports.Project = {
    projects: [
        {
            name: "CONEX",
            server: "183.111.185.85",
            port: 2345,
            user: "ElumiDev",
            password: "#2Lumi$2%7",
            database: "CONEX",
            query: "Select * From CONEX_MASTER.dbo.PowerBIApi (NOLOCK)",
        },
        {
            name: "HOS",
            server: "db.hiteco.co.kr",
            port: 2345,
            user: "one_user",
            password: "one123*$",
            database: "EIP_ONE",
            query: "Select * From HOS_MASTER.dbo.PowerBIApi (NOLOCK)",
        },
    ],
};
//# sourceMappingURL=config.js.map