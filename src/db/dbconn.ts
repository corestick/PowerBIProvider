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
export const getDBConn = (prjName: string) => {
	switch (prjName) {
		case "CONEX":
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
