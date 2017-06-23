import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      //list
      typeOfSearch: 'playoffs',
      //timeframe
      period: 'week',
      //timeframe
      amountResults: 10
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({
        period: 'month',
    });

    console.log(this.state.period);
  }

  render() {
    return (
      <div className="container">
        <FetchDribbble
          typeOfSearch ={this.state.typeOfSearch}
          period ={this.state.period}
          amountResults ={this.state.amountResults} />

          <ButtonFilter handleClick={this.handleClick} period={this.state.period}>
            {this.state.typeOfSearch}
          </ButtonFilter>
      </div>
    );
  }
}

class FetchDribbble extends Component {

  componentDidMount(){
    return axios
    .get('https://api.dribbble.com/v1/shots?', {
      params: {
        list: this.props.typeOfSearch,
        timeframe: this.props.period,
        access_token: '74bdb2a70117794ca7f0e3081e7273ee47f27fdfad9fa4d3a71a53e8cfe2d928',
        per_page: this.props.amountResults
      }
    })
    .then(response =>
      console.log(response)
    )
    .catch(function (error) {
      console.log(error);
    });
  }

  render(){
    return <span></span>
  }

}


class ButtonFilter extends Component {
  render(){
    return (<button type="button" id="sidbarPush" onClick={this.props.handleClick} value= {this.props.period}>{this.props.children}</button>)
  }
}



export default App;
