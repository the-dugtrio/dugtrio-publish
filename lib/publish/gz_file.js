"use strict";

const execSync = require("child_process").execSync;
const chalk = require("chalk");
const Const = require("../const");

module.exports = {
    run: function(done) {
        done = done || Const.defaultCallback;
        try {
            this._generateGzFile();
            console.log(chalk.green("生产压缩包成功"));
            return done();
        } catch (e) {
            return done(new Error("生成压缩包失败"));
        }
    },

    /**
     * 生成需要发布的压缩文件
     *
     *  1. 生成 projectName-version 的文件夹
     *  2. dist 目录放入这个文件夹
     *  3. meta 信息放入这个文件夹
     */
    _generateGzFile() {
        try {
            execSync(`mkdir -p ${Const.GZ_FILES_FOLDER}`);
        } catch (e) {}

        execSync(`cd ${Const.PROJECT_ROOT} && cp -r ${Const.DIST_FOLDER_PATH} ${Const.GZ_FILES_FOLDER}/dist`);

        // tar 命令打包，打包的文件名不能有 / 开头
        const cmd = `cd ${Const.GZ_FOLDER_NAME} && zip -qr ${Const.GZ_FILENAME} dist meta.json && mv ./${
            Const.GZ_FILENAME
        } ../`;
        execSync(cmd, { stdio: "inherit" });
    },

    /**
     * 删除发布的 gz 压缩文件，以及临时生成的目录
     */
    removeGzipFile() {
        // TODO 可以在升级脚本中，添加到 gitignore 中
        try {
            execSync(`rm -rf ${Const.GZ_FILES_FOLDER}`);
            execSync(`rm ${Const.GZ_FULL_FILENAME}`, { stdio: "inherit" });
        } catch (e) {}
    }
};
