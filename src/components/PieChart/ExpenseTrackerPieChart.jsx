import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { categories } from "../../constants/categories";

const COLORS = ["#A000FF", "#FF9304", "#FDE006"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ExpenseTrackerPieChart = ({ expenses }) => {
  const pieData = expenses.map((expense) => ({
    name: expense.category,
    value: expense.price,
  }));

  return (
    <>
      {expenses && expenses.length >0 &&(
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius="80%"
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => {

                    const CategoryColor = categories.find((category)=> category.name.toLowerCase() === entry.name.toLowerCase())?.color || '#ccc';
                    return <Cell
                      key={`cell-${index}`}
                      fill={CategoryColor}
                    />
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
    </>
  );
};

export default ExpenseTrackerPieChart;
