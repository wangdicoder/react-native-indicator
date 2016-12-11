# react-native-indicator

A useful indicator component for React Native

## Installation

Make sure that you are in your React Native project directory and run:
```
$ npm install react-native-indicator --save 
```

## Usage

Import react-native-indicator as a JavaScript module:
```
import {CircleLoader, PulseLoader, TextLoader} from 'react-native-indicator';
```

## Props

##### CircleLoader

| prop | type | default | isRequired | description |
| ---- | ---- | ---- | ---- | ---- |
| size | number | 10 | no | circle's size |
| color | string | '#1e90ff' | no | the indicator's color |


##### PulseLoader

| prop | type | default | isRequired | description |
| ---- | ---- | ---- | ---- | ---- |
| size | number | 10 | no | circle's size |
| color | string | '#1e90ff' | no | the indicator's color |
| betweenSpace | number | 5 | no | the distance between two dots |


##### TextLoader

| prop | type | default | isRequired | description |
| ---- | ---- | ---- | ---- | ---- |
| **text** | string | none | **yes** | contents |
| textStyle | style | inherited | no | text's style |


##### MultipleDotsLoader

| prop | type | default | isRequired | description |
| ---- | ---- | ---- | ---- | ---- |
| size | number | 40 | no | circle's size |
| color | string | '#1e90ff' | no | the indicator's color |
| dotRadius | number | 10| no | each dot's size |