import { NextResponse } from 'next/server';
import { getPermissionService } from '@services/configs/getPermissionService';

export async function middleware(request) {
  const user = request.cookies.get('telosworks.user')?.value || null;

  if (!user) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const { isAdministrator } = await getPermissionService({
    user,
  });

  if (!isAdministrator) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}

export const config = {
  matcher: ['/program-managers/:path*'],
};
