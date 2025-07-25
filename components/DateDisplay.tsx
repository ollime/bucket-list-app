import { useState } from 'react';
import { Button, View, Text } from 'react-native';
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
    <View>
      <Text>{dateFormatter.format(date) ?? 'No date found'}</Text>
      <Button title="Show Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
}
