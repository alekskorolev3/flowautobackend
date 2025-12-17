module.exports = {
    apps: [
        {
            name: 'flowauto-backend',
            script: 'src/server.js',
            instances: 1,
            exec_mode: 'fork',
            env: {
                NODE_ENV: 'production'
            }
        }
    ]
}
