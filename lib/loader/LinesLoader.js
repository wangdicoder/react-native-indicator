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
            heights.push(new Animated.Value(this.props.barHeight/3));
        }

        this.state = {
            heights: heights
        };
        this._animation = this._animation.bind(this);
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
        this._animation();
    }

    componentWillUnmount() {
        this.unmounted = true;
    }

    _animation() {
        function seq(self, i) {
            return Animated.sequence([
                Animated.timing(self.state.heights[i], {toValue: self.props.barHeight, duration: 400, delay: i*200}),
                Animated.timing(self.state.heights[i], {toValue: self.props.barHeight/3, duration: 400})
            ])
        }
        let anim = [];
        for(let i=0; i<this.props.barNumber; i++)
            anim.push(seq(this,i));

        Animated.parallel(anim).start(() => {
            if (!this.unmounted) {
                this._animation();
            }
        });
    }
}