import React from 'react';
import PropTypes from 'prop-types';
import { Animated, ART } from 'react-native';
import AnimatedCircle from '../animated/AnimatedCircle';
import { color } from '../const';

const { Surface } = ART;

export default class PulseLoader extends React.PureComponent {
	static propTypes = {
		color: PropTypes.string,
		size: PropTypes.number,
		frequency: PropTypes.number
	};

	static defaultProps = {
		color,
		size: 30,
		frequency: 1000
	};

	state = {
		effect: new Animated.ValueXY({ x: 0, y: 1 })
	};

	componentDidMount() {
		this._animation();
	}

	componentWillUnmount() {
		this.unmounted = true;
	}

	_animation = () => {
		Animated.parallel([
			Animated.timing(this.state.effect.x, { toValue: 1, duration: this.props.frequency }),
			Animated.timing(this.state.effect.y, { toValue: 0.05, duration: this.props.frequency })
		]).start(() => {
			if (!this.unmounted) {
				this.state.effect.setValue({ x: 0, y: 1 });
				this._animation();
			}
		});
	};

	render() {
		const { color, size } = this.props;
		return (
			<Surface width={size} height={size}>
				<AnimatedCircle
					radius={size}
					fill={color}
					scale={this.state.effect.x}
					opacity={this.state.effect.y}
					x={size / 2}
					y={size / 2}
				/>
			</Surface>
		);
	}
}
