import React from 'react';
import ReactDOM from 'react-dom';
import { dispatch, observableSubscribe, ObservableState } from './ObservableStore';
import {numberReducer} from './reducer';

const number$ = ObservableState({
  key: 'number',
  initValue: 1,
  reducer: numberReducer
});

@observableSubscribe({
  number: number$
})
class App extends React.Component {
  minus = () => {
    dispatch('number', { type: 'minus' });
  };

  plus = () => {
    dispatch('number', { type: 'plus' });
  };

  render() {
    return (
      <div>
         <div>
          current value is : {this.props.number}
        </div>
        <div>
          <button onClick={this.minus}>minus</button>
          <button onClick={this.plus}>plus</button>
        </div>
      </div>
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));