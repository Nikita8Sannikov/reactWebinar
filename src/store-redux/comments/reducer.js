export const initialState = {
  data: {},
  comments: [],
  count: 0,
  waiting: false, // признак ожидания загрузки
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, comments: [], count: 0, waiting: true };

    case 'comments/load-success':
      // console.log(action.payload.comments);

      return {
        ...state,
        data: action.payload.data,
        comments: action.payload.comments.items,
        count: action.payload.comments.count,
        waiting: false,
      };

    case 'comments/load-error':
      return { ...state, data: {}, comments: [], count: 0, waiting: false };

    case 'comments/add-start':
      return { ...state, waiting: true };

    case 'comments/add-success':
      return {
        ...state,
        comments: [...state.comments, action.payload.data],
      };

    case 'comments/add-error':
      return { ...state, waiting: false };
    default:
      return state;
  }
}

export default reducer;
