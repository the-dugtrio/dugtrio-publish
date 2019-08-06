/* eslint-disable max-len */
"use strict";

const path = require("path");

//当前执行的根路径
const PROJECT_ROOT = process.cwd();
//package.json的路径
const PACKAGE_JSON_PATH = path.resolve(PROJECT_ROOT, "package.json");

//config/project.config.js路径 这个路径是放在项目脚手架中的
const PROJECT_CONFIG_PATH = path.resolve(PROJECT_ROOT, "config/project.config.js");

//package.json的对象
const packageJsonContent = require(PACKAGE_JSON_PATH);

let projectConfigContent = {};
try {
    //项目的配置对象
    projectConfigContent = require(PROJECT_CONFIG_PATH);
} catch (e) {}

//   项目配置文件夹的需要上传的文件名  或者dist
const LOCAL_FOLDER_NAME = projectConfigContent.publishSourceFolder || "dist";

const DIST_FOLDER_PATH = path.resolve(PROJECT_ROOT, LOCAL_FOLDER_NAME);
//服务器上传文件的路径 serverRelativePath或者 department+name
const SERVER_RELATIVE_PATH =
    projectConfigContent.serverRelativePath || `${projectConfigContent.department}/${projectConfigContent.name}`;

const GZ_FOLDER_NAME = packageJsonContent.version;
//打包后的名字 带版本号
const GZ_FILES_FOLDER = path.resolve(PROJECT_ROOT, GZ_FOLDER_NAME);

const META_JSON = path.resolve(GZ_FILES_FOLDER, "meta.json");
const TAR_COMMAND = path.resolve(__dirname, "../tar");

const GZ_FILENAME = `${GZ_FOLDER_NAME}.zip`;
const GZ_FULL_FILENAME = path.resolve(PROJECT_ROOT, GZ_FILENAME);

module.exports = {
    defaultCallback: function() {
        console.log("default callback function");
    },
    organization: projectConfigContent.organization || "dugtrio",
    PACKAGE_JSON_PATH: PACKAGE_JSON_PATH,
    PROJECT_ROOT: PROJECT_ROOT,
    DIST_FOLDER_PATH: DIST_FOLDER_PATH,
    SERVER_RELATIVE_PATH: SERVER_RELATIVE_PATH,
    GZ_FOLDER_NAME: GZ_FOLDER_NAME,
    GZ_FILES_FOLDER: GZ_FILES_FOLDER,
    META_JSON: META_JSON,
    GZ_FILENAME: GZ_FILENAME,
    GZ_FULL_FILENAME: GZ_FULL_FILENAME
};
