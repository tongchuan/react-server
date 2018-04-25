import React from 'react';

import Button from '../components/button'

export default class indexContainer extends React.Component {
  constructor(props){
    super(props)
    console.log(this)
    this.tiao = this.tiao.bind(this)
  }
  tiao() {
    this.props.history.replace('/news')
  }
  render() {
    return (
      <div>
        indexContainer
        <a href="javascript:void(0)" onClick={this.tiao}>112qwerqwe</a>
        <Button name={Math.random()}  />
      </div>
    )
  }
}