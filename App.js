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
  const [history, setHistory] = useState([])
  const [currentHistory, setCurrentHistory] = useState('0')
  const [lastPressed, setLastPressed] = useState('')

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
    if (!isNaN(value)) {
      // check is the user is pressing a number
      const newValue = handleNumber(value)
      setAnswerValue(newValue)
      setReadyToReplace(false)
      setIsAc(false)

      // Check if this is the first number entered
      if (memoryValue === 0 && operatorValue === 0) {
        // If so, begin a new history
        setCurrentHistory(`${newValue}`)
      }
    } else if (value === 'C') {
      // Check if the user is pressing C
      setAnswerValue(0)
      setReadyToReplace(true)
      setIsAc(true)
    } else if (value === 'AC') {
      // Check if the user is pressing AC
      // Reset everything
      setAnswerValue(0)
      setMemoryValue(0)
      setOperatorValue(0)
      setReadyToReplace(true)
      setCurrentHistory('0')
    } else if (operators.includes(value)) {
      // Check if the user is pressing an operator

      // The user continues a calculation but does not press `=` between. e.g 1 + 3 / 6 + 2
      if (operatorValue !== 0) {
        if (operators.includes(lastPressed)) {
          // The user keeps pressing the operator button without entering a number
          // Do nothing
        } else {
          // Finish the current calculation
          let result = calculateEquals()

          // Update history
          const newCurrentHistory = `${currentHistory} ${operatorValue} ${answerValue}`
          setCurrentHistory(newCurrentHistory)

          // Set memory and answer to the result
          setMemoryValue(result)
          setAnswerValue(result)
        }
      } else {
        // Moving the previous answer to memory to be used in the next calculation
        // If the user is pressing '=' next this will lead to the number being added to
        // itself, but that's in line with for example the iOS calculator
        setMemoryValue(answerValue)
      }

      setReadyToReplace(true)
      setOperatorValue(value)
    } else if (value === '=') {
      // The user is pressing `=`
      const result = calculateEquals()

      // Update history, but only if the user is not pressing `=` over and over again
      if (lastPressed != '=') {
        // Special case: the user presses `=` without entering an operator and a second number
        const newCurrentHistory =
          operatorValue != 0
            ? `${currentHistory} ${operatorValue} ${answerValue} = ${result}`
            : `${answerValue} = ${result}`
        setCurrentHistory(newCurrentHistory)

        // Pop the oldest history and add the new one
        const newHistory = [`${newCurrentHistory}`, ...history]
        if (newHistory.length > 3) {
          newHistory.pop() // Keep only the last three calculations
        }
        setHistory(newHistory)
        setCurrentHistory('0')
      }

      // Update the answer and reset the memory and operator
      setAnswerValue(result)
      setMemoryValue(0)
      setOperatorValue(0)
      setReadyToReplace(true)
    } else if (value === '+/-') {
      // Check if the user is pressing +/-
      setAnswerValue(answerValue * -1)
    } else if (value === '%') {
      // Check if the user is pressing %
      setAnswerValue(answerValue * 0.01)
    } else if (value === '.') {
      // Check if the user is pressing .

      // Check if the user is pressing . not after another . or if
      // a float number is already entered
      if (lastPressed != '.' && !answerValue.toString().includes('.')) {
        setAnswerValue(answerValue + '.')
        setReadyToReplace(false)
      }
    }

    setLastPressed(value)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        {/* Populate the history */}
        <View style={styles.historyField}>
          {[...history].reverse().map((line, index) => (
            <Text key={index} style={styles.historyText}>
              {line}
            </Text>
          ))}
        </View>

        <View style={styles.resultField}>
          {/* The result should always be just one line */}
          <Text numberOfLines={1} style={styles.resultFieldText}>
            {answerValue}
          </Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.button, styles.darkButton]}
            onPress={() => buttonPressed('C')}
          >
            {/* Check whether this is the AC or C button now */}
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

          {/* The button is highlighted if it was the last button pressed */}
          <TouchableOpacity
            style={[
              styles.button,
              lastPressed === '/'
                ? styles.highlightButton
                : styles.colouredButton
            ]}
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

          {/* The button is highlighted if it was the last button pressed */}
          <TouchableOpacity
            style={[
              styles.button,
              lastPressed === 'x'
                ? styles.highlightButton
                : styles.colouredButton
            ]}
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

          {/* The button is highlighted if it was the last button pressed */}
          <TouchableOpacity
            style={[
              styles.button,
              lastPressed === '-'
                ? styles.highlightButton
                : styles.colouredButton
            ]}
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

          {/* The button is highlighted if it was the last button pressed */}
          <TouchableOpacity
            style={[
              styles.button,
              lastPressed === '+'
                ? styles.highlightButton
                : styles.colouredButton
            ]}
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
  highlightButton: {
    backgroundColor: 'orange'
  },
  longButton: {
    width: buttonWidth * 2 + 5
  },
  historyField: {
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    marginBottom: 20
  },
  historyText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'right'
  }
})
