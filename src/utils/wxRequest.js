import wepy from 'wepy';
import util from './util';
import tip from './tip'
const API_SECRET_KEY = 'null'
const TIMESTAMP = util.getCurrentTime()
const SIGN = TIMESTAMP + API_SECRET_KEY

const wxRequest = async(params = {}, url) => {
    tip.loading();
    let data = params.query || {};
    let header = { 
        'Content-Type': 'application/json',
        'cookie': wepy.getStorageSync('sessionid')
    } || {}
    data.sign = SIGN;
    data.time = TIMESTAMP;
    let res = await wepy.request({
        url: url,
        method: params.method || 'GET',
        data: data,
        header: header,
    });
    tip.loaded();
    return res;
};


module.exports = {
    wxRequest
}
