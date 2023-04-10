import { useEffect } from 'react'
import { ChartProps, ChartsBox } from '.'
import { useCharts } from '@/hooks/useCharts'

export default function LineCharts({xAxis, data}: ChartProps) {
  const {chartNode, chart} = useCharts()
  useEffect(() => {
    chart.current?.setOption({
      xAxis: {
        type: 'category',
        data: xAxis,
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data,
          type: 'line'
        }
      ]
    })
  }, [])
  return (
    <ChartsBox ref={chartNode}></ChartsBox>
  )
}
