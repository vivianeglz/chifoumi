import useNotification from '@client/composables/useNotifications'

export default () => {
  const { notifyError, notifySuccess } = useNotification()

  const copyToClipboard = async (textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        notifySuccess('Le lien vers la partie a été copié dans le presse-papier.')
      },
      () => {
        notifyError('Une erreur est survenue')
      }
    )
  }

  return { copyToClipboard }
}
