<template>
 <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm 
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'

export default {
  components: {
    AdminRestaurantForm
  },
  data () {
    return {
      isProcessing: false
    }
  },
  methods: {
    async handleAfterSubmit (formData) {

      // 透過 API 將表單資料送到伺服器
      // for (let [name, value] of formData.entries()) {
      //   console.log(name + ': ' + value)
      // }
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.create({formData})

        if(data.status !== 'success') {
          throw new Error (data.message)
        }
        // 成功的話則轉址到 `/admin/restaurants`
        this.$router.push({ name: 'admin-restaurants' })
      } catch (error) {
        this.isProcessing = true
        Toast.fire({
          icon: 'error',
          title: '無法建立餐廳，請稍後再試'
        })
      }

      
    }
  }
}
</script>

