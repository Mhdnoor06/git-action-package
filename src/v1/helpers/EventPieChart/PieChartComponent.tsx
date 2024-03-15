import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type PieChartData = {
  name: string;
  value: number;
  color: string;
};

interface PieChartProps {
  pieData: PieChartData[];
}

const PieChartComponent: React.FC<PieChartProps> = ({ pieData }) => {
  return (
    <div
      className="pieChart"
      style={{
        width: "100%",
        height: 150,
        borderBottom: "1px solid #dcdbdb",
      }}
    >
      <div className="chart" style={{ width: "50%", height: 150 }}>
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              contentStyle={{
                background: "white",
                borderRadius: "5px",
              }}
            />
            {pieData.some((item) => item.value !== 0) ? (
              <Pie
                data={pieData}
                innerRadius={"40%"}
                outerRadius={"80%"}
                fill={
                  pieData.some((item) => item.value !== 0)
                    ? "#8884d8"
                    : "#d8d8d8"
                }
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            ) : null}
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="options">
        {pieData.length > 0 ? (
          <>
            {pieData.map((item) => (
              <div className="option-items" key={item.name}>
                <div className="pietitle">
                  <div
                    className="dott"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="itemname">{item.name}</p>
                </div>
                <p className="itemval" style={{ color: item.color }}>
                  {item.value}
                </p>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default PieChartComponent;
