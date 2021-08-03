import axios from "axios";
let sql = require("mssql");
let dbConfig = require("../db/dbconn");

export const sendLMS = async (prjName: string) => {
	try {
		await sql.close();

		let pool = await sql.connect(dbConfig.getDBConn(prjName));
		let result = await pool
			.request()
			.query(dbConfig.getApiInfoQuery(prjName));

		const proms = new Array();
		for (const record of result.recordset) {
			const prom = new Promise((resolve, reject) => {
				resolve(postPowerBIApi(pool, record));
			});

			proms.push(prom);
		}

		await Promise.all(proms).then((values) => {});
	} catch (e) {
		console.log(e);
		await sql.close();
	}
};

const postPowerBIApi = async (pool: any, record: any) => {
	try {
		console.log("start", record.MasterSite, record.ProcedureName);

		let data = await getRowData(pool, record);
		await axios.post(record.PowerBIApiUrl, data, {
			headers: { "Content-Type": "application/json" },
		});

		console.log("end", record.MasterSite, record.ProcedureName);
	} catch (error) {}
};

const getRowData = async (pool: any, record: any) => {
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
