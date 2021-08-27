const sql = require("mssql");

class DBConn {
	server: string;
	port: number;
	user: string;
	password: string;
	database: string;
	options: any;

	constructor(
		server: string,
		port: number,
		user: string,
		password: string,
		database: string
	) {
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

export const getApiInfoQuery = (prjName: string): string => {
	switch (prjName) {
		case "CONEX":
			return "Select * From CONEX_MASTER.dbo.PowerBIApi (NOLOCK)";
		case "HOS":
			return "Select * From HOS_MASTER.dbo.PowerBIApi (NOLOCK)";
		default:
			return "";
	}
};

const getDBConn = (prjName: string): DBConn => {
	switch (prjName) {
		case "CONEX":
		default:
			return new DBConn(
				"183.111.185.85",
				2345,
				"ElumiDev",
				"#2Lumi$2%7",
				"CONEX"
			);
		case "HOS":
			return new DBConn(
				"db.hiteco.co.kr",
				2345,
				"one_user",
				"one123*$",
				"EIP_ONE"
			);
	}
};

export const getPoolPromise = (prjName: string): any => {
	const conn = getDBConn(prjName);

	const poolPromise = new sql.ConnectionPool(conn)
		.connect()
		.then((pool: any) => {
			console.log("Connected to " + prjName);
			return pool;
		})
		.catch((err: any) =>
			console.log(prjName + " Connection Failed : ", err)
		);

	return poolPromise;
};

export const getRowData = async (pool: any, record: any) => {
	try {
		const res = await pool
			.request()
			.input("MasterSite", sql.VarChar(10), record.MasterSite)
			.input("SiteGroup", sql.VarChar(10), record.SiteGroup)
			.execute(record.ProcedureName);

		return res.recordset;
	} catch (e) {
		console.log(e);
		return e;
	}
};
