import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      list: initState.list || [],
      busket: initState.busket || [],
    };
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  //Task 2 Generating uniq code
  // generateCode() {
  //   const newCode = generateNextCode(this.usedCodes);
  //   this.usedCodes.push(newCode);
  //   return newCode;
  // }

  /**
   * Добавление новой записи
   */
  // addItem() {
  //   this.setState({
  //     ...this.state,
  //     list: [...this.state.list, { code: generateCode(), title: 'Новая запись' }],
  //   });
  // }
  /**
   * Добавление новой записи в корзину
   */
  AddItemToModal(item) {
    const existingItem = this.state.busket.find(busketItem => busketItem.code === item.code);
    if (existingItem) {
      this.setState({
        ...this.state,
        busket: this.state.busket.map(busketItem =>
          busketItem.code === item.code
            ? { ...busketItem, quantity: busketItem.quantity + 1 }
            : busketItem,
        ),
      });
    } else {
      this.setState({
        ...this.state,
        busket: [...this.state.busket, { ...item, quantity: 1 }],
      });
    }
  }
  /**
   * Удаление записи по коду
   * @param code
   */
  // deleteItem(code) {
  //   this.setState({
  //     ...this.state,
  //     // Новый список, в котором не будет удаляемой записи
  //     list: this.state.list.filter(item => item.code !== code),
  //   });
  // }
  /**
   * Удаление записи по коду из корзины
   */
  DeleteItemFromModal(code) {
    this.setState({
      ...this.state,
      busket: this.state.busket.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     list: this.state.list.map(item => {
  //       if (item.code === code) {
  //         // Смена выделения и подсчёт
  //         return {
  //           ...item,
  //           selected: !item.selected,
  //           count: item.selected ? item.count : item.count + 1 || 1,
  //         };
  //       }
  //       // Сброс выделения если выделена
  //       return item.selected ? { ...item, selected: false } : item;
  //     }),
  //   });
  // }
}

export default Store;
