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
		rotationSpeed: PropTypes.number
	};

	static defaultProps = {
		size: 40,
		color,
		rotationSpeed: 800
	};

	state = {
		degree: new Animated.Value(0)
	};

	componentDidMount() {
		this._animation();
	}

	componentWillUnmount() {
		this.unmounted = true;
	}

	_animation = () => {
		Animated.sequence([
			Animated.timing(this.state.degree, {
				toValue: 360,
				duration: this.props.rotationSpeed,
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
						<AnimatedCircle fill={color} radius={size} x={size / 2} y={size / 2}/>
						<AnimatedCircle fill="#fff" radius={size / 4} x={size / 2} y={size / 8}/>
					</Group>
				</Surface>
			</Animated.View>
		);
	}
}
