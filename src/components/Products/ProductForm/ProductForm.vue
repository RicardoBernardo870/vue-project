<script setup lang="ts">
import { InputText, InputNumber, Textarea, Button, Select } from 'primevue'
import { computed, watch, ref } from 'vue'
import { useProductStore } from '@/stores/useProductStore'
import { useRoute } from 'vue-router'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { Product } from '@/types/products'
import { useProductOptions } from '@/composables/useProductOptions'
import { ProductFormFields, ProductForm, getInitialValues } from './ProductForm'

import Zod from 'zod'
import router from '@/router'

type Props = {
  product?: Product | null
  mode: 'create' | 'edit'
}

const props = defineProps<Props>()
const route = useRoute()

const productStore = useProductStore()

const { editProduct, addNewProduct } = productStore
const { categoryOptions } = useProductOptions()

const submitAttempted = ref(false)
const validationSchema = toTypedSchema(ProductFormFields(Zod))

const getInitialValuesComputed = computed(() => {
  return getInitialValues(props.product || null)
})

const { handleSubmit, values, meta, setFieldValue, errors, isSubmitting, resetForm } =
  useForm<Product>({
    validationSchema,
    initialValues: getInitialValuesComputed.value,
  })

const showError = (field: keyof Product) => {
  return submitAttempted.value ? errors.value[field] : undefined
}

const onSubmit = handleSubmit(
  async (values) => {
    try {
      if (props.mode === 'edit') {
        await editProduct(Number(route.params.id), values)
      } else {
        await addNewProduct(values)
      }

      resetForm({
        values: getInitialValuesComputed.value,
      })

      submitAttempted.value = false
      await router.push('/dashboard')
    } catch (error) {
      console.error('Form submission error:', error)
    }
  },
  () => {
    submitAttempted.value = true
  },
)

watch(
  () => props.product,
  (newProduct) => {
    if (!newProduct) return

    resetForm({
      values: getInitialValues(newProduct),
    })
  },
  { immediate: true },
)
</script>

<template>
  <form class="product-form" @submit.prevent="onSubmit">
    <label for="product-name">Product Name*:</label>
    <InputText
      id="product-name"
      class="text-input"
      :invalid="!!showError(ProductForm.NAME)"
      :model-value="values[ProductForm.NAME]"
      @update:model-value="setFieldValue(ProductForm.NAME, $event || '')"
    />

    <span class="error-message">{{ showError(ProductForm.NAME) }}</span>

    <label for="price">Price*:</label>
    <InputNumber
      id="price"
      mode="decimal"
      showButtons
      class="text-input"
      :invalid="!!showError(ProductForm.PRICE)"
      :model-value="values[ProductForm.PRICE]"
      @update:model-value="setFieldValue(ProductForm.PRICE, $event || 0)"
    />

    <span class="error-message">{{ showError(ProductForm.PRICE) }}</span>

    <label for="category">Category*:</label>
    <Select
      id="category"
      :options="categoryOptions"
      option-label="label"
      option-value="value"
      class="text-input"
      :invalid="!!showError(ProductForm.CATEGORY)"
      :model-value="values[ProductForm.CATEGORY]"
      @update:model-value="setFieldValue(ProductForm.CATEGORY, $event || '')"
    />

    <span class="error-message">{{ showError(ProductForm.CATEGORY) }}</span>

    <label for="description">Description*:</label>
    <Textarea
      id="description"
      rows="5"
      cols="30"
      :invalid="!!showError(ProductForm.DESCRIPTION)"
      :model-value="values[ProductForm.DESCRIPTION]"
      @update:model-value="setFieldValue(ProductForm.DESCRIPTION, $event || '')"
    />

    <span class="error-message">{{ showError(ProductForm.DESCRIPTION) }}</span>

    <Button
      type="submit"
      label="Save Changes"
      severity="success"
      :loading="isSubmitting"
      :disabled="props.mode === 'edit' && !meta.dirty"
    />
  </form>
</template>

<style lang="css" scoped>
.product-form {
  display: flex;
  flex-direction: column;
  width: 100%;

  label {
    font-weight: bold;
    margin-top: 1rem;
  }

  .text-input {
    margin-top: 0.5rem;
  }

  .p-inputnumber {
    width: 100%;
  }

  .p-select {
    width: 100%;
  }

  .p-textarea {
    width: 100%;
  }

  .p-button {
    margin-top: 1.5rem;
    align-self: flex-end;
  }

  .error-message {
    color: red;
    font-size: 0.875rem;
  }
}
</style>
