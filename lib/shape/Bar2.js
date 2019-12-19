/**
 * The scale center of this bar is bottom-center
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Shape, Path } from '@react-native-community/art';

export default class Bar2 extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  render() {
    const { width, height } = this.props;

    const path = Path()
      .moveTo(0, 0)
      .lineTo(0, -height)
      .lineTo(width, -height)
      .lineTo(width, 0)
      .close();

    return <Shape {...this.props} d={path} />;
  }
}
