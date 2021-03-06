// redux
import store from '.././Store/store'
import {getAlertColor, getAlertMessage} from '.././Actions/actions'

export function dispatchAlert(color: string, message: string, duration: any)
{

  if (duration === "INFINITE")
  {
    store.dispatch(getAlertColor(color))
    store.dispatch(getAlertMessage(message))
  }
  else
  {
    store.dispatch(getAlertColor(color))
    store.dispatch(getAlertMessage(message))

    setTimeout(() => {
      store.dispatch(getAlertColor(""))
      store.dispatch(getAlertMessage(""))
    }, duration)
  }
}
