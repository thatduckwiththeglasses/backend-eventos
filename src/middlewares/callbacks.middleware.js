import passport from 'passport';

export const passportCallback = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({
          status: 'error',
          error: info?.message || (info ? info.toString() : 'No autorizado')
        });
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};