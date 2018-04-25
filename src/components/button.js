import React from 'react';

export default class button extends React.Component {
  constructor(props){
    super(props)
    this.buttonClick = this.buttonClick.bind(this);
  }
  buttonClick(event){
    console.log(this.props)
    console.log(Math.random())
  }
  render() {
    return (
      <div>
        <button onClick={this.buttonClick}>点击我呀{this.props.name}</button>
      </div>
    )
  }
}