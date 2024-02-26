'use client';

import { PropsWithChildren } from 'react';

import { Bootstrap as SafetestBootstrap } from 'safetest/react';

import { imports } from './imports';

export const Bootstrap = (props: PropsWithChildren) => (
  <SafetestBootstrap imports={imports}>{props.children}</SafetestBootstrap>
);
