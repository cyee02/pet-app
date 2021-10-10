class AuthStorage {
  constructor(namespace = 'loginToken') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const accessToken = await localStorage.getItem(
      `${this.namespace}:accessToken`,
    );

    return accessToken ? JSON.parse(accessToken) : null;
  }

  async setAccessToken(accessToken) {
    await localStorage.setItem(
      `${this.namespace}:accessToken`,
      JSON.stringify(accessToken),
      accessToken,
    );
  }

  async removeAccessToken() {
    await localStorage.removeItem(`${this.namespace}:accessToken`);
  }
}

export default AuthStorage;