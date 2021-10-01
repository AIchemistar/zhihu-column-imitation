<template>
  <div class="validate-input-container pb-3">
    <input
        v-if="tag !== 'textarea'"
        class="form-control"
        :class="{'is-invalid': inputRef.error}"
        :value="inputRef.val"
        @blur="validateInput"
        @input="updateValue"
        v-bind="$attrs"
    >
    <textarea
        v-else
        class="form-control"
        :class="{'is-invalid': inputRef.error}"
        :value="inputRef.val"
        @blur="validateInput"
        @input="updateValue"
        v-bind="$attrs"
    >
    </textarea>
    <span v-if="inputRef.error" class="invalid-feedback">{{inputRef.message}}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
interface RuleProp {
    type: 'required' | 'email' | 'range' | 'custom'
    message?: string
    min?: {length: number; message: string}
    max?: {length: number; message: string}
    validator?: () => boolean;
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea' // 由用户确定传入的是input还是textarea

export default defineComponent({
    props: {
        rules: Array as PropType<RulesProp>,
        modelValue: String,
        tag: {
          type: String as PropType<TagType>,
          default: 'input'
        }
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
              case 'custom':
                passed = rule.validator ? rule.validator() : true
                break
              default: // 后续还可以添加新的错误类型
                break
            }
            return passed
          })
          inputRef.error = !allPassed
          return allPassed
        }
        return true // rules不存在返回true
      }
      onMounted(() => {
        emitter.emit('form-item-created', validateInput)
      })
      return {
          inputRef,
          validateInput,
          updateValue
      }
    }
})
</script>
