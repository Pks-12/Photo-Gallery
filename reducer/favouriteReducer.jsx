function favouriteReducer(state, action) {

  switch (action.type) {

    case "TOGGLE_FAV": {

      const exists = state.find(function(photo) {
        return photo.id === action.payload.id;
      });

      if (exists) {
        return state.filter(function(photo) {
          return photo.id !== action.payload.id;
        });
      }

      return [...state, action.payload];
    }

    default:
      return state;
  }

}

export default favouriteReducer;
