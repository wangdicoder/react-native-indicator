/**
 * Created by wangdi on 19/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {ART, Animated, View, Easing} from 'react-native';
const {Surface, Transform, Path, Shape} = ART;
import AnimatedBar from '../animated/AnimatedBar';

export default class SquareLoader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotate: new Animated.ValueXY({x: 0, y: 0})
        };
        this._animation = this._animation.bind(this);
    }

    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };

    static defaultProps = {
        size: 50,
        color: '#1e90ff'
    };

    render() {
        const {size, color} = this.props;
        return (

            <Animated.View style={{
                transform: [{
                    rotateX: this.state.rotate.x.interpolate({
                        inputRange: [0, 180],
                        outputRange: ['0deg', '180deg']
                    }),
                    rotateY: this.state.rotate.y.interpolate({
                        inputRange: [0, 180],
                        outputRange: ['0deg', '180deg']
                    }),
                }], backgroundColor: color, width: size, height: size}}/>
        );
    }

    componentDidMount() {
        this._animation();
    }

    componentWillUnmount() {

    }

    _animation() {
        Animated.sequence([
            Animated.timing(this.state.rotate, {toValue: {x: 0, y: 180}, duration: 1000, delay: 100}),
            Animated.timing(this.state.rotate, {toValue: {x: 180, y: 0}, duration: 1000, delay: 100}),

        ]).start(() => {
            if (!this.unmounted) {
                this.state.rotate.setValue({x: 0, y: 0});
                this._animation();
            }
        });
    }
}