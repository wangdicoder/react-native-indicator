/**
 * Created by wangdi on 8/12/16.
 */
'use strict';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Animated, ART, Easing} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';

export default class OpacityDotsLoader extends Component {
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

    constructor(props) {
        super(props);
        this.state = {
            opacity: [new Animated.Value(0.5), new Animated.Value(0.5), new Animated.Value(0.5)]
        };
        this._animation = this._animation.bind(this);
    }

    _renderCircle(i) {
        const {color, size, betweenSpace} = this.props;
        return (
            <AnimatedCircle radius={size} fill={color} x={size/2 + i * (size+betweenSpace)} y={size/2} opacity={this.state.opacity[i]} scale={1}/>
        );
    }

    render() {
        const {size, betweenSpace} = this.props;
        return (
            <Surface width={size*3 + betweenSpace*2} height={size}>
                {this._renderCircle(0)}
                {this._renderCircle(1)}
                {this._renderCircle(2)}
            </Surface>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        function seq(self, i) {
            return Animated.sequence([
                Animated.timing(self.state.opacity[i], {toValue: 1, duration: 500, delay: i*500}),
                Animated.timing(self.state.opacity[i], {toValue: 0.3, duration: 500, delay: 500})
            ])
        }

        Animated.parallel([
            seq(this, 0), seq(this, 1), seq(this, 2)
        ]).start(() => {
            if (!this.unmounted)
                this._animation();
        });
    }
}
