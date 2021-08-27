import axios from "axios";
const dbConfig = require("../db/dbconn");

export const sendLMS = async (project: any) => {
	try {
		console.log(project.name + " : START ----->");

		let pool = await dbConfig.getPoolPromise(project);
		let result = await pool.request().query(project.query);

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
		console.log(project.name + " : <----- END");
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
