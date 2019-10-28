
import { BehaviorSubject  } from 'rxjs';
import React from 'react';

const store = {};

const addReducerIntoStore = (key, reducer, observer) => {
  if(!store.key) {
    const innerFunc = (observer) => {
      return (action) => {
        reducer(observer, observer.getValue(), action);
      }
    };
    store[key] = innerFunc(observer);
  } else {
    throw new Error('pls change key!');
  }
};

const verifyIsObservableFunc = (func) => {
  return func.next && func._subscribe && func.getValue;
};

export const ObservableState = (state) => {
  const {key, initValue, reducer} = state;
  if(!key) {
    throw new Error('pls add key!');
  }
  if(!initValue) {
    throw new Error('pls add initValue!');
  }
  if(!reducer) {
    throw new Error('pls add reducer!');
  }
  const bs$ = new BehaviorSubject(initValue);
  addReducerIntoStore(key, reducer, bs$);
  return bs$;
};

export const dispatch = (key, action) => {
  store[key](action);
};

export const observableSubscribe = (data) => {
  if(Object.prototype.toString.call(data) !== '[object Object]') {
    throw new Error('incorrect parameter!');
  }
  return (Target) => {
    return class Inner extends React.Component {
      constructor(props) {
        super(props);
        this.subArr = [];
        this.state = {};
      }

      componentDidMount(){
        const kys = Object.keys(data);
        for(let i of kys) {
          const val = data[i];
          if(verifyIsObservableFunc(val)) {
            const sub =  data[i].subscribe(v => {
              this.setState({[i]: v})
            });
            this.subArr.push(sub);
          } else {
            throw new Error(`${i} value is not observable`);
          }
        }
      }

      componentWillUnmount() {
        this.subArr.forEach(sub => {
          sub.unsubscribe();
        });
      }

      render() {
        return (
          <Target {...this.props} {...this.state} />
        )
      }
    }
  }
}; 