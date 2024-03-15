import React from "react";
import "./PieChartComponent.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ EventRSVP }: { EventRSVP: any }) => {
  const data = {
    labels: ["Attending", "Not Attending", "Maybe", "No Response"],
    datasets: [
      {
        // data: [1, 1, 1, 1],
        label: " of Votes",
        data: [
          EventRSVP?.attending,
          EventRSVP?.maybe,
          EventRSVP?.notAttending,
          100,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "gray"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "gray"],
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#fff",
        formatter: (value: any, ctx: any) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          const total = ctx.chart.data.datasets[0].data.reduce(
            (acc: any, cur: any) => acc + cur
          );
          const percentage = ((value / total) * 100).toFixed(2) + "%";
          return `${label}: ${percentage}`;
        },
      },
    },
  };

  return (
    <div className="piechartcomponent">
      <Pie data={data} />
      {/* <Pie data={data}  options={options} /> */}
    </div>
  );
};

export default PieChartComponent;
