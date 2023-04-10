import { useCallback, useEffect, useRef, useState } from 'react'
import './App.scss'
import ThemeProvider, { ThemeType } from './ThemeProvider'
import Header from './Header'
import styled from 'styled-components'
import Observer from '@/components/Observer'
import LineCharts from '@/views/Charts/LineCharts'
import PieCharts from '@/views/Charts/PieCharts'
import BarCharts from '@/views/Charts/BarCharts'
import { ProductIdsResponse, getDataById, getProductIds } from '@/api'
import { ChartProps } from '@/views/Charts'
import { Loading } from '@/components/Loading'
import { Schedule } from '@/utils'

const GridItem = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
`

const chartComponents = {
  LineCharts,
  PieCharts,
  BarCharts,
}

type ChartsList = ProductIdsResponse & {
  data: ChartProps | null,
}

const schedule = new Schedule()

function App() {
  const [loading, setLoading] = useState(true)
  const [_, forceUpdate] = useState({})
  const list = useRef<ChartsList[]>([])
  const init = async () => {
    setLoading(true)
    let res = await getProductIds()
    let _list: ChartsList[] = res.map(item => {
      return {
        ...item,
        data: null,
      }
    })
    list.current = _list
    setLoading(false)
  }
  useEffect(() => {
    init()
  }, [])

  const handleVisibleOnce = useCallback((id: number, index: number) => {
    const fn = () => {
      return new Promise(async (resolve) => {
        let res = await getDataById()
        list.current[index].data = res
        forceUpdate({})
        resolve(true)
      })
    }
    return () => {
      schedule.add(fn)
    }
  }, [])
  return (
    <ThemeProvider>
      {(updateTheme) => {
        return (
          <>
            <Header />
            <main>
              {
                !loading && list.current.map(({type, id, data}, i) => {
                    const Componse = chartComponents[type]
                    return (
                      <GridItem key={id}>
                        <Observer
                          placeholder={<Loading />}
                          visibleOnce={handleVisibleOnce(id, i)}
                        >
                          {
                            data
                              ? <Componse xAxis={data.xAxis} data={data.data}/>
                              : <Loading />
                            }
                        </Observer>
                      </GridItem>
                    )
                  })
              }
            </main>
          </>
        )
      }}
    </ThemeProvider>
  )
}

export default App
