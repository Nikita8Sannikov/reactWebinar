import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
      data: {},
    };
  }
  async load(id) {
    this.setState({
      data: {},
    });
    const response = await fetch(
      `/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`,
    );
    const json = await response.json();

    this.setState(
      {
        data: json.result,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Product;
