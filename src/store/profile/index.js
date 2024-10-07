import StoreModule from '../module';

class ProfileState extends StoreModule {
  initState() {
    return {
      name: '',
      phone: '',
      email: '',
      loading: false,
    };
  }

  async loadProfile(token) {
    this.setState({ loading: true, error: null });
    if (!token) {
      return this.setState({ loading: false, error: 'Нет токена' });
    }

    try {
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-Token': token,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load profile');
      }

      const json = await response.json();

      if (json.result) {
        this.setState({ profile: json.result, loading: false });
      }
    } catch (error) {
      this.setState({ loading: false, error: e.message });
      console.error(error.message);
    }
  }
}

export default ProfileState;
