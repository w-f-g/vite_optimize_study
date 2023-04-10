import styled from "styled-components";

export type ChartProps = {
  xAxis: string[],
  data: number[] | string[],
}

export const ChartsBox = styled.div`
  width: 100%;
  height: 100%;
`

export * from "./BarCharts"
export * from "./LineCharts"
export * from "./PieCharts"