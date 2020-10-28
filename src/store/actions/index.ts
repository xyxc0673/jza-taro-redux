export function createAction (actionType) {
  return (payload) => ({
    type: actionType,
    payload,
  })
}

// interface IRes {
//   code: number,
//   data: object,
//   msg: string
// }

export function createApiAction (actionType, func = (any) => any as Promise<any>) {
  return (
    params = {},
    callback = { success: (any) => {}, failed: (any) => {} },
    customActionType = actionType,
  ) => async (dispatch) => {
    try {
      dispatch({ type: `${customActionType}_request`, params })
      const data = await func(params);
      dispatch({ type: `${customActionType}`, params, payload: data })
      callback.success && callback.success({ payload: data })
      console.log('createApiAction', params, func, data)      
      return data
    } catch (e) {
      dispatch({ type: `${customActionType}_failure`, params, payload: e })
      callback.failed && callback.failed({ payload: e })
    }
  }
}