<template>
  <div class="container py-5">
    <form @submit.stop.prevent ="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
          v-model="user.name"
        >
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="user.image"
          :src="user.image"
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
        :disabled="isProcessing"
      >
        {{ isProcessing ? "資料更新中..." : "Submit"}}
      </button>
    </form>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'

export default {
  data () {
    return {
      user: {
        name: '',
        image: ''
      },
      isProcessing: false
    }
  },
  computed : {
    ...mapState(['currentUser'])
  },
  methods: {
    setUser () {
      this.user.name = this.currentUser.name
      this.user.image = this.currentUser.image
    },
    handleFileChange (e) {
      const {files} = e.target
      if(files.length === 0) {
        this.user.image = ''
      } else {
        const imageURL = window.URL.createObjectURL(files[0])
        this.user.image = imageURL
      }
    },
    async handleSubmit (e) {
      if (!this.user.name) {
        Toast.fire({
          icon: 'warning',
          title: '請填寫稱呼'
        })
        return
      }
			try {
        this.isProcessing = true
       
        const form = e.target
        const formData = new FormData(form)
				const { data, statusText  } = await usersAPI.update({formData, userId: this.currentUser.id})
        
        if (data.status !== 'success' || statusText !== 'OK') {
          throw new Error(statusText)
        } 
        // 更新完成後轉址到使用者詳細頁
        this.$router.push({name:'user-profile', params: {id: this.currentUser.id}})
			} catch (error) {
        this.isProcessing = false
				console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法更新使用者資料，請稍後再試'
        })
      }

      // for (let [name, value] of formData.entries()) {
      //   console.log(name + ':' + value)
      // }
    }
  },
  created () {
		const { id } = this.$route.params
    // 若使用者嘗試直接從路由進入其他使用者的 edit 頁，則轉址
    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: 'not-found' })
      return 
    }

    this.setUser ()
  },
  watch : {
    // 透過 watch 監控 currentUser 有無變化
    // 由於 currentUser 是透過非同步的方式取得，需要透過 watch 屬性來監控當 currentUser 有變更後，需要在呼叫一次 setUser 的方法把資料帶入該 Vue 組件內
    currentUser (newValue) {
			this.setUser ()
    }
  },
  // 路由改變時重新抓取資料
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params

    if (id.toString() !== this.currentUser.id.toString()) {
      this.$router.push({ name: 'not-found' })
      return
    }
    this.setUser()
    next()
  }

}
</script>

