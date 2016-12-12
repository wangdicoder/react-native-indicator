/**
 * Created by wangdi on 10/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART} from 'react-native';
import Bar from '../shape/Bar2';
const AnimatedBar = Animated.createAnimatedComponent(Bar);
const {Surface} = ART;

export default class LinesLoader extends Component {
    static propTypes = {
        color: PropTypes.string,
        barWidth: PropTypes.number,
        barHeight: PropTypes.number,
        betweenSpace: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        betweenSpace: 5,
        barWidth: 3,
        barHeight: 30
    };

    constructor(props) {
        super(props);
        this.fixedMaxValue = [
            this.props.barHeight * 0.8,
            this.props.barHeight * 0.4,
            this.props.barHeight,
            this.props.barHeight * 0.2,
        ];
        this.fixedMinValue = [
            this.props.barHeight * 0.3,
            this.props.barHeight,
            this.props.barHeight * 0.5,
            this.props.barHeight * 0.8,
        ];

        this.state = {
            heights: [
                new Animated.Value(this.fixedMinValue[0]),
                new Animated.Value(this.fixedMinValue[1]),
                new Animated.Value(this.fixedMinValue[2]),
                new Animated.Value(this.fixedMinValue[3])
            ]
        };
        this._animation = this._animation.bind(this);
    }


    render() {
        const {color, betweenSpace, barWidth, barHeight, barNumber} = this.props;
        return (
            <Surface width={barWidth*4+betweenSpace*3} height={barHeight}>
                {this.state.heights.map((item, i) => {
                    return <AnimatedBar key={i} fill={color} width={barWidth} height={this.state.heights[i]}
                                        x={i*(betweenSpace+barWidth)} y={barHeight}/>
                })}
            </Surface>
        );
    }

    componentDidMount() {
        this.state.heights.forEach((item, i) => {
            this._animation(i);
        });
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation(i) {
        Animated.sequence([
            Animated.timing(this.state.heights[i], {toValue: this.fixedMaxValue[i], duration: 500}),
            Animated.timing(this.state.heights[i], {toValue: this.fixedMinValue[i], duration: 500}),
        ]).start(() => {
            if (!this.unmounted) {
                this._animation(i);
            }
        });
    }
}