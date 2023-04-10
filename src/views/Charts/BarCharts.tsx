import { useCharts } from '@/hooks/useCharts'
import { useEffect } from 'react'
import { ChartProps, ChartsBox } from '.'

export default function BarCharts({xAxis, data}: ChartProps) {
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
          type: 'bar'
        }
      ]
    })
  }, [])
  return (
    <ChartsBox ref={chartNode}></ChartsBox>
  )
}
