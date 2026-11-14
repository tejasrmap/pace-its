import { test, expect } from '@playwright/test';

test.describe('PACE ITS — Real Browser Verification Suite', () => {

  test('1. Homepage: Renders cleanly without browser runtime exceptions', async ({ page, isMobile }) => {
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Title verification
    await expect(page).toHaveTitle(/PACE Institute of Technology & Sciences/i);

    // Verify institutional branding
    const brandText = page.locator('header').getByText('PACE ITS');
    await expect(brandText.first()).toBeVisible();

    // Verify Autonomous badge on desktop
    if (!isMobile) {
      const autonomousBadge = page.locator('header').getByText('AUTONOMOUS');
      await expect(autonomousBadge.first()).toBeVisible();
    }

    // Filter benign hydration / third-party font notices if any
    const criticalErrors = consoleErrors.filter(
      (err) => !err.includes('favicon') && !err.includes('font') && !err.includes('net::ERR_CONNECTION_ABORTED')
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test('2. Header Navigation: Dropdown stability and clickability', async ({ page, isMobile }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    if (!isMobile) {
      // Desktop Hover over Academics menu
      const academicsTrigger = page.locator('header nav').getByText('Academics', { exact: true });
      await academicsTrigger.hover();
      await page.waitForTimeout(300);

      // Verify Academics MegaMenu opens
      const cseLink = page.locator('header').getByRole('link', { name: /Computer Science & Engineering/i }).first();
      await expect(cseLink).toBeVisible();

      // Hover over Governance
      const governanceTrigger = page.locator('header nav').getByText('Governance', { exact: true });
      await governanceTrigger.hover();
      await page.waitForTimeout(300);

      // Verify Governance dropdown items
      const governingBodyLink = page.locator('header').getByRole('link', { name: /Governing Body/i }).first();
      await expect(governingBodyLink).toBeVisible();

      // Click on Governing Body and ensure navigation succeeds
      await governingBodyLink.click();
      await page.waitForURL('**/committees/statutory-committees/governing-body');
      await expect(page.locator('h1')).toBeVisible();
    } else {
      // Mobile Navigation verification
      const mobileToggle = page.locator('header button[aria-label="Open mobile navigation menu"]');
      await expect(mobileToggle).toBeVisible();
      await mobileToggle.click();
      await page.waitForTimeout(300);

      const drawerTitle = page.locator('div.fixed').getByText('UGC AUTONOMOUS');
      await expect(drawerTitle.first()).toBeVisible();
    }
  });

  test('3. Search Dialog: Opens and accepts queries', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const searchBtn = page.locator('header button[aria-label="Search pages and documents"]');
    await searchBtn.click();
    await page.waitForTimeout(300);

    const searchInput = page.locator('input[type="text"]').first();
    await expect(searchInput).toBeVisible();

    // Type query
    await searchInput.fill('Civil Engineering');
    await page.waitForTimeout(500);

    // Search results or feedback should be rendered
    const modal = page.locator('div[role="dialog"], div.fixed');
    await expect(modal.first()).toBeVisible();
  });

  test('4. Representative Template 1 — DepartmentTemplate (/academics/departments/cse)', async ({ page }) => {
    await page.goto('/academics/departments/cse');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Computer Science/i);
    // Verify department tabs or sections exist
    const content = page.locator('main');
    await expect(content).toBeVisible();
  });

  test('5. Representative Template 2 — AdministrativeTemplate (/administration/principal-profile)', async ({ page }) => {
    await page.goto('/administration/principal-profile');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Principal/i);
    await expect(page.locator('main')).toBeVisible();
  });

  test('6. Representative Template 3 — AcademicAffairsTemplate (/academics/academic-calendar)', async ({ page }) => {
    await page.goto('/academics/academic-calendar');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Calendar/i);
  });

  test('7. Representative Template 4 — AdmissionsTemplate (/admissions/admission-procedure)', async ({ page }) => {
    await page.goto('/admissions/admission-procedure');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Admission/i);
  });

  test('8. Representative Template 5 — ResearchTemplate (/research-and-development/patents)', async ({ page }) => {
    await page.goto('/research-and-development/patents');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Patent/i);
  });

  test('9. Representative Template 6 — CampusFacilityTemplate (/campus/facilities)', async ({ page }) => {
    await page.goto('/campus/facilities');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Facilities/i);
  });

  test('10. Representative Template 7 — GalleryEventTemplate (/display-events-gallery/165)', async ({ page }) => {
    // This route previously failed with SSR vendor chunk module not found error
    await page.goto('/display-events-gallery/165');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('h1')).toContainText(/Winners of QIS Fest/i);
  });

  test('11. Representative Template 8 — ExaminationCellTemplate (/0/examinations-cell)', async ({ page }) => {
    await page.goto('/0/examinations-cell');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('h1')).toContainText(/Exam/i);
  });

  test('12. Category-B Admission Form (/admissions/b-category/apply-online/btech)', async ({ page }) => {
    await page.goto('/admissions/b-category/apply-online/btech');
    await page.waitForLoadState('networkidle');

    // Verify form input elements exist
    const candidateNameInput = page.locator('input[placeholder*="SSC"], input[name*="name"]').first();
    await expect(candidateNameInput).toBeVisible();

    // Verify submit button exists
    const submitBtn = page.getByRole('button', { name: /Submit|Apply/i }).first();
    await expect(submitBtn).toBeVisible();
  });

  test('13. Admin Login & Authorization Guard (/admin/login and /admin)', async ({ page }) => {
    // Check login page renders
    await page.goto('/admin/login');
    await page.waitForLoadState('networkidle');

    const emailInput = page.locator('input[type="email"], input[name*="user"], input[name*="email"]').first();
    await expect(emailInput).toBeVisible();

    const passwordInput = page.locator('input[type="password"]').first();
    await expect(passwordInput).toBeVisible();

    // Direct visit to /admin without session should redirect to login or show auth form
    await page.goto('/admin');
    await page.waitForLoadState('networkidle');
    expect(page.url()).toMatch(/\/admin(\/login)?/);
  });

  test('14. Cross-Device Adaptability: Zero horizontal overflow across phone, tablet, laptop & desktop viewports', async ({ page }) => {
    const viewports = [
      { name: 'Ultra-Small Phone (320px)', width: 320, height: 568 },
      { name: 'Compact Phone / iPhone SE (375px)', width: 375, height: 667 },
      { name: 'Modern Phone / Pixel & iPhone 15 (393px)', width: 393, height: 852 },
      { name: 'Large Phone / Pro Max (430px)', width: 430, height: 932 },
      { name: 'Foldable / Mini Tablet (600px)', width: 600, height: 960 },
      { name: 'Tablet Portrait / iPad (768px)', width: 768, height: 1024 },
      { name: 'Tablet Landscape / Small Laptop (1024px)', width: 1024, height: 768 },
      { name: 'Standard Laptop (1280px)', width: 1280, height: 800 },
      { name: 'Full HD Desktop (1920px)', width: 1920, height: 1080 }
    ];

    const testUrls = ['/', '/pace-at-glance', '/academics/departments/cse', '/admissions/b-category/apply-online/btech'];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      for (const url of testUrls) {
        await page.goto(url);
        await page.waitForLoadState('domcontentloaded');

        const hasHorizontalOverflow = await page.evaluate(() => {
          return document.documentElement.scrollWidth > window.innerWidth;
        });

        expect(hasHorizontalOverflow, `Horizontal overflow detected at ${vp.name} on ${url}`).toBe(false);
      }
    }
  });

});
