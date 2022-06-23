// ./src/views/RestaurantsTop.vue

<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">
        人氣餐廳
      </h1>

      <hr>
      <div
        class="card mb-3"
        style="max-width: 540px;margin: auto;"
        v-for="restaurant in restaurantsTop"
        :key="restaurant.id"
      >
        <div class="row no-gutters">
          <div class="col-md-4">
            <a href="#">
              <img
                class="card-img"
                :src="restaurant.image"
              >
            </a>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">
                {{restaurant.name}}
              </h5>
              <span class="badge badge-secondary">收藏數：{{restaurant.FavoriteCount}}</span>
              <p class="card-text">
                {{restaurant.description}}
              </p>
              <router-link
                :to="{name:'restaurant', params: {id: restaurant.id}}"
                class="btn btn-primary mr-2"
              >Show</router-link>

              <button
                v-if="restaurant.isFavorited"
                type="button"
                class="btn btn-danger mr-2"
                @click.stop.prevent="deleteFavorite(restaurant.id)"
              >
                移除最愛
              </button>
              <button
                v-else
                type="button"
                class="btn btn-primary"
                @click.stop.prevent="addFavorite(restaurant.id)"
              >
                加到最愛
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import NavTabs from './../components/NavTabs'
  import restaurantAPI from './../apis/restaurants'
  import usersAPI from './../apis/users'
  import { Toast } from './../utils/helpers'
  import Spinner from './../components/Spinner'

  export default {
    components: {
      // 可以自定義名稱
      NavTabs,
      Spinner
    },
    data () {
      return {
        restaurantsTop : [],
        isLoading: true
      }
    },
    methods: {
      async fetchTopRestaurants () {
        try {
          const response = await restaurantAPI.getTopRestaurants()
          const {restaurants} = response.data
          this.restaurantsTop = restaurants
          this.isLoading = false
        } catch (error) {
          this.isLoading = false
          console.log('error', error)
          Toast.fire({
            icon: 'error',
            title: '無法取的人氣餐廳資料'
          })
        }
      },
      async addFavorite (restaurantId) {
        try {
          const { data } = await usersAPI.addFavorite({restaurantId})

          if (data.status !== 'success') {
            throw new Error (data.message)
          }
          this.restaurantsTop = this.restaurantsTop.map(restaurant => {
            if (restaurant.id === restaurantId) {
              return {
                ...restaurant,
                isFavorited : true,
                FavoriteCount : restaurant.FavoriteCount + 1
              }
            } else {
              return restaurant
            }
          })
        } catch (error) {
          console.log('error', error)
          Toast.fire({
            icon: 'error',
            title: '無法將餐廳加入最愛，請稍後再試'
          })
        }
        
      },
      async deleteFavorite (restaurantId) {
        try {
          const { data } = await usersAPI.deleteFavorite({restaurantId})

          if (data.status !== 'success') {
            throw new Error (data.message)
          }

          
          this.restaurantsTop = this.restaurantsTop.map(restaurant => {
            if (restaurant.id === restaurantId) {
              return {
                ...restaurant,
                isFavorited : false,
                FavoriteCount : restaurant.FavoriteCount - 1
              } 
            } else {
              return restaurant
            }
          }) 
            
        } catch (error) {
          console.log('error', error)
          Toast.fire({
            icon: 'error',
            title: '無法將餐廳移除最愛，請稍後再試'
          })
        }
      }
    },
    created () {
      this.fetchTopRestaurants ()
    }

  }
</script>