# react-native-indicator

![npm](https://img.shields.io/npm/dw/react-native-indicator.svg) ![npm](https://img.shields.io/npm/v/react-native-indicator.svg)  [![npm](https://img.shields.io/npm/l/express.svg)](https://www.npmjs.com/package/react-native-indicator)

A useful indicator component for React Native

<img src="https://raw.githubusercontent.com/wangdicoder/react-native-indicator/master/screenshot/ss1.gif" width="372" height="666" />
<img src="https://raw.githubusercontent.com/wangdicoder/react-native-indicator/master/screenshot/ss2.gif" width="372" height="666" />
<img src="https://raw.githubusercontent.com/wangdicoder/react-native-indicator/master/screenshot/ss3.gif" width="372" height="666" />
<img src="https://raw.githubusercontent.com/wangdicoder/react-native-indicator/master/screenshot/ss4.gif" width="372" height="666" />

## Installation

Make sure that you are in your React Native project directory and run:
```
$ npm install react-native-indicator --save 
$ npm install @react-native-community/art --save
```

For react-native >= 0.60 ReactNativeART should be auto-linked and no additional action is required.

For react-native < 0.60 you need to link ReactNative ART:
```
$ react-native link @react-native-community/art
```

More info, following the [Art module](https://github.com/react-native-community/art) instruction to configure.

## Usage

Import react-native-indicator as a JavaScript module:
```
import { CirclesLoader, PulseLoader, TextLoader, DotsLoader, ... } from 'react-native-indicator';
```

Here is currently available types: 

- [PulseLoader](#PulseLoader)
- [DotsLoader](#DotsLoader)
- [TextLoader](#TextLoader)
- [BubblesLoader](#BubblesLoader)
- [CirclesLoader](#CirclesLoader)
- [BreathingLoader](#BreathingLoader)
- [RippleLoader](#RippleLoader)
- [LinesLoader](#LinesLoader)
- [MusicBarLoader](#MusicBarLoader)
- [EatBeanLoader](#EatBeanLoader)
- [DoubleCircleLoader](#DoubleCircleLoader)
- [RotationCircleLoader](#RotationCircleLoader)
- [RotationHoleLoader](#RotationHoleLoader)
- [CirclesRotationScaleLoader](#CirclesRotationScaleLoader)
- [NineCubesLoader](#NineCubesLoader)
- [LineDotsLoader](#LineDotsLoader)
- [ColorDotsLoader](#ColorDotsLoader)
- [OpacityDotsLoader](#OpacityDotsLoader)

```
render(){
  return(
    <View>
      <CirclesLoader />
      <TextLoader text="Loading" />
    </View>
  ); 
}
```

## Props

<a name="PulseLoader" />

##### PulseLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 30 | circle's size |
| color | string | '#1e90ff' | indicator's color |
| frequency | number | 1000 | scale's frequency |


<a name="DotsLoader" />

##### DotsLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 10 | dot's size |
| color | string | '#1e90ff' | indicator's color |
| betweenSpace | number | 5 | distance between two dots |


<a name="TextLoader" />

##### TextLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| text | string | 'Loading' | contents |
| textStyle | style | inherited | text's style |


<a name="BubblesLoader" />

##### BubblesLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 40 | circle's size |
| color | string | '#1e90ff' | indicator's color |
| dotRadius | number | 10 | each dot's size |


<a name="CirclesLoader" />

##### CirclesLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 40 | circle's size |
| color | string | '#1e90ff' | indicator's color |
| dotRadius | number | 8 | each dot's size |


<a name="BreathingLoader" />

##### BreathingLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 10 | circle's size |
| color | string | '#1e90ff' | indicator's color |
| strokeWidth | number | 3 | outline width |
| frequency | number | 800 | scale's frequency |


<a name="RippleLoader" />

##### RippleLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 10 | circle's size |
| frequency | number | 1600 | scale's frequency |
| color | string | '#1e90ff' | indicator's color |
| strokeWidth | number | 3 | outline width |


<a name="LinesLoader" />

##### LinesLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| color | string | '#1e90ff' | indicator's color |
| barWidth | number | 5 | each bar's width |
| barHeight | number | 40 | each bar's height |
| barNumber | number | 5 | the number of bar |
| betweenSpace | number | 2 | distance between two bars |


<a name="MusicBarLoader" />

##### MusicBarLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| color | string | '#1e90ff' | indicator's color |
| barWidth | number | 3 | each bar's width |
| barHeight | number | 30 | each bar's height |
| betweenSpace | number | 5 | distance between two bars |


<a name="EatBeanLoader" />

##### EatBeanLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| color | string | '#1e90ff' | indicator's color |
| size | number | 30 | indicator's size |


<a name="DoubleCircleLoader" />

##### DoubleCircleLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 30 | circle's size |
| color | string | '#1e90ff' | indicator's color |


<a name="RotationCircleLoader" />

##### RotationCircleLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 30 | indicator's size |
| color | string | '#1e90ff' | indicator's color |
| rotationSpeed | number | 800 | rotation speed |


<a name="RotationHoleLoader" />

##### RotationHoleLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 40 | indicator's size |
| color | string | '#1e90ff' | indicator's color |
| rotationSpeed | number | 800 | rotation speed |
| strokeWidth | number | 8 | circle outline's width |


<a name="CirclesRotationScaleLoader" />

##### CirclesRotationScaleLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 50 | indicator's size |
| color | string | '#1e90ff' | indicator's color |


<a name="NineCubesLoader" />

##### NineCubesLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 20 | each cube's size |
| color | string | '#1e90ff' | indicator's color |


<a name="LineDotsLoader" />

##### LineDotsLoader

**warning:** *this indicator will occupy a whole horizontal space automatically, which means you don't need to set any center props. Just keeping the direction of its parent View is vertical.*

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 10 | dot's size |
| color | string | '#1e90ff' | indicator's color |
| dotsNumber | number | 5 | the number of dots |
| betweenSpace | number | 5 | distance between two dots |


<a name="ColorDotsLoader" />

##### ColorDotsLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 15 | each cube's size |
| betweenSpace | number | 7 | distance between two dots |
| color1 | string | '#ff4500'(red) | 1st color |
| color2 | string | '#ffd700'(yellow) | 2nd color |
| color3 | string | '#9acd32'(green) | 3rd color |

##### OpacityDotsLoader

| prop | type | default | description |
| ---- | ---- | ---- | ---- |
| size | number | 10 | dot's size |
| color | string | '#1e90ff' | indicator's color |
| betweenSpace | number | 5 | distance between two dots |
| speed | number | 200 | change speed |

## License

MIT
