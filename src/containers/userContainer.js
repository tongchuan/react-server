import React from 'react';

import Button from '../components/button'

export default class userContainer extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
      userContainer
        <Button name={Math.random()}  />
      </div>
    )
  }
}