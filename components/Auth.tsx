import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { View, AppState } from 'react-native';
import Button from 'components/Button';

import TextField from 'components/TextField';

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
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) alert(error.message);
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

    if (error) alert(error.message);
    if (!session) alert('Please check your inbox for email verification.');

    setLoading(false);
  }

  function validateEmail(value: string) {
    // data validation logic
    return true;
  }

  function validatePassword(value: string) {
    // password must be longer than 6 and less than 30 characters
    return value.length > 6 && value.length < 30;
  }

  return (
    <>
      <View>
        <TextField
          label="email"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
            setIsEmailValid(validateEmail(text));
          }}
          placeholder="email@domain.com"
          isValid={isEmailValid}
          icon="email"></TextField>
        <TextField
          label="password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setIsPasswordValid(validatePassword(text));
          }}
          placeholder="password"
          isValid={isPasswordValid}
          icon="numbers"
          obfuscateText={true}></TextField>
        <View className={styles.buttonContainer}>
          <Button label="Sign in with email" callback={() => signInWithEmail()}></Button>
          <Button label="Sign up with email" callback={() => signUpWithEmail()}></Button>
        </View>
      </View>
    </>
  );
}

const styles = {
  buttonContainer: 'flex flex-row space-x-2 mt-2',
};
