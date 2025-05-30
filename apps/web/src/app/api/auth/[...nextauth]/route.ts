import { createAuthOptions } from '@autospace/network/src/config/authOptions'
import NextAuth from 'next-auth'

const handler = NextAuth(createAuthOptions('customer'))

export { handler as GET, handler as POST }
