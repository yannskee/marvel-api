import Vue from "vue";
import VueRouter from "vue-router";
import Characters from "../views/characters.vue";
import CharacterDetails from "../views/character_details.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "characters",
    component: Characters
  },
  {
    path: "/character/:character_id",
    name: "character_details",
    component: CharacterDetails
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
