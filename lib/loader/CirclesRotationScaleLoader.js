/**
 * Created by wangdi on 18/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {ART, Animated, View, Easing} from 'react-native';
const {Surface, Group} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';

export default class RotationCircleLoader extends Component {
    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string,
    };

    static defaultProps = {
        size: 50,
        color: '#1e90ff',
    }

    constructor(props) {
        super(props);
        this.state = {
            degree: new Animated.Value(0),
            scales: [new Animated.Value(0), new Animated.Value(0)]
        };
        this._animation = this._animation.bind(this);
        this.timers = [];
    }

    render() {
        const {size, color} = this.props;
        const degree = this.state.degree.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg']
        });
        return (
            <Animated.View style={{transform: [{rotate: degree}], backgroundColor: 'rgba(0,0,0,0)'}}>
                <Surface width={size} height={size}>
                    <Group>
                        <AnimatedCircle fill={color} radius={size/2} x={size/2} y={size/4}
                                        scale={this.state.scales[0]}/>
                        <AnimatedCircle fill={color} radius={size/2} x={size/2} y={size/4*3}
                                        scale={this.state.scales[1]}/>
                    </Group>
                </Surface>
            </Animated.View>
        );
    }

    componentDidMount() {
        this._animation();
        this.state.scales.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animationCircles(i)
            }, i * 500);
            this.timers.push(id);
        });

    }

    componentWillUnmount() {
        this.unmounted = true;
        this.timers.forEach((id)=>{
            clearTimeout(id);
        });
    }

    _animation() {
        Animated.sequence([
            Animated.timing(this.state.degree, {
                toValue: 360,
                duration: 2000,
                easing: Easing.linear
            })
        ]).start(() => {
            if (!this.unmounted) {
                this.state.degree.setValue(0);
                this._animation();
            }
        });
    }

    _animationCircles(i) {
        Animated.sequence([
            Animated.timing(this.state.scales[i], {toValue: 1, duration: 1000}),
            Animated.timing(this.state.scales[i], {toValue: 0.05, duration: 1000}),
        ]).start(() => {
            if (!this.unmounted) {
                this._animationCircles(i);
            }
        });
    }
}