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
        size: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 10
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
            <Surface width={size*2} height={size*2}>
                <AnimatedCircle radius={size} fill={color} scale={this.state.scale} x={size} y={size}/>
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
            Animated.timing(this.state.scale, {toValue: 0.2}),
            Animated.timing(this.state.scale, {toValue: 1})
        ]).start(() => {
            if (!this.unmounted)
                this._animation();
        });
    }
}