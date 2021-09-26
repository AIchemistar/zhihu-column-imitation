<template>
  <div class="validate-input-container pb-3">
    <input
        type="text"
        class="form-control"
        :class="{'is-invalid': inputRef.error}"
        id="exampleInputEmail1"
        :value="inputRef.val"
        @blur="validateInput"
        @input="updateValue"
        v-bind="$attrs"
    >
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from 'vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
    type: 'required' | 'email' | 'range'
    message?: string
    min?: {length: number; message: string}
    max?: {length: number; message: string}
}
export type RulesProp = RuleProp[]

export default defineComponent({
    props: {
        rules: Array as PropType<RulesProp>,
        modelValue: String
    },
    inheritAttrs: false,
    setup (props, context) {
      const inputRef = reactive({
          val: props.modelValue || '',
          error: false,
          message: ''
      })
      const updateValue = (e: KeyboardEvent) => {
        const targetValue = (e.target as HTMLInputElement).value
        inputRef.val = targetValue
        context.emit('update:modelValue', targetValue)
      }
      const validateInput = () => {
        if (props.rules) { // 如果
          const allPassed = props.rules.every(rule => {
            let passed = true
            inputRef.message = rule.message || ''
            switch (rule.type) {
              case 'required': // 判断require是否满足
                passed = (inputRef.val.trim() !== '')
                break
              case 'email': // 判断email是否满足
                passed = emailReg.test(inputRef.val)
                break
              case 'range': {
                const { min, max } = rule // min 和 max 是passwordRules里面定义的
                if (min && inputRef.val.trim().length < min.length) {
                  passed = false
                  inputRef.message = min.message
                }
                if (max && inputRef.val.trim().length > max.length) {
                  passed = false
                  inputRef.message = max.message
                }
                break
              }
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
          validateInput,
          updateValue
      }
    }
})
</script>
