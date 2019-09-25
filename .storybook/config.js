import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

addDecorator(
  withInfo({
    header: false
  })
);
configure(require.context('../stories', true, /\.stories\.js$/), module);
