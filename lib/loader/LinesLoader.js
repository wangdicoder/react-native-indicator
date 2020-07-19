import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Surface } from '@react-native-community/art';
import AnimatedBar from '../animated/AnimatedBar';
import { color } from '../const';

export default class LinesLoader extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    barWidth: PropTypes.number,
    barHeight: PropTypes.number,
    betweenSpace: PropTypes.number,
    barNumber: PropTypes.number,
  };

  static defaultProps = {
    color,
    betweenSpace: 2,
    barNumber: 5,
    barWidth: 5,
    barHeight: 40,
  };

  constructor(props) {
    super(props);
    const heights = [];
    for (let i = 0; i < this.props.barNumber; i++) {
      heights.push(new Animated.Value(this.props.barHeight / 3));
    }

    this.state = {
      heights,
    };
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
        Animated.timing(self.state.heights[i], {
          toValue: self.props.barHeight,
          duration: 400,
          delay: i * 200,
          useNativeDriver: false,
        }),
        Animated.timing(self.state.heights[i], {
          toValue: self.props.barHeight / 3,
          duration: 400,
          useNativeDriver: false,
        }),
      ]);
    }

    const anim = [];
    for (let i = 0; i < this.props.barNumber; i++) anim.push(seq(this, i));

    Animated.parallel(anim).start(() => {
      !this.unmounted && this._animation();
    });
  };

  render() {
    const { color, betweenSpace, barWidth, barHeight, barNumber } = this.props;
    return (
      <Surface width={barWidth * barNumber + betweenSpace * (barNumber - 1)} height={barHeight}>
        {this.state.heights.map((item, i) => (
          <AnimatedBar
            key={i}
            fill={color}
            width={barWidth}
            height={this.state.heights[i]}
            x={i * (betweenSpace + barWidth)}
            y={barHeight / 2}
          />
        ))}
      </Surface>
    );
  }
}
