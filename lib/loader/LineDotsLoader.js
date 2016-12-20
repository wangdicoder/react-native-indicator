/**
 * Created by wangdi on 20/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {ART, Animated, Dimensions} from 'react-native';
const {Surface} = ART;
import AnimatedCircle from '../animated/AnimatedCircle';

export default class LineDotsLoader extends Component {
    static propTypes = {
        color: PropTypes.string,
        size: PropTypes.number,
        dotsNumber: PropTypes.number,
        betweenSpace: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 10,
        dotsNumber: 5,
        betweenSpace: 5
    };

    constructor(props) {
        super(props);
        this.screenWidth = Dimensions.get('window').width;
        const {size, dotsNumber, betweenSpace} = this.props;
        const midX = this.screenWidth / 2 + (size * dotsNumber + betweenSpace * (dotsNumber - 1))/2 - size / 2;
        let circlesX = [];
        this.beginX = [];
        this.centerX = [];
        this.destX = [];
        for (let i = 0; i < dotsNumber; i++) {
            let beginX = -size / 2 - (size + betweenSpace) * i;
            circlesX.push(new Animated.Value(beginX));
            this.beginX.push(beginX);
            this.centerX.push(midX - i * (size + betweenSpace));
            this.destX.push(this.screenWidth + size / 2 + i * (size + betweenSpace));
        }

        this.state = {
            x: circlesX
        };

        this._animation = this._animation.bind(this);
    }

    render() {
        const {color, size} = this.props;
        return (
            <Surface width={this.screenWidth} height={size}>
                {this.state.x.map((item, i) => {
                    return <AnimatedCircle key={i} radius={size} fill={color} x={item} y={size/2}/>
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
        this.state.x.forEach((item, i) => {
            Animated.sequence([
                Animated.timing(this.state.x[i], {toValue: this.centerX[i], duration: 600, delay: i * 50}),
                Animated.timing(this.state.x[i], {toValue: this.centerX[i], duration: 600, delay: 300}),
                Animated.timing(this.state.x[i], {toValue: this.destX[i], duration: 600, delay: i * 50})
            ]).start(() => {
                if (i === this.props.dotsNumber - 1) {
                    for (let index in this.state.x) {
                        this.state.x[index].setValue(this.beginX[index]);
                    }
                    if (!this.unmounted)
                        this._animation();
                }
            });
        });
    }
}