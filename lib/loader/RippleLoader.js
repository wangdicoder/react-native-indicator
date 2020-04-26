import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Surface } from '@react-native-community/art';
import AnimatedCircle from '../animated/AnimatedCircle';
import { color } from '../const';

export default class RippleLoader extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    strokeWidth: PropTypes.number,
    frequency: PropTypes.number,
  };

  static defaultProps = {
    color,
    size: 40,
    strokeWidth: 3,
    frequency: 1600,
  };

  state = {
    scales: [new Animated.Value(0.1), new Animated.Value(0.1)],
    opacities: [new Animated.Value(1), new Animated.Value(1)],
  };
  timers = [];

  componentDidMount() {
    this.state.scales.forEach((item, i) => {
      const id = setTimeout(() => {
        this._animation(i);
      }, i * this.props.frequency * 0.75);
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
    const { frequency } = this.props;
    Animated.parallel([
      Animated.timing(this.state.scales[i], {
        toValue: 1,
        duration: frequency,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.opacities[i], {
        toValue: 0,
        duration: frequency,
        delay: frequency / 2,
        useNativeDriver: false,
      }),
    ]).start(() => {
      if (!this.unmounted) {
        this.state.scales[i].setValue(0.1);
        this.state.opacities[i].setValue(1);
        this._animation(i);
      }
    });
  };

  render() {
    const { color, size, strokeWidth } = this.props;
    const { scales, opacities } = this.state;
    return (
      <Surface width={size + strokeWidth} height={size + strokeWidth}>
        {scales.map((item, i) => (
          <AnimatedCircle
            key={i}
            radius={size}
            stroke={color}
            strokeWidth={strokeWidth}
            scale={scales[i]}
            opacity={opacities[i]}
            x={(size + strokeWidth) / 2}
            y={(size + strokeWidth) / 2}
          />
        ))}
      </Surface>
    );
  }
}
