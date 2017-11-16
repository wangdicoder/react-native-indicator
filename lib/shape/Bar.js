/**
 * Created by wangdi on 10/12/16.
 * the scale center of this bar is left-center
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ART} from 'react-native';
const {Shape, Path} = ART;

export default class Bar extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    };

    render() {
        const {width, height} = this.props;

        const path = Path()
            .moveTo(width, height / 2)
            .lineTo(0, height / 2)
            .lineTo(0, -height / 2)
            .lineTo(width, -height / 2)
            .close();

        return <Shape {...this.props} d={path}/>;
    }
}
