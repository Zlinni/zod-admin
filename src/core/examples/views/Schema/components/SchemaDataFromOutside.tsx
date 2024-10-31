import { toTypedSchema } from '@vee-validate/zod'
import { NButton, NFlex, type SelectOption } from 'naive-ui'
import { match } from 'ts-pattern'
import { useForm, useSubmitForm } from 'vee-validate'
import TableContainer from '../../../../components/Container/TableContainer'
import AutoForm from '../../../../components/Form/AutoForm'
import { schema } from '../schemas/SchemaDataFromOutside'

const SchemaDataFromOutside = defineComponent(
  (props, { emit }) => {
    const form = useForm({
      validationSchema: toTypedSchema(schema),
    })
    const onSearch = useSubmitForm(console.log)

    const options = [
      {
        label: 'Drive My Car',
        value: 'song1',
      },
      {
        label: 'Norwegian Wood',
        value: 'song2',
      },
      {
        label: "You Won't See",
        value: 'song3',
      },
      {
        label: 'Nowhere Man',
        value: 'song4',
      },
      {
        label: 'Think For Yourself',
        value: 'song5',
      },
      {
        label: 'The Word',
        value: 'song6',
      },
      {
        label: 'Michelle',
        value: 'song7',
      },
      {
        label: 'What goes on',
        value: 'song8',
      },
      {
        label: 'Girl',
        value: 'song9',
      },
      {
        label: "I'm looking through you",
        value: 'song10',
      },
      {
        label: 'In My Life',
        value: 'song11',
      },
      {
        label: 'Wait',
        value: 'song12',
      },
    ]
    const optionsRef = ref<SelectOption[]>([])
    const loading = ref(false)
    const handleSearch = (query: string) => {
      if (!query.length) {
        optionsRef.value = []
        return
      }
      loading.value = true
      setTimeout(() => {
        optionsRef.value = options.filter((item) => ~item.label.indexOf(query))
        loading.value = false
      }, 1000)
    }

    const getDataWithArrayObjectFromOutSideOption2 = ({
      option1,
    }: {
      option1?: string
    }) => {
      if (!option1) return []
      return match(option1)
        .with('option1', () => {
          return [
            {
              label: 'option1-extra-option',
              value: 'option1-extra-option',
            },
          ]
        })
        .with('option2', () => {
          return [
            {
              label: 'option2-extra-option',
              value: 'option2-extra-option',
            },
          ]
        })
        .with('option3', () => {
          return [
            {
              label: 'option3-extra-option',
              value: 'option3-extra-option',
            },
          ]
        })
        .run()
    }
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
            dataFromOutSide: {
              fieldType: 'select',
              inputProps: {
                option: optionsRef.value,
                loading: loading.value,
                onSearch: handleSearch,
                remote: true,
                filterable: true,
              },
            },
            dataWithArrayObjectFromOutSide: (values: { option1: string }) => {
              return {
                option2: {
                  fieldType: 'select',
                  inputProps: {
                    option: getDataWithArrayObjectFromOutSideOption2(values),
                    remote: true,
                    filterable: true,
                  },
                },
              }
            },
          }))}
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

export default SchemaDataFromOutside
