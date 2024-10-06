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

  async loadProfile() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No token found');
    }

    this.setState({ loading: true });

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
      this.setState({
        name: json.result.profile.name,
        email: json.result.email,
        phone: json.result.profile.phone,
        loading: false,
      });
    } catch (error) {
      this.setState({ loading: false });
      console.error(error.message);
    }
  }
}

export default ProfileState;
