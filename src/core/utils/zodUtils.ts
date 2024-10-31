import { z } from 'zod'

// TODO: This should support recursive ZodEffects but TypeScript doesn't allow circular type definitions.
export type ZodObjectOrWrapped =
  | z.ZodObject<any, any>
  | z.ZodEffects<z.ZodObject<any, any>>

/**
 * Beautify a camelCase string.
 * e.g. "myString" -> "My String"
 */
export function beautifyObjectName(string: string) {
  // if numbers only return the string
  let output = string.replace(/([A-Z])/g, ' $1')
  output = output.charAt(0).toUpperCase() + output.slice(1)
  return output
}

/**
 * Get the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseSchema<
  ChildType extends z.ZodAny | z.AnyZodObject = z.ZodAny,
>(schema: ChildType | z.ZodEffects<ChildType>): ChildType | null {
  if (!schema) return null
  if ('innerType' in schema._def) {
    return getBaseSchema(schema._def.innerType as ChildType)
  }
  if ('schema' in schema._def) {
    return getBaseSchema(schema._def.schema as ChildType)
  }

  return schema as ChildType
}

/**
 * Get the type name of the lowest level Zod type.
 * This will unpack optionals, refinements, etc.
 */
export function getBaseType(schema: z.ZodAny): string {
  const baseSchema = getBaseSchema(schema)
  return baseSchema ? baseSchema._def.typeName : ''
}

/**
 * Search for a "ZodDefult" in the Zod stack and return its value.
 */
export function getDefaultValueInZodStack(schema: z.ZodAny): any {
  const typedSchema = schema as unknown as z.ZodDefault<
    z.ZodNumber | z.ZodString
  >

  if (typedSchema._def.typeName === 'ZodDefault') {
    return typedSchema._def.defaultValue()
  }

  if ('innerType' in typedSchema._def) {
    return getDefaultValueInZodStack(
      typedSchema._def.innerType as unknown as z.ZodAny
    )
  }
  if ('schema' in typedSchema._def) {
    return getDefaultValueInZodStack(
      (typedSchema._def as any).schema as z.ZodAny
    )
  }

  return undefined
}

/**
 * Get all default values from a Zod schema.
 */
export function getDefaultValues<Schema extends z.ZodObject<any, any>>(
  schema: Schema
) {
  if (!schema) return null
  const { shape } = schema
  type DefaultValuesType = any
  const defaultValues = {} as DefaultValuesType
  if (!shape) return defaultValues

  for (const key of Object.keys(shape)) {
    const item = shape[key] as z.ZodAny

    if (getBaseType(item) === 'ZodObject') {
      const defaultItems = getDefaultValues(
        getBaseSchema(item) as unknown as z.ZodObject<any, any>
      )

      if (defaultItems !== null) {
        for (const defaultItemKey of Object.keys(defaultItems)) {
          const pathKey = `${key}.${defaultItemKey}` as keyof DefaultValuesType
          defaultValues[pathKey] = defaultItems[defaultItemKey]
        }
      }
    } else {
      const defaultValue = getDefaultValueInZodStack(item)
      if (defaultValue !== undefined) {
        defaultValues[key as keyof DefaultValuesType] = defaultValue
      }
    }
  }

  return defaultValues
}

export function getObjectFormSchema(
  schema: ZodObjectOrWrapped
): z.ZodObject<any, any> {
  if (schema?._def.typeName === 'ZodEffects') {
    const typedSchema = schema as z.ZodEffects<z.ZodObject<any, any>>
    return getObjectFormSchema(typedSchema._def.schema)
  }
  return schema as z.ZodObject<any, any>
}

export const getKeysFromSchema = (schema: z.ZodObject<any, any>) => {
  return [...schema.keyof().options] as const
}
type ZodSchemaFields = { [K: string]: ZodSchemaFields | true }
type DirtyZodSchemaFields = { [K: string]: DirtyZodSchemaFields }
const _proxyHandler = {
  get(fields: DirtyZodSchemaFields, key: string | symbol) {
    if (key === 'then' || typeof key !== 'string') {
      return
    }
    if (!fields[key]) {
      fields[key] = new Proxy({}, _proxyHandler)
    }
    return fields[key]
  },
}
const _clean = (fields: DirtyZodSchemaFields) => {
  const cleaned: ZodSchemaFields = {}
  Object.keys(fields).forEach((k) => {
    const val = fields[k]
    cleaned[k] = Object.keys(val).length ? _clean(val) : true
  })
  return cleaned
}
export const getZodSchemaFields = (
  schema: ZodObjectOrWrapped
): ZodSchemaFields => {
  const fields = {}
  schema.safeParse(new Proxy(fields, _proxyHandler))
  return _clean(fields)
}
