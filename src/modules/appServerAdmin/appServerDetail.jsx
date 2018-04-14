import React from 'react'
import { d3, LineChart, Brush } from 'react-d3-components'

export class SomeComponent extends React.Component {
  constructor() {
    super()
    this.state = this.getInitialState()
  }

  getInitialState() {
    return {
      data: {
        label: '', values: [
          { x: new Date(2015, 2, 5), y: 1 },
          { x: new Date(2015, 2, 6), y: 2 },
          { x: new Date(2015, 2, 7), y: 0 },
          { x: new Date(2015, 2, 8), y: 3 },
          { x: new Date(2015, 2, 9), y: 2 },
          { x: new Date(2015, 2, 10), y: 3 },
          { x: new Date(2015, 2, 11), y: 4 },
          { x: new Date(2015, 2, 12), y: 4 },
          { x: new Date(2015, 2, 13), y: 1 },
          { x: new Date(2015, 2, 14), y: 5 },
          { x: new Date(2015, 2, 15), y: 0 },
          { x: new Date(2015, 2, 16), y: 1 },
          { x: new Date(2015, 2, 16), y: 1 },
          { x: new Date(2015, 2, 18), y: 4 },
          { x: new Date(2015, 2, 19), y: 4 },
          { x: new Date(2015, 2, 20), y: 5 },
          { x: new Date(2015, 2, 21), y: 5 },
          { x: new Date(2015, 2, 22), y: 5 },
          { x: new Date(2015, 2, 23), y: 1 },
          { x: new Date(2015, 2, 24), y: 0 },
          { x: new Date(2015, 2, 25), y: 1 },
          { x: new Date(2015, 2, 26), y: 1 }
        ]
      },
      xScale: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 800 ]),
      xScaleBrush: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 800 ])
    }
  }

  render() {
    return (
      <div>
        <LineChart
          data={this.state.data}
          width={900}
          height={400}
          margin={{ top: 10, bottom: 50, left: 50, right: 20 }}
          xScale={this.state.xScale}
          xAxis={{ tickValues: this.state.xScale.ticks(d3.time.day, 2), tickFormat: d3.time.format('%m/%d') }}
        />
      </div>
    )
  }

  _onChange(extent) {
    this.setState({ xScale: d3.time.scale().domain([extent[0], extent[1]]).range([0, 400 - 70]) })
  }
}