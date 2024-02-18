import {
  BarChart,
  CartesianGrid,
  YAxis,
  Legend,
  Bar,
  ResponsiveContainer,
} from 'recharts';

type TCharts = {
  currentMetricsLabel: string;
  predictedMetricsLabel: string;
  chartData: { uv: number; pv: number }[];
  barSize?: number;
  barGap?: number;
  updateColor?: boolean;
};

const renderColorfulLegendText = (value: string) => (
  <span style={{ color: 'var(--text-card-neutral-default)' }}>{value}</span>
);

export function Chart({
  currentMetricsLabel,
  predictedMetricsLabel,
  chartData,
  barGap = 58,
  barSize = 118,
  updateColor = false,
}: TCharts) {
  return (
    <ResponsiveContainer width="100%" height={295}>
      <BarChart
        barGap={barGap}
        barSize={barSize}
        data={chartData}
        margin={{
          top: 30,
          right: 4,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <YAxis fontSize="var(--font-footnote-regular-size)" />
        <Legend
          formatter={renderColorfulLegendText}
          wrapperStyle={{
            fontSize: 'var(--font-body-medium-size)',
            fontFamily: 'var(--font-family)',
            paddingTop: '12px',
          }}
        />
        <Bar
          radius={[8, 8, 0, 0]}
          legendType="plainline"
          name={currentMetricsLabel}
          dataKey="uv"
          fill={updateColor ? '#554D66' : '#663FBA'}
        />
        <Bar
          radius={[8, 8, 0, 0]}
          legendType="plainline"
          name={predictedMetricsLabel}
          dataKey="pv"
          fill={updateColor ? '#B6B3BD' : '#00CA7A'}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
