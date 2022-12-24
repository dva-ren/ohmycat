import { cloudApi } from '~/composables'

(async function () {
  const token = localStorage.getItem('token')
  if (!token)
    return
  const res = await cloudApi.invokeFunction('verify-token', {
    token,
  })
  if (res.code === 400) {
    localStorage.removeItem('token')
    // eslint-disable-next-line no-console
    console.log(res.msg)
  }
})()
