import React, { Component } from 'react';
import FetchDribbble from './components/FetchDribbble';
import './App.css';
import {SelectFilter} from './components/FormComponents';

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
      //per_page
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

export default App;
