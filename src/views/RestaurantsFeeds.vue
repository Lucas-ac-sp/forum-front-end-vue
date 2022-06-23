<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template v-else>
      <h1 class="mt-5">
        最新動態
      </h1>
      <hr>
      <div class="row">
        <div class="col-md-6">
          <h3>最新餐廳</h3>
          <!-- 最新餐廳 NewestRestaurants -->
          <NewestRestaurants :restaurants="restaurants"/>
        </div>
        <div class="col-md-6">
          <!-- 最新評論 NewestComments-->
          <h3>最新評論</h3>
          <NewestComments :comments="comments" />
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
import NavTabs from './../components/NavTabs'
import NewestRestaurants from './../components/NewestRestaurants.vue'
import NewestComments from './../components/NewestComments.vue'
import Spinner from './../components/Spinner'


export default {
  components: {
    // 可以自定義名稱
    NavTabs,
    NewestRestaurants,
    NewestComments,
    Spinner
  },
  data () {
    return {
      restaurants: [],
      comments: [],
      isLoading: true
    }
  },
  created () {
    this.fetchFeeds()
  },
  methods: {
    async fetchFeeds () {
			try {
				const  response = await restaurantsAPI.getFeeds()

				const { 
					restaurants,
					comments,
				} = response.data

				this.restaurants = restaurants
				this.comments = comments.filter(comment => comment.Restaurant && comment.text)
        this.isLoading = false
			} catch (error) {
        this.isLoading = false
				console.log('error', error)
				Toast.fire ({
					icon: 'error',
					title: '無法取的餐廳資料，請稍後再試' 
				})
			}
			
    }
  }
}
</script>