import type { IncomingHttpHeaders } from 'http';
import _ from 'lodash';
import { escapeShell } from '../shared/shell.js';

export function address(
  headers: IncomingHttpHeaders,
  user: string,
  host: string,
): string {
  // Check request-header for username
  const remoteUser = headers['remote-user'];
  if (!_.isUndefined(remoteUser) && !Array.isArray(remoteUser)) {
    return `${escapeShell(remoteUser)}@${host}`;
  }
  if (!_.isUndefined(headers.referer)) {
    // Updated regex to better match the URL path pattern
    const match = headers.referer.match(/\/ssh\/([^/?]+)/);
    if (match) {
      const username = escapeShell(match[1]);
      return `${username}@${host}`;
    }
  }
  return user ? `${escapeShell(user)}@${host}` : host;
}
