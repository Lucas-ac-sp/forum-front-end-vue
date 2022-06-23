<template>
  <div class="container py-5">
    <Spinner v-if="isLoading" />
    <template v-else>
      <!-- <h1>餐廳描述頁</h1> -->
      <!-- 餐廳資訊頁 RestaurantDetail -->
      <RestaurantDetail 
        :initial-restaurant="restaurant"
      />
      <hr>
      <!-- 餐廳評論 RestaurantComments -->
      <RestaurantComments :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
      />
      <!-- 新增評論 CreateComment -->
      <CreateComment 
        :restaurant-id="restaurant.id"
        @after-create-comment="afterCreateComment"
      />
    </template>
  </div>
</template>

<script>
import RestaurantDetail from "./RestaurantDetail.vue"
import RestaurantComments from "./../components/RestaurantComments"
import CreateComment from "./../components/CreateComment.vue"
import Spinner from './../components/Spinner.vue'
import restaurantsAPI from './../apis/restaurants'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
    Spinner
  },
  data () {
    return {
      restaurant: {
        id:-1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description:'',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: [],
      isLoading: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        this.isLoading = true
        const { data } = await restaurantsAPI.getRestaurant({ restaurantId })
        
        const { restaurant, isFavorited, isLiked } = data

        const {
          id,
          name,
          image,
          tel,
          address,
          description,
          Comments,
          Category
        } = restaurant

        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : '未分類',
          image,
          openingHours: restaurant.opening_hours,
          tel,
          address,
          description,
          isFavorited,
          isLiked
        }

        this.restaurantComments = Comments
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取的餐廳資料，請稍後再試'
        })
      }
      
    },
    afterDeleteComment (commentId) {
      // 以 filter 保留未被選擇的 comment.id
       this.restaurantComments = this.restaurantComments.filter(comment => comment.id !== commentId)
    },
    afterCreateComment (payload) {
      // payload = 要攜帶的資料
      const { commentId, restaurantId, text } = payload
      this.restaurantComments.push({
        id:commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date()
      })
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { id:restaurantId } = to.params
    this.fetchRestaurant(restaurantId)
    next()
  }
  
}
</script>