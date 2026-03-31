import type { GlobalRole } from '@prisma/client'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      globalRole: GlobalRole
    }
  }

  interface User {
    globalRole?: GlobalRole
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    globalRole: GlobalRole
  }
}
