import { useState } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import DatePicker from 'react-native-date-picker';

interface DateDisplayProps {
  label: string;
  data: Date;
}

export default function DateDisplay({ label, data }: DateDisplayProps) {
  const [date, setDate] = useState<Date>(data);
  const [open, setOpen] = useState<boolean>(false);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const dateFormatter = new Intl.DateTimeFormat('en-US', options);

  return (
    <>
      <View className="m-4 flex flex-row items-center">
        <Text>{label}</Text>
        <TouchableWithoutFeedback onPress={() => setOpen(true)}>
          <Text className="ml-2 rounded-full bg-gray-300 p-2">{dateFormatter.format(date)}</Text>
        </TouchableWithoutFeedback>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
}
