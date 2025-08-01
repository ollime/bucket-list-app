import { useState, useEffect } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useTheme } from 'utils/ThemeContext';

interface DateDisplayProps {
  label: string;
  data: Date | null;
  callback: (date: Date) => void;
}

export default function DateDisplay({ label, data, callback }: DateDisplayProps) {
  const theme = useTheme();
  const [date, setDate] = useState<Date | null>(data);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);

  useEffect(() => {
    if (data) {
      setDate(new Date(data));
    }
  }, [data]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (value: Date) => {
    callback(value);
    setDate(value);
    hideDatePicker();
  };

  return (
    <View className="m-2 flex flex-row items-center">
      <Text className="mr-2" style={{ color: theme?.isDarkMode ? 'white' : 'black' }}>
        {label}
      </Text>
      <TouchableWithoutFeedback onPress={showDatePicker}>
        <Text className="rounded-full bg-gray-300 p-2">
          {date != null ? dateFormatter.format(date) : 'Select a date'}
        </Text>
      </TouchableWithoutFeedback>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
