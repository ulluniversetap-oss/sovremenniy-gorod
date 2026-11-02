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
      label: 'Текст',
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Фото',
      required: false,
    },
  ],
}
