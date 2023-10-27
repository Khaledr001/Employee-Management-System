/* eslint-disable react/prop-types */
import { axisClasses } from "@mui/x-charts";
import { LineChart } from "@mui/x-charts/LineChart";

const chartSetting = {
  yAxis: [
    {
      //   label: "rainfall (mm)",
    },
  ],
  width: 800,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

export default function Linechart({ employees }) {
  return (
    <div className="bg-white mt-10 rounded-md w-fit ps-5">
      <LineChart
        dataset={employees}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "email",
            valueFormatter: (v) => {
              v.toString();
              const first = v.split("@");
              return first[0];
            },
          },
        ]}
        series={[{ dataKey: "salary", label: "Salary", area: false }]}
        {...chartSetting}
      />
    </div>
  );
}
