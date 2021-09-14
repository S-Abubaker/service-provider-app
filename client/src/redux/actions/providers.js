import * as api from "../../api/index";

export const getProviders = () => async (dispatch) => {
  try {
    const { data } = await api.getProviders();
    dispatch({ type: "GET_PROVIDERS", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const addProvider = (newProvider) => async (dispatch) => {
  try {
    const { data } = await api.addProvider(newProvider);
    dispatch({ type: "ADD_PROVIDER", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProvider = (id) => async (dispatch) => {
  try {
    await api.deleteProvider(id);

    dispatch({ type: "DELETE_PROVIDER", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProvider = (id, provider) => async (dispatch) => {
  try {
    const { data } = await api.updateProvider(id, provider);

    dispatch({ type: 'UPDATE_PROVIDER', payload: data });
  } catch (error) {
    console.log(error.message);
  }
};
