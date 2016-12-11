/**
 * Created by wangdi on 10/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART} from 'react-native';
import AnimatedBar from '../animated/AnimatedBar';
const {Surface} = ART;

export default class BarLoader extends Component{
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        betweenSpace: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 10,
        betweenSpace: 5
    };


    render(){
        const {color, size, betweenSpace} = this.props;
        return(
            <Surface>
                <AnimatedBar fill={color} width={5} height={10}/>
            </Surface>
        );
    }
}