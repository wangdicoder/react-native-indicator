import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Surface, Shape } from '@react-native-community/art';
import AnimatedCircle from '../animated/AnimatedCircle';
import { color } from '../const';

export default class EatBeanLoader extends React.PureComponent {
  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
  };

  static defaultProps = {
    size: 30,
    color,
  };

  state = {
    dotsY: [
      new Animated.Value(this.props.size * 2.2),
      new Animated.Value(this.props.size * 2.2),
      new Animated.Value(this.props.size * 2.2),
      new Animated.Value(this.props.size * 2.2),
    ],
  };
  timers = [];

  componentDidMount() {
    this.state.dotsY.forEach((item, i) => {
      const id = setTimeout(() => {
        this._animation(i);
      }, i * 300);
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
    Animated.timing(this.state.dotsY[i], {
      toValue: this.props.size / 2,
      duration: 1200,
      useNativeDriver: false,
    }).start(() => {
      if (!this.unmounted) {
        this.state.dotsY[i].setValue(this.props.size * 2.2);
        this._animation(i);
      }
    });
  };

  render() {
    const { size, color } = this.props;

    const sinValue = Math.sqrt(2) / 2;
    const x = Math.floor((size / 2) * sinValue) + size / 2;
    const startY = Math.floor((size / 2) * sinValue) + size / 2;
    const endY = size / 2 - Math.floor((size / 2) * sinValue);
    const d = `M${x} ${startY} A ${size / 2} ${size / 2}, 0, 1, 1, ${x} ${endY} L ${size /
      2} ${size / 2} Z`;
    return (
      <Surface width={size * 2} height={size}>
        <Shape d={d} fill={color} x={size / 5} />
        {this.state.dotsY.map((item, i) => (
          <AnimatedCircle key={i} radius={size / 5} fill={color} x={item} y={size / 2} />
        ))}
      </Surface>
    );
  }
}
