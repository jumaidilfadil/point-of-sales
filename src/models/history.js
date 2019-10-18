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
			'SELECT SUM(price*quantity) as today_income FROM history WHERE YEAR(date)=YEAR(CURDATE())'
		const lastYearIncomeQuery =
			'SELECT SUM(price*quantity) as today_income FROM history WHERE YEAR(date)=YEAR(CURDATE())-1'

		return new Promise((resolve, reject) => {
			conn.query(
				`SELECT SUM(price*quantity) as today_income, ( (${todayIncomeQuery})-(${yesterdatIncomeQuery}) )*100/(${yesterdatIncomeQuery}) as percent_from_yesterday, (${ordersThisWeekQuery}) as orders_this_week, ( (${ordersThisWeekQuery})-(${ordersLastWeekQuery}) )*100/(${ordersLastWeekQuery}) as percent_orders_last_week, (${thisYearIncomeQuery}) as this_year_income, ((${thisYearIncomeQuery})-(${lastYearIncomeQuery}))*100/(${lastYearIncomeQuery}) as percent_last_year_income FROM history WHERE DATE(date)=CURDATE()`,
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
				'SELECT invoice, SUM(price*quantity) as amount FROM history WHERE DATE(date)=CURDATE() GROUP BY invoice',
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

// SELECT SUM(price*quantity) as today_income FROM history WHERE DATE(date)=CURDATE()
// SELECT COUNT(*) FROM ( SELECT invoice FROM history WHERE DATE(date)>=CURDATE()-6 GROUP BY invoice ) AS orders_table
