import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { commonAction } from '../actions/common.actions';

import CommonPage from '../components/Common.page.jsx';

class Common extends Component {
    render() {
        const { handleCommonAction } = this.props;

        return (
            <CommonPage
                handleCommonAction={handleCommonAction}
            />
        );
    }
}

Common.propTypes = {
    handleCommonAction: PropTypes.func,
};

const mapStateTotProps = (state, ownProps) => ({
    ...ownProps,
});

const mapDispatchToProps = (dispatch, ownPorps) => ({
    ...ownPorps,
    handleCommonAction: bindActionCreators(commonAction, dispatch),
});

export default connect(mapStateTotProps, mapDispatchToProps)(Common);
