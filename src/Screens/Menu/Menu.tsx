import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabConfig,
  FlashyTabConfig,
} from '@gorhom/animated-tabbar';

import Subjects from '../Subjects/Subjects';
import Profile from '../Profile/Profile';

import Animated from 'react-native-reanimated';
import Svg, {Path, PathProps, Circle, G, CircleProps} from 'react-native-svg';
import {MainTabsParams} from './types';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

const AnimatedPath = (Animated.createAnimatedComponent(
  Path,
) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, PathProps & {style?: any}>
>;

Animated.addWhitelistedNativeProps({
  stroke: true,
});

const AnimatedCircle = (Animated.createAnimatedComponent(
  Circle,
) as any) as React.ComponentClass<
  Animated.AnimateProps<{}, CircleProps & {style?: any}>
>;

const HomeSVG = ({color, size}: SVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <AnimatedPath
        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
        stroke={color}
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

const ProfileSVG = ({color, size}: SVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G
        transform="translate(4 3)"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round">
        <AnimatedPath
          d="M16 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2"
          stroke={color}
        />
        <AnimatedCircle cx={8} cy={4} r={4} stroke={color} />
      </G>
    </Svg>
  );
};

const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<BubbleTabConfig, MainTabsParams> = {
  Subjects: {
    labelStyle: {
      color: '#5B37B7',
    },
    icon: {
      component: HomeSVG,
      activeColor: 'rgba(91,55,183,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(223,215,243,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Profile: {
    labelStyle: {
      color: '#1194AA',
    },
    icon: {
      component: ProfileSVG,
      activeColor: 'rgba(17,148,170,1)',
      inactiveColor: 'rgba(0,0,0,1)',
    },
    background: {
      activeColor: 'rgba(207,235,239,1)',
      inactiveColor: 'rgba(207,235,239,0)',
    },
  },
};

const BubbleScreen = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <AnimatedTabBar iconSize={20} tabs={tabs} {...props} />
      )}>
      <Tab.Screen
        name="Subjects"
        initialParams={{
          backgroundColor: tabs.Subjects.labelStyle.color,
          nextScreen: 'Profile',
        }}
        component={Subjects}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{
          backgroundColor: tabs.Profile.labelStyle.color,
          nextScreen: 'Subjects',
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
};

export default BubbleScreen;
