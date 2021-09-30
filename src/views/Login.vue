<template>
  <validate-form @form-submit="onFormSubmit">
    <div class="mb-3">
      <label class="form-label">邮箱地址</label>
      <validateInput
        :rules="emailRules"
        v-model="emailVal"
        placeholder="请输入邮箱地址"
        type="text"
        ref="inputRef"
      />
      <!-- 上面这个ref可以获取ValidateInput子组件 -->
      <!-- {{emailVal}}这一行可以用来验证v-model双向绑定 -->
    </div>

    <div class="mb-3">
      <label class="form-label">密码</label>
      <validateInput
        :rules="passwordRules"
        v-model="passwordVal"
        placeholder="请输入密码"
        type="text"
      />
      <!-- {{emailVal}}这一行可以用来验证v-model双向绑定 -->
    </div>
    <template #submit> <!-- 使用具名插槽-->
      <span class="btn btn-danger">
        Submit
      </span>
    </template>
  </validate-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const store = useStore()
    const emailVal = ref('')
    const router = useRouter()
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
      {
        type: 'range',
        min: { message: '你的密码至少包括六位，不能含有空格', length: 6 },
        max: { message: '你的密码不能超过24位', length: 24 }
      }
    ]
    const onFormSubmit = (result: boolean) => { // 接收子组件传来的result
      // console.log('表单输入结果为', result)
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(data => {
          console.log(data)
          router.push('/')
        }).catch(e => {
          console.log(e)
        })
        router.push('/') // 登陆成功后直接跳转到首页
        store.commit('login')
      }
    }
    return {
      emailRules,
      emailVal,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>
