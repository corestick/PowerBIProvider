import axios from "axios";
const dbConfig = require("../db/dbconn");

export const sendLMS = async (prjName: string) => {
	try {
		console.log(prjName + " : START ----->");

		let pool = await dbConfig.getPoolPromise(prjName);
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
	} finally {
		console.log(prjName + " : <----- END");
	}
};

const postPowerBIApi = async (pool: any, record: any) => {
	try {
		console.log("start", record.MasterSite, record.ProcedureName);

		let data = await dbConfig.getRowData(pool, record);
		await axios.post(record.PowerBIApiUrl, data, {
			headers: { "Content-Type": "application/json" },
		});

		console.log("end", record.MasterSite, record.ProcedureName);
	} catch (error) {}
};
