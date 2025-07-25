import { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DateDisplayProps {
  label: string;
  data: Date;
  callback: (date: Date) => void;
}

export default function DateDisplay({ label, data, callback }: DateDisplayProps) {
  const [date, setDate] = useState<Date>(data);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    callback(date);
    setDate(date);
    hideDatePicker();
  };

  return (
    <View className="m-2 flex flex-row items-center">
      <Text className="mr-2">{label}</Text>
      <TouchableWithoutFeedback onPress={showDatePicker}>
        <Text className="rounded-full bg-gray-300 p-2">
          {dateFormatter.format(date) ?? 'No date found'}
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
