/**
 * The scale center of this bar is center
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Shape, Path } from '@react-native-community/art';

export default class Bar3 extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  };

  render() {
    const { width, height } = this.props;

    const path = Path()
      .moveTo(width / 2, height / 2)
      .lineTo(-width / 2, height / 2)
      .lineTo(-width / 2, -height / 2)
      .lineTo(width / 2, -height / 2)
      .close();

    return <Shape {...this.props} d={path} />;
  }
}
