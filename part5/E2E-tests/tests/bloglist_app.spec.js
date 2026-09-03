const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require ('./helper')

describe('Blog app',() => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Bob',
        username: 'Bob',
        password: 'bobspswd'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'log in to application' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'Bob', 'bobspswd')
      await expect(page.getByText('Bob logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'Bob', 'notbobspswd')
      await expect(page.getByText('wrong username or password')).toBeVisible()
    })
  })
})