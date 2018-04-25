import React from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import newsActions from '../redux/actions/newsActions'
import Button from '../components/button'

@connect((state, ownProps)=>{
  return {newState:state.reduxCommon};//{ newState: state.newState };
},(dispatch) => {
  return {action: bindActionCreators(newsActions, dispatch)};
},(stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps);
}, {
  pure: false,
  withRef: false
})
export default class newsContainer extends React.Component {
  constructor(props){
    super(props)
    this.ddddd = this.ddddd.bind(this);
  }
  componentWillMount(){
    console.log('componentWillMount')
  }
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  ddddd(){
    console.log(this)
  }
  render() {
    return (
      <div>
      newsContainer
      <ul>
        {this.props.newState.list.map((item,i)=>{
          return (
            <li key={i}>{item.title}</li>
          )
        })}
      
      </ul>
      <div onClick={this.ddddd}>kaishi</div>
        <Button name={'000000000000000000000000'} />
      </div>
    )
  }
}