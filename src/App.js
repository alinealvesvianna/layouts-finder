import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      //list
      typeOfSearch: [
        {
          value: 'animated',
          name: 'animated'
        },
        {
          value: 'debuts',
          name: 'debuts'
        },
        {
          value: 'playoffs',
          name: 'playoffs'
        },
        {
          value: 'teams',
          name: 'teams'
        }
      ],
      //timeframe
      period: [
        {
          value: 'week',
          name: 'week'
        },
        {
          value: 'month',
          name: 'month'
        },
        {
          value: 'year',
          name: 'year'
        },
        {
          value: 'ever',
          name: 'ever'
        }
      ],
      //timeframe
      amountResults: [
        {
          value: '10',
          name: '10'
        },
        {
          value: '20',
          name: '20'
        },
        {
          value: '30',
          name: '30'
        },
      ]
    }
    this.handleChange = this.handleChange.bind(this);
  }



  handleChange(event) {

    this.setState({
        value: event.target.value,
    });

    console.log(event.target.value);
  }

  render() {

    const createItem = (item, key) => <option key = {key} value = {item.value}>
     {item.name} </option>;

    return (
      <div className="container">
        <FetchDribbble
          typeOfSearch ="debuts"
          period ='week'
          amountResults ='20' />

          <SelectFilter handleChange={this.handleChange} value={this.state.value}>
            {this.state.typeOfSearch.map(createItem)}
          </SelectFilter>

          <SelectFilter handleChange={this.handleChange} value={this.state.value}>
            {this.state.period.map(createItem)}
          </SelectFilter>

          <SelectFilter handleChange={this.handleChange} value={this.state.value}>
            {this.state.amountResults.map(createItem)}
          </SelectFilter>

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

class SelectFilter extends Component {
  render(){

    return (<select id="" onChange={this.props.handleChange} value={this.props.value}>
              {this.props.children}
            </select>
          )
        }
}


// <FetchDribbble
//   typeOfSearch ="playoffs"
//   period ={this.state.period}
//   amountResults ={this.state.amountResults} />



export default App;
