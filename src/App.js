import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      values: {},
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
      // shotsDribbble: []
    }
    this.handleChange = this.handleChange.bind(this);
  }


    handleChange(name, value) {
      this.setState(
        {
          values: {
            ...this.state.values,
            [name]: value
          }
        },
        () => console.log("Novos valores:", this.state.values)
      );
    }

  render() {

    const createItem = (item, key) =>
      <option key = {key} value = {item.value}>
        {item.name}
        {" "}
      </option>;

      const selects = ["typeOfSearch", "period", "amountResults"].map(name => {
      return (
          <SelectFilter
            handleChange={e => this.handleChange(name, e.target.value)}
            key={name}
            value={this.state.values[name]}
            name={name}>
            {this.state[name].map(createItem)}
          </SelectFilter>
        );
      });

    return (
      <div className="container">
          {selects}
          <FetchDribbble
            typeOfSearchSelected = {this.state.values.typeOfSearch}
            periodSelected = {this.state.values.period}
            amountResultsSelected = {this.state.values.amountResults}/>
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
    if(this.props.typeOfSearchSelected !== nextProps.typeOfSearchSelected
        || this.props.periodSelected !== nextProps.periodSelected
        || this.props.amountResultsSelected !== nextProps.amountResultsSelected){
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
    const dribbbleShot = this.state.shotsDribbble !== []
    ? this.state.shotsDribbble.map(obj => (
      <li className="dribbbleItem" key={obj.id}>
        <p>{obj.title}</p>
        <img className="dribbbleItem__img" src={obj.images.normal} />
      </li>)) : null

    return (<ul>{dribbbleShot}</ul>);
  }
}

class SelectFilter extends Component {
  render(){
    return (
        <select
          onChange={this.props.handleChange}
          value={this.props.value}
          name= {this.props.name}>
              {this.props.children}
          </select>
        );
    }
}



export default App;
