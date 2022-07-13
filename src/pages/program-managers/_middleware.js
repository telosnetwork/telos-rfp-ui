import { NextResponse } from 'next/server';
import { getPermissionService } from '@services/configs/getPermissionService';

export async function middleware(request, event) {
  const user = request.cookies['telosworks.user'] || null;

  const { isAdministrator } = await getPermissionService({
    user,
  });

  if (!isAdministrator) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
