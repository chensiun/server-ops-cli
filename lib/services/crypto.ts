import * as crypto from 'crypto'

export const signAuth = data => crypto.createHash('md5').update(data).digest('hex')
