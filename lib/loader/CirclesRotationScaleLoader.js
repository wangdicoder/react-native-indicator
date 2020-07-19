import React from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';
import { Surface, Group } from '@react-native-community/art';
import AnimatedCircle from '../animated/AnimatedCircle';
import { color } from '../const';

export default class RotationCircleLoader extends React.PureComponent {
	static propTypes = {
		size: PropTypes.number,
		color: PropTypes.string,
	};

	static defaultProps = {
		size: 50,
		color,
	};

	state = {
		degree: new Animated.Value(0),
		scales: [new Animated.Value(0), new Animated.Value(0)]
	};
	timers = [];

	componentDidMount() {
		this._animation();
		this.state.scales.forEach((item, i) => {
			const id = setTimeout(() => {
				this._animationCircles(i)
			}, i * 500);
			this.timers.push(id);
		});

	}

	componentWillUnmount() {
		this.unmounted = true;
		this.timers.forEach((id) => {
			clearTimeout(id);
		});
	}

	_animation = () => {
		Animated.sequence([
			Animated.timing(this.state.degree, {
				toValue: 360,
				duration: 2000,
				easing: Easing.linear,
				useNativeDriver: false
			})
		]).start(() => {
			if (!this.unmounted) {
				this.state.degree.setValue(0);
				this._animation();
			}
		});
	};

	_animationCircles = (i) => {
		Animated.sequence([
			Animated.timing(this.state.scales[i], { toValue: 1, duration: 1000, useNativeDriver: false }),
			Animated.timing(this.state.scales[i], {
				toValue: 0.05,
				duration: 1000,
				useNativeDriver: false
			}),
		]).start(() => {
			!this.unmounted && this._animationCircles(i);
		});
	};

	render() {
		const { size, color } = this.props;
		const degree = this.state.degree.interpolate({
			inputRange: [0, 360],
			outputRange: ['0deg', '360deg']
		});
		return (
			<Animated.View
				style={{
					transform: [{ rotate: degree }],
					backgroundColor: 'rgba(0,0,0,0)',
					width: size,
					height: size
				}}>
				<Surface width={size} height={size}>
					<Group>
						<AnimatedCircle
							fill={color}
							radius={size / 2}
							x={size / 2}
							y={size / 4}
							scale={this.state.scales[0]}
						/>
						<AnimatedCircle
							fill={color}
							radius={size / 2}
							x={size / 2}
							y={size / 4 * 3}
							scale={this.state.scales[1]}
						/>
					</Group>
				</Surface>
			</Animated.View>
		);
	}
}
