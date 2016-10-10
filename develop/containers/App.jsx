import React, { PropTypes } from 'react';

const App = (props) => (
    <div id="app-view">
        {props.children}
    </div>
);

App.propTypes = {
    children: PropTypes.element,
};

export default App;
