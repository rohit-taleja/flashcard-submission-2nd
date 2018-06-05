import React, { Component } from "react";
import { StyleSheet, AsyncStorage, Text, View } from "react-native";

import { Button } from "react-native";

import { StackNavigator } from "react-navigation";
import AddQuestion from "./AddQuestion";
import DeckView from "./DeckView";
import QuizView from "./QuizView";
import AddNewDeck from "./AddNewDeck";
import DefaultView from "./defaultview";

// debugger
let asyncobj = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces"
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event"
      }
    ]
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared."
      }
    ]
  }
};
// AsyncStorage.clear()
// debugger
AsyncStorage.getItem("obj", (err, result) => {
  let obj1 = JSON.parse(result);
  if (obj1 == null) {
    AsyncStorage.mergeItem("obj", JSON.stringify(asyncobj));
  }
});

const App = StackNavigator({
  DefaultView: {
    screen: DefaultView
  },
  DeckView: {
    screen: DeckView
  },
  AddNewDeck: {
    screen: AddNewDeck
  },
  AddQuestion: {
    screen: AddQuestion
  },
  QuizView: {
    screen: QuizView
  }
});

export default App;
