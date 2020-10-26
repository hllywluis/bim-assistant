const ForgeSDK = require('forge-apis')
const config = require('../config/config')
const BucketsAPI = new ForgeSDK.BucketsApi()


const oAuth2Legged = new ForgeSDK.AuthClientTwoLegged(config.consumerKey, config.consumerSecret, [
    'data:read',
    'data:write',
    'bucket:read',
    'bucket:create'
], true)

let newBucket = new ForgeSDK.PostBucketsPayload()
newBucket.bucketKey = ""
newBucket.allow = new ForgeSDK.PostBucketsPayloadAllow(config.consumerKey, "full")
newBucket.policyKey = ForgeSDK.PostBucketsPayload.PolicyKeyEnum.persistent

export default {
    path: '/api/createBucket',
    handler(req, res) {

        oAuth2Legged.authenticate().then(credentials => {
            BucketsAPI.createBucket(newBucket, {}, oAuth2Legged, credentials).then(bucket => {
                res.end(JSON.stringify(bucket))
            })
        })
    }
}