'use client'

import { useMemo, useState } from 'react'

type NewsItem = {
  id: string
  title: string
  date: string
  complex: string
  text: string
}

type Option = { label: string; value: string }

export function EventsFilter({ items, options }: { items: NewsItem[]; options: Option[] }) {
  const [active, setActive] = useState('all')

  const filtered = useMemo(() => {
    if (active === 'all') return items
    return items.filter((item) => item.complex === active || item.complex === 'all')
  }, [items, active])

  const labelFor = (value: string) => options.find((o) => o.value === value)?.label ?? value

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '24px 0 32px' }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setActive(opt.value)}
            style={{
              border: '1px solid rgba(22,25,27,.14)',
              borderRadius: 999,
              padding: '8px 16px',
              fontSize: 13,
              fontFamily: 'inherit',
              cursor: 'pointer',
              background: active === opt.value ? '#16191b' : 'transparent',
              color: active === opt.value ? '#f2f2f0' : '#16191b',
            }}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{ color: '#6b6f71' }}>Пока нет новостей для выбранного фильтра.</p>
      ) : (
        <div>
          {filtered.map((item) => (
            <article
              key={item.id}
              style={{ padding: '18px 0', borderTop: '1px solid rgba(22,25,27,.14)' }}
            >
              <div
                style={{
                  fontSize: 12,
                  color: '#6b6f71',
                  fontVariantNumeric: 'tabular-nums',
                  marginBottom: 4,
                }}
              >
                {new Date(item.date).toLocaleDateString('ru-RU')} · {labelFor(item.complex)}
              </div>
              <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 500 }}>{item.title}</h3>
              {item.text ? (
                <p style={{ margin: 0, color: '#3a3d3e', whiteSpace: 'pre-wrap' }}>{item.text}</p>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
