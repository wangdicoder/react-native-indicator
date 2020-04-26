import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Surface } from '@react-native-community/art';
import AnimatedCircle from '../animated/AnimatedCircle';
import { color } from '../const';

export default class CirclesLoader extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    dotRadius: PropTypes.number,
    size: PropTypes.number,
  };

  static defaultProps = {
    color,
    dotRadius: 8,
    size: 40,
  };

  state = {
    opacities: [
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
      new Animated.Value(1),
    ],
  };
  eachDegree = 360 / this.state.opacities.length;
  timers = [];

  componentDidMount() {
    this.state.opacities.forEach((item, i) => {
      const id = setTimeout(() => {
        this._animation(i);
      }, i * 150);
      this.timers.push(id);
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
    this.timers.forEach((id) => {
      clearTimeout(id);
    });
  }

  _animation = (i) => {
    Animated.sequence([
      Animated.timing(this.state.opacities[i], {
        toValue: 0.1,
        duration: 600,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacities[i], {
        toValue: 1,
        duration: 600,
        useNativeDriver: false,
      }),
    ]).start(() => {
      !this.unmounted && this._animation(i);
    });
  };

  render() {
    const { size, dotRadius, color } = this.props;
    const { opacities } = this.state;
    return (
      <Surface width={size + dotRadius} height={size + dotRadius}>
        {opacities.map((item, i) => {
          let radian = (i * this.eachDegree * Math.PI) / 180;
          let x = Math.round((size / 2) * Math.cos(radian)) + size / 2 + dotRadius / 2;
          let y = Math.round((size / 2) * Math.sin(radian)) + size / 2 + dotRadius / 2;
          return (
            <AnimatedCircle
              key={i}
              radius={dotRadius}
              fill={color}
              x={x}
              y={y}
              opacity={opacities[i]}
            />
          );
        })}
      </Surface>
    );
  }
}
