/* eslint-disable react/prop-types */
import { axisClasses } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  yAxis: [
    {
      //   label: "rainfall (mm)",
    },
  ],
  width: 600,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const Barchart = ({ employees }) => {
  return (
    <div className="bg-white rounded-md w-fit ps-5">
      <BarChart
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
        series={[
          { dataKey: "salary", label: "Salary" },

          // { dataKey: "seoul", label: "Seoul", valueFormatter },
        ]}
        {...chartSetting}
      />
    </div>
  );
};

export default Barchart;
