<script lang="ts" setup>
import { cloudApi } from '~/composables'
import Message from '~/components/Message'
const router = useRouter()

const loginForm = reactive({
  username: '',
  password: '',
})

const login = async () => {
  if (!loginForm.username || !loginForm.password) {
    Message.warning('请输入用户名或密码')
    return
  }
  const res = await cloudApi.invokeFunction('app-login', loginForm)
  if (res.code === 200) {
    localStorage.setItem('token', res.data.access_token)
    Message.success('登录成功')
    router.replace('/')
  }
  else { Message.error(res.error) }
}
</script>

<template>
  <div flex items-center justify-center h-full>
    <div flex flex-col gap-4 items-center>
      <div text-xl mb-4>
        Oh my cat
      </div>
      <input v-model.trim="loginForm.username" w-60 placeholder="用户名" type="text" outline-none border="b" p-1 hover:border="b green-4" transition>
      <input v-model.trim="loginForm.password" w-60 placeholder="密码" type="password" outline-none border="b" p-1 hover:border="b green-4" transition>
      <button mt-6 w-60 border p-1 rounded btn transition @click="login">
        登录
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  full: true
</route>
