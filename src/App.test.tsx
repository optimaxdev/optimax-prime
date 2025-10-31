import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App, { cellRender } from './App'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

dayjs.locale('ru')

describe('App', () => {
  it('renders the app title', () => {
    render(<App />)
    expect(screen.getByText('Optimax Prime Breakfast')).toBeInTheDocument()
  })

  it('renders the online meeting link', () => {
    render(<App />)
    const link = screen.getByText('Ссылка для подключения онлайн')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://telemost.yandex.ru/j/16929976559513')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('renders the calendar component', () => {
    render(<App />)
    // Antd Calendar renders with a specific class
    const calendar = document.querySelector('.ant-picker-calendar')
    expect(calendar).toBeInTheDocument()
  })

  it('renders the avatar image', () => {
    render(<App />)
    const image = document.querySelector('img')
    expect(image).toBeInTheDocument()
  })
})

describe('cellRender', () => {
  it('returns null for dates not in schedule', () => {
    const date = dayjs('2024-01-01')
    const result = cellRender(date)
    expect(result).toBeNull()
  })

  it('renders IT Evening with online tag for scheduled dates', () => {
    const date = dayjs('2024-09-29')
    const result = cellRender(date)
    
    // Render the result to test it
    const { container } = render(<div>{result}</div>)
    
    expect(container.textContent).toContain('IT Evening')
    expect(container.textContent).toContain('online')
  })

  it('renders IT Evening with online and offline tags', () => {
    const date = dayjs('2024-10-06')
    const result = cellRender(date)
    
    // Render the result to test it
    const { container } = render(<div>{result}</div>)
    
    expect(container.textContent).toContain('IT Evening')
    expect(container.textContent).toContain('online')
    expect(container.textContent).toContain('offline')
  })

  it('renders tags with correct colors', () => {
    const date = dayjs('2024-10-06')
    const result = cellRender(date)
    
    // Render the result to test it
    const { container } = render(<div>{result}</div>)
    
    // Check for green color (online tag)
    const onlineTag = container.querySelector('.ant-tag-green')
    expect(onlineTag).toBeInTheDocument()
    
    // Check for gold color (offline tag)
    const offlineTag = container.querySelector('.ant-tag-gold')
    expect(offlineTag).toBeInTheDocument()
  })
})
