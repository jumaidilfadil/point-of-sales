const conn = require('../configs/db')

module.exports = {
	addHistory: data => {
		return new Promise((resolve, reject) => {
			conn.query('INSERT INTO history SET ?', data, (err, result) => {
				if (!err) {
					resolve(result)
				} else {
					reject(err)
				}
			})
		})
	},
	getIncome: () => {
		const todayIncomeQuery =
			'SELECT SUM(price*quantity) FROM history WHERE DATE(date)=CURDATE()'
		const yesterdatIncomeQuery =
			'SELECT SUM(price*quantity) FROM history WHERE DATE(date)=CURDATE()-1'
		const ordersThisWeekQuery =
			'SELECT COUNT(*) FROM ( SELECT invoice FROM history WHERE DATE(date)>=CURDATE()-6 GROUP BY invoice ) AS orders_table'
		const ordersLastWeekQuery =
			'SELECT COUNT(*) FROM ( SELECT invoice FROM history WHERE DATE(date)>=CURDATE()-13 AND DATE(date)<=CURDATE()-7 GROUP BY invoice ) AS orders_table'
		const thisYearIncomeQuery =
			'SELECT SUM(price*quantity) as this_year_income FROM history WHERE YEAR(date)=YEAR(CURDATE())'
		const lastYearIncomeQuery =
			'SELECT SUM(price*quantity) as last_years_income FROM history WHERE YEAR(date)=YEAR(CURDATE())-1'

		const thisYearMonth1IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_1_income FROM history WHERE MONTH(date)='1' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth2IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_2_income FROM history WHERE MONTH(date)='2' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth3IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_3_income FROM history WHERE MONTH(date)='3' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth4IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_4_income FROM history WHERE MONTH(date)='4' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth5IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_5_income FROM history WHERE MONTH(date)='5' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth6IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_6_income FROM history WHERE MONTH(date)='6' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth7IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_7_income FROM history WHERE MONTH(date)='7' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth8IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_8_income FROM history WHERE MONTH(date)='8' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth9IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_9_income FROM history WHERE MONTH(date)='9' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth10IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_10_income FROM history WHERE MONTH(date)='10' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth11IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_11_income FROM history WHERE MONTH(date)='11' AND YEAR(date)=YEAR(CURDATE())`
		const thisYearMonth12IncomeQuery = `SELECT SUM(price*quantity) as this_year_month_12_income FROM history WHERE MONTH(date)='12' AND YEAR(date)=YEAR(CURDATE())`

		const lastYearMonth1IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_1_income FROM history WHERE MONTH(date)='1' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth2IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_2_income FROM history WHERE MONTH(date)='2' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth3IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_3_income FROM history WHERE MONTH(date)='3' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth4IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_4_income FROM history WHERE MONTH(date)='4' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth5IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_5_income FROM history WHERE MONTH(date)='5' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth6IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_6_income FROM history WHERE MONTH(date)='6' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth7IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_7_income FROM history WHERE MONTH(date)='7' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth8IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_8_income FROM history WHERE MONTH(date)='8' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth9IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_9_income FROM history WHERE MONTH(date)='9' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth10IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_10_income FROM history WHERE MONTH(date)='10' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth11IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_11_income FROM history WHERE MONTH(date)='11' AND YEAR(date)=YEAR(CURDATE())-1`
		const lastYearMonth12IncomeQuery = `SELECT SUM(price*quantity) as last_year_month_12_income FROM history WHERE MONTH(date)='12' AND YEAR(date)=YEAR(CURDATE())-1`

		return new Promise((resolve, reject) => {
			conn.query(
				`SELECT SUM(price*quantity) as today_income, ( (${todayIncomeQuery})-(${yesterdatIncomeQuery}) )*100/(${yesterdatIncomeQuery}) as percent_from_yesterday, (${ordersThisWeekQuery}) as orders_this_week, ( (${ordersThisWeekQuery})-(${ordersLastWeekQuery}) )*100/(${ordersLastWeekQuery}) as percent_orders_last_week, (${thisYearIncomeQuery}) as this_year_income, ((${thisYearIncomeQuery})-(${lastYearIncomeQuery}))*100/(${lastYearIncomeQuery}) as percent_last_year_income, (${thisYearMonth1IncomeQuery}) as this_year_month_1_income, (${thisYearMonth2IncomeQuery}) as this_year_month_2_income, (${thisYearMonth3IncomeQuery}) as this_year_month_3_income, (${thisYearMonth4IncomeQuery}) as this_year_month_4_income, (${thisYearMonth5IncomeQuery}) as this_year_month_5_income, (${thisYearMonth6IncomeQuery}) as this_year_month_6_income, (${thisYearMonth7IncomeQuery}) as this_year_month_7_income, (${thisYearMonth8IncomeQuery}) as this_year_month_8_income, (${thisYearMonth9IncomeQuery}) as this_year_month_9_income, (${thisYearMonth10IncomeQuery}) as this_year_month_10_income, (${thisYearMonth11IncomeQuery}) as this_year_month_11_income, (${thisYearMonth12IncomeQuery}) as this_year_month_12_income, (${lastYearMonth1IncomeQuery}) as last_year_month_1_income, (${lastYearMonth2IncomeQuery}) as last_year_month_2_income, (${lastYearMonth3IncomeQuery}) as last_year_month_3_income, (${lastYearMonth4IncomeQuery}) as last_year_month_4_income, (${lastYearMonth5IncomeQuery}) as last_year_month_5_income, (${lastYearMonth6IncomeQuery}) as last_year_month_6_income, (${lastYearMonth7IncomeQuery}) as last_year_month_7_income, (${lastYearMonth8IncomeQuery}) as last_year_month_8_income, (${lastYearMonth9IncomeQuery}) as last_year_month_9_income, (${lastYearMonth10IncomeQuery}) as last_year_month_10_income, (${lastYearMonth11IncomeQuery}) as last_year_month_11_income, (${lastYearMonth12IncomeQuery}) as last_year_month_12_income FROM history WHERE DATE(date)=CURDATE()`,
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		})
	},
	getRecentOrders: () => {
		return new Promise((resolve, reject) => {
			conn.query(
				`SELECT invoice, SUM(price*quantity) as amount FROM history WHERE DATE(date)=CURDATE() GROUP BY invoice ORDER BY date DESC`,
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		})
	},
	getOrders: invoice => {
		return new Promise((resolve, reject) => {
			conn.query(
				`SELECT product_name FROM history WHERE ?`,
				invoice,
				(err, result) => {
					if (!err) {
						resolve(result)
					} else {
						reject(err)
					}
				}
			)
		})
	}
}
