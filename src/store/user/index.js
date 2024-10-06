import StoreModule from '../module';

class UserState extends StoreModule {
  initState() {
    return {
      name: '',
      phone: '',
      email: '',
      token: '',
      waiting: false,
    };
  }

  async signIn(login, password) {
    this.setState({ waiting: true });
    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login,
          password,
          remember: true,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData.error.data.issues.map(item => item.message);
        throw new Error(errorMessage);
      }

      const json = await response.json();

      const { token, user } = json.result;

      this.setState({
        name: user.username,
        email: user.email,
        phone: user.profile.phone,
        token,
        waiting: false,
      });

      localStorage.setItem('authToken', token);
    } catch (e) {
      this.setState({
        name: '',
        phone: '',
        email: '',
        token: '',
        waiting: false,
      });
      throw e;
    }
  }

  async signOut() {
    const token = this.getState().token || localStorage.getItem('authToken');
    this.setState({ waiting: true });

    try {
      const response = await fetch('/api/v1/users/sign', {
        method: 'DELETE',
        headers: {
          'X-Token': token,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Sign out failed');
      }

      this.setState({
        name: '',
        phone: '',
        email: '',
        token: '',
        waiting: false,
      });

      localStorage.removeItem('authToken');
    } catch (e) {
      this.setState({ waiting: false });
      console.error(e.message);
    }
  }
}

export default UserState;
