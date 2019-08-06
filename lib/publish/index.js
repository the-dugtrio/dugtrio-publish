"use strict";

const execSync = require("child_process").execSync;
const Const = require("../const");
const server = require("../server");
const env = require("../env");

module.exports = {
    publish: function() {
        const serverAssetsPath = server.getAssetsPath(env.publishEnv);
        const sourceFiles = Const.DIST_FOLDER_PATH + "/*";

        const createDirCmd = `ssh ${server.remoteSever} 'mkdir -p ${serverAssetsPath}'`;
        try {
            execSync(createDirCmd);
        } catch (e) {
            console.log("创建项目文件夹失败\n");
            process.exit(1);
        }

        const uploadFileCmd = `rsync -rvI --delete-after --progress ${sourceFiles} ${
            server.remoteSever
        }:${serverAssetsPath}`;
        try {
            execSync(uploadFileCmd);
        } catch (e) {
            console.log("上传文件到测试服务器失败\n");
            process.exit(1);
        }
        console.log("\n");
        console.log("🚀  发布成功\n");
        //console.log(`🔗链接地址 ${server.getAllVisitUrl(env.publishEnv)}\n`);
    }
};
