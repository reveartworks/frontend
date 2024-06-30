import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Layer,
} from "recharts";
import { Container, Typography } from "@mui/material";

const BarChartComponent = ({ data, title, xKey, yKey }) => {
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  return (
    <Container>
      <Typography
        variant="h6"
        align="center"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data}>
          <XAxis
            dataKey={xKey}
            angle={-80}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12 }}
            height={
              title == "Most Viewed Artworks" ||
              title == "Most Enquired for Purchase Artworks"
                ? 150
                : 100
            }
          />
          {/* Ensure height prop is sufficient to avoid clipping */}
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" align="right" />
          <Bar dataKey={yKey} fill="rgba(31, 165, 141, 1)">
            <LabelList dataKey={yKey} position="top" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Container>
  );
};

export default BarChartComponent;
