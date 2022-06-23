<template>
  <div class="container py-5">
    <UserProfileCard 
      :user="user"
      :is-current-user="currentUser.id === user.id"
      :initial-is-followed="isFollowed"
    />
<div class="row">
  <div class="col-md-4">
    <UserFollowingsCard 
      :followings="followings"
    />
    <br>
    <UserFollowersCard 
      :followers="followers"
    />
  </div>
  <div class="col-md-8">
    <UserCommentsCard 
      :comments="comments"
    />
    <br>
    <UserFavoritedRestaurantsCard 
      :favorited-restaurants="favoritedRestaurants"
    />
  </div>
  </div>
  </div>

</template>

<script>
import UserProfileCard from '../components/UserProfileCard.vue'
import UserFollowingsCard from '../components/UserFollowingsCard.vue'
import UserFollowersCard from '../components/UserFollowersCard.vue'
import UserCommentsCard from '../components/UserCommentsCard.vue'
import UserFavoritedRestaurantsCard from '../components/UserFavoritedRestaurantsCard.vue'
import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'

export default {
  name: 'User',
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard
  },
  data () {
    return {
      user: {
        id:0,
        image: '',
        name: '',
        email: '',
        followungsLength: 0,
        followersLength: 0,
        favoritedRestaurantsLength: 0
      },
      isFollowed: false,
      followings: [],
      followers: [],
      comments: [],
      favoritedRestaurants: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created () {
    const {id} = this.$route.params
    this.fetchUser(id)
  },
  // 在 beforeRouteUpdate 時要再重新取得使用者資料
  beforeRouteUpdate (to, from , next) {
    const {id} = to.params
    this.fetchUser(id)
    next()
  },
  methods: {
    async fetchUser (userId) {
      try {
        const {data, statusText} = await usersAPI.get({userId})
        
        if (statusText !== 'OK') {
          throw new Error(statusText)
        }

        const { profile,isFollowed } = data
      
        const {
          id,
          image,
          name,
          email,
          Followings,
          Followers,
          Comments,
          FavoritedRestaurants
        } = profile

        this.user = {
          ...this.user,
          id,
          image,
          name,
          email,
          followingsLength: Followings.length,
          followersLength: Followers.length,
          commentsLength:Comments.length,
          favoritedRestaurantsLength: FavoritedRestaurants.length
        }

        this.isFollowed = isFollowed
        this.followings = Followings
        this.followers = Followers
        this.favoritedRestaurants = FavoritedRestaurants
        // 處理 comment.Restaurant 可能有空值的情況
        this.comments = Comments.filter(comment => comment.Restaurant)
      } catch (error) {
        console.log('error', error)
        Toast.fire({
          icon: 'error',
          title: '無法取得使用者資料，請稍後再試'
        })
      }
    }
  },
  
}
</script>