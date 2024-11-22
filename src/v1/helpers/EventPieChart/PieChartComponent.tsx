import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import "./PieChart.css";

type PieChartData = {
  name: string;
  value: number;
  color: string;
};

interface PieChartProps {
  pieData: PieChartData[];
}

const PieChartComponent: React.FC<PieChartProps> = ({ pieData }) => {
  const isAllZero = pieData.every((item) => item.value === 0);

  return (
    <div className="pieChart">
      <div className="chart">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip
              contentStyle={{
                background: "white",
                borderRadius: "5px",
              }}
            />
            <Pie
              data={isAllZero ? [{ name: "None", value: 1 }] : pieData}
              innerRadius={"40%"}
              outerRadius={"80%"}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
            >
              {isAllZero ? (
                <Cell key="None" fill="#d8d8d8" />
              ) : (
                pieData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))
              )}
            </Pie>
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
