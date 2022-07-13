import AnchorLink from 'anchor-link';
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport';
import { setCookie, destroyCookie } from 'nookies';
import { chainId, nodeUrl, identifier } from '@configs/telosConfig';

// Link to help integrate with Anchor Wallet
// https://greymass.github.io/anchor-link-demo-multipass/
// https://github.com/greymass/anchor-link-demo-multipass/blob/master/src/App.js

const transport = new AnchorLinkBrowserTransport();

export const link = new AnchorLink({
  transport,
  chains: [
    {
      chainId,
      nodeUrl,
    },
  ],
});

export async function createSession() {
  const { session } = await link.login(identifier);
  const user = String(session.auth.actor);

  setCookie(undefined, 'telosworks.user', user, {
    path: '/',
  });

  return {
    session,
    user,
  };
}

export async function removeSession() {
  const { session } = await restoreSession();
  await link.removeSession(identifier, session.auth, session.chainId);

  destroyCookie(undefined, 'telosworks.user', {
    path: '/',
  });
}

export async function restoreSession() {
  const session = await link.restoreSession(identifier);

  if (!session) {
    destroyCookie(undefined, 'telosworks.user', {
      path: '/',
    });
    return {
      session: null,
      user: '',
    };
  }
  const user = String(session.auth.actor);
  setCookie(undefined, 'telosworks.user', user, {
    path: '/',
  });

  return {
    session,
    user,
  };
}
