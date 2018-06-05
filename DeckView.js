import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  AsyncStorage
} from "react-native";
import _ from "lodash";
class DeckView extends Component {
  static navigationOptions = {
    title: "deck"
  };
  state = {
    title: "a",
    count: 0
  };
  componentDidMount() {
    // debugger

    let title = this.state.title;
    if (this.props.navigation.state.params.count == 0) {
      AsyncStorage.mergeItem(
        "obj",
        JSON.stringify({
          [title]: {
            title,
            questions: []
          }
        })
      );
    }
  }
  render() {
    // debugger
    const { navigate } = this.props.navigation;
    this.state.title = this.props.navigation.state.params.deck;

    return (
      <Animated.View>
        <Text style={style.deckTitle}>
          Title : {this.props.navigation.state.params.deck}
        </Text>
        <Text style={style.cards}>
          Number of Questions : {this.props.navigation.state.params.count}{" "}
        </Text>
        <TouchableOpacity
          style={style.button}
          onPress={() =>
            navigate("AddQuestion", {
              title: this.props.navigation.state.params.deck
            })
          }
        >
          <Text>Add Question</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={style.button}
          onPress={() =>
            navigate("QuizView", {
              title: this.props.navigation.state.params.deck
            })
          }
        >
          <Text>Start Quiz</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const style = StyleSheet.create({
  deckTitle: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold"
  },
  cards: {
    marginTop: 8
  },
  button: {
    marginTop: 18,
    borderWidth: 1,
    borderRadius: 5,
    padding: 7,
    backgroundColor: "#f18973"
  }
});

export default DeckView;
