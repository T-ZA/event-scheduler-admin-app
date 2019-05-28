import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate, {
  inject: true,
  fieldsBagName: 'veeFields',
  dictionary: {
    attributes: {
      email: 'E-mail address'
    },
    custom: {
      email: {
        required: () => 'Email cannot be empty'
      },
      password: {
        required: () => 'Password cannot be empty'
      }
    }
  }
})
