import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { Surface } from '@react-native-community/art';
import Bar from '../shape/Bar2';
import { color } from '../const';

const AnimatedBar = Animated.createAnimatedComponent(Bar);

export default class LinesLoader extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    barWidth: PropTypes.number,
    barHeight: PropTypes.number,
    betweenSpace: PropTypes.number,
  };

  static defaultProps = {
    color,
    betweenSpace: 5,
    barWidth: 3,
    barHeight: 30,
  };

  constructor(props) {
    super(props);
    this.fixedMaxValue = [
      this.props.barHeight * 0.8,
      this.props.barHeight * 0.4,
      this.props.barHeight,
      this.props.barHeight * 0.2,
    ];
    this.fixedMinValue = [
      this.props.barHeight * 0.3,
      this.props.barHeight,
      this.props.barHeight * 0.5,
      this.props.barHeight * 0.8,
    ];

    this.state = {
      heights: [
        new Animated.Value(this.fixedMinValue[0]),
        new Animated.Value(this.fixedMinValue[1]),
        new Animated.Value(this.fixedMinValue[2]),
        new Animated.Value(this.fixedMinValue[3]),
      ],
    };
  }

  componentDidMount() {
    this.state.heights.forEach((item, i) => {
      this._animation(i);
    });
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  _animation = (i) => {
    Animated.sequence([
      Animated.timing(this.state.heights[i], {
        toValue: this.fixedMaxValue[i],
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.heights[i], {
        toValue: this.fixedMinValue[i],
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      !this.unmounted && this._animation(i);
    });
  };

  render() {
    const { color, betweenSpace, barWidth, barHeight, barNumber } = this.props;
    return (
      <Surface width={barWidth * 4 + betweenSpace * 3} height={barHeight}>
        {this.state.heights.map((item, i) => {
          return (
            <AnimatedBar
              key={i}
              fill={color}
              width={barWidth}
              height={this.state.heights[i]}
              x={i * (betweenSpace + barWidth)}
              y={barHeight}
            />
          );
        })}
      </Surface>
    );
  }
}
