import React, { useState } from 'react';
import { supabase } from '../utils/supabase';
import { Alert, View, AppState } from 'react-native';
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

  return (
    <>
      <View>
        <TextField
          label="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="name@gmail.com"></TextField>
        <TextField
          label="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          placeholder="password"></TextField>
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
