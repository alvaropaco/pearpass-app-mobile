import { NoteIcon } from 'pearpass-lib-ui-react-native-components'
import { colors } from 'pearpass-lib-ui-theme-provider/native'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'

/**
 * @param {Object} props - Component props
 * @param {string} props.label - The label text to display in the header
 * @param {string} props.text - The main note text content
 * @param {Function} props.onPress - Callback function when the component is pressed
 * @returns {React.ReactElement} Pressable note component
 */
export const PressableNote = ({ label, text, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.headerContainer}>
      <NoteIcon color={colors.white.mode1} />
      <Text style={styles.labelText}>{label}</Text>
    </View>
    <View style={styles.textContainer}>
      <Text style={styles.noteText}>{text}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: colors.grey400.mode1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.white.mode1
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  labelText: {
    marginLeft: 10,
    fontFamily: 'Inter',
    color: colors.white.mode1,
    fontSize: 14,
    fontWeight: '400'
  },
  textContainer: {
    flex: 1,
    marginLeft: 34
  },
  noteText: {
    fontFamily: 'Inter',
    color: colors.white.mode1,
    fontSize: 14,
    fontWeight: '500'
  }
})
