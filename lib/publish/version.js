"use strict";

const execSync = require("child_process").execSync;
const chalk = require("chalk");
const Const = require("../const");
const pkg = require(Const.PACKAGE_JSON_PATH);
const env = require("../env");

const VERSION_ERROR_MESSAGE = `
    版本格式不正确，请确保：

    *** 测试环境版本号格式：x.x.x-beta.x
    *** 预发环境版本号格式：x.x.x-rc.x
    *** 线上环境版本号格式：x.x.x`;

module.exports = {
    meta: {},
    run: function(done) {
        done = done || Const.defaultCallback;

        if (!this._checkVersion()) {
            return done(new Error(VERSION_ERROR_MESSAGE));
        }
        return done();
    },

    _checkVersion() {
        const build_env = env.getBuildEnv();
        if (build_env === "dev" && /^\d+\.\d+\.\d+-beta\.\d+$/.test(pkg.version) === false) {
            return false;
        }
        if (build_env === "prepub" && /^\d+\.\d+\.\d+-rc\.\d+$/.test(pkg.version) === false) {
            return false;
        }
        if (build_env === "prod" && /^\d+\.\d+\.\d+$/.test(pkg.version) === false) {
            return false;
        }
        console.log(chalk.green("版本校验成功"));
        return true;
    },
    _getNpmVersion() {
        return execSync("npm --version", { encoding: "utf8" }).replace(/[\n\t]/g, "") || "";
    },

    _getNodeVersion() {
        return process.version;
    }
};
