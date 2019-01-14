const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxcc74c0086dfb2171',

    // 微信小程序 App Secret
    appSecret: 'd58922fc1b302c358b19456f1d6cffaf',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: false,

    qcloudAppId: 1258025714,
    qcloudSecretId: 'AKIDEGXbcR9VqjpgN2rvd47v24xNsHSwqd4J',
    qcloudSecretKey: 'npMeAFufCW8qyAt42qEOHwRTgZEURzS9',

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'movies',
        pass: 'wxcc74c0086dfb2171',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: '',
        mimetypes: ['audio/x-aac', 'audio/mpeg', 'video/webm', 'audio/mpeg', 'audio/mp3', 'audio/m4a']
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
