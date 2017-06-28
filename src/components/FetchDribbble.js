import React, { Component } from 'react';
import {SwitchSize} from './FormComponents';
import {ShowDetailShot, LikeShot} from './DetailsShot';
import {MensageError, Loading} from './UIReturns';
import './../styles/FetchDribbble.css';
import axios from 'axios';


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
            requestMessageFail: {}
        }
        this.handleImage = this.handleImage.bind(this);
        this.openDetails = this.openDetails.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
                url = "https://api.dribbble.com/v1/shots?";
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
                  requestMessageFail: ""})

          })

        .catch((error) => {

            this.setState({
                requestFail: true,
                requestMessageFail: error,
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

    closeModal(){
      this.setState({
        showDetailShot: false
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
                           ? <div>
                                <SwitchSize
                                  handleImage={e => this.handleImage(e.target.checked)}
                                  checked = {this.state.isLarge}
                                  name="imagesSize" />
                                <label className="label-form">Aumentar/Diminuir tamanho das imagens</label>
                             </div>: ""

        const dribbbleShot = this.state.shotsDribbble.length > 0
                              ? this.state.shotsDribbble.map(obj => (
                                <li className={this.state.isLarge ? "dribbleShot-list__item dribbleShot-list__item--large" : "dribbleShot-list__item  dribbleShot-list__item--small"}
                                    key={obj.id}>
                                  <img
                                    className="dribbleShot-list__image"
                                    alt = {obj.tags.join(" ")}
                                    src={this.state.isLarge ? obj.images.normal : obj.images.teaser}
                                    onClick={e => this.openDetails(e.target, obj)} />
                                    <p className="dribbleShot-list__txt">Título: {obj.title}</p>
                                    <p className="dribbleShot-list__txt">Usuário: {obj.user.username}</p>
                                  </li>)) : ""

        const details =  this.state.showDetailShot
                            ? <ShowDetailShot
                                url={this.state.dataShotClicked.images.hidpi}
                                title={this.state.dataShotClicked.title}
                                description={this.state.dataShotClicked.title}
                                likesAmount={this.state.dataShotClicked.likes_count}
                                closeModal={()=> this.closeModal()}/> : ""

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
                            message= {this.state.requestMessageFail.message} /> : ""


        return (<div>
                    {error}
                    {loading}
                    <section className="row container--shots">
                      {sizeSwitch}
                      <ul className="dribbleShot-list">
                          {dribbbleShot}
                      </ul>
                    </section>
                    <section className = {this.state.showDetailShot? "modal show" : "modal hide"}>
                        <div className="row container--modal">
                          {details}
                          <ul className="likes-list">
                            {likes}
                          </ul>
                        </div>
                    </section>
                </div>);
    }

}

export default FetchDribbble;
