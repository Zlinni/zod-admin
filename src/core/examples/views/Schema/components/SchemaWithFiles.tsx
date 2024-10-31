import { toTypedSchema } from '@vee-validate/zod'
import { NButton, NFlex } from 'naive-ui'
import { useForm, useSubmitForm } from 'vee-validate'
import TableContainer from '../../../../components/Container/TableContainer'
import AutoForm from '../../../../components/Form/AutoForm'
import { schema } from '../schemas/SchemaWithFiles'

const SchemaWithFiles = defineComponent(
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
            file: {
              fieldType: 'file',
            },
            multipleFile: {
              fieldType: 'file',
              inputProps: {
                multiple: true,
                accept: 'image/*',
              },
            },
          }}
          onSubmit={onSearch}>
          <NFlex justify="flex-end" class={'mt-4'}>
            <NButton onClick={() => console.log(form.values, 'values')}>
              获取
            </NButton>
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

export default SchemaWithFiles
