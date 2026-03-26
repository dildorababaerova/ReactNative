# ReactNative

React Native tutorial

C:\Users\Dildora\AppData\Local\Android\Sdk`

`npx create-expo-app rate-repository-app --template expo-template-blank@sdk-50`

`npm install --save-dev eslint @babel/eslint-parser eslint-plugin-react eslint-plugin-react-native`

`npx @eslint/migrate-config .eslintrc.json`

`npm install eslint-plugin-react-hooks --save-dev`
`npx eslint .`

`npx dev tools`

https://reactnative.dev/docs/getting-started.html
https://css-tricks.com/snippets/css/a-guide-to-flexbox/

```js
<Pressable
  onPress={formik.handleSubmit}
  style={[styles.button, !(formik.isValid && formik.dirty) && { opacity: 0.5 }]}
  disabled={!(formik.isValid && formik.dirty)}
>
  <Text color="white" fontWeight="bold" fontSize="subheading">
    Sign in
  </Text>
</Pressable>
```

`npm install @apollo/client@3`
`npm install @expo/metro-config@0.17.4`
`npm install rxjs --legacy-peer-deps`
✅ Исправление (очень важно)

Добавь HttpLink:

```js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://192.168.100.38:4000/graphql",
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
```

Перезапусти Expo с очисткой:`npx expo start -c`

`npx expo install expo-secure-store`

GraphQL ВСЕГДА возвращает объект такой формы:

{
data: {
login: {
value: "TOKEN_HERE"
}
}
}
👉 Поэтому:
data — это весь ответ
data.login — результат mutation login
data.login.value — сам токен
