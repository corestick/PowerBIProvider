"use strict";
module.exports = {
    projects: [
        {
            name: "CONEX",
            server: "192.168.1.85",
            port: null,
            user: "ElumiDev",
            password: "#2Lumi$2%7",
            database: "CONEX",
            query: "Select * From CONEX_MASTER.dbo.PowerBIApi (NOLOCK)",
        },
        {
            name: "HOS",
            server: "192.168.1.81",
            port: 2345,
            user: "one_user",
            password: "one123*$",
            database: "EIP_ONE",
            query: "Select * From HOS_MASTER.dbo.PowerBIApi (NOLOCK)",
        },
    ],
};
//# sourceMappingURL=config.js.map