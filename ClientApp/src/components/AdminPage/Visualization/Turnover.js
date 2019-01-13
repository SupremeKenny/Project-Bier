import React from 'react';
import {
  Header,
  Segment,
  Container,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';


export class Turnover extends React.Component {
  state = {
    omzethuidigeweek: '',
    turnover1weekago: '',
    turnover2weekago: '',
    turnover3weekago: '',
    loaded: false,
  }

  componentWillMount() {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var d = new Date();
    var d7 = new Date();
    d7.setDate(d7.getDate() - 7);
    var d8 = new Date();
    d8.setDate(d8.getDate() - 8);
    var d15 = new Date();
    d15.setDate(d15.getDate() - 15);
    var d22 = new Date();
    d22.setDate(d22.getDate() - 22);
    var d14 = new Date();
    d14.setDate(d14.getDate() - 14);
    var d21 = new Date();
    d21.setDate(d21.getDate() - 21);
    var d28 = new Date();
    d28.setDate(d28.getDate() - 28);
    var lastweek = d7.getDate() + ' ' + months[d7.getMonth()] + '-' + d.getDate() + ' ' + months[d.getMonth()];
    var week1 = d14.getDate() + ' ' + months[d14.getMonth()] + '-' + d8.getDate() + ' ' + months[d8.getMonth()];
    var week2 = d21.getDate() + ' ' + months[d21.getMonth()] + '-' + d15.getDate() + ' ' + months[d15.getMonth()];
    var week3 = d28.getDate() + ' ' + months[d28.getMonth()] + '-' + d22.getDate() + ' ' + months[d22.getMonth()];
    fetch('/Statitics/FetchTurnover')
    .then(results => {
      results.json().then(data => {
        console.log(data);
        this.setState({
          graphdata: [
            {name: week3, Omzet: data.turnover3weekago, Bestellingen: data.ordercount3weekago},
            {name: week2, Omzet: data.turnover2weekago, Bestellingen: data.ordercount2weekago},
            {name: week1, Omzet: data.turnover1weekago, Bestellingen: data.ordercount1weekago},
            {name: lastweek, Omzet: data.turnoverlastweek, Bestellingen: data.ordercountlastweek},
          ],
          loaded: true
        })
      });
    });

  }


  render() {


    if (!this.state.loaded) {
      return (
          <Dimmer active inverted>
            <Loader size="large">Loading</Loader>
          </Dimmer>
      );
    } else
      return (
          <Container>
            <Header as='h1'>Omzet afgelopen maand per week</Header>
            <LineChart width={800} height={300} data={this.state.graphdata}
                       margin={{top: 5, right: 30, left: 0, bottom: 5}}>
              <XAxis dataKey="name"/>

              <YAxis yAxisId="left"/>
              <YAxis yAxisId="right" orientation="right"/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend/>
              <Line yAxisId="left" type="monotone" dataKey="Omzet" stroke="#8884d8" activeDot={{r: 6}}/>
              <Line yAxisId="right" type="monotone" dataKey="Bestellingen" stroke="#82ca9d" activeDot={{r: 6}}/>

            </LineChart>

          </Container>
      );
  }

}
