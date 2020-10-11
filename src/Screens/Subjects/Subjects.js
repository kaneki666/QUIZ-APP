import React, {useState, useEffect} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Decode from 'jwt-decode';
import AsyncStorage from '@react-native-community/async-storage';
import {Button, List, Text} from '@ui-kitten/components';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {getUserdata} from '../../actions/getUserData';
import {getSubjects} from '../../actions/getSubjectsAction';
import ImageOverlay from '../../Components/ImageOverlay/ImageOverlay';

import QuizImage from '../../../assets/img/quiz.png';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const Subjects = () => {
  const states = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const [userdata, setUserdata] = useState();

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('@my_token_secret');
        if (value !== null) {
          const decodedData = Decode(value);
          setUserdata(decodedData);
          dispatch(getUserdata(decodedData));
          dispatch(getSubjects(decodedData.myclass));
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, []);

  const isItemReverse = (index) => {
    return index % 2 === 1;
  };

  const renderHeadingItem = () => (
    <ImageOverlay style={styles.headingArticleContainer} source={QuizImage}>
      <Text style={styles.headingArticleTitle} status="control" category="h3">
        Quiz Game Based On NCTB Text Book
      </Text>
      <Text
        style={styles.headingArticleDescription}
        category="h6"
        status="control">
        Enrich Question
      </Text>
      <Button
        style={styles.readButton}
        status="control"
        onPress={() => onItemPress(0)}>
        READ
      </Button>
    </ImageOverlay>
  );

  const renderArticleItem = (info) => (
    <TouchableOpacity
      style={[styles.item, isItemReverse(info.index) && styles.itemReverse]}
      activeOpacity={0.95}
      onPress={() => onItemPress(info.index + 1)}>
      <ImageBackground
        style={styles.itemSection}
        source={{
          uri:
            'https://image.freepik.com/free-vector/vector-illustration-kid-reading-book_29937-1554.jpg',
        }}
        resizeMode="contain"
      />
      <View style={styles.itemSection}>
        <Text style={styles.itemTitle} category="h5">
          {info.item}
        </Text>
        <View style={styles.itemReactionsContainer}>
          <Button style={styles.iconButton} appearance="ghost" status="basic">
            3
            <FontAwesome name="comments" color="grey" size={16} />
          </Button>
          <Button style={styles.iconButton} appearance="ghost" status="danger">
            5
            <Entypo name="heart" color="red" size={16} />
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <List
      style={styles.list}
      data={states.subjects}
      renderItem={renderArticleItem}
      ListHeaderComponent={renderHeadingItem}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  readButton: {
    width: '50%',
    marginTop: 32,
  },
  headingArticleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 320,
  },
  headingArticleTitle: {
    fontFamily: 'Poppins-Regular',
    zIndex: 1,
    textAlign: 'center',
  },
  headingArticleDescription: {
    zIndex: 1,
    fontFamily: 'Poppins-Regular',
  },
  item: {
    flexDirection: 'row',
    minHeight: 188,
  },
  itemReverse: {
    flexDirection: 'row-reverse',
  },
  itemSection: {
    flex: 1,
    padding: 16,
  },
  itemReactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginHorizontal: -8,
  },
  itemTitle: {
    fontFamily: 'Atma-Regular',
    flex: 1,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
});
export default Subjects;
