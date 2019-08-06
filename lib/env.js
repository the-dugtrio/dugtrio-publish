"use strict";

module.exports = {
    publishEnv: "",
    envs: ["dev", "stable", "prepub", "prod"], //环境可选值
    coverEnvs: ["dev", "stable"], // 直接发布本地文件的环境可选值
    validate: function(env) {
        return this.envs.includes(env);
    },
    setPublishEnv: function(env) {
        this.publishEnv = env;
    },
    getPublishEnv: function() {
        return this.publishEnv;
    },
    getBuildEnv: function() {
        return this.publishEnv.includes("dev") ? "dev" : this.publishEnv;
    }
};
