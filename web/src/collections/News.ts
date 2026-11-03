import type { CollectionConfig } from 'payload'

// Keep in sync with the ЖК registry in SPEC.md
export const COMPLEX_OPTIONS = [
  { label: 'Все ЖК', value: 'all' },
  { label: 'Зенит', value: 'zenit' },
  { label: 'Северный', value: 'severny' },
  { label: 'Семейный', value: 'semeyny' },
  { label: 'Новый', value: 'novy' },
  { label: 'Тарифная', value: 'tarifnaya' },
  { label: 'Гранат', value: 'granat' },
  { label: '35-я Гвардейская', value: 'gvard35' },
  { label: 'Герои поколений', value: 'geroi' },
  { label: 'Берег Волги', value: 'bereg' },
  { label: 'Атласова', value: 'atlasova' },
  { label: 'Отдельные дома', value: 'other' },
]

export const News: CollectionConfig = {
  slug: 'news',
  labels: {
    singular: 'Новость',
    plural: 'Новости',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'complex'],
  },
  access: {
    read: () => true,
  },
  defaultSort: '-date',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
    },
    {
      name: 'date',
      type: 'date',
      label: 'Дата',
      required: true,
      admin: {
        date: { pickerAppearance: 'dayOnly' },
      },
    },
    {
      name: 'complex',
      type: 'select',
      label: 'ЖК',
      required: true,
      defaultValue: 'all',
      options: COMPLEX_OPTIONS,
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Короткий текст (для карточки на главной)',
      required: true,
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
      required: false,
    },
    {
      name: 'lead',
      type: 'textarea',
      label: 'Лид (вступление на странице новости)',
      admin: {
        description: 'Необязательно. Если не заполнить — на странице новости покажется короткий текст выше.',
      },
    },
    {
      name: 'body',
      type: 'array',
      label: 'Текст статьи',
      labels: { singular: 'Абзац', plural: 'Абзацы' },
      fields: [
        {
          name: 'text',
          type: 'textarea',
          label: 'Абзац',
          required: true,
        },
      ],
    },
    {
      name: 'highlightTitle',
      type: 'text',
      label: 'Заголовок врезки',
      admin: {
        description: 'Например «Если батареи остались холодными». Необязательно.',
      },
    },
    {
      name: 'highlightList',
      type: 'array',
      label: 'Пункты врезки',
      labels: { singular: 'Пункт', plural: 'Пункты' },
      fields: [
        {
          name: 'item',
          type: 'text',
          label: 'Пункт',
          required: true,
        },
      ],
    },
    {
      name: 'files',
      type: 'array',
      label: 'Прикреплённые файлы',
      labels: { singular: 'Файл', plural: 'Файлы' },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Название',
          required: true,
        },
        {
          name: 'meta',
          type: 'text',
          label: 'Подпись (например «PDF · 240 КБ»)',
        },
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          label: 'Файл',
          required: true,
        },
      ],
    },
  ],
}
