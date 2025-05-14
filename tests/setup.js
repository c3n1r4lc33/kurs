import { config } from '@vue/test-utils';
import { vi } from 'vitest';

config.global.mocks = {
  $router: { push: vi.fn() },
};

// Мок window.scrollTo и location.reload
vi.stubGlobal('scrollTo', vi.fn());
vi.stubGlobal('location', { reload: vi.fn() });