import StoreModule from '../module';

class Catalog extends StoreModule {
  initState() {
    return {
      list: [],
      params: {
        page: 1,
        limit: 10,
      },
      count: 0,
    };
  }

  async setParams(newParams = {}) {
    const params = { ...this.getState().params, ...newParams };

    this.setState(
      {
        ...this.getState(),
        params,
      },
      'Параметры установлены',
    );

    const apiParams = {
      limit: params.limit,
      skip: (params.page - 1) * params.limit,
      fields: 'items(*),count',
    };
    const response = await fetch(`/api/v1/articles?${new URLSearchParams(apiParams)}`);

    const json = await response.json();

    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        count: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }
}

export default Catalog;
