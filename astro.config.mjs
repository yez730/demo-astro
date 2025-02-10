// @ts-check
import { defineConfig } from 'astro/config';

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site:"https://jovial-cheesecake-33ae1d.netlify.app",
  integrations: [preact()]
});