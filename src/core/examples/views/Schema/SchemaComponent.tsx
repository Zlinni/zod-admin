import MicroContainer from '@/core/components/Container/MicroContainer.vue'
import { NCode, NCollapse, NCollapseItem, NGi, NGrid } from 'naive-ui'
import { getSchemasComponents } from './config/schema'

const SchemaComponent = defineComponent(() => {
  const SchemasComponents = getSchemasComponents()

  return () =>
    SchemasComponents.map(
      ({ components: SC, schemasRaw, componentsRaw, name }) => {
        const values = ref({})
        const updateValues = (v: any) => (values.value = v)
        watchEffect(() => console.log(values.value, 'val'))
        return (
          <MicroContainer title={name} key={name}>
            <NGrid cols={2} xGap={12}>
              <NGi>
                <SC onUpdateValues={updateValues} />
              </NGi>
              <NGi>
                <NCollapse>
                  <NCollapseItem title="output" name="output">
                    <NCode
                      code={JSON.stringify(values.value, null, 2)}
                      wordWrap
                      language="json"></NCode>
                  </NCollapseItem>
                  <NCollapseItem title="schema" name="schema">
                    <NCode
                      code={schemasRaw}
                      wordWrap
                      language="typescript"></NCode>
                  </NCollapseItem>
                  <NCollapseItem title="code" name="code">
                    <NCode
                      code={componentsRaw}
                      wordWrap
                      language="typescript"></NCode>
                  </NCollapseItem>
                </NCollapse>
              </NGi>
            </NGrid>
          </MicroContainer>
        )
      }
    )
})

export default SchemaComponent
