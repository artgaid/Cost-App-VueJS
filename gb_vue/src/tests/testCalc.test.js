import { mount } from '@vue/test-utils'
import PageCalculator from '../pages/PageCalculator.vue'

describe('PageCalculator test inputs', () => {
    it('Test operand1 input value', () => {
        const wrapper = mount(PageCalculator)
        const op1 = wrapper.find('input[name=operand1]')

        // *** Присваивание значения ***
        op1.setValue('1')
        // *** или *** 
        // op1.element.value = '1'
        // op1.trigger('input')

        expect(wrapper.vm.oper1).toBe(1)
    })

    it('Test operand2 input value', () => {
        const wrapper = mount(PageCalculator)
        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        expect(wrapper.vm.oper2).toBe(2)
    })
})

describe('PageCalculator test operations', () => {
    it('Test method sum', () => {
        const wrapper = mount(PageCalculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('1')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="+"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(3)
    })

    it('Test method sub', () => {
        const wrapper = mount(PageCalculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('3')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="-"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(1)
    })

    it('Test method mult', () => {
        const wrapper = mount(PageCalculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('3')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="*"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(6)
    })

    it('Test method div', () => {
        const wrapper = mount(PageCalculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('8')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="/"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(4)
    })

    it('Test method deg', () => {
        const wrapper = mount(PageCalculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('3')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="n"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(9)
    })

    it('Test method doubleDiv', () => {
        const wrapper = mount(PageCalculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('5')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('2')

        const btnSum = wrapper.find('button[name="//"]')
        btnSum.trigger('click')

        expect(wrapper.vm.result).toBe(2)
    })
})

describe('PageCalculator test keyboard', () => {
    it('Test checked1 keyboard', () => {
        const wrapper = mount(PageCalculator)

        const check1 = wrapper.find('input[name=checkOperation1]')
        check1.trigger('click')

        expect(wrapper.vm.check2).toBe("")
    })

    it('Test checked2 keyboard', () => {
        const wrapper = mount(PageCalculator)

        const check2 = wrapper.find('input[name=checkOperation2]')
        check2.trigger('click')

        expect(wrapper.vm.check1).toBe("")
    })


    it('Test Numbers keyboard (operand1 = 2)', () => {
        const wrapper = mount(PageCalculator)

        const check1 = wrapper.find('input[name=checkOperation1]')
        check1.setChecked()

        const btnKeyboard = wrapper.find('button[name="2"]')
        btnKeyboard.trigger('click')

        expect(wrapper.vm.oper1).toBe(2)
    })

    it('Test Numbers keyboard (operand1 = DEL)', () => {
        const wrapper = mount(PageCalculator)

        const check1 = wrapper.find('input[name=checkOperation1]')
        check1.setChecked()

        const btnKeyboard = wrapper.find('button[name="DEL"]')
        btnKeyboard.trigger('click')

        expect(wrapper.vm.oper1).toBe(0)
    })

    it('Test Numbers keyboard (operand2 = 2)', () => {
        const wrapper = mount(PageCalculator)

        const check2 = wrapper.find('input[name=checkOperation2]')
        check2.setChecked()

        const btnKeyboard = wrapper.find('button[name="2"]')
        btnKeyboard.trigger('click')

        expect(wrapper.vm.oper2).toBe(2)
    })


    it('Test Numbers keyboard (operand2 = DEL)', () => {
        const wrapper = mount(PageCalculator)

        const check2 = wrapper.find('input[name=checkOperation2]')
        check2.setChecked()

        const btnKeyboard = wrapper.find('button[name="DEL"]')
        btnKeyboard.trigger('click')

        expect(wrapper.vm.oper2).toBe(0)
    })

    it('Test Numbers keyboard (error)', () => {
        const wrapper = mount(PageCalculator)

        const op1 = wrapper.find('input[name=operand1]')
        op1.setValue('8')

        const op2 = wrapper.find('input[name=operand2]')
        op2.setValue('0')

        const btnSum = wrapper.find('button[name="/"]')
        btnSum.trigger('click')

        expect(wrapper.vm.error).toBe("На 0 делить нельзя")
    })

})
