import { LineChart, Line, ResponsiveContainer } from 'recharts'
import { colors } from '../theme'

interface SparklineProps {
  data: number[]
  color?: string
  height?: number
  fixedWidth?: number
}

export default function Sparkline({ data, color = colors.vineyardGreen, height = 40, fixedWidth }: SparklineProps) {
  const chartData = data.map((v, i) => ({ i, v }))

  const chart = (
    <LineChart
      width={fixedWidth || 100}
      height={height}
      data={chartData}
      margin={{ top: 4, right: 4, bottom: 4, left: 4 }}
    >
      <Line
        type="monotone"
        dataKey="v"
        stroke={color}
        strokeWidth={2}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  )

  if (fixedWidth) {
    return chart
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: 4 }}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}
