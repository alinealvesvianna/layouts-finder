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
      ],

      typeOfSearchSelected: '',
      periodSelected: '',
      amountResultsSelected: ''


      // shotsDribbble: []
    }
    this.handleChange = this.handleChange.bind(this);
  }



  handleChange(event) {

    //
    // this.setState({
    //     value: event.target.value,
    // });

    switch (event.target.name) {

      case "typeOfSearch":
        console.log("eh o typeOfSearch");
        this.setState({
            typeOfSearchSelected: event.target.value,
        });
        break;

      case "period":
        console.log("eh o period");
        this.setState({
            periodSelected: event.target.value,
        });
        break;

      case "amountResults":
        console.log("eh o amountResults");
        this.setState({
            amountResultsSelected: event.target.value,
        });
        break;

      default:
        break;
      }

    console.log(event.target.value);
  }

  render() {

    const createItem = (item, key) => <option key = {key} value = {item.value}>
     {item.name} </option>;

    return (
      <div className="container">
        <FetchDribbble
          typeOfSearchSelected = {this.state.typeOfSearchSelected}
          periodSelected = {this.state.periodSelected}
          amountResultsSelected = {this.state.amountResultsSelected}/>

        <SelectFilter handleChange={this.handleChange} value={this.state.typeOfSearchSelected} name="typeOfSearch">
            {this.state.typeOfSearch.map(createItem)}
          </SelectFilter>

          <SelectFilter handleChange={this.handleChange} value={this.state.periodSelected} name="period">
            {this.state.period.map(createItem)}
          </SelectFilter>

          <SelectFilter handleChange={this.handleChange} value={this.state.amountResultsSelected} name="amountResults">
            {this.state.amountResults.map(createItem)}
          </SelectFilter>

      </div>
    );
  }
}

class FetchDribbble extends Component {

  constructor (props) {
    super(props)
    this.state = {
      shotsDribbble: []
    }
  }

  componentWillReceiveProps (nextProps){
    if(this.props.typeOfSearchSelected !== nextProps.typeOfSearchSelected || this.props.periodSelected !== nextProps.periodSelected || this.props.amountResultsSelected !== nextProps.amountResultsSelected){
      return axios
      .get('https://api.dribbble.com/v1/shots?', {
        params: {
          list: nextProps.typeOfSearchSelected,
          timeframe: nextProps.periodSelected,
          access_token: '74bdb2a70117794ca7f0e3081e7273ee47f27fdfad9fa4d3a71a53e8cfe2d928',
          per_page: nextProps.amountResultsSelected
        }
      })
      .then((response) => {
        const dribbble = response.data.map(
          objDribbble => objDribbble
        )

        this.setState({
          shotsDribbble: dribbble
        })

        console.log(this.state.shotsDribbble);

      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  render(){
    return <span></span>
  }
}

class SelectFilter extends Component {
  render(){

    return (<select onChange={this.props.handleChange} value={this.props.value} name= {this.props.name}>
              {this.props.children}
            </select>)
        }
}


// <FetchDribbble
//   typeOfSearch ="playoffs"
//   period ={this.state.period}
//   amountResults ={this.state.amountResults} />



export default App;
