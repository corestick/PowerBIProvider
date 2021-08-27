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

const getDBConn = (project: any): DBConn => {
	return new DBConn(
		project.server,
		project.port,
		project.user,
		project.password,
		project.database
	);
};

export const getPoolPromise = (project: any): any => {
	const conn = getDBConn(project);

	const poolPromise = new sql.ConnectionPool(conn)
		.connect()
		.then((pool: any) => {
			console.log("Connected to " + project.name);
			return pool;
		})
		.catch((err: any) =>
			console.log(project.name + " Connection Failed : ", err)
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
