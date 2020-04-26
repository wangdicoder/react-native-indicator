import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Surface } from '@react-native-community/art';
import Bar3 from '../shape/Bar3';
import { color } from '../const';

const AnimatedBar = Animated.createAnimatedComponent(Bar3);

export default class NineCubesLoader extends React.PureComponent {
  state = {
    scales: [
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
      new Animated.Value(0),
    ],
  };

  static propTypes = {
    size: PropTypes.number,
    color: PropTypes.string,
  };

  static defaultProps = {
    size: 20,
    color,
  };

  _renderCube(i, j, scaleID) {
    const { size, color } = this.props;
    return (
      <AnimatedBar
        fill={color}
        width={size}
        height={size}
        x={(size / 2) * (i * 2 + 1)}
        y={(size / 2) * (j * 2 + 1)}
        scale={this.state.scales[scaleID]}
      />
    );
  }

  render() {
    const { size, color } = this.props;
    return (
      <Surface width={size * 3} height={size * 3}>
        {this._renderCube(0, 0, 2)}
        {this._renderCube(0, 1, 1)}
        {this._renderCube(0, 2, 0)}
        {this._renderCube(1, 0, 3)}
        {this._renderCube(1, 1, 2)}
        {this._renderCube(1, 2, 1)}
        {this._renderCube(2, 0, 4)}
        {this._renderCube(2, 1, 3)}
        {this._renderCube(2, 2, 2)}
      </Surface>
    );
  }

  componentDidMount() {
    this._animation();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _animation = () => {
    function seq(self, i) {
      return Animated.sequence([
        Animated.timing(self.state.scales[i], {
          toValue: 1,
          duration: 300,
          delay: (i + 1) * 100,
          useNativeDriver: false,
        }),
        Animated.timing(self.state.scales[i], {
          toValue: 0,
          duration: 300,
          delay: 200,
          useNativeDriver: false,
        }),
      ]);
    }

    Animated.parallel([seq(this, 0), seq(this, 1), seq(this, 2), seq(this, 3), seq(this, 4)]).start(
      () => {
        !this.unmounted && this._animation();
      },
    );
  };
}
