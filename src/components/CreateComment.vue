<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea
        v-model="text"
        class="form-control"
        rows="3"
        name="text"
      />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button
        type="button"
        class="btn btn-link"
        @click="$router.back()"
      >回上一頁</button>
      <button
        type="submit"
        class="btn btn-primary mr-0"
        :disabled="isProcessing"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import {v4 as uuidv4} from "uuid"
import commentsAPI from './../apis/comments'
import { Toast } from './../utils/helpers'

export default {
  name: 'CreateComment',
  props: {
    restaurantId: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      text: '',
      isProcessing: false
    }
  },
  methods: {
    async handleSubmit () {
      try {
        if (!this.text) {
          Toast.fire({
            icon: 'warring',
            title: '您尚未填寫任何評論'
          })
        }

        this.isProcessing = true
        const {data} = await commentsAPI.create({
          restaurantId: this.restaurantId,
          text: this.text
        })

        if (data.status === 'error') {
          throw new Error(data.message)
        }

        // TODO: 向 API 發送 POST 請求
        // 伺服器新增 Comment 成功後...
        this.$emit('after-create-comment', {
          // 尚未串接 API 暫時使用隨機的 id
          commentId: data.commentId, 
          restaurantId: this.restaurantId,
          text: this.text
        })

        this.isProcessing = false
        this.text = ''
      } catch (error) {
        console.error(error.message)
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法新增評論，請稍後再試'
        })
      }
    }
  }
}
</script>

<style scoped>
  .form-group {
    margin: 21px 0 8px;
  }
</style>