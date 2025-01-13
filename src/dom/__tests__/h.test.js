/**
 * @jest-environment jsdom
 */

import { h, tags } from '../index'

describe('Hyperscript Tests', () => {
  test('should create a basic element', () => {
    const el = h('div')
    expect(el.tagName).toBe('DIV')
  })

  test('should set attributes', () => {
    const el = h('div', { id: 'test', title: 'Test Title' })
    expect(el.id).toBe('test')
    expect(el.getAttribute('title')).toBe('Test Title')
  })

  test('should handle style objects', () => {
    const el = h('div', {
      style: {
        color: 'red',
        backgroundColor: 'blue'
      }
    })
    expect(el.style.color).toBe('red')
    expect(el.style.backgroundColor).toBe('blue')
  })

  test('should add event listeners', () => {
    const clickHandler = jest.fn()
    const el = h('button', { onClick: clickHandler })
    el.click()
    expect(clickHandler).toHaveBeenCalled()
  })

  test('should handle className as string', () => {
    const el = h('div', { className: 'test-class' })
    expect(el.className).toBe('test-class')
  })

  test('should handle className as array', () => {
    const el = h('div', { className: ['test-1', 'test-2'] })
    expect(el.className).toBe('test-1 test-2')
  })

  test('should handle dataset attributes', () => {
    const el = h('div', {
      dataset: {
        testId: '123',
        userRole: 'admin'
      }
    })
    expect(el.dataset.testId).toBe('123')
    expect(el.dataset.userRole).toBe('admin')
  })

  test('should append text children', () => {
    const el = h('div', null, 'Hello', ' ', 'World')
    expect(el.textContent).toBe('Hello World')
  })

  test('should append element children', () => {
    const child1 = h('span', null, 'Child 1')
    const child2 = h('span', null, 'Child 2')
    const el = h('div', null, child1, child2)
    expect(el.children.length).toBe(2)
    expect(el.children[0].tagName).toBe('SPAN')
    expect(el.children[1].tagName).toBe('SPAN')
  })

  test('should handle nested arrays of children', () => {
    const el = h('div', null, [
      'Text',
      [h('span', null, 'Nested'), h('span', null, 'Elements')]
    ])
    expect(el.childNodes.length).toBe(3)
    expect(el.childNodes[0].textContent).toBe('Text')
    expect(el.childNodes[1].tagName).toBe('SPAN')
    expect(el.childNodes[2].tagName).toBe('SPAN')
  })

  test('should ignore null and undefined children', () => {
    const el = h('div', null, 'Text', null, undefined, 'More')
    expect(el.childNodes.length).toBe(2)
    expect(el.textContent).toBe('TextMore')
  })

  describe('Tags Helper', () => {
    test('should provide shorthand for common elements', () => {
      const div = tags.div({ className: 'test' }, 'Content')
      expect(div.tagName).toBe('DIV')
      expect(div.className).toBe('test')
      expect(div.textContent).toBe('Content')

      const input = tags.input({ type: 'text', value: 'test' })
      expect(input.tagName).toBe('INPUT')
      expect(input.type).toBe('text')
      expect(input.value).toBe('test')
    })

    test('should create complex nested structures', () => {
      const form = tags.form({ className: 'login-form' },
        tags.label({ htmlFor: 'username' }, 'Username:'),
        tags.input({ id: 'username', type: 'text' }),
        tags.label({ htmlFor: 'password' }, 'Password:'),
        tags.input({ id: 'password', type: 'password' }),
        tags.button({ type: 'submit' }, 'Login')
      )

      expect(form.tagName).toBe('FORM')
      expect(form.className).toBe('login-form')
      expect(form.children.length).toBe(5)
      expect(form.querySelector('#username')).toBeTruthy()
      expect(form.querySelector('#password')).toBeTruthy()
      expect(form.querySelector('button').textContent).toBe('Login')
    })
  })
})
