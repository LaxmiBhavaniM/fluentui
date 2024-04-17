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

interface ISankeyChartNumberFormattingState {
  width: number;
  height: number;
  format: FormatType;
}

export class SankeyChartNumberFormattingExample extends React.Component<{}, ISankeyChartNumberFormattingState> {
  constructor(props: ISankeyChartProps) {
    super(props);
    this.state = {
      width: 820,
      height: 412,
      format: FormatType.normal,
    };
  }

  public render(): JSX.Element {
    return <div>{this._basicExample()}</div>;
  }

  private _onWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ width: parseInt(e.target.value, 10) });
  };
  private _onHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ height: parseInt(e.target.value, 10) });
  };
  private _onFormatTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    this.setState({ format: type });
  };

  private _formatNumber = (num: Number | undefined): string => {
    if (num) {
      if (this.state.format === FormatType.short) {
        return num.toLocaleString('en-US', {
          maximumFractionDigits: 2,
          notation: 'compact',
          compactDisplay: 'short',
        });
      } else if (this.state.format === FormatType.percentage) {
        return num.toLocaleString('en-US', {
          style: 'percent',
        });
      } else {
        return num.toString();
      }
    }
    return '';
  };

  private _basicExample(): JSX.Element {
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

    const strings: ISankeyChartStrings = {
      linkFrom: 'source {0}',
    };
    const accessibilityStrings: ISankeyChartAccessibilityProps = {
      linkAriaLabel: '{2} items moved from {0} to {1}',
      nodeAriaLabel: 'element {0} with size {1}',
    };

    const rootStyle = { width: `${this.state.width}px`, height: `${this.state.height}px` };

    return (
      <>
        <label htmlFor="changeWidth_Basic">Change Width:</label>
        <input
          type="range"
          value={this.state.width}
          min={912}
          max={1000}
          id="changeWidth_Basic"
          onChange={this._onWidthChange}
          aria-valuetext={`ChangeWidthSlider${this.state.width}`}
        />
        <label htmlFor="changeHeight_Basic">Change Height:</label>
        <input
          type="range"
          value={this.state.height}
          min={312}
          max={400}
          id="changeHeight_Basic"
          onChange={this._onHeightChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <input
          type="text"
          min={0}
          max={2}
          id="changeHeight_Basic"
          onChange={this._onFormatTypeChange}
          aria-valuetext={`ChangeHeightslider${this.state.height}`}
        />
        <div style={rootStyle}>
          <SankeyChart
            data={data}
            height={this.state.height}
            width={this.state.width}
            shouldResize={this.state.width + this.state.height}
            strings={strings}
            accessibility={accessibilityStrings}
            formatNumber={this._formatNumber}
          />
        </div>
      </>
    );
  }
}
