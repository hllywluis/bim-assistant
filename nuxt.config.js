module.exports = {
    css: [
        '@/assets/stylesheets/app.css'
    ],
    modules: [
        'bootstrap-vue/nuxt',
        '@nuxtjs/pwa',
        '@nuxtjs/firebase'
    ],
    firebase: {
        config: {
            apiKey: "AIzaSyCzGu7JgGFSoYV4jKsOafTs7S3_1jJtoVE",
            authDomain: "bim-va-jtrhjo.firebaseapp.com",
            databaseURL: "https://bim-va-jtrhjo.firebaseio.com",
            projectId: "bim-va-jtrhjo",
            storageBucket: "bim-va-jtrhjo.appspot.com",
            messagingSenderId: "573839619589",
            appId: "1:573839619589:web:1c32dba0e7efe5ef5ace6c"
        },
        services: {
            auth: {
                persistence: 'local',
                initialize: {
                    onAuthStateChangedMutation: 'ON_AUTH_STATE_CHANGED_MUTATION',
                    onAuthStateChangedAction: 'onAuthStateChangedAction'
                },
                ssr: true
            },
            firestore: {
                memoryOnly: false,
                static: false,
                preload: false,
                chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]',
                enablePersistence: true
            }
        }
    },
    pwa: {
        meta: false,
        icon: false,
        workbox: {
            importScripts: [
                '/firebase-auth-sw.js'
            ]
        }
    },
    bootstrapVue: {
        icons: true
    },
    render: {
        bundleRenderer: {
            runInNewContext: false
        }
    },
    plugins: [
        '@/plugins/firestore'
    ],
    head: {
        link: [
            {
                rel: 'icon',
                type: 'image/x-icon',
                href: 'favicon.ico'
            },
            {
                rel: 'stylesheet',
                href: 'https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css'
            }
        ],
        script: [
            {
                src: 'https://developer.api.autodesk.com/modelderivative/v2/viewers/three.min.js?v=2.7.*'
            },
            {
                src: 'https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.js'
            }
        ]
    }
}