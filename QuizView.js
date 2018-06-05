import React, { Component } from "react";
import {clearLocalNotification,setLocalNotification} from './notifications'
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  AsyncStorage
} from "react-native";
import _ from "lodash";
import FlipCards from "./flipcard";

class QuizView extends Component {
  static navigationOptions = {
    title: "Quiz"
  };
  state = {
    queans: [],
    index: 0,
    score: 0
  };

  componentDidMount() {
    let title = this.props.navigation.state.params.title;
    let deck = [];
    AsyncStorage.getItem("obj", (err, result) => {
      let Allquestions = JSON.parse(result);
      _.forEach(Allquestions, function(value, key) {
        if (key == title) {
          _.forEach(value, function(values, key) {
            if (key == "questions") {
              deck = values;
            }
          });
        }
      });
      this.setState({ queans: deck });
    });
  }

  onSubmitCorrect = () => {
    let ans = this.state.queans[this.state.index].answer;
    if (ans == "yes") {
      this.state.score = this.state.score + 1;
    }
    let obj = this.state.index + 1;
    this.setState({ index: obj });
    if(this.state.index==this.state.queans.length)
    {
      clearLocalNotification().then(setLocalNotification)
    }
  };
  onSubmitIncorrect = () => {
    let ans = this.state.queans[this.state.index].answer;
    if (ans == "no") {
      this.state.score = this.state.score + 1;
    }
    let obj = this.state.index + 1;
    this.setState({ index: obj });
    if(this.state.index==this.state.queans.length)
    {
      clearLocalNotification().then(setLocalNotification)
    }
  };
  onRestartQuiz = () => {
    let obj = 0;
    this.state.score = 0;
    this.setState({ index: obj });
  };
  render() {
    const { navigate } = this.props.navigation;

    const obj = this.state.queans[this.state.index];
    const questionNumber = this.state.index + 1;
    return (
      <View style={style.container}>
        {this.state.queans.length ? (
          <View>
            <Text style={style.header}>Quiz</Text>
            <View>
              {this.state.queans.length > this.state.index && (
                <View>
                  <Text style={style.header}>
                    Questions number:{questionNumber}/{this.state.queans.length}
                  </Text>
                  <KeyboardAvoidingView>
                    <FlipCards data={this.state.queans[this.state.index]} />
                    <TouchableOpacity style={style.button}>
                      <Text onPress={this.onSubmitCorrect}>CORRECT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={style.button1}>
                      <Text onPress={this.onSubmitIncorrect}>INCORRECT</Text>
                    </TouchableOpacity>
                  </KeyboardAvoidingView>
                </View>
              )}
              {this.state.index >= this.state.queans.length && (
                <View>
                  <Text style={style.header}>
                    your final score is :{this.state.score} out of total{" "}
                    {this.state.queans.length}
                  </Text>
                  <TouchableOpacity style={style.button1}>
                    <Text onPress={this.onRestartQuiz}>Restart Quiz</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View>
            <Text>loading...(Add some questions first)</Text>
          </View>
        )}
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  header: {
    fontSize: 20,
    paddingTop: 12
  },
  input: {
    width: 250,
    paddingTop: 12,
    fontSize: 18
  },
  button: {
    borderWidth: 1,
    padding: 12,

    marginTop: 50,

    width: 150,
    borderRadius: 5,
    backgroundColor: "#f18973",
    alignItems: "center"
  },
  button1: {
    borderWidth: 1,
    padding: 12,
    marginTop: 50,
    width: 150,
    borderRadius: 5,
    backgroundColor: "#f18973",
    alignItems: "center"
  }
});
export default QuizView;
