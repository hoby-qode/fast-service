import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get('currentUser')?.value
    return NextResponse.next()
}
 
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
// }