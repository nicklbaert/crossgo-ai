const expressJwt = require('express-jwt');
const util = require('util');
import { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req:NextApiRequest, res:NextApiResponse) {
    const middleware = expressJwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            // public routes that don't require authentication
            '/api/users/authenticate'
        ]
    });

    return util.promisify(middleware)(req, res);
}