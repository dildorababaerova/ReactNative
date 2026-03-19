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
