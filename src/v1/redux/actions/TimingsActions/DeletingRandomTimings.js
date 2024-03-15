import * as api from '../../../api-calls/index';


export const deleteRandomDayTiming = (formData) => async (dispatch) => {
  try {
    const data = await api.deleteRandomDaysTiming(formData);
    
    if (data.success) {
      return data.data;
    }
    return data.data;

  } catch (error) {

    let result = {
      success: false,
      message: error.response.data.message
        ? error.response.data.message
        : "Failed To Delete Timings:SomeThing Went Wrong",
    };
    return result;
    
  }
};
