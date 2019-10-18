module.exports = (req, res, next) => {
  // record startTime
  req._startTime = new Date();
  const { logger } = req.container.cradle;
  const end = res.end;
  res.end = (chunk, encoding) => {
    // get diff for responseTime
    res.responseTime = (new Date()) - req._startTime + ' ms';

    // request info
    const request = {
      remoteAddress: req.ip || req._remoteAddress || (req.connection && req.connection.remoteAddress) || undefined,
      url: req.originalUrl || req.url,
      httpVersion: req.httpVersionMajor + '.' + req.httpVersionMinor,
      userAgent: req.headers['user-agent'],
      method: req.method,
    };

    // response info
    const response = {
      duration: res.responseTime,
      statusCode: res.statusCode,
      message: res.statusMessage,
    };

    const http = { request, response };
    
    if (response.statusCode >= 100 && response.statusCode < 300) { logger.info(http); }
    if (response.statusCode >= 300 && response.statusCode < 400) { logger.warn(http); }
    if (response.statusCode >= 400) { logger.error(http); }
    
    res.end = end;
    res.end(chunk, encoding);
  };
  next();
};
