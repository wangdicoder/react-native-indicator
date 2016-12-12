/**
 * Created by wangdi on 12/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';


export default class BreathingLoader extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        strokeWidth: PropTypes.number,
        frequency: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 30,
        strokeWidth: 3,
        frequency: 800
    };

    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(0.1)
        };
        this._animation = this._animation.bind(this);
    }

    render() {
        const {color, size, strokeWidth} = this.props;
        return (
            <Surface width={size+strokeWidth} height={size+strokeWidth}>
                <AnimatedCircle radius={size} stroke={color} strokeWidth={strokeWidth} scale={this.state.scale}
                                x={(size+strokeWidth)/2} y={(size+strokeWidth)/2}/>
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
        Animated.sequence([
            Animated.timing(this.state.scale, {toValue: 1, duration: this.props.frequency}),
            Animated.timing(this.state.scale, {toValue: 0.1, duration: this.props.frequency})
        ]).start(() => {
            if (!this.unmounted)
                this._animation();
        });
    }
}