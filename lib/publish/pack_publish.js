"use strict";

const execSync = require("child_process").execSync;
const async = require("async");
const Const = require("../const");
const folder = require("../folder");
const version = require("./version");
const createMeta = require("./create_meta");
const server = require("../server");
const env = require("../env");
const GzFile = require("./gz_file");
const chalk = require("chalk");

module.exports = {
    publish: function() {
        async.waterfall(
            [
                next => {
                    console.log(chalk.yellow("step1～检查静态资源是否存在"));
                    folder.run(next);
                },
                next => {
                    console.log(chalk.yellow("step2～校验包版本"));
                    version.run(next);
                },
                next => {
                    console.log(chalk.yellow("step3～生成meta文件"));
                    createMeta.run(next);
                },
                next => {
                    console.log(chalk.yellow("step4～生成压缩文件"));
                    GzFile.run(next);
                }
            ],
            err => {
                if (err) {
                    console.log(err.stack, "\n");
                    execSync(`rm -rf ${Const.GZ_FILES_FOLDER}`);
                    process.exit(1);
                }
                if (process.env.IGNORE_PROD_UPLOAD) {
                    console.log("🗂 存档取消上传\n");
                } else {
                    this._uploadGzFile();
                    console.log("🚀 上传成功\n");
                }
            }
        );
    },
    _uploadGzFile: function() {
        console.log(chalk.yellow("step5～上传压缩文件"));
        const sourceFiles = `${Const.PROJECT_ROOT}/${Const.GZ_FILENAME}`;
        const serverAssetsPath = server.getAssetsPath(env.publishEnv);
        const createDirCmd = `ssh ${server.remoteSever} 'mkdir -p ${serverAssetsPath}'`;
        try {
            execSync(createDirCmd);
        } catch (e) {
            console.log("创建项目文件夹失败\n");
            process.exit(1);
        }
        //上传zip包的地址
        const uploadFileCmd = `rsync -rvI --delete-after --progress ${sourceFiles} ${
            server.remoteSever
        }:${serverAssetsPath}`;
        execSync(uploadFileCmd);
        //移除打包后的文件
        GzFile.removeGzipFile();
    }
};
