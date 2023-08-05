import { expect, test } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page.getByText("starting app...")).toBeVisible();
});
