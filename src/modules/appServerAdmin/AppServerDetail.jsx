import React from 'react'
import 'react-vis/dist/style.css'

import {
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  LineSeriesCanvas
} from 'react-vis'

export default class Example extends React.Component {
  render() {
    return (
      <XYPlot
        width={800}
        height={300}>
        <HorizontalGridLines />
        <VerticalGridLines />
        <XAxis title="Hora" position="start"/>
        <YAxis title="Requests"/>
        <LineSeriesCanvas
          className="first-series"
          data={[
            {x: 1, y: 3},
            {x: 2, y: 5},
            {x: 3, y: 100},
            {x: 4, y: 12},
            {x: 4, y: 234},
            {x: 34, y: 432}
          ]}/>
      </XYPlot>
    )
  }
}
