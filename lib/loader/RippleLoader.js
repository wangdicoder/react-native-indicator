/**
 * Created by wangdi on 12/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';


export default class RippleLoader extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        strokeWidth: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 40,
        strokeWidth: 3
    };

    constructor(props) {
        super(props);
        this.state = {
            scales: [new Animated.Value(0.1), new Animated.Value(0.1)],
            opacities: [new Animated.Value(1), new Animated.Value(1)]
        };
        this.timers = [];
        this._animation = this._animation.bind(this);
    }

    render() {
        const {color, size, strokeWidth} = this.props;
        return (
            <Surface width={size+strokeWidth} height={size+strokeWidth}>
                {this.state.scales.map((item, i) => {
                    return (
                        <AnimatedCircle
                            key={i}
                            radius={size}
                            stroke={color}
                            strokeWidth={strokeWidth}
                            scale={this.state.scales[i]}
                            opacity={this.state.opacities[i]}
                            x={(size+strokeWidth)/2}
                            y={(size+strokeWidth)/2}/>
                    );
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this.state.scales.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animation(i)
            }, i * 1200);
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
        Animated.parallel([
            Animated.timing(this.state.scales[i], {toValue: 1, duration: 1600}),
            Animated.timing(this.state.opacities[i], {toValue: 0, duration: 1600, delay: 800})
        ]).start(() => {
            if (!this.unmounted) {
                this.state.scales[i].setValue(0.1);
                this.state.opacities[i].setValue(1);
                this._animation(i);
            }
        });
    }
}