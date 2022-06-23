<template>
  <!-- Spinner 要包一個div -->
  <div>
    <Spinner v-if="isLoading" />
    <form 
      v-else
      @submit.stop.prevent="handleSubmit"
    >
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          class="form-control"
          name="name"
          placeholder="Enter name"
          required
          v-model="restaurant.name"
        >
      </div>

      <div class="form-group">
        <label for="categoryId">Category</label>
        <select
          id="categoryId"
          class="form-control"
          name="categoryId"
          required
          v-model="restaurant.categoryId"
        >
          <option
            value=""
            selected
            disabled
          >
            --請選擇--
          </option>
          <option 
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="tel">Tel</label>
        <input
          id="tel"
          type="text"
          class="form-control"
          name="tel"
          placeholder="Enter telephone number"
          v-model="restaurant.tel"
        >
      </div>

      <div class="form-group">
        <label for="address">Address</label>
        <input
          id="address"
          type="text"
          class="form-control"
          placeholder="Enter address"
          name="address"
          v-model="restaurant.address"
        >
      </div>

      <div class="form-group">
        <label for="opening-hours">Opening Hours</label>
        <input
          id="opening-hours"
          type="time"
          class="form-control"
          name="opening_hours"
          v-model="restaurant.openingHours"
        >
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          class="form-control"
          rows="3"
          name="description"
          v-model="restaurant.description"
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img 
          v-if="restaurant.image"
          :src="restaurant.image"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
        >

        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        >
      </div>

      <button
        type="submit"
        class="btn btn-primary"
      >
        {{ isProcessing ? "處理中..." : "送出"}}
      </button>
    </form>
  </div>
</template>

<script>
import adminAPI from './../apis/admin'
import { Toast } from './../utils/helpers'
import Spinner from './../components/Spinner'

export default {
  components: {
    Spinner
  },
  props: {
    initialRestaurant: {
      type: Object,
      default: () => ({
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: '',
      })
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      restaurant: {
        name: '',
        categoryId: '',
        tel: '',
        address: '',
        description: '',
        image: '',
        openingHours: ''
      },
      categories: [],
      isLoading: true
    }
  },
  watch: {
    initialRestaurant (newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue
      }
    }
  },
  created () {
    this.fetchCategories()
    this.restaurant= {
      // 第一步先展開 data 裡的預設值，也就是空白表單
      ...this.restaurant,
      // 接著展開 props 裡的資料，也就是父層傳進來的資料，如果沒有資料，就調動 default 的回傳值，仍然是空白表單
      ...this.initialRestaurant
      // 若屬性名稱相同，第二組內容會蓋過第一組內容
    }
  },
  methods: {
    async fetchCategories () {
      try {
        const { data } = await adminAPI.categories.get()
 
        this.categories = data.categories
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳類別，請稍後再試'
        })
      }
    },
    handleFileChange (e) {
      const { files } = e.target

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.restaurant.image = ''
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0])
        this.restaurant.image = imageURL
      }
    },
    handleSubmit (e) {
      if (!this.restaurant.name) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫餐廳名稱'
        })
        return
      } else if (!this.restaurant.categoryId) {
        Toast.fire({
          icon: 'warning',
          title: '請選擇餐廳類別'
        })
      }

      const form = e.target
      const formData = new FormData(form)
      this.$emit('after-submit', formData)
    }
  }
}
</script>