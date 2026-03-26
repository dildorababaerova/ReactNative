import AsyncStorage from "@react-native-async-storage/async-storage";

class AuthStorage {
  constructor(namespace = "auth") {
    this.namespace = namespace;
    this.key = `${this.namespace}:token`;
  }

  async getAccessToken() {
    return await AsyncStorage.getItem(this.key);
  }

  async setAccessToken(token) {
    await AsyncStorage.setItem(this.key, token);
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(this.key);
  }
}

export default AuthStorage;
