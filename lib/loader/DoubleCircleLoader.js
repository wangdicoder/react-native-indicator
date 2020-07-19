import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Surface } from '@react-native-community/art';
import AnimatedCircle from '../animated/AnimatedCircle';
import { color } from '../const';

export default class DoubleCircleLoader extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
  };

  static defaultProps = {
    color,
    size: 30,
  };

  state = {
    scales: [new Animated.Value(0), new Animated.Value(0)],
  };
  timers = [];

  componentDidMount() {
    this.state.scales.forEach((item, i) => {
      const id = setTimeout(() => {
        this._animation(i);
      }, i * 1000);
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
      Animated.timing(this.state.scales[i], { toValue: 1, duration: 1000, useNativeDriver: false }),
      Animated.timing(this.state.scales[i], { toValue: 0, duration: 1000, useNativeDriver: false }),
    ]).start(() => {
      !this.unmounted && this._animation(i);
    });
  };

  render() {
    const { color, size } = this.props;
    const { scales } = this.state;
    return (
      <Surface width={size} height={size}>
        <AnimatedCircle
          radius={size}
          fill={color}
          opacity={0.5}
          scale={scales[0]}
          x={size / 2}
          y={size / 2}
        />
        <AnimatedCircle
          radius={size}
          fill={color}
          opacity={0.5}
          scale={scales[1]}
          x={size / 2}
          y={size / 2}
        />
      </Surface>
    );
  }
}
