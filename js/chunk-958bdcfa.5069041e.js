(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-958bdcfa"],{6135:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container py-5"},[r("AdminNav"),t.isLoading?r("Spinner"):r("table",{staticClass:"table"},[r("thead",{staticClass:"thead-dark"},[r("tr",[r("th",{attrs:{scope:"col"}},[t._v(" # ")]),r("th",{attrs:{scope:"col"}},[t._v(" Email ")]),r("th",{attrs:{scope:"col"}},[t._v(" Role ")]),r("th",{attrs:{scope:"col",width:"140"}},[t._v(" Action ")])])]),r("tbody",t._l(t.users,(function(e){return r("tr",{key:e.id},[r("th",{attrs:{scope:"row"}},[t._v(" "+t._s(e.id)+" ")]),r("td",[t._v(t._s(e.email))]),r("td",[t._v(t._s(e.isAdmin?"admin":"user"))]),r("td",[t.currentUser.id!==e.id?r("button",{staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(r){return r.stopPropagation(),r.preventDefault(),t.toggleUserRole({userId:e.id,isAdmin:e.isAdmin})}}},[t._v(" "+t._s(e.isAdmin?"set as user":"set as admin")+" ")]):t._e()])])})),0)])],1)},a=[],s=r("1da1"),i=r("5530"),c=(r("96cf"),r("d9e2"),r("d3b7"),r("25f0"),r("d81d"),r("be6c")),u=r("e04c"),o=r("2fa3"),d=r("2f62"),l=r("2375"),m={components:{AdminNav:u["a"],Spinner:l["a"]},data:function(){return{users:[],isLoading:!0}},computed:Object(i["a"])({},Object(d["b"])(["currentUser"])),methods:{fetchUser:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var r,n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c["a"].users.get();case 3:if(r=e.sent,n=r.data,a=r.statusText,"OK"===a){e.next=8;break}throw new Error(a);case 8:t.users=n.users,t.isLoading=!1,e.next=17;break;case 12:e.prev=12,e.t0=e["catch"](0),t.isLoading=!1,console.log("error",e.t0),o["a"].fire({icon:"error",title:"無法取得使用者資料，請稍後再試"});case 17:case"end":return e.stop()}}),e,null,[[0,12]])})))()},toggleUserRole:function(t){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function r(){var n,a,s,u,d,l;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return n=t.userId,a=t.isAdmin,r.prev=1,s=!a,r.next=5,c["a"].users.update({userId:n,isAdmin:s.toString()});case 5:if(u=r.sent,d=u.data,l=u.statusText,"success"===d.status&&"OK"===l){r.next=10;break}throw new Error(l);case 10:e.users=e.users.map((function(t){return t.id===n?Object(i["a"])(Object(i["a"])({},t),{},{isAdmin:s}):t})),r.next=17;break;case 13:r.prev=13,r.t0=r["catch"](1),console.log("error",r.t0),o["a"].fire({icon:"error",title:"無法更新會員角色，請稍後再試"});case 17:case"end":return r.stop()}}),r,null,[[1,13]])})))()}},created:function(){this.fetchUser()}},f=m,p=r("2877"),v=Object(p["a"])(f,n,a,!1,null,null,null);e["default"]=v.exports},be6c:function(t,e,r){"use strict";r("b0c0");var n=r("2fa3");e["a"]={categories:{get:function(){return n["b"].get("/admin/categories")},create:function(t){var e=t.name;return n["b"].post("/admin/categories",{name:e})},update:function(t){var e=t.categoryId,r=t.name;return n["b"].put("/admin/categories/".concat(e),{name:r})},delete:function(t){var e=t.categoryId;return n["b"].delete("/admin/categories/".concat(e))}},restaurants:{create:function(t){var e=t.formData;return n["b"].post("/admin/restaurants",e)},get:function(){return n["b"].get("/admin/restaurants")},delete:function(t){var e=t.restaurantId;return n["b"].delete("/admin/restaurants/".concat(e))},getDetail:function(t){var e=t.restaurantId;return n["b"].get("/admin/restaurants/".concat(e))},update:function(t){var e=t.restaurantId,r=t.formData;return n["b"].put("/admin/restaurants/".concat(e),r)}},users:{get:function(){return n["b"].get("/admin/users")},update:function(t){var e=t.userId,r=t.isAdmin;return n["b"].put("admin/users/".concat(e),{isAdmin:r})}}}},d81d:function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").map,s=r("1dde"),i=s("map");n({target:"Array",proto:!0,forced:!i},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},e04c:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"mb-3"},[r("h1",[t._v("餐廳後台")]),r("router-link",{attrs:{to:"/admin/restaurants"}},[t._v("Restaurants ")]),t._v(" | "),r("router-link",{attrs:{to:"/admin/categories"}},[t._v("Categories")]),t._v(" | "),r("router-link",{attrs:{to:"/admin/users"}},[t._v("Users")])],1)},a=[],s=r("2877"),i={},c=Object(s["a"])(i,n,a,!1,null,null,null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-958bdcfa.5069041e.js.map