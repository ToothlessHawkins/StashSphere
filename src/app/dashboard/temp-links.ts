import { Links } from './links';

export const HOME_LINKS: Links[] = [
  {
    route: '/dash',
    name: 'home',
    i:0
  },
  {
    route: '/dash/files',
    name: 'files',
    i:1
  }
]

export const FILE_LINKS: Links[] = [
  {
    route: '/dash/files',
    name: 'files',
    i:1
  },
  {
    route: '/dash/files/sharing',
    name: 'sharing',
    i:1
  },
  {
    route: '/dash/files/delete',
    name: 'deleted files',
    i:1
  }
]
