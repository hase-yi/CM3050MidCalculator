import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from 'react';

const screenWidth = Dimensions.get('window').width;
const buttonWidth = (screenWidth - 50) / 4;


export default function App() {
  const [answerValue, setAnswerValue] = useState(0);
  const [readyToReplace, setReadyToReplace] = useState(true);
  const [memoryValue, setMemoryValue] = useState(0);
  const [operatorValue, setOperatorValue] = useState(0);

  function handleNumber(value) {
    if (readyToReplace) {
      setAnswerValue(value);
      setReadyToReplace(false);
    } else {
      setAnswerValue(answerValue + value);
    }
  }

  function calculateEquals() {
    let previous = parseFloat(memoryValue);
    let current = parseFloat(answerValue);
    let result = 0;
  
    switch (operatorValue) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous + current;
        break;
      case 'X':
        result = previous + current;
        break;
      case '/':
        result = previous + current;
        break;
      case '%':
        result = previous + current;
      default:
        result = current;
    }
    return result;
  }

  function buttonPressed(value) {
    // alert("button pressed: "+value);
    if (value === 'C') {
      setAnswerValue(0);
      setMemoryValue(0);
      setOperatorValue(0);
      setReadyToReplace(true);
    } else if (!isNaN(value)) {
      handleNumber(value);
    } else if ( value === '%' || value === '/' || value === 'X' || value === '-' || value === '+') {
      
      if (operatorValue !== 0) {
        const result = calculateEquals();
        setMemoryValue(result);
      }
      setMemoryValue(answerValue);
      setOperatorValue(value);
      setReadyToReplace(true);
    } else if (value === '=') {
      setAnswerValue(calculateEquals());
      setMemoryValue(0);
      setReadyToReplace(true);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.resultFieldText}>{answerValue}</Text>
        <View style={styles.row}>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed('C')}>
            <Text style={styles.buttonText}>C</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed()}>
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed()}>
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.topRowButton} onPress={() => buttonPressed()}>
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.row}>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(7)}>
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(8)}>
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(9)}>
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.topRowButton} onPress={() => buttonPressed("*")}>
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.row}>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(4)}>
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(5)}>
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(6)}>
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.topRowButton} onPress={() => buttonPressed("-")}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.row}>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(1)}>
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(2)}>
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(3)}>
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.topRowButton} onPress={() => buttonPressed("+")}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.row}>

          <TouchableOpacity style={styles.longButton} onPress={() => buttonPressed(0)}>
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => buttonPressed(".")}>
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.topRowButton} onPress={() => buttonPressed("=")}>
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>

        </View>
        <StatusBar style="light content" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  resultFieldText: {
    color: "white",
    fontSize: 60,
    margin: 20,
    textAlign: 'right',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'lightgray',
    width: buttonWidth,
    height: buttonWidth,
    margin: 5,
    borderRadius: buttonWidth / 2,
    padding: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
  topRowButton: {
    backgroundColor: 'skyblue',
    width: buttonWidth,
    height: buttonWidth,
    margin: 5,
    borderRadius: buttonWidth / 2,
    padding: 20

  },
  rightRowButton: {

  },
  longButton: {
    backgroundColor: 'lightgray',
    width: buttonWidth * 2 + 5,
    height: buttonWidth,
    margin: 5,
    borderRadius: buttonWidth / 2,
    padding: 20
  }
});
