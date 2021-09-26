<template>
  <div>
    <input
        type="text"
        class="form-control"
        :class="{'is-invalid': inputRef.error}"
        id="exampleInputEmail1"
        v-model="inputRef.val"
        @blur="validateInput"
    >
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
    type: 'required' | 'email'
    message: string
}
export type RulesProp = RuleProp[]

export default defineComponent({
    props: {
        rules: Array as PropType<RulesProp>
    },
    setup (props) {
        const inputRef = reactive({
            val: '',
            error: false,
            message: ''
        })
        const validateInput = () => {
          if (props.rules) { // 如果
            const allPassed = props.rules.every(rule => {
              let passed = true
              inputRef.message = rule.message
              switch (rule.type) {
                case 'required': // 判断require是否满足
                  passed = (inputRef.val.trim() !== '')
                  break
                case 'email': // 判断email是否满足
                  passed = emailReg.test(inputRef.val)
                  break
                default: // 后续还可以添加新的错误类型
                  break
              }
              return passed
            })
            inputRef.error = !allPassed
          }
        }

        return {
            inputRef,
            validateInput
        }
    }
})
</script>
