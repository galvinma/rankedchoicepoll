// redux
import store from '.././Store/store'
import {getAlertColor, getAlertMessage} from '.././Actions/actions'

export function dispatchAlert(color, message)
{
  store.dispatch(getAlertColor(color))
  store.dispatch(getAlertMessage(message))

  setTimeout(() => {
    store.dispatch(getAlertColor(""))
    store.dispatch(getAlertMessage(""))
  }, 5000)
}
