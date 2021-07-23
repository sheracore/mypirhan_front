// import Raven from 'raven-js'

function init(){
    // Raven.config('https://5ce941baa6324f29993bada802276e17@o588416.ingest.sentry.io/5739001' , {
    // release: '1-0-0',
    // environment: 'development-test',
// }).install()
}

function log(error){
    console.log(error)
    // Raven.captureException(error)
}

export default {
    init,
    log
}