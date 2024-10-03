import StoreModule from '../module';

class CategoriesState extends StoreModule {
  initState() {
    return {
      list: [],
      waiting: false,
    };
  }

  async fetchCategories() {
    this.setState({
      waiting: true,
    });

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();

    this.setState(
      {
        list: json.result.items,
        waiting: false,
      },
      'Категории загружены',
    );
  }
}

export default CategoriesState;
