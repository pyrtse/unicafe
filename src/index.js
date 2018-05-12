import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return (
    <div>
      <button onClick={props.cmd}>{props.nimi}</button>
    </div>
  )
}

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.teksti}</td>
      <td>{props.arvo}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if ((props.huono + props.hyva + props.neutraali) === 0) {
    return (
      <div>
        <p>ei yhtään palautetta annettu</p>
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <Statistic teksti='hyvä' arvo={props.hyva} />
          <Statistic teksti='neutraali' arvo={props.neutraali} />
          <Statistic teksti='huono' arvo={props.huono} />
          <Statistic teksti='keskiarvo' arvo={(Math.round(10 * ((props.hyva - props.huono) / (props.huono + props.hyva + props.neutraali))) / 10)} />
          <Statistic teksti='positiivisia' arvo={((Math.round((1000 * (props.hyva / (props.hyva + props.huono + props.neutraali)))) / 10) + ' %')} />
        </tbody>
      </table>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      arvot : this.props.arvot
    }
  }


  klik = (arvo) => {
    return () => {
      this.props.arvot[arvo] = this.props.arvot[arvo] +1
      this.setState({arvot: this.props.arvot})
    }
  }


  render() {
    return (
      <div>
        <div>
          <h1>anna palautetta</h1>
          <Button cmd={this.klik('hyva')} nimi='hyvä' />
          <Button cmd={this.klik('neutraali')} nimi='neutraali' />
          <Button cmd={this.klik('huono')} nimi='huono' />
          <Statistics hyva={this.state.arvot.hyva} neutraali={this.state.arvot.neutraali} huono={this.state.arvot.huono} />
        </div>
      </div>
    )
  }
}

const arvot = {
  hyva: 0,
  neutraali: 0,
  huono: 0
}

ReactDOM.render(
  <App arvot={arvot} />,
  document.getElementById('root')
)