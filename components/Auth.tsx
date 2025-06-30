import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { Alert, View, TextInput, AppState } from 'react-native';
import Button from 'components/Button';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification.');
    setLoading(false);
  }

  return (
    <>
      <View>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="name@gmail.com"
          className={styles.textInput}></TextInput>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="password"
          className={styles.textInput}></TextInput>
        <View className={styles.buttonContainer}>
          <Button label="Sign in with email" callback={() => signInWithEmail()}></Button>
          <Button label="Sign up with email" callback={() => signUpWithEmail()}></Button>
        </View>
      </View>
    </>
  );
}

const styles = {
  textInput: 'w-fit rounded-full bg-white p-2 m-1 placeholder:text-gray-400',
  buttonContainer: 'flex flex-row space-x-2 mt-2',
};
