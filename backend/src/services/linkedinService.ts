import puppeteer from 'puppeteer';

interface LinkedinProfile {
  fullName: string;
  currentTitle: string;
  location: string;
  experiences: Array<{
    title: string;
    company: string;
    duration: string;
  }>;
}

export async function scrapeLinkedinProfile(url: string): Promise<LinkedinProfile> {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  try {
    await page.goto(url);
    
    const profile = await page.evaluate(() => ({
      fullName: document.querySelector('.text-heading-xlarge')?.textContent || '',
      currentTitle: document.querySelector('.text-body-medium')?.textContent || '',
      location: document.querySelector('.text-body-small')?.textContent || '',
      experiences: Array.from(document.querySelectorAll('#experience ~ .pvs-list__outer-container > .pvs-list > .artdeco-list__item')).map(item => ({
        title: item.querySelector('.display-flex.flex-row.justify-space-between > .display-flex.flex-column.full-width > .display-flex.flex-row.justify-space-between > .display-flex.flex-column.full-width > .visually-hidden')?.textContent || '',
        company: item.querySelector('.t-14.t-normal > .visually-hidden')?.textContent || '',
        duration: item.querySelector('.t-14.t-normal.t-black--light > .visually-hidden')?.textContent || ''
      }))
    }));

    return profile;
  } finally {
    await browser.close();
  }
}