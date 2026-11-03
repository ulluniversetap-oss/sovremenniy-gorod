import type { CollectionConfig } from 'payload'

import { COMPLEX_OPTIONS } from './News'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: {
    singular: 'Мероприятие',
    plural: 'Мероприятия',
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
      label: 'Название мероприятия',
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
      name: 'place',
      type: 'text',
      label: 'Место проведения',
      admin: {
        description: 'Например «во дворе дома 27» или «холл 1-го подъезда». Необязательно.',
      },
    },
    {
      name: 'text',
      type: 'textarea',
      label: 'Короткое описание (для карточки)',
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
      label: 'Подробное описание (на отдельной странице)',
    },
  ],
}
