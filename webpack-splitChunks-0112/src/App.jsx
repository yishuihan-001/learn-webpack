// import React from 'react';
import(/* webpackChunkName: "react" */ 'react').then(res => {
  console.log('===> res', res)
})
import ReactDOM from 'react-dom';

const App = () => {
    return (
        <div>
            <h1>Hello React and Webpack</h1>
            <h1>1</h1>
            <h1>2</h1>
            <h1>3</h1>
            <h1>4</h1>
            <h1>5</h1>
        </div>
    );
};
export default App;
ReactDOM.render(<App />, document.getElementById('app'));
