import { useEffect, useRef } from "react"
import { init as echartsInit, EChartsType } from 'echarts'
import { debounce } from "lodash-es"


export function useCharts() {
  const chart = useRef<EChartsType | null>(null)
  const chartNode = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (chartNode.current && !chart.current) {
      chart.current = echartsInit(chartNode.current)
    }
    const _resize = debounce(() => {
      if (chart.current) {
        chart.current.resize()
      }
    }, 500)
    window.addEventListener("resize", _resize)
    return () => {
      if (chart.current) {
        chart.current.dispose()
        chart.current = null
      }
      window.removeEventListener("resize", _resize)
    }
  }, [chartNode])
  return {
    chart,
    chartNode,
  }
}