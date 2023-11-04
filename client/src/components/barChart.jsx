/* eslint-disable react/prop-types */
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, Tooltip, XAxis, YAxis } from "recharts";


export default function AppBar({employees}) {
  return (
    <BarChart
      width={500}
      height={300}
      data={employees}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}>
      <CartesianGrid strokeDasharray="0 100" />
      <XAxis dataKey="firstName" stroke="gray"/>
      <YAxis  stroke="gray"/>
      <Tooltip />
      <Legend />
       <Bar
            dataKey="salary"
            fill="#8884d8"
            activeBar={<Rectangle fill='pink' stroke='blue' />}
          />
          <Bar
            dataKey='salary'
            fill='#82ca9d'
            activeBar={<Rectangle fill='gold' stroke='purple' />}
          />
    </BarChart>
  );
}