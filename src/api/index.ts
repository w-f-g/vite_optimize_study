import request from "@/utils/request"
import { ChartProps } from "@/views/Charts"
import { map } from "lodash-es"
import { empty_data_01, empty_data_02 } from "./empty"

const chartTypes = ["BarCharts", "LineCharts", "PieCharts"] as const
const _getRandom = () => Math.floor(Math.random() * 10) % 3

export type ProductIdsResponse = {
  id: number,
  type: typeof chartTypes[number],
}

export const getProductIds = async (): Promise<ProductIdsResponse[]> => {
  let res
  try {
    res = await request({
      url: "/api/getProductIds",
      method: "get",
    })
  } catch(err) {
    res = null
  }
  let data
  if (res && res.data) {
    data = res.data
  } else {
    data = empty_data_01
  }
  let res$ = map(data, item => {
      return {
        ...item,
        type: chartTypes[_getRandom()],
      }
    })
  return res$
}

export const getDataById = async (): Promise<ChartProps> => {
  let res
  try {
    res = await request({
      url: "/api/getDataById",
      method: "get",
    })
  } catch (error) {
    res = null
  }
  if (res && res.data) {
    return {
      xAxis: res.data.xAxis,
      data: res.data.yAxis,
    }
  }
  return empty_data_02
}