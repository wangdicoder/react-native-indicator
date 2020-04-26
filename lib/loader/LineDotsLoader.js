import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions } from 'react-native';
import { Surface } from '@react-native-community/art';
import AnimatedCircle from '../animated/AnimatedCircle';
import { color } from '../const';

export default class LineDotsLoader extends React.PureComponent {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.number,
    dotsNumber: PropTypes.number,
    betweenSpace: PropTypes.number,
  };

  static defaultProps = {
    color,
    size: 10,
    dotsNumber: 5,
    betweenSpace: 5,
  };

  constructor(props) {
    super(props);
    this.screenWidth = Dimensions.get('window').width;
    const { size, dotsNumber, betweenSpace } = this.props;
    const midX =
      this.screenWidth / 2 + (size * dotsNumber + betweenSpace * (dotsNumber - 1)) / 2 - size / 2;
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
      x: circlesX,
    };
  }

  render() {
    const { color, size } = this.props;
    return (
      <Surface width={this.screenWidth} height={size}>
        {this.state.x.map((item, i) => (
          <AnimatedCircle key={i} radius={size} fill={color} x={item} y={size / 2} />
        ))}
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
    this.state.x.forEach((item, i) => {
      Animated.sequence([
        Animated.timing(this.state.x[i], {
          toValue: this.centerX[i],
          duration: 600,
          delay: i * 50,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.x[i], {
          toValue: this.centerX[i],
          duration: 600,
          delay: 300,
          useNativeDriver: false,
        }),
        Animated.timing(this.state.x[i], {
          toValue: this.destX[i],
          duration: 600,
          delay: i * 50,
          useNativeDriver: false,
        }),
      ]).start(() => {
        if (i === this.props.dotsNumber - 1) {
          for (let idx in this.state.x) {
            this.state.x[idx].setValue(this.beginX[idx]);
          }
          !this.unmounted && this._animation();
        }
      });
    });
  };
}
