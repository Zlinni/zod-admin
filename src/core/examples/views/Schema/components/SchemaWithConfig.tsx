import { toTypedSchema } from '@vee-validate/zod'
import { NButton, NFlex, NSwitch, NText } from 'naive-ui'
import { useForm, useSubmitForm } from 'vee-validate'
import TableContainer from '../../../../components/Container/TableContainer'
import AutoForm from '../../../../components/Form/AutoForm'
import { schema } from '../schemas/SchemaWithConfig'

const SchemaWithConfig = defineComponent(
  (props, { emit }) => {
    const form = useForm({
      validationSchema: toTypedSchema(schema),
    })
    const onSearch = useSubmitForm(console.log)
    const showLabelActive = ref(true)
    const showLabelDisabled = ref(true)
    watchEffect(() => {
      form.values && emit('updateValues', toRaw(form.values))
    })
    return () => (
      <TableContainer vertical class={'flex-1 overflow-hidden'}>
        <AutoForm
          class={'space-y-1'}
          label-placement={'left'}
          schema={schema}
          fieldConfig={computed(() => ({
            label: {
              inputProps: {
                showLabel: showLabelActive.value,
                disabled: showLabelDisabled.value,
                placeholder: '搜索值',
              },
            },
          }))}
          onSubmit={onSearch}>
          <NFlex class={'mt-4'}>
            <NText>showLabel</NText>
            <NSwitch v-model:value={showLabelActive.value}></NSwitch>
            <NText>disabled</NText>
            <NSwitch v-model:value={showLabelDisabled.value}></NSwitch>
          </NFlex>
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

export default SchemaWithConfig
