<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />
		<Spinner v-if="isLoading" />
		<template v-else>
			<div class="row">
				<!-- 餐廳卡片 RestaurantCard-->
				<RestaurantCard 
					v-for="restaurant in restaurants"
					:key="restaurant.id"
					:initial-restaurant="restaurant"
				/>
			</div>

			<!-- 分頁標籤 RestaurantPagination -->
			<RestaurantsPagination
				v-if="totalPage.length > 1"
				:current-page="currentPage"
				:total-page="totalPage"
				:category-id="categoryId"
				:previous-page="previousPage"
				:next-page="nextPage"
			/>

			<div v-if="restaurants.length < 1">
				此類別目前無餐廳資料
			</div>
		</template>
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs'
import RestaurantCard from './../components/RestaurantCard'
import RestaurantsNavPills from './../components/RestaurantsNavPills'
import RestaurantsPagination from "./../components/RestaurantsPagination"
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
import Spinner from './../components/Spinner'


export default {
  components: {
    // 可以自定義名稱
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
		RestaurantsPagination,
		Spinner
  },
  data () {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
			isLoading: true
    }
  },
  created () {
		const {page = '',categoryId = ''} = this.$route.query
    this.fetchRestaurants({ 
			queryPage: page, 
			queryCategoryId: categoryId
		})
  },
	// 使用 beforeRouteUpdate 方法取得使用者路由變化
	beforeRouteUpdate (to, from, next) {
		// 如果沒有值得話'undefined'。就預設是空值''
		const { page = '', categoryId = '' } = to.query
		this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId})
		next()
	},

  methods: {
    async fetchRestaurants ({queryPage, queryCategoryId}) {

      try {
				this.isLoading = true
				const response = await restaurantsAPI.getRestaurants({
					page: queryPage,
					categoryId: queryCategoryId
				})
		
				if (response.statusText !== 'OK') {
					throw new Error(response.statusText)
				}

				// STEP 2：透過解構賦值，將所需要的資料從 response.data 取出
				const {
					restaurants,
					categories,
					categoryId,
					page,
					totalPage,
					prev,
					next
				} = response.data
				// STEP 3：將從伺服器取得的 data 帶入 Vue 內
				
				this.restaurants = restaurants
				this.categories = categories
				this.categoryId = categoryId
				this.currentPage = page
				this.totalPage = totalPage
				this.previousPage = prev
				this.nextPage = next

				this.isLoading = false
			} catch (error) {
				this.isLoading = false
				console.log('error', error)
				Toast.fire({
					icon: 'error',
					title: '無法取的餐廳資料，請稍後再試'
				})
			}
    } 
  }
}
</script>