/**
 * Created by wangdi on 19/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, ART} from 'react-native';
const {Surface} = ART;
import Bar3 from '../shape/Bar3';
const AnimatedBar = Animated.createAnimatedComponent(Bar3);

export default class NineCubesLoader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            scales: [
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0),
                new Animated.Value(0)
            ]
        };
        this._animation = this._animation.bind(this);
    }

    static propTypes = {
        size: PropTypes.number,
        color: PropTypes.string
    };

    static defaultProps = {
        size: 20,
        color: '#1e90ff'
    };

    _renderCube(i, j, scaleID){
        const {size, color} = this.props;
        return (
            <AnimatedBar
                fill={color}
                width={size}
                height={size}
                x={(size/2)*(i*2+1)}
                y={(size/2)*(j*2+1)}
                scale={this.state.scales[scaleID]}
            />
        );
    }

    render(){
        const {size, color} = this.props;
        return (
            <Surface width={size*3} height={size*3}>
                {this._renderCube(0,0,2)}
                {this._renderCube(0,1,1)}
                {this._renderCube(0,2,0)}
                {this._renderCube(1,0,3)}
                {this._renderCube(1,1,2)}
                {this._renderCube(1,2,1)}
                {this._renderCube(2,0,4)}
                {this._renderCube(2,1,3)}
                {this._renderCube(2,2,2)}
            </Surface>
        );
    }

    componentDidMount(){
        this._animation();
    }

    componentWillUnmount(){
        this.unmounted = true;
    }

    _animation(){
        function seq(self, i) {
            return Animated.sequence([
                Animated.timing(self.state.scales[i], {toValue: 1, duration: 300, delay: (i+1)*100}),
                Animated.timing(self.state.scales[i], {toValue: 0, duration: 300, delay: 200})
            ])
        }

        Animated.parallel([
            seq(this,0),seq(this,1),seq(this,2),seq(this,3),seq(this,4),
        ]).start(()=>{
            if(!this.unmounted)
                this._animation();
        });
    }
}