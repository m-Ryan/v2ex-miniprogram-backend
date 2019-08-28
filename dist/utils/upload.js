"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const qiniu = __importStar(require("qiniu"));
const fs_1 = __importDefault(require("fs"));
const tranform_to_readstream_1 = __importDefault(require("tranform-to-readstream"));
function uploadQiuNiuFile(fileData) {
    if (!fileData.data) {
        throw new Error('文件数据不能为空');
    }
    const { token, origin, options } = getQiniu(fileData.name);
    const readerStream = new tranform_to_readstream_1.default(fileData.data);
    const formUploader = new qiniu.form_up.FormUploader(options);
    const putExtra = new qiniu.form_up.PutExtra();
    return new Promise((resolve, reject) => {
        formUploader.putStream(token, fileData.name, readerStream, putExtra, (respErr, respBody, respInfo) => {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode === 200) {
                resolve(origin + '/' + respBody.key);
            }
            else {
                console.log(respInfo);
                throw new Error('上传失败');
            }
        });
    });
}
exports.uploadQiuNiuFile = uploadQiuNiuFile;
function getQiniu(name) {
    const accessKey = '2WAZdi48g5fLK3645nwy8FEb5_XaqYooOhh35AuG';
    const secretKey = 'XIKjs-HKSEiOusWztCRQ565KvDAcQRxHtY5ZO_xh';
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
        scope: 'mryan',
    };
    if (name) {
        options.scope = 'mryan:' + name;
    }
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    return {
        token: uploadToken,
        origin: 'http://assets.maocanhua.cn',
        options,
    };
}
exports.getQiniu = getQiniu;
function fsReadAsync(path, options) {
    return new Promise((resolve, reject) => {
        return fs_1.default.readFile(path, options, (err, data) => {
            if (err) {
                reject(err);
            }
            return resolve(data);
        });
    });
}
exports.fsReadAsync = fsReadAsync;
function fsUnlinkAsync(path) {
    return new Promise((resolve, reject) => {
        fs_1.default.unlink(path, err => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });
}
exports.fsUnlinkAsync = fsUnlinkAsync;
//# sourceMappingURL=upload.js.map