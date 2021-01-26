import React from 'react';
import ReactDOM from 'react-dom';
const App = () => {
    return (
        <div>
            <h1>Hello React and Webpack</h1>
            <h1>1</h1>
            <h1>2</h1>
            <h1>3</h1>
        </div>
    );
};
export default App;
ReactDOM.render(<App />, document.getElementById('app'));
