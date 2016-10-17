import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { commonAction } from '../actions/common.actions';

import DesiredPage from '../components/Desired.page.jsx';

class Desired extends Component {
    render() {
        const { handleCommonAction } = this.props;

        return (
            <DesiredPage handleCommonAction={handleCommonAction} />
        );
    }
}


export default Desired;
