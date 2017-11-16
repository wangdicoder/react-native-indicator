/**
 * Created by wangdi on 11/12/16.
 */
'use strict';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Animated, ART} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';

export default class CirclesLoader extends Component {
    static propTypes = {
        color: PropTypes.string,
        dotRadius: PropTypes.number,
        size: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        dotRadius: 8,
        size: 40
    };

    constructor(props) {
        super(props);
        this.state = {
            opacities: [
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1)
            ]
        };
        this.eachDegree = 360 / this.state.opacities.length;
        this.timers = [];
        this._animation = this._animation.bind(this);
    }

    render() {
        const {size, dotRadius, color} = this.props;
        return (
            <Surface width={size+dotRadius} height={size+dotRadius}>
                {this.state.opacities.map((item, i) => {
                    let radian = (i * this.eachDegree) * Math.PI / 180;
                    let x = Math.round(size / 2 * Math.cos(radian)) + size / 2 + dotRadius / 2;
                    let y = Math.round(size / 2 * Math.sin(radian)) + size / 2 + dotRadius / 2;
                    return <AnimatedCircle key={i} radius={dotRadius} fill={color} x={x} y={y}
                                           opacity={this.state.opacities[i]}/>
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this.state.opacities.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animation(i)
            }, i * 150);
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
            Animated.timing(this.state.opacities[i], {toValue: 0.1, duration: 600}),
            Animated.timing(this.state.opacities[i], {toValue: 1, duration: 600})
        ]).start(() => {
            if (!this.unmounted)
                this._animation(i);
        });
    }
}
