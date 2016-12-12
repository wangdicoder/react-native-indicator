/**
 * Created by wangdi on 8/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART, Easing} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';

export default class DotsLoader extends Component {
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
            opacities: [new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]
        };
        this.timers = [];
        this._animation = this._animation.bind(this);
    }

    _renderCircle(i) {
        const {color, size, betweenSpace} = this.props;
        return (
            <AnimatedCircle radius={size} fill={color} x={size + i * (size+betweenSpace)} y={size}
                            scale={this.state.opacities[i]}/>
        );
    }

    render() {
        const {size, betweenSpace} = this.props;
        return (
            <Surface width={size*3 + (size+betweenSpace)*2} height={size*2}>
                {this._renderCircle(0)}
                {this._renderCircle(1)}
                {this._renderCircle(2)}
            </Surface>
        );
    }

    componentDidMount() {
        this.state.opacities.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animation(i)
            }, i * 250);
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
            Animated.timing(this.state.opacities[i], {toValue: 0.2, duration: 500}),
            Animated.timing(this.state.opacities[i], {toValue: 1, duration: 500})
        ]).start(() => {
            if (!this.unmounted)
                this._animation(i);
        });
    }
}