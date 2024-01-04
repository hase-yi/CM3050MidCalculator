import { StatusBar } from 'expo-status-bar'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity
} from 'react-native'
import { useState } from 'react'

const screenWidth = Dimensions.get('window').width
const buttonWidth = (screenWidth - 50) / 4

export default function App () {
  const [answerValue, setAnswerValue] = useState(0)
  const [readyToReplace, setReadyToReplace] = useState(true)
  const [memoryValue, setMemoryValue] = useState(0)
  const [operatorValue, setOperatorValue] = useState(0)
  const [isAc, setIsAc] = useState(true)

  const operators = ['+', '-', 'x', '/']

  function handleNumber (value) {
    if (readyToReplace) {
      return value
    } else {
      return parseFloat(answerValue.toString() + value.toString())
    }
  }

  function calculateEquals () {
    let previous = parseFloat(memoryValue)
    let current = parseFloat(answerValue)
    let result = 0

    switch (operatorValue) {
      case '+':
        result = previous + current
        break
      case '-':
        result = previous - current
        break
      case 'x':
        result = previous * current
        break
      case '/':
        result = previous / current
        break
      default:
        result = current
    }
    return result
  }

  function buttonPressed (value) {
    // alert("button pressed: " + value);

    // check is the user is pressing a number
    if (!isNaN(value)) {
      setAnswerValue(handleNumber(value))
      setReadyToReplace(false)
      setIsAc(false)
    } else if (value === 'C') {
      //check if the user is pressing C
      setAnswerValue(0)
      setReadyToReplace(true)
      setIsAc(true)
    } else if (value === 'AC') {
      //check if the user is pressing AC{
      setAnswerValue(0)
      setMemoryValue(0)
      setOperatorValue(0)
      setReadyToReplace(true)
    } else if (operators.includes(value)) {
      // The user continus a calucaltion but does not press = inbetween. e.g 1 + 3 / 6 + 2
      if (operatorValue !== 0) {
        // Finish the current calculation
        let result = calculateEquals()
        setMemoryValue(result)
        setAnswerValue(result)
      } else {
        // moving the previous answer to memory to be used in the next calculation
        setMemoryValue(answerValue)
      }

      setReadyToReplace(true)
      setOperatorValue(value)
    } else if (value === '=') {
      setAnswerValue(calculateEquals())
      setMemoryValue(0)
      setOperatorValue(0)
      setReadyToReplace(true)
    } else if (value === '+/-') {
      setAnswerValue(answerValue * -1)
    } else if (value === '%') {
      setAnswerValue(answerValue * 0.01)
    } else if (value === '.') {
      setAnswerValue(answerValue + '.')
      setReadyToReplace(false)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.resultField}>
          <Text numberOfLines={1} style={styles.resultFieldText}>
            {answerValue}
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.darkButton]}
            onPress={() => buttonPressed('C')}
          >
            <Text style={styles.buttonText}>{isAc ? 'AC' : 'C'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.darkButton]}
            onPress={() => buttonPressed('+/-')}
          >
            <Text style={styles.buttonText}>+/-</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.darkButton]}
            onPress={() => buttonPressed('%')}
          >
            <Text style={styles.buttonText}>%</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.colouredButton]}
            onPress={() => buttonPressed('/')}
          >
            <Text style={styles.buttonText}>/</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed(7)}
          >
            <Text style={styles.buttonText}>7</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed(8)}
          >
            <Text style={styles.buttonText}>8</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed(9)}
          >
            <Text style={styles.buttonText}>9</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.colouredButton]}
            onPress={() => buttonPressed('x')}
          >
            <Text style={styles.buttonText}>x</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed(4)}
          >
            <Text style={styles.buttonText}>4</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed(5)}
          >
            <Text style={styles.buttonText}>5</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed(6)}
          >
            <Text style={styles.buttonText}>6</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.colouredButton]}
            onPress={() => buttonPressed('-')}
          >
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed(1)}
          >
            <Text style={styles.buttonText}>1</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed(2)}
          >
            <Text style={styles.buttonText}>2</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed(3)}
          >
            <Text style={styles.buttonText}>3</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.colouredButton]}
            onPress={() => buttonPressed('+')}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.longButton]}
            onPress={() => buttonPressed(0)}
          >
            <Text style={styles.buttonText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => buttonPressed('.')}
          >
            <Text style={styles.buttonText}>.</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.colouredButton]}
            onPress={() => buttonPressed('=')}
          >
            <Text style={styles.buttonText}>=</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style='light content' />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  resultField: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  resultFieldText: {
    color: 'white',
    fontSize: 60,
    margin: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    textAlign: 'center'
  },
  colouredButton: {
    backgroundColor: 'skyblue'
  },
  darkButton: {
    backgroundColor: 'dimgray'
  },
  longButton: {
    width: buttonWidth * 2 + 5
  }
})
