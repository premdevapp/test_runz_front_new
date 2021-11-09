import Mock from './mock'

import './db/auth'
import './db/users'


Mock.onAny().passThrough()
