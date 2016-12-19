/**
 * Created by wangdi on 10/12/16.
 * the scale center of this bar is bottom-center
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {ART} from 'react-native';
const {Shape, Path} = ART;

export default class Bar2 extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    };

    render() {
        const {width, height} = this.props;

        const path = Path()
            .moveTo(0, 0)
            .lineTo(0, -height)
            .lineTo(width, -height)
            .lineTo(width, 0)
            .close();

        return <Shape {...this.props} d={path}/>;
    }
}