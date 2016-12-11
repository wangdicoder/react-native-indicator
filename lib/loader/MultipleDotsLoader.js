/**
 * Created by wangdi on 11/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART, Easing} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';

export default class MultipleDotsLoader extends Component{
    static propTypes = {
        color: PropTypes.string,
        dotRadius: PropTypes.number,
        size: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        dotRadius: 10,
        size: 40
    };

    constructor(props){
        super(props);
        this.state = {
            scales: [
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1),
                new Animated.Value(1)
            ]
        };
        this.eachDegree = 360/this.state.scales.length;
        this._animation = this._animation.bind(this);
    }

    render(){
        const {size, dotRadius, color} = this.props;
        return(
            <Surface width={size+dotRadius} height={size+dotRadius}>
                {this.state.scales.map((item, i)=>{
                    let radian = (i*this.eachDegree)*Math.PI/180;
                    let x = Math.round(size/2 * Math.cos(radian))+size/2+dotRadius/2;
                    let y = Math.round(size/2 * Math.sin(radian))+size/2+dotRadius/2;
                    return <AnimatedCircle key={i} radius={dotRadius} fill={color} x={x} y={y} scale={this.state.scales[i]}/>
                })}
            </Surface>
        );
    }

    componentDidMount(){
        this.state.scales.forEach((item, i) => {
            setTimeout(()=>{this._animation(i)}, i*100);
        });
    }

    componentWillUnmount(){
        this.unmounted = true;
    }

    _animation(i){
        Animated.sequence([
            Animated.timing(this.state.scales[i], {toValue: 0.3, duration: 400, easing: Easing.bezier(.2,.68,.18,1.08)}),
            Animated.timing(this.state.scales[i], {toValue: 1, duration: 400, easing: Easing.bezier(.2,.68,.18,1.08)})
        ]).start(()=>{
            if(!this.unmounted)
                this._animation(i);
        });
    }
}