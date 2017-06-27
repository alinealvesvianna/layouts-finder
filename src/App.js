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

class FetchDribbble extends Component {

  constructor (props) {
    super(props)
    this.state = {
      shotsDribbble: [],
      isLarge: false,
      showDetailShot: false,
      dataShotClicked:{},
      likesShot: []
    }
    this.handleImage = this.handleImage.bind(this);
    this.openDetails = this.openDetails.bind(this);
  }

  componentWillReceiveProps(nextProps){

    if(this.props.typeOfSearchSelected !== nextProps.typeOfSearchSelected
        || this.props.periodSelected !== nextProps.periodSelected
        || this.props.amountResultsSelected !== nextProps.amountResultsSelected){
          this.callApi(nextProps);
    }
  }

  callApi(request){

    let parameters,
        url;

    if (request instanceof Object){
        parameters = {
                list: request.typeOfSearchSelected,
                timeframe: request.periodSelected,
                access_token: '74bdb2a70117794ca7f0e3081e7273ee47f27fdfad9fa4d3a71a53e8cfe2d928',
                per_page: request.amountResultsSelected};
                url = 'https://api.dribbble.com/v1/shots?';
    } else {
        parameters = "";
        url = request;}

    return axios
      .get(url, {
        params: parameters
      })

      .then((response) => {
        if (request instanceof Object){
          const dribbble = response.data.map(
            objDribbble => objDribbble
          )
          this.setState({
            shotsDribbble: dribbble
          })
        } else {
            const likes = response.data.map(
              objLike => objLike)
              this.setState({
                likesShot: likes
              })
              console.log("likes", this.state.likesShot);}
            console.log("callApiUrl", request)
          })

      .catch(function (error) {
          console.log(error);
        });
  }

  handleImage(value){
      this.setState({
          isLarge: value
      })
  }

  openDetails(event, data){
    this.setState({
        showDetailShot: true,
        dataShotClicked: data
    })

    this.callApi(data.likes_url)
  }

  render(){

    const details =  this.state.showDetailShot
                     ? <ShowDetailShot
                      url={this.state.dataShotClicked.images.hidpi}
                      title={this.state.dataShotClicked.title} /> : ""

    const sizeSwitch = this.state.shotsDribbble.length > 0
                       ? <SwitchSize
                          handleImage={e => this.handleImage(e.target.checked)}
                          checked = {this.state.isLarge}
                          name="imagesSize" /> : ""

    const dribbbleShot = this.state.shotsDribbble.length > 0
                          ? this.state.shotsDribbble.map(obj => (
                            <li className="dribbbleItem" key={obj.id}>
                              <p>{obj.title}</p>
                              <img
                                className="dribbbleItem__img"
                                src={this.state.isLarge ? obj.images.normal : obj.images.teaser}
                                onClick={e => this.openDetails(e.target, obj)} />
                            </li>)) : null

    return (<div>
              {sizeSwitch}
              <ul>
                {dribbbleShot}
              </ul>
              {details}
            </div>
          );
  }
  
}

class SelectFilter extends Component {
  render(){
    return (
        <select
          onChange={this.props.handleChange}
          value={this.props.value}
          name={this.props.name}>
              {this.props.children}
          </select>
        );
    }
}

class SwitchSize extends Component {
  render(){
    return(
      <input type="checkbox"
        onChange={this.props.handleImage}
        checked={this.props.isLarge}
        name={this.props.sizeCheckbox} />
    )
  }
}

class ShowDetailShot extends Component {
  render(){
    return(
      <div>
        <h1>{this.props.title}</h1>
        <img src={this.props.url} />
      </div>

    )
  }
}



export default App;
