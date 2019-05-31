import React from 'react';
import PropTypes from 'prop-types';
import { Animated, ART } from 'react-native';
import AnimatedCircle from '../animated/AnimatedCircle';
import { color } from '../const';

const { Surface } = ART;

export default class RippleLoader extends React.PureComponent {
	static propTypes = {
		color: PropTypes.string,
		size: PropTypes.number,
		strokeWidth: PropTypes.number
	};

	static defaultProps = {
		color,
		size: 40,
		strokeWidth: 3
	};

	state = {
		scales: [new Animated.Value(0.1), new Animated.Value(0.1)],
		opacities: [new Animated.Value(1), new Animated.Value(1)]
	};
	timers = [];

	componentDidMount() {
		this.state.scales.forEach((item, i) => {
			const id = setTimeout(() => {
				this._animation(i)
			}, i * 1200);
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
		Animated.parallel([
			Animated.timing(this.state.scales[i], { toValue: 1, duration: 1600 }),
			Animated.timing(this.state.opacities[i], { toValue: 0, duration: 1600, delay: 800 })
		]).start(() => {
			if (!this.unmounted) {
				this.state.scales[i].setValue(0.1);
				this.state.opacities[i].setValue(1);
				this._animation(i);
			}
		});
	};

	render() {
		const { color, size, strokeWidth } = this.props;
		const { scales, opacities } = this.state;
		return (
			<Surface width={size + strokeWidth} height={size + strokeWidth}>
				{scales.map((item, i) => (
					<AnimatedCircle
						key={i}
						radius={size}
						stroke={color}
						strokeWidth={strokeWidth}
						scale={scales[i]}
						opacity={opacities[i]}
						x={(size + strokeWidth) / 2}
						y={(size + strokeWidth) / 2}
					/>
				))}
			</Surface>
		);
	}
}
