"use strict";

const Const = require("./const");
const folder = require("./folder");

const SERVER_MAP = {
    stable: "http://stable.luway.cn",
    dev: "http://dev.luway.cn",
    prepub: "http://prepub.luway.cn",
    prod: "http://www.luway.cn"
};

module.exports = {
    remoteSever: "root@139.196.91.93",
    serverBasePath: "dugtrio-fe/projects",
    getAllVisitUrl(env) {
        const htmls = folder.getHtmlNames();
        return htmls.map(html => `${SERVER_MAP[env]}/projects/${Const.SERVER_RELATIVE_PATH}/${html}`);
    },
    getAssetsPath: function(env) {
        return `/home/dugtrio/${env}/${this.serverBasePath}/${Const.SERVER_RELATIVE_PATH}`;
    }
};
