import { login, logout, getInfo } from "@/api/user";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router, { resetRouter, anyRoutes, constantRoutes, asyncApplyRoutes, asyncAuditRoutes } from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: "",
    // 根据角色计算路由信息
    conditionsRouters: [],
    // 最终返回路由信息
    resultAllRouters: []
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  },
  SET_RESULT_ASYNCROUTERS:(state, asyncRouters) => {
    // vuex根据角色保存异步路由
    state.conditionsRouters = asyncRouters;
    // 最终结果：常量路由 + 异步路由 + any路由
    state.resultAllRouters = constantRoutes.concat(state.conditionsRouters,anyRoutes)
    router.addRoutes(state.resultAllRouters)
  },
};

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    let result = await login({ username: username.trim(), password: password });
    if (result.code === 200) {
      commit("SET_TOKEN", result.data.token);
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise(new Error("failed"));
    }
  },

  // get user info
  async getInfo({ commit, state }) {
    let result = await getInfo(state.token);
    // 登录成功
    if (result.code === 200) {
      commit("SET_NAME", result.data.username);
      commit(
        "SET_AVATAR",
        "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif"
      );

      // 根据角色判断，条件路由中的值
      const role = result.data.role
      if(role === 'Reimburser_Auditor'){
        commit('SET_RESULT_ASYNCROUTERS', [...asyncApplyRoutes, ...asyncAuditRoutes])
      }else if(role === 'Reimburser'){
        commit('SET_RESULT_ASYNCROUTERS', asyncApplyRoutes)
      }else if(role === 'Auditor'){
        commit('SET_RESULT_ASYNCROUTERS', asyncAuditRoutes)
      }
      return "ok";
    } else {
      return Promise(new Error("验证失败，请重新登录"));
    }
  },

  // user logout
  async logout({ commit, state }) {
    let result = await logout(state.token);
    if (result.code === 200) {
      removeToken(); // must remove  token  first
      resetRouter();
      commit("RESET_STATE");
    } else {
      return Promise(new Error("退出失败，请重新登录"));
    }
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
