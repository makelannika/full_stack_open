const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require ('./helper')

describe('Blog app', () => {
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

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'Bob', 'bobspswd')
    })
    
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'title', 'author', 'url')
      await expect(page.getByText('a new blog title by author added')).toBeVisible()
      await expect(page.getByText('title author')).toBeVisible()
    })
  })
})