import {
  IChartProps,
  ISankeyChartAccessibilityProps,
  ISankeyChartProps,
  ISankeyChartStrings,
  SankeyChart,
} from '@fluentui/react-charting';
import * as React from 'react';

enum FormatType {
  normal,
  short,
  percentage,
}

const width = 800;
const height = 412;

const shortFormatter = (num: Number | undefined) =>
  num?.toLocaleString('en-US', {
    maximumFractionDigits: 2,
    notation: 'compact',
    compactDisplay: 'short',
  }) || '';

const percentageFormatter = (num: Number | undefined) =>
  num?.toLocaleString('en-US', {
    style: 'percent',
  }) || '';

const normalFormatter = (num: Number | undefined) => num?.toString() || '';

const formatFuncMap: Map<FormatType, (num: Number | undefined) => string> = new Map();
formatFuncMap.set(FormatType.normal, normalFormatter);
formatFuncMap.set(FormatType.short, shortFormatter);
formatFuncMap.set(FormatType.percentage, percentageFormatter);

export const SankeyChartNumberFormattingV2: React.FunctionComponent<ISankeyChartProps> = (
  props: ISankeyChartProps,
): JSX.Element => {
  const [format, setFormat] = React.useState<FormatType>(FormatType.normal);

  const data: IChartProps = {
    chartTitle: 'Sankey Chart',
    SankeyChartData: {
      nodes: [
        { nodeId: 0, name: 'First' },
        { nodeId: 1, name: 'Second' },
        { nodeId: 2, name: 'Third' },
        { nodeId: 3, name: 'Fourth' },
        { nodeId: 4, name: 'Five' },
        { nodeId: 5, name: 'Six' },
        { nodeId: 6, name: 'Seven' },
      ],
      links: [
        { source: 0, target: 1, value: 1234567890 },
        { source: 0, target: 2, value: 100000000 },
        { source: 0, target: 5, value: 1234 },
        { source: 0, target: 6, value: 100 },
        { source: 1, target: 3, value: 1000000000 },
        { source: 1, target: 4, value: 234567890 },
        { source: 2, target: 3, value: 1000 },
        { source: 2, target: 4, value: 9999000 },
      ],
    },
  };

  const _onFormatTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let type = FormatType.normal;
    const x = e.target.value;
    const y = parseInt(x, 10);
    switch (y) {
      case 1:
        type = FormatType.short;
        break;
      case 2:
        type = FormatType.percentage;
        break;
      default:
        type = FormatType.normal;
    }
    setFormat(type);
  };

  const strings: ISankeyChartStrings = {
    linkFrom: 'source {0}',
  };
  const accessibilityStrings: ISankeyChartAccessibilityProps = {
    linkAriaLabel: '{2} items moved from {0} to {1}',
    nodeAriaLabel: 'element {0} with size {1}',
  };

  return (
    <>
      <p>{format}</p>
      <label htmlFor="changeHeight_Basic">Change formatting type:</label>
      <input
        type="text"
        min={0}
        max={2}
        id="changeHeight_Basic"
        onChange={_onFormatTypeChange}
        aria-valuetext={`ChangeHeightslider${height}`}
      />
      <div>
        <SankeyChart
          data={data}
          height={height}
          width={width}
          shouldResize={width + height}
          strings={strings}
          accessibility={accessibilityStrings}
          formatNumber={
            format === FormatType.percentage
              ? percentageFormatter
              : format === FormatType.short
              ? shortFormatter
              : normalFormatter
          }
        />
      </div>
    </>
  );
};
