"use strict";

/**
 * 1. 校验 <LOCAL_FOLDER_NAME> 默认dist 文件夹是否存在
 * 2. 检查 js 文件名是否存在于 html 中
 */
const fs = require("fs");
const Const = require("./Const");
const glob = require("glob");
const chalk = require("chalk");

module.exports = {
    run: function(done) {
        done = done || Const.defaultCallback;
        if (this._checkLocalFolder()) {
            console.log(chalk.green("校验静态资源成功"));
            return done();
        }
        return done(new Error(`校验 ${Const.LOCAL_FOLDER_NAME} 文件夹失败`));
    },

    /**
     * 获取 <LOCAL_FOLDER_NAME> 下 html 名称
     */
    getHtmlNames() {
        return glob.sync("**/*.html", {
            cwd: Const.DIST_FOLDER_PATH
        });
    },

    /**
     * 检查 <LOCAL_FOLDER_NAME> 文件夹目录是否存在
     */
    _checkLocalFolder() {
        try {
            const distStatus = fs.statSync(Const.DIST_FOLDER_PATH);
            return !!distStatus.isDirectory();
        } catch (e) {
            return false;
        }
    }
};
