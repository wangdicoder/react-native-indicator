/**
 * Created by wangdi on 15/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';

export default class DoubleCircleLoader extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 30
    };

    constructor(props) {
        super(props);
        this.state = {
            scales: [new Animated.Value(0), new Animated.Value(0)]
        };
        this._animation = this._animation.bind(this);
        this.timers = [];
    }

    render() {
        const {color, size} = this.props;
        return (
            <Surface width={size} height={size}>
                <AnimatedCircle radius={size} fill={color} opacity={0.5}
                                scale={this.state.scales[0]} x={size/2} y={size/2}/>
                <AnimatedCircle radius={size} fill={color} opacity={0.5}
                                scale={this.state.scales[1]} x={size/2} y={size/2}/>
            </Surface>
        );
    }

    componentDidMount() {
        this.state.scales.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animation(i);
            }, i * 1000);
            this.timers.push(id);
        });
    }

    componentWillUnmount() {
        this.unmounted = true;
        this.timers.forEach((id) => {
            clearTimeout(id);
        });
    }

    _animation(i) {
        Animated.sequence([
            Animated.timing(this.state.scales[i], {toValue: 1, duration: 1000}),
            Animated.timing(this.state.scales[i], {toValue: 0, duration: 1000})
        ]).start(() => {
            if (!this.unmounted)
                this._animation(i);
        });
    }
}