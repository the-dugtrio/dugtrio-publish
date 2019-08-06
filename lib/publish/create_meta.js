"use strict";

const execSync = require("child_process").execSync;
const fs = require("fs");
const git = require("git-rev-sync");
const chalk = require("chalk");
const version = require("./version");
const Const = require("../const");
const pkg = require(Const.PACKAGE_JSON_PATH);
const env = require("../env");

module.exports = {
    meta: {},
    run: function(done) {
        done = done || Const.defaultCallback;
        try {
            this._generateMetaJson();
            console.log(chalk.green("生成压缩文件成功"));
            return done();
        } catch (e) {
            return done(new Error("生成 Meta 文件出错"));
        }
    },
    /**
     * 在 dist 下生成 meta.json 文件
     */
    _generateMetaJson() {
        // meta.json 所在的文件夹可能不存在，需要创建一下
        try {
            execSync(`mkdir -p ${Const.GZ_FILES_FOLDER}`);
        } catch (e) {}
        /**
         * 1. node npm 版本
         * 2. dependencies 安装后具体的版本
         */
        this.meta.env = env.getBuildEnv();
        this.meta.name = Const.SERVER_RELATIVE_PATH.replace(/\//g, "-");
        this.meta.version = pkg.version;
        try {
            this.meta.commitId = git.long(Const.PROJECT_ROOT);
        } catch (e) {}
        this.meta.nodeVersion = version._getNodeVersion();
        this.meta.npmVersion = version._getNpmVersion();
        this.meta.organization = Const.organization;
        this.meta.relativePath = Const.SERVER_RELATIVE_PATH;
        const metaContent = JSON.stringify(this.meta, null, 4);
        fs.writeFileSync(Const.META_JSON, metaContent);
    }
};
