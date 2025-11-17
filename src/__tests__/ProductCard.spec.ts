import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '@/components/Products/ProductList/ProductCard.vue'
import type { Product } from '@/types/products'

describe('ProductCard', () => {
  const testProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 50,
    category: 'electronics',
    description: 'Test description',
  }

  it('displays product information', () => {
    const wrapper = mount(ProductCard, {
      props: testProduct,
      global: {
        stubs: {
          Card: {
            template:
              '<div><slot name="title" /><slot name="content" /><slot name="footer" /></div>',
          },
          Button: true,
          RouterLink: true,
        },
      },
    })

    expect(wrapper.text()).toContain('Test Product')
    expect(wrapper.text()).toContain('50')
    expect(wrapper.text()).toContain('electronics')
  })

  it('emits delete event when delete is clicked', async () => {
    const wrapper = mount(ProductCard, {
      props: testProduct,
      global: {
        stubs: {
          Card: {
            template:
              '<div><slot name="title" /><slot name="content" /><slot name="footer" /></div>',
          },
          Button: {
            template: '<button @click="$attrs.onClick"><slot /></button>',
            props: ['icon', 'label', 'severity', 'size'],
          },
          RouterLink: true,
        },
      },
    })

    const deleteButton = wrapper.find('button')
    await deleteButton.trigger('click')

    expect(wrapper.emitted('delete')).toBeTruthy()
    expect(wrapper.emitted('delete')![0]).toEqual([1])
  })
})
