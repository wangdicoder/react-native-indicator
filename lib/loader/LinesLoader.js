/**
 * Created by wangdi on 10/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART} from 'react-native';
import AnimatedBar from '../animated/AnimatedBar';
const {Surface} = ART;

export default class LinesLoader extends Component {
    static propTypes = {
        color: PropTypes.string,
        barWidth: PropTypes.number,
        barHeight: PropTypes.number,
        betweenSpace: PropTypes.number,
        barNumber: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        betweenSpace: 2,
        barNumber: 5,
        barWidth: 5,
        barHeight: 40
    };

    constructor(props) {
        super(props);
        var heights = [];
        for (let i = 0; i < this.props.barNumber; i++) {
            heights.push(new Animated.Value(this.props.barHeight));
        }

        this.state = {
            heights: heights
        };
        this._animation = this._animation.bind(this);
        this.timers = [];
    }


    render() {
        const {color, betweenSpace, barWidth, barHeight, barNumber} = this.props;
        return (
            <Surface width={barWidth*barNumber+betweenSpace*(barNumber-1)} height={barHeight}>
                {this.state.heights.map((item, i) => {
                    return <AnimatedBar key={i} fill={color} width={barWidth} height={this.state.heights[i]}
                                        x={i*(betweenSpace+barWidth)} y={barHeight/2}/>
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this.state.heights.forEach((item, i) => {
            const id = setTimeout(() => {
                this._animation(i);
            }, i * (1200 / this.props.barNumber));
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
            Animated.timing(this.state.heights[i], {toValue: 5, duration: 600}),
            Animated.timing(this.state.heights[i], {toValue: this.props.barHeight, duration: 600}),
        ]).start(() => {
            if (!this.unmounted) {
                this._animation(i);
            }
        });
    }
}