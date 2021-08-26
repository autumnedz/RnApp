import React from 'react'
import { StyleSheet, View } from 'react-native'
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import { Text, useTheme } from 'react-native-paper'

interface CodeInputProps {
  codeLength: number
  code: string
  setCode: (newCode: string) => void
  disabled?: boolean
  invalid?: boolean
}

export const CodeInput: React.FC<CodeInputProps> = ({ codeLength, code, setCode, disabled, invalid }) => {
  const theme = useTheme()
  const styles = makeStyles(theme)

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: code,
    setValue: setCode,
  })

  const ref = useBlurOnFulfill({ value: code, cellCount: codeLength })

  const additionalCellForIndex = (index: number) =>
    index === 0 ? styles.firstCell : index === codeLength - 1 ? styles.lastCell : null

  return (
    <CodeField
      pointerEvents={disabled ? 'none' : 'auto'}
      caretHidden={false}
      ref={ref}
      {...props}
      value={code}
      onChangeText={setCode}
      cellCount={codeLength}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({ index, symbol, isFocused }) => (
        <View
          key={index}
          onLayout={getCellOnLayoutHandler(index)}
          style={[
            styles.cell,
            additionalCellForIndex(index),
            isFocused && styles.focusCell,
            invalid && styles.cellError,
          ]}
        >
          <Text style={[styles.cellText, !symbol && styles.unfilledText, isFocused && styles.focusCellText]}>
            {symbol || '•'}
          </Text>
        </View>
      )}
    />
  )
}

const makeStyles = (theme: ReactNativePaper.Theme) =>
  StyleSheet.create({
    unfilledText: {
      color: '#00000030',
    },
    codeFieldRoot: {
      marginTop: 10,
      justifyContent: 'center',
    },
    cellError: {
      borderColor: theme.colors.error,
      borderLeftColor: theme.colors.error,
      borderRightColor: theme.colors.error,
    },
    cell: {
      minWidth: 40,
      maxWidth: 60,
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      aspectRatio: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 0.5,
      borderRightWidth: 0.5,
      borderColor: 'black',
      borderLeftColor: '#00000030',
      borderRightColor: '#00000030',
    },
    firstCell: {
      borderTopLeftRadius: 10,
      borderBottomLeftRadius: 10,
      borderLeftWidth: 1,
      borderLeftColor: 'black',
    },
    focusCell: {
      borderColor: theme.colors.primary,
      borderLeftColor: theme.colors.primary,
      borderRightColor: theme.colors.primary,
    },
    lastCell: {
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderRightWidth: 1,
      borderRightColor: 'black',
    },
    cellText: {
      width: 40,
      height: 40,
      lineHeight: 38,
      fontSize: 24,
      textAlign: 'center',
    },
    focusCellText: {
      color: theme.colors.primary,
    },
  })