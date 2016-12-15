/**
 * Created by wangdi on 8/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';


export default class PulseLoader extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        frequency: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 30,
        frequency: 500
    };

    constructor(props) {
        super(props);
        this.state = {
            scale: new Animated.Value(1)
        };
        this._animation = this._animation.bind(this);
    }

    render() {
        const {color, size} = this.props;
        return (
            <Surface width={size} height={size}>
                <AnimatedCircle radius={size} fill={color} scale={this.state.scale} x={size/2} y={size/2}/>
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
            Animated.timing(this.state.scale, {toValue: 0.2, duration: this.props.frequency}),
            Animated.timing(this.state.scale, {toValue: 1, duration: this.props.frequency})
        ]).start(() => {
            if (!this.unmounted)
                this._animation();
        });
    }
}