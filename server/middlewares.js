export const setCors = (req,res,next) => {
    req.setHeader('Access-Control-Allow-Origin', '*');
    req.setHeader('Access-Control-Request-Method', '*');
    req.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    req.setHeader('Access-Control-Allow-Headers', '*');
    console.log(req)
    next()
}