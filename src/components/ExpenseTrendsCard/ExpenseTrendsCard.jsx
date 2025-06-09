import React from 'react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import styles from './ExpenseTrendsCard.module.css'
const ExpenseTrendsCard = () => {
  return (
            <div className={styles.expenseTrendsCard}>
          <h2>Top Expenses</h2>
          <div className={styles.ExpenseTrendsChartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={[
                  { name: "Entertainment", expense: 1500 },
                  { name: "Food", expense: 2000 },
                  { name: "Travel", expense: 1000 },
                ]}
                margin={{ top: 30, right: 20, left: 20, bottom: 30 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  type="category"
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#000", fontSize: 14 }}
                />
                <Bar
                  dataKey="expense"
                  fill="#A000FF"
                  barSize={24}
                  radius={[0, 20, 20, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
  )
}

export default ExpenseTrendsCard