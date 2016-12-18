/**
 * Created by wangdi on 17/12/16.
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
        rotationSpeed: PropTypes.number
    };

    static defaultProps = {
        size: 40,
        color: '#1e90ff',
        rotationSpeed: 800
    }

    constructor(props) {
        super(props);
        this.state = {
            degree: new Animated.Value(0)
        };
        this._animation = this._animation.bind(this);
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
                        <AnimatedCircle fill={color} radius={size} x={size/2} y={size/2}/>
                        <AnimatedCircle fill="#fff" radius={size/4} x={size/2} y={size/8}/>
                    </Group>
                </Surface>
            </Animated.View>
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
            Animated.timing(this.state.degree, {toValue: 360, duration: this.props.rotationSpeed, easing: Easing.linear})
        ]).start(() => {
            if (!this.unmounted) {
                this.state.degree.setValue(0);
                this._animation();
            }
        });
    }
}