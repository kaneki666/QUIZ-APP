import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Button, Divider, Layout, Text} from '@ui-kitten/components';
import {ProfileSocial} from '../../Components/ProfileSocial/ProfileSocial';
import {ProfileParameterCard} from '../../Components/ProfileParameterCard/ProfileParameterCard';
import {ArrowHeadDownIcon, ArrowHeadUpIcon} from '../../Components/Icon/Icon';

const Profile = ({navigation}) => {
  const onFollowButtonPress = () => {
    navigation && navigation.goBack();
  };

  return (
    <Layout style={styles.container} level="2">
      <Layout style={styles.header} level="1">
        <View style={styles.profileContainer}>
          <Avatar
            style={styles.profileAvatar}
            size="large"
            source={{
              uri:
                'https://m5.paperblog.com/i/109/1094185/delish-cookbooks-by-food-bloggers-L-VkIxrl.jpeg',
            }}
          />
          <View style={styles.profileDetailsContainer}>
            <Text category="h4">USER</Text>
            <Text appearance="hint" category="s1">
              Bangladesh,Chinttagong
            </Text>
          </View>
        </View>
        <Button style={styles.followButton} onPress={onFollowButtonPress}>
          FOLLOW
        </Button>
        <View style={styles.profileParametersContainer}>
          <View style={styles.profileSocialsSection}>
            <ProfileSocial
              style={styles.profileSocialContainer}
              hint="Followers"
              value={10}
            />
            <ProfileSocial
              style={styles.profileSocialContainer}
              hint="Following"
              value={10}
            />
            <ProfileSocial
              style={styles.profileSocialContainer}
              hint="Posts"
              value={10}
            />
          </View>
          <Divider style={styles.profileSectionsDivider} />
          <Text style={styles.profileDescriptionSection} appearance="hint">
            kwjeijqwklkejlkkkkkkkkkkkkkkkkkk
          </Text>
        </View>
      </Layout>
      <View style={styles.profileParametersSection}>
        <ProfileParameterCard
          style={styles.profileParameter}
          hint="Height"
          value={181}
        />
        <ProfileParameterCard
          style={styles.profileParameter}
          hint="Weight"
          value={72}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
  },
  profileAvatar: {
    marginHorizontal: 8,
  },
  profileDetailsContainer: {
    flex: 1,
    marginHorizontal: 8,
  },
  rateBar: {
    marginTop: 24,
  },
  followButton: {
    marginTop: 24,
  },
  profileParametersContainer: {
    flexDirection: 'row',
    minHeight: 220,
    marginHorizontal: 8,
    marginTop: 24,
    marginBottom: 8,
  },
  profileSocialsSection: {
    marginHorizontal: 16,
  },
  profileSocialContainer: {
    flex: 1,
  },
  profileSectionsDivider: {
    width: 1,
    height: '100%',
    marginHorizontal: 8,
  },
  profileDescriptionSection: {
    flex: 1,
    marginHorizontal: 16,
  },
  profileParametersSection: {
    flexDirection: 'row',
    marginVertical: 16,
    marginHorizontal: 8,
  },
  profileParameter: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default Profile;
