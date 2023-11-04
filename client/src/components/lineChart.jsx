/* eslint-disable react/prop-types */
import { Tooltip } from "chart.js";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

export default function Linecharts({ employees }) {
  return (
    <AreaChart
      width={500}
      height={400}
      data={employees}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="firstName" stroke="gray" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="salary" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
}
