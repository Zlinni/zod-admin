import { ReadonlyHelper } from '@/core/components/Form/columns/Helpers'
import { useRushColumns } from '@/core/hooks/useRushColumns'
import { useAutoFormDialog } from '@core/components/Dialog/useAutoFormDialog'
import Operations, {
  OperationKeys,
} from '@core/components/Form/columns/Operations'
import { asyncComputed } from '@vueuse/core'
import { match } from 'ts-pattern'
import { API } from '../api/application.api'
import { APISchema, EntitySchema } from '../api/application.zod'

export const columns = useRushColumns({
  schema: EntitySchema.app,
  fieldConfig: {
    client_id: {
      ignore: true,
    },
  },
  suffix: (props) => {
    const { openAutoFormDialog } = useAutoFormDialog()

    return (
      <Operations
        onSelect={async (key) => {
          const data = await API.readOne({
            id: props.row.original.id,
          })
          match(key)
            .with(OperationKeys.detail, () => {
              openAutoFormDialog({
                data: data.app,
                schema: EntitySchema.app,
                title: '详情',
              })
            })
            .with(OperationKeys.update, () =>
              openAutoFormDialog({
                data: data.app,
                title: '编辑',
                schema: APISchema.updateOne.DTO,
                fieldConfig: (value) => ({
                  id: { ignore: true },
                }),
                async onSubmit({ originValues: { id }, handleSubmit }) {
                  handleSubmit(async (values) => {
                    await API.updateOne({ ...values, id })
                  })
                },
              })
            )
            .with(OperationKeys.delete, () => {
              openAutoFormDialog({
                data: data.app,
                title: '删除',
                schema: APISchema.deleteOne.DTO,
                fieldConfig: () => ReadonlyHelper(EntitySchema.app),
                async onSubmit({ onFinish }) {
                  await API.deleteOne({ id: props.row.original.id })
                  onFinish()
                },
              })
            })
            .run()
        }}
      />
    )
  },
})
