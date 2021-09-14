const providerReducers = (providers = [], action) => {
  switch (action.type) {
    case "GET_PROVIDERS":
      return action.payload;

    case "ADD_PROVIDER":
      return [...providers, action.payload];

    case "DELETE_PROVIDER":
      return providers.filter((provider) => provider._id !== action.payload);

    case 'UPDATE_PROVIDER':
      return providers.map((provider) =>
        provider._id === action.payload._id ? action.payload : provider
      );

    default:
      return providers;
  }
};

export default providerReducers;
