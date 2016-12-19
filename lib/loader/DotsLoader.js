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
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        function seq(self, i) {
            return Animated.sequence([
                Animated.timing(self.state.opacities[i], {toValue: 0.2, duration: 300, delay: i*200}),
                Animated.timing(self.state.opacities[i], {toValue: 1, duration: 300})
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