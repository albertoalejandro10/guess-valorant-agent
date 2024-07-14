import { mount } from '@vue/test-utils'
import AgentOptions from '@Valorant/components/AgentOptions.vue'
import type { Agent } from '@Valorant/interfaces'

const options = [
  { uuid: '12345678-1234-1234-1234-123456789012', name: 'Agent 1' },
  { uuid: '12345678-1234-1234-1234-123456789013', name: 'Agent 2' },
  { uuid: '12345678-1234-1234-1234-123456789013', name: 'Agent 3' },
  { uuid: '12345678-1234-1234-1234-123456789013', name: 'Agent 4' }
]

describe('Agent Options test', () => {
  it('Should render the Agent Options component', () => {
    const wrapper = mount(AgentOptions, {
      props: {
        agentsOptions: options as Agent[],
        blockSelection: false,
        correctAnswer: '12345678-1234-1234-1234-123456789012'
      }
    })
    const buttons = wrapper.findAll('button')
    expect(buttons.length).toBe(options.length)
    buttons.forEach((button, index) => {
      expect(button.text()).toBe(options[index].name)
    })
  })
  it('Should emit selectedAgent event when user clicks on a button', async () => {
    const wrapper = mount(AgentOptions, {
      props: {
        agentsOptions: options as Agent[],
        blockSelection: false,
        correctAnswer: '12345678-1234-1234-1234-123456789012'
      }
    })
    const [b1] = wrapper.findAll('button')
    await b1.trigger('click')
    expect(wrapper.emitted().selectedAgent).toBeTruthy()
    expect(wrapper.emitted().selectedAgent[0]).toEqual([wrapper.props().correctAnswer])
  })
  it('Should disabled the buttons when blockSelection is true', async () => {
    const wrapper = mount(AgentOptions, {
      props: {
        agentsOptions: options as Agent[],
        blockSelection: true,
        correctAnswer: '12345678-1234-1234-1234-123456789012'
      }
    })
    const buttons = wrapper.findAll('button')
    buttons.forEach((button) => {
      // console.log(button.attributes())
      const attributes = Object.keys(button.attributes())
      expect(attributes.includes('disabled')).toBeTruthy()
    })
  })
  it('Should apply correct class when correctAnswer is selected', async () => {
    const wrapper = mount(AgentOptions, {
      props: {
        agentsOptions: options as Agent[],
        blockSelection: true,
        correctAnswer: '12345678-1234-1234-1234-123456789012'
      }
    })
    const { correctAnswer } = wrapper.props()
    const buttons = wrapper.findAll('button')
    buttons.forEach((button, index) => {
      if (options[index].uuid === correctAnswer) {
        expect(button.classes()).toContain('correct')
      } else {
        expect(button.classes()).toContain('wrong')
      }
    })
  })
})
