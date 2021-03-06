import React, {Component} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Animated, {Easing} from 'react-native-reanimated';
import {TapGestureHandler, State} from 'react-native-gesture-handler';
import Svg, {Image, Circle, ClipPath} from 'react-native-svg';
import {connect} from 'react-redux';
import Modal from 'react-native-modal';
import {Button} from '@ui-kitten/components';
import AsyncStorage from '@react-native-community/async-storage';
import {Spinner} from '@ui-kitten/components';

const {width, height} = Dimensions.get('window');
const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat,
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 2500,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position,
  ]);
}
class Login extends Component {
  state = {
    email: '',
    password: '',
  };

  handleEmail = (text) => {
    this.setState({email: text});
  };
  handlePassword = (text) => {
    this.setState({password: text});
  };
  login = (email, pass) => {
    alert('email: ' + email + ' password: ' + pass);
  };
  constructor() {
    super();
    this.state = {
      showModal: false,
      showSpinner: false,
      eroor: '',
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleOpenSpinner = this.handleOpenSpinner.bind(this);
    this.handleCloseSpinner = this.handleCloseSpinner.bind(this);

    this.buttonOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 1, 0)),
            ),
          ]),
      },
    ]);

    this.onCloseState = event([
      {
        nativeEvent: ({state}) =>
          block([
            cond(
              eq(state, State.END),
              set(this.buttonOpacity, runTiming(new Clock(), 0, 1)),
            ),
          ]),
      },
    ]);

    this.buttonY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP,
    });

    this.bgY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [-height / 3, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputZindex = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, -1],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputY = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 100],
      extrapolate: Extrapolate.CLAMP,
    });
    this.textInputOpacity = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    this.rotateCross = interpolate(this.buttonOpacity, {
      inputRange: [0, 1],
      outputRange: [0, 720],
      extrapolate: Extrapolate.CLAMP,
    });
  }
  updateUser(e) {
    this.props.dispatch({
      type: 'LOGIN_USER',
      payload: e.target.value,
    });
  }
  handleOpenModal() {
    this.setState({showModal: true});
  }

  handleCloseModal() {
    const something = this.props.something;

    this.setState({showModal: false});
  }
  handleOpenSpinner() {
    this.setState({showModal: true});
  }

  handleCloseSpinner() {
    this.setState({showModal: false});
  }
  render() {
    const {navigation} = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#41a95e',
          justifyContent: 'flex-end',
        }}>
        <View>
          <Modal
            isVisible={this.state.showModal}
            deviceWidth={width}
            deviceHeight={height}
            backdropColor="grey"
            backdropOpacity={0.9}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}>
            <View style={styles.modalSpinner}>
              <Button
                status="danger"
                style={styles.closemodal}
                onPress={this.handleCloseModal}
                appearance="filled">
                X
              </Button>

              <Text style={styles.modalText}>{this.state.eroor}</Text>
            </View>
          </Modal>
          <Modal
            isVisible={this.state.showSpinner}
            deviceWidth={width}
            deviceHeight={height}
            backdropColor="grey"
            backdropOpacity={0.9}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={600}
            animationOutTiming={600}
            backdropTransitionInTiming={600}
            backdropTransitionOutTiming={600}>
            <View style={styles.modalSpinner}>
              <Text style={styles.modalSpinnerText}>
                Logging in...
                <Spinner size="medium" status="success" />
              </Text>
            </View>
          </Modal>
        </View>

        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            transform: [{translateY: this.bgY}],
          }}>
          <Svg height={height + 160} width={width}>
            <ClipPath id="clip">
              <Circle r={height + 100} cx={width / 2} />
            </ClipPath>
            <Image
              href={{
                uri:
                  'https://www.fonewalls.com/wp-content/uploads/Material-Background-HD-Wallpaper-239.jpg',
              }}
              height={height + 100}
              width={width}
              preserveAspectRatio="xMidYmid slice"
              clipPath="url(#clip)"
            />
          </Svg>
        </Animated.View>
        <View style={{height: height / 3, justifyContent: 'center'}}>
          <TapGestureHandler onHandlerStateChange={this.onStateChange}>
            <Animated.View
              style={{
                ...styles.button,
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}],
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                SIGN IN
              </Text>
            </Animated.View>
          </TapGestureHandler>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Animated.View
              style={{
                ...styles.button,
                backgroundColor: '#2E71DC',
                opacity: this.buttonOpacity,
                transform: [{translateY: this.buttonY}],
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                REGISTER
              </Text>
            </Animated.View>
          </TouchableOpacity>
          <Animated.View
            style={{
              zIndex: this.textInputZindex,
              opacity: this.textInputOpacity,
              transform: [{translateY: this.textInputY}],
              height: height / 3,
              ...StyleSheet.absoluteFill,
              top: null,
              justifyContent: 'center',
            }}>
            <TapGestureHandler onHandlerStateChange={this.onCloseState}>
              <Animated.View style={styles.closeButton}>
                <Animated.Text
                  style={{
                    color: 'white',
                    fontSize: 25,
                    fontWeight: 'bold',
                    transform: [{rotate: concat(this.rotateCross)}],
                  }}>
                  X
                </Animated.Text>
              </Animated.View>
            </TapGestureHandler>

            <TextInput
              placeholder="EMAIL"
              style={styles.textInput}
              placeholderTextColor="black"
              onChangeText={this.handleEmail}
            />
            <TextInput
              placeholder="PASSWORD"
              style={styles.textInput}
              placeholderTextColor="black"
              onChangeText={this.handlePassword}
            />
            <TouchableOpacity
              onPress={() => {
                if (this.state.email && this.state.password !== '') {
                  this.props.sendData({data: this.state, navigation});
                  if (this.props.something.token === "password doesn't match") {
                    this.setState({eroor: "Password Doesn't Match!"});
                    this.setState({showModal: true});
                  } else if (
                    this.props.something.token === 'User does not exist'
                  ) {
                    this.setState({eroor: "User Doesn't Exist!"});
                    this.setState({showModal: true});
                  } else {
                    this.setState({showSpinner: true});
                    setTimeout(() => {
                      this.setState({showSpinner: false});
                    }, 500);
                  }
                } else {
                  this.setState({eroor: 'Please Fill Up All The Fields!'});
                  this.setState({showModal: true});
                }
              }}>
              <Animated.View style={styles.button}>
                <Text
                  style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
                  SIGN IN
                </Text>
              </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    );
  }
}

// map state
function mapStateToProps(state) {
  return {
    something: state.appState,
  };
}

// map dispatch
function mapDispatchToProps(dispatch) {
  return {
    sendData: (data) => {
      axios
        .post('https://quizolympiadserver.herokuapp.com/login', {
          username: data.data.email,
          password: data.data.password,
        })
        .then((response) => {
          const token = response.data;
          if (token === 'User does not exist') {
            dispatch({type: 'LOGIN_USER', payload: token});
          } else if (token === "password doesn't match") {
            dispatch({type: 'LOGIN_USER', payload: token});
          } else {
            const jsonValue = JSON.stringify('storage data');
            AsyncStorage.setItem('@my_token_secret', token);
            data.navigation.navigate('Menu');
            dispatch({type: 'LOGIN_USER', payload: token});
          }
        })
        .catch((err) => {
          console.log(err, 'err');
        });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'black',

    height: 70,
    marginHorizontal: 20,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'black',
  },
  closeButton: {
    height: 40,
    width: 40,
    borderRadius: 20,

    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -50,
    left: width / 2 - 20,
  },
  textInput: {
    height: 50,
    borderRadius: 25,
    borderWidth: 0.5,
    marginHorizontal: 20,
    paddingLeft: 10,
    marginVertical: 5,
    borderColor: 'rgb(0,0,0.2)',
  },
  modal: {
    width: 300,
    height: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  modalSpinner: {
    width: 200,
    height: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  modalText: {
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    fontSize: 15,
    color: 'red',
  },
  modalSpinnerText: {
    fontFamily: 'Gilroy-Regular',
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },

  closemodal: {
    borderRadius: 30,
    bottom: 25,
    left: 270,
    width: 50,
    top: -55,
  },
});
