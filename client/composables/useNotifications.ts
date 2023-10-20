import { ref } from 'vue'
const notification = ref<null | object>(null)
const timeout = ref<null | NodeJS.Timeout>(null)

export default () => {
  const addTimeoutRemove = () => {
    timeout.value = setTimeout(() => {
      notification.value = null
    }, 5000)
  }
  const notifySuccess = (message: string) => {
    notification.value = {
      type: 'success',
      message: message || 'Bravo !'
    }
    addTimeoutRemove()
  }
  const notifyError = (message: string) => {
    notification.value = {
      type: 'error',
      message: message || 'Oops !'
    }
    addTimeoutRemove()
  }

  return {
    notification,
    notifySuccess,
    notifyError
  }
}
