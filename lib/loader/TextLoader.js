/**
 * Created by wangdi on 10/12/16.
 */
'use strict';

import React, {Component, PropTypes} from 'react';
import {Animated, Text, View} from 'react-native';

export default class CircleLoader extends Component{
    static propTypes = {
        text: PropTypes.string.isRequired,
        color: PropTypes.string,
        size: PropTypes.number
    };

    static defaultProps = {
        color: '#1e90ff',
        size: 14
    };

    constructor(props){
        super(props);
        this.state = {
            opacities: [0, 0, 0]
        };
        this._animation = this._animation.bind(this);
        this.patterns = [[0,0,0],[1,0,0],[1,1,0],[1,1,1]]
    }

    render(){
        const {text, color, size} = this.props;
        return(
            <View style={{flexDirection: 'row'}}>
                <Text style={{fontSize: size, color: color}}>{text}</Text>
                {this.state.opacities.map((item, i)=>{
                    return <Text key={i} style={{opacity: item, fontSize: size, color: color}}>.</Text>
                })}
            </View>
        );
    }

    componentDidMount(){
        this._animation(1);
    }

    componentWillUnmount(){
        this.unmounted = true;
    }

    _animation(index){
        if(!this.unmounted){
            setTimeout(()=>{
                this.setState({opacities: this.patterns[index]});
                index++;
                if(index >= this.patterns.length)
                    index = 0;
                this._animation(index);
            }, 500);
        }
    }
}