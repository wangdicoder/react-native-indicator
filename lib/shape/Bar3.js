/**
 * Created by wangdi on 19/12/16.
 * the scale center of this bar is center
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {ART} from 'react-native';
const {Shape, Path} = ART;

export default class Bar3 extends Component {
    static propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired
    };

    render() {
        const {width, height} = this.props;

        const path = Path()
            .moveTo(width/2, height / 2)
            .lineTo(-width/2, height / 2)
            .lineTo(-width/2, -height / 2)
            .lineTo(width/2, -height / 2)
            .close();

        return <Shape {...this.props} d={path}/>;
    }
}