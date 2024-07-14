import { mount } from '@vue/test-utils'
import AgentPicture from '@Valorant/components/AgentPicture.vue'

describe('Agent Picture test', () => {
  const imageSource =
    'https://media.valorant-api.com/agents/12345678-1234-1234-1234-123456789012/fullportrait.png'

  it('Should render the hidden Agent Picture when showAgent prop is false', () => {
    const wrapper = mount(AgentPicture, {
      props: {
        agentUuid: '12345678-1234-1234-1234-123456789012',
        showAgent: false
      }
    })
    const imagen = wrapper.find('img')
    const attributes = imagen.attributes()
    expect(attributes).toEqual(
      expect.objectContaining({
        src: imageSource,
        class: 'h-[300px] brightness-0'
      })
    )
  })
  it('Should render the visible Agent Picture when showAgent prop is true', () => {
    const wrapper = mount(AgentPicture, {
      props: {
        agentUuid: '12345678-1234-1234-1234-123456789012',
        showAgent: true
      }
    })
    const imagen = wrapper.find('img')
    const attributes = imagen.attributes()
    expect(attributes).toEqual(
      expect.objectContaining({
        src: imageSource,
        class: 'fade-in h-[300px]'
      })
    )
  })
})
