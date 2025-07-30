import { View, Text, Switch, TouchableWithoutFeedback } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

interface ToggleProps {
  value: boolean;
  label: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  callback: () => void;
}

export default function Toggle({ value, label, icon, callback }: ToggleProps) {
  return (
    <TouchableWithoutFeedback onPress={callback}>
      <View className="m-2 flex flex-row items-center">
        {icon ? <MaterialIcons name={icon} size={24} color="#808080" className="mr-1" /> : ''}
        <Text>{label}</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={value ? '#2d70b9' : '#f4f3f4'}
          // @ts-ignore
          activeThumbColor="#2d70b9"
          ios_backgroundColor="#3e3e3e"
          onValueChange={callback}
          value={value}
          style={{ transform: [{ scaleX: 1.4 }, { scaleY: 1.4 }], marginLeft: 20 }}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
