import { toTypedSchema } from '@vee-validate/zod'
import { NButton, NFlex } from 'naive-ui'
import { useForm, useSubmitForm } from 'vee-validate'
import TableContainer from '../../../../components/Container/TableContainer'
import AutoForm from '../../../../components/Form/AutoForm'
import { schema } from '../schemas/SchemaInside'

const SchemaInside = defineComponent(
  (props, { emit }) => {
    const form = useForm({
      validationSchema: toTypedSchema(schema),
    })
    const onSearch = useSubmitForm(console.log)
    watchEffect(() => {
      form.values && emit('updateValues', toRaw(form.values))
    })
    return () => (
      <TableContainer vertical class={'flex-1 overflow-hidden'}>
        <AutoForm
          class={'space-y-1'}
          label-placement={'left'}
          schema={schema}
          fieldConfig={{
            textarea: {
              fieldType: 'textarea',
            },
            switch: {
              fieldType: 'switch',
            },
            radio: {
              fieldType: 'radio',
            },
            multipleSelect: {
              fieldType: 'select',
              inputProps: {
                multiple: true,
              },
            },
            file: {
              fieldType: 'file',
            },
          }}
          onSubmit={onSearch}>
          <NFlex justify="flex-end" class={'mt-4'}>
            <NButton onClick={() => form.resetForm()}>重置</NButton>
          </NFlex>
        </AutoForm>
      </TableContainer>
    )
  },
  {
    emits: {
      updateValues: (val: any) => true,
    },
  }
)

export default SchemaInside
