import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Surface } from '@react-native-community/art';
import AnimatedCircle from '../animated/AnimatedCircle';
import { color } from '../const';

export default class BreathingLoader extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    strokeWidth: PropTypes.number,
    frequency: PropTypes.number,
  };

  static defaultProps = {
    color,
    size: 30,
    strokeWidth: 3,
    frequency: 800,
  };

  constructor(props) {
    super(props);
    this.state = {
      scale: new Animated.Value(0.1),
    };
  }

  componentDidMount() {
    this._animation();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _animation = () => {
    Animated.sequence([
      Animated.timing(this.state.scale, {
        toValue: 1,
        duration: this.props.frequency,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.scale, {
        toValue: 0.1,
        duration: this.props.frequency,
        useNativeDriver: false,
      }),
    ]).start(() => {
      !this.unmounted && this._animation();
    });
  };

  render() {
    const { color, size, strokeWidth } = this.props;
    return (
      <Surface width={size + strokeWidth} height={size + strokeWidth}>
        <AnimatedCircle
          radius={size}
          stroke={color}
          strokeWidth={strokeWidth}
          scale={this.state.scale}
          x={(size + strokeWidth) / 2}
          y={(size + strokeWidth) / 2}
        />
      </Surface>
    );
  }
}
