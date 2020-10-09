const ForgeSDK = require('forge-apis')
const config = require('../config/config')
const BucketsAPI = new ForgeSDK.BucketsApi()
const ObjectsAPI = new ForgeSDK.ObjectsApi()
const DerivativesAPI = new ForgeSDK.DerivativesApi()

let bucket
let bucketArray = []
let objectArray = []
let autoRefresh = true

const oAuth2Legged = new ForgeSDK.AuthClientTwoLegged(config.consumerKey, config.consumerSecret, [
    'data:read',
    'data:write',
    'bucket:read'
], autoRefresh)

oAuth2Legged.authenticate().then(function (credentials) {
    BucketsAPI.getBuckets({}, oAuth2Legged, credentials).then(function (buckets) {
        bucket = buckets
        for (let i = 0; i < bucket.body.items.length; ++i) {
            bucketArray.push(bucket.body.items[i])
        }
        console.log(bucketArray)
        ObjectsAPI.getObjects(bucketArray[4].bucketKey, {}, oAuth2Legged, credentials).then(function (objects) {
            objectArray.push(objects.body.items[0])
            let jobInput = new ForgeSDK.JobPayloadInput()
            let jobOutput = new ForgeSDK.JobPayloadOutput()
            let jobPayload = new ForgeSDK.JobPayload()
            let jobItem = []
            jobItem[0] = new ForgeSDK.JobPayloadItem()
            jobInput.urn = Buffer.from(objectArray[0].objectId).toString('base64')
            jobItem[0].type = ForgeSDK.JobPayloadItem.TypeEnum.svf
            jobItem[0].views = ['3d']
            jobOutput.formats = jobItem
            jobPayload.input = jobInput
            jobPayload.output = jobOutput
            DerivativesAPI.translate(jobPayload, {}, oAuth2Legged, credentials).then(function (job) {
                DerivativesAPI.getManifest(job.body.urn, {}, oAuth2Legged, credentials).then(function (manifest) {
                    console.log(manifest)
                }, function (err) {
                    console.error(err)
                })
            }, function (err) {
                console.error(err)
            })
        }, function (err) {
            console.error(err)
        })
    }, function (err) {
        console.error(err)
    })
}, function (err) {
    console.error(err)
})

export default {
    path: '/api/buckets',
    handler(req, res) {
        res.end(JSON.stringify(bucket))
    }
}