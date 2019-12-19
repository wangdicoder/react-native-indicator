import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';

export default class TextLoader extends React.PureComponent {
  static propTypes = {
    text: PropTypes.string,
    textStyle: Text.propTypes.style,
  };

  static defaultProps = {
    text: 'Loading',
  };

  state = {
    opacities: [0, 0, 0],
  };
  patterns = [[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, 1]];
  timers = [];

  componentDidMount() {
    this._animation(1);
  }

  componentWillUnmount() {
    this.unmounted = true;
    this.timers.forEach((id) => {
      clearTimeout(id);
    });
  }

  _animation = (index) => {
    if (!this.unmounted) {
      const id = setTimeout(() => {
        this.setState({ opacities: this.patterns[index] });
        index++;
        if (index >= this.patterns.length) index = 0;
        this._animation(index);
      }, 500);
      this.timers.push(id);
    }
  };

  render() {
    const { text, textStyle } = this.props;
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text style={textStyle}>{text}</Text>
        {this.state.opacities.map((item, i) => (
          <Text key={i} style={[{ opacity: item }, textStyle]}>
            .
          </Text>
        ))}
      </View>
    );
  }
}
