function useSession() {
  const restoreSession = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const response = await fetch('/api/v1/users/self?fields=*', {
          headers: { 'X-Token': token },
        });
        const data = await response.json();
        return data.result.profile;
      } catch (error) {
        console.error('Ошибка при восстановлении сессии:', error);
      }
    }
  };

  return { restoreSession };
}

export default useSession;
