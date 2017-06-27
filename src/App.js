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

class FetchDribbble extends Component {

  constructor (props) {
    super(props)
    this.state = {
      shotsDribbble: [],
      isLarge: false,
      showDetailShot: false,
      dataShotClicked:{},
      likesShot: [],
      showLoading: false,
      requestFail: false,
      requestMensageFail: {}
    }
    this.handleImage = this.handleImage.bind(this);
    this.openDetails = this.openDetails.bind(this);
  }

  componentWillReceiveProps(nextProps){

    if(this.props.typeOfSearchSelected !== nextProps.typeOfSearchSelected
        || this.props.periodSelected !== nextProps.periodSelected
        || this.props.amountResultsSelected !== nextProps.amountResultsSelected){
            this.callApi(nextProps);
            this.setState({
                showLoading: true
            })
    }
  }

  callApi(request){

      let parameters,
          url;

      if (request instanceof Object){
          parameters = {
              list: request.typeOfSearchSelected,
              timeframe: request.periodSelected,
              access_token: "74bdb2a70117794ca7f0e3081e7273ee47f27fdfad9fa4d3a71a53e8cfe2d928",
              per_page: request.amountResultsSelected};
          url = "bananinha";
      } else {
          parameters = "";
          url = request;
      }

      return axios
        .get(url, {
            params: parameters
        })

        .then((response) => {

            if (request instanceof Object){
                const dribbble = response.data.map(
                  objDribbble => objDribbble)

                this.setState({
                    shotsDribbble: dribbble})

                console.log("shots", this.state.shotsDribbble);

            } else {
                const likes = response.data.map(
                  objLike => objLike)

                this.setState({
                    likesShot: likes})

                console.log("likes", this.state.likesShot);
                console.log("call likes url", request);
               }

            this.setState({
                showLoading: false,
                requestFail: false,
                requestMensageFail: ""})
            
          })

      .catch((error) => {

          this.setState({
              requestFail: true,
              requestMensageFail: error,
              showLoading: false
          })

          console.log("erroConsole", error);
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
        showLoading: true,
        dataShotClicked: data
    })

    this.callApi(data.likes_url)
  }

  render(){


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
                                alt = {obj.tags.join(" ")}
                                src={this.state.isLarge ? obj.images.normal : obj.images.teaser}
                                onClick={e => this.openDetails(e.target, obj)} />
                            </li>)) : ""

    const details =  this.state.showDetailShot
                     ? <ShowDetailShot
                          url={this.state.dataShotClicked.images.hidpi}
                          title={this.state.dataShotClicked.title}
                          description={this.state.dataShotClicked.title}
                          likesAmount={this.state.dataShotClicked.likes_count} /> : ""

    const likes = this.state.likesShot.length > 0
                  ? this.state.likesShot.map(obj => (
                    <LikeShot key = {obj.id}
                              userLink = {obj.user.html_url}
                              avatar = {obj.user.avatar_url}
                              description = {obj.user.username}
                              nameUser = {obj.user.username} /> )) : ""

    const loading = this.state.showLoading 
                    ? <Loading /> : ""

    const error = this.state.requestFail
                  ? <MensageError 
                        message= {this.state.requestMensageFail.message} /> : ""


    return (<div>
                {error}
                {loading}
                {sizeSwitch}
                <ul>
                    {dribbbleShot}
                </ul>
                <section>
                    {details}
                    {likes}
                </section>
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
        <h2>{this.props.likesAmount} curtiram!</h2>
        <img src={this.props.url} alt={this.props.description} />
      </div>
    )
  }
}

const LikeShot = (props) => <li key={props.id}>
  <a href = {props.userLink}>
    <img src={props.avatar} alt={"Usuario que curtiu: " + props.description}/>
    {props.nameUser}
  </a>
</li>

const Loading = (props) => <div className="loading">
    <p className="loading__txt">
        <span className="loading__animation"></span>
        <span className="icon-thumbs-up loading__icon"></span>
        Carregando
    </p>
</div>

const MensageError = (props) => <div className="error">
    <p className="error__txt">
        <span className="icon-thumbs-down error__icon"></span>
        Ops...Alguma coisa deu errado: {props.message}
    </p>
</div>


export default App;
