import { TFunction } from 'i18next';

export const getAvailablePages = (t: TFunction<'translation', undefined>) => [
  {
    path: '/dashboard',
    name: t('navbar.home'),
    component: 'DashboardPage',
  },
  {
    path: '/bills',
    name: t('navbar.bills'),
    component: 'BillPage',
  },
  {
    path: '/upload',
    name: t('navbar.upload'),
    component: 'UploadPage',
  },
];
