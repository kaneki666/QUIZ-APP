import axios from "axios";

export const register = (newUser) => {
  return axios
    .post("https://quizolympiadserver.herokuapp.com/register", {
      username: newUser.username,
      fullname: newUser.fullname,
      myclass: newUser.myclass,
      schoolname: newUser.schoolname,
      eiin: newUser.eiin,
      phonenumber: newUser.phonenumber,
      dob: newUser.dob,
      password: newUser.password,
    })
    .then((response) => {
      return response.data;
    });
};

export const login = (user) => {
  return axios
    .post("https://quizolympiadserver.herokuapp.com/login", {
      username: user.username,
      password: user.password,
    })
    .then((response) => {
      localStorage.setItem("usertoken", response.data);
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const gamestats = (mystats) => {
  return axios
    .post("https://quizolympiadserver.herokuapp.com/gamestats", {
      username: mystats.username,
      gameid: mystats.gameid,
      score: mystats.score,
    })
    .then((response) => {
      return response.data;
    });
};

export const getClassMate = (school) => {
  return axios
    .post("https://quizolympiadserver.herokuapp.com/myclassmates", {
      myclass: school.myclass,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getStatsData = (data) => {
  return axios
    .post("https://quizolympiadserver.herokuapp.com/userstats", {
      username: data.username,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getLeaderboard = () => {
  return axios
    .get("https://quizolympiadserver.herokuapp.com/leaderboard")
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const sendInvite = (numbers) => {
  return axios
    .post("https://quizolympiadserver.herokuapp.com/invite", {
      data: numbers,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const subject = (data) => {
  return axios
    .post("https://quizolympiadserver.herokuapp.com/subject", {
      Class: data,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const chapters = (my_data) => {
  return axios
    .post("https://quizolympiadserver.herokuapp.com/chapters", {
      class: my_data.class,
      subject: my_data.subject,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getQuestions = (quendata) => {
  return axios
    .post("https://quizolympiadserver.herokuapp.com/getquestion", {
      my_class: quendata.my_class,
      subject: quendata.subject,
      chapter: quendata.chapter,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const send_Link = (linkgame) => {
  return axios
    .post("https://quizolympiadserver.herokuapp.com/joinlink", {
      data: linkgame,
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      console.log(err);
    });
};
