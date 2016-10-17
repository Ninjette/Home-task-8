import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { commonAction } from '../actions/common.actions';

import DesiredPage from '../components/Desired.page.jsx';

class Desired extends Component {
    render() {
        const { handleCommonAction } = this.props;

        return (
            <DesiredPage
                handleCommonAction={handleCommonAction}
            />
        );
    }
}

Desired.propTypes = {
    handleCommonAction: PropTypes.func,
};

const mapStateTotProps = (state, ownProps) => ({
    ...ownProps,
});

const mapDispatchToProps = (dispatch, ownPorps) => ({
    ...ownPorps,
    handleCommonAction: bindActionCreators(commonAction, dispatch),
});

export default connect(mapStateTotProps, mapDispatchToProps)(Desired);
