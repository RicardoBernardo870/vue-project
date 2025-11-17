import type { Product } from '@/types/products'

type ApiEndpoints = {
  '/products': Product[] | Product
  '/products/:id': Product
} & Record<`/products/${number}` | `/products/${string}`, Product>

export default ApiEndpoints
