import { useEffect } from 'react'
import { map } from 'lodash-es'
import { ChartProps, ChartsBox } from '.'
import { useCharts } from '@/hooks/useCharts'

export default function PieCharts({xAxis, data}: ChartProps) {
  const {chartNode, chart} = useCharts()
  const pieData = map(xAxis, (item, i) => {
    return {
      value: data[i],
      name: item,
    }
  })
  
  useEffect(() => {
    chart.current?.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: pieData,
        }
      ]
    })
  }, [])
  return (
    <ChartsBox ref={chartNode}></ChartsBox>
  )
}
