import { setWorldConstructor } from '@cucumber/cucumber';
import { BrowserContext, chromium } from '@playwright/test';

export class CustomWorld {
  browserContext: BrowserContext;

  constructor() {
    this.browserContext = null!;
  }

  async initBrowserContext() {
    const browser = await chromium.launch({ headless: true });
    this.browserContext = await browser.newContext();
  }

  async closeBrowserContext() {
    if (this.browserContext) {
      await this.browserContext.close();
    }
  }
}

setWorldConstructor(CustomWorld);
