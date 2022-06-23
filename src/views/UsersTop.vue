// ./src/views/UsersTop.vue
<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">
        美食達人
      </h1>
      <hr>
      <div class="row text-center">
        <div 
          v-for="user in users" 
          :key="user.id"
          class="col-3"
        >
          <router-link 
            :to="{name: 'user-profile', params: {id: user.id}}">
            <img
              :src="user.image | emptyImage"
              width="140px"
              height="140px"
            >
          </router-link>
          <h2>{{ user.name }}</h2>
      
          <span 
            class="badge badge-secondary" 
          >追蹤人數：{{user.FollowerCount}}</span>
          <p class="mt-3">
            <button
              v-if="user.isFollowed"
              type="button"
              class="btn btn-danger"
              @click.stop.prevent="deleteFollowing(user.id)"
            >
              取消追蹤
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              @click.stop.prevent="addFollowing(user.id)"
            >
              追蹤
            </button>
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script>

  import NavTabs from './../components/NavTabs'
  // 名稱可以自定義
  import { emptyImageFilter } from './../utils/mixins'
  import usersAPI from './../apis/users'
  import { Toast } from './../utils/helpers'
  import Spinner from './../components/Spinner'


  export default {
    components: {
      // 可以自定義名稱
      NavTabs,
      Spinner
    },
    mixins: [emptyImageFilter],
    data () {
      return {
        users: [],
        isLoading: true
      }
    },
    created () {
      this.fetchUsersTop ()
    },
    methods: {
      async fetchUsersTop () {
        try {
          const { data } = await usersAPI.getTopUsers()

          this.users = data.users
          this.isLoading = false
        } catch (error) {
          this.isLoading = false
          console.log(error)
          Toast.fire({
            icon: 'error',
            title: '無法取的美食達人，請稍後再試'
          })
        }

        
      },
      async addFollowing (userId) {
        try {
          const { data } = await usersAPI.addFollowing( {userId} )
          
          if (data.status !== 'success') {
            throw new Error (data.message)
          }

          this.users = this.users.map(user => {
            if (user.id !== userId) {
              return user
            } else {
              console.log(user.FollowerCount)
              return {
                ...user,
                FollowerCount: user.FollowerCount + 1,
                isFollowed: true
              }
            }
            
          })
        } catch (error) {
          Toast.fire({
            icon: 'error',
            title: '無法加入追蹤，請稍後再試'
          })

        }
      },
      async deleteFollowing (userId) {
        try {
          const { data } = await usersAPI.deleteFollowing( {userId} ) 

          if (data.status !== 'success') {
            throw new Error (data.message)
          }
          
          this.users = this.users.map(user => {
            if (user.id !== userId) {
              return user
            } else {
              return {
                ...user,
                FollowerCount: user.FollowerCount - 1,
                isFollowed: false
              }
            }
          })

        } catch (error) {
          Toast.fire({
            icon: 'error',
            title: '無法取消追蹤，請稍後再試'
          })
        }
      }
    }

  }
</script>