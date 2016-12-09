/**
 * Created by wangdi on 8/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART, Easing} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';

export default class PulseLoader extends Component{
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 10
    };

    constructor(props){
        super(props);
        this.state = {
            scales: [new Animated.Value(1), new Animated.Value(1), new Animated.Value(1)]
        };
        this._animation = this._animation.bind(this);
    }

    _renderCircle(i){
        const {color, size} = this.props;
        return(
            <AnimatedCircle radius={size} fill={color} x={size + i * (size+5)} y={size} scale={this.state.scales[i]}/>
        );
    }

    render(){
        const {size} = this.props;
        return(
            <Surface width={size*3 + (size+5)*2} height={size*2}>
                {this._renderCircle(0)}
                {this._renderCircle(1)}
                {this._renderCircle(2)}
            </Surface>
        );
    }

    componentDidMount(){
        this.state.scales.forEach((item, i) => {
            setTimeout(()=>{this._animation(i)}, i*200);
        });
    }

    componentWillUnmount(){
        this.unmounted = true;
    }

    _animation(i){
        Animated.sequence([
            Animated.timing(this.state.scales[i], {toValue: 0.1, duration: 400, easing: Easing.bezier(.2,.68,.18,1.08)}),
            Animated.timing(this.state.scales[i], {toValue: 1, duration: 400, easing: Easing.bezier(.2,.68,.18,1.08)})
        ]).start(()=>{
            if(!this.unmounted)
                this._animation(i);
        });
    }
}